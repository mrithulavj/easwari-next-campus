-- Step 2: Create tables and policies
-- Create OD application status enum
CREATE TYPE od_status AS ENUM ('pending', 'approved', 'rejected', 'needs_info');

-- Create approval status enum for each approver
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected', 'needs_info');

-- Create faculty table
CREATE TABLE public.faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create HOD table
CREATE TABLE public.hod (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create class coordinators table
CREATE TABLE public.class_coordinators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  section TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create OD applications table
CREATE TABLE public.od_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  registration_number TEXT NOT NULL,
  student_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  section TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  od_details TEXT NOT NULL,
  od_letter_url TEXT,
  overall_status od_status DEFAULT 'pending',
  faculty_status approval_status DEFAULT 'pending',
  faculty_comments TEXT,
  faculty_approved_at TIMESTAMPTZ,
  faculty_approved_by UUID REFERENCES public.faculty(id),
  coordinator_status approval_status DEFAULT 'pending',
  coordinator_comments TEXT,
  coordinator_approved_at TIMESTAMPTZ,
  coordinator_approved_by UUID REFERENCES public.class_coordinators(id),
  hod_status approval_status DEFAULT 'pending',
  hod_comments TEXT,
  hod_approved_at TIMESTAMPTZ,
  hod_approved_by UUID REFERENCES public.hod(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hod ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.od_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for faculty
CREATE POLICY "Faculty can view their own data"
  ON public.faculty FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for HOD
CREATE POLICY "HOD can view their own data"
  ON public.hod FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for class coordinators
CREATE POLICY "Coordinators can view their own data"
  ON public.class_coordinators FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for OD applications
CREATE POLICY "Students can view their own applications"
  ON public.od_applications FOR SELECT
  USING (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can create applications"
  ON public.od_applications FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update their pending applications"
  ON public.od_applications FOR UPDATE
  USING (
    student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())
    AND overall_status = 'pending'
  );

CREATE POLICY "Faculty can view all applications"
  ON public.od_applications FOR SELECT
  USING (has_role(auth.uid(), 'faculty'));

CREATE POLICY "Faculty can update applications"
  ON public.od_applications FOR UPDATE
  USING (has_role(auth.uid(), 'faculty'));

CREATE POLICY "HOD can view all applications"
  ON public.od_applications FOR SELECT
  USING (has_role(auth.uid(), 'hod'));

CREATE POLICY "HOD can update applications"
  ON public.od_applications FOR UPDATE
  USING (has_role(auth.uid(), 'hod'));

CREATE POLICY "Coordinators can view applications for their class"
  ON public.od_applications FOR SELECT
  USING (
    has_role(auth.uid(), 'class_coordinator') 
    AND (department, year, section) IN (
      SELECT department, year, section 
      FROM public.class_coordinators 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Coordinators can update applications for their class"
  ON public.od_applications FOR UPDATE
  USING (
    has_role(auth.uid(), 'class_coordinator')
    AND (department, year, section) IN (
      SELECT department, year, section 
      FROM public.class_coordinators 
      WHERE user_id = auth.uid()
    )
  );

-- Create storage bucket for OD letters
INSERT INTO storage.buckets (id, name, public) 
VALUES ('od-letters', 'od-letters', false);

-- Storage policies for OD letters
CREATE POLICY "Students can upload their OD letters"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'od-letters' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Students can view their own OD letters"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'od-letters'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Faculty can view all OD letters"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'od-letters'
    AND has_role(auth.uid(), 'faculty')
  );

CREATE POLICY "HOD can view all OD letters"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'od-letters'
    AND has_role(auth.uid(), 'hod')
  );

CREATE POLICY "Coordinators can view OD letters"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'od-letters'
    AND has_role(auth.uid(), 'class_coordinator')
  );

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_od_applications_updated_at
  BEFORE UPDATE ON public.od_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();