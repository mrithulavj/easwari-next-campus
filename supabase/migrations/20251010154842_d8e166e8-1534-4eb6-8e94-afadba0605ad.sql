-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'club_admin', 'college_admin');

-- Create students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  registration_number TEXT NOT NULL UNIQUE CHECK (registration_number ~ '^\d{12}$'),
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  section TEXT NOT NULL,
  phone_number TEXT NOT NULL CHECK (phone_number ~ '^\d{10}$'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create clubs table
CREATE TABLE public.clubs_auth (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  club_name TEXT NOT NULL UNIQUE,
  club_email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create college admins table
CREATE TABLE public.college_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  admin_email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.college_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for students table
CREATE POLICY "Students can view their own data"
  ON public.students FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own data"
  ON public.students FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for clubs_auth table
CREATE POLICY "Club admins can view their own data"
  ON public.clubs_auth FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Club admins can update their own data"
  ON public.clubs_auth FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for college_admins table
CREATE POLICY "College admins can view their own data"
  ON public.college_admins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all data"
  ON public.college_admins FOR SELECT
  USING (public.has_role(auth.uid(), 'college_admin'));

-- RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Insert dummy data for testing
-- Note: User IDs will need to be created through auth.users first
-- These are placeholder entries that will be updated after user creation

-- Create function to handle user creation and role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This trigger will be called after user creation
  -- Additional logic can be added here if needed
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();