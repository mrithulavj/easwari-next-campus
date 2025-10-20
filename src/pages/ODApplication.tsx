import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const odSchema = z.object({
  eventName: z.string().min(3, "Event name must be at least 3 characters"),
  eventDate: z.string().min(1, "Event date is required"),
  odDetails: z.string().min(10, "Please provide detailed information"),
  odLetter: z.instanceof(FileList).refine((files) => files.length > 0, "OD letter is required"),
});

type ODFormData = z.infer<typeof odSchema>;

export default function ODApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ODFormData>({
    resolver: zodResolver(odSchema),
  });

  const onSubmit = async (data: ODFormData) => {
    setIsSubmitting(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get student data
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (studentError) throw studentError;

      // Upload OD letter
      const file = data.odLetter[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("od-letters")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("od-letters")
        .getPublicUrl(fileName);

      // Submit OD application
      const { error: insertError } = await supabase
        .from("od_applications")
        .insert({
          student_id: studentData.id,
          registration_number: studentData.registration_number,
          student_name: studentData.name,
          class_name: `${studentData.year} ${studentData.section}`,
          department: studentData.department,
          year: studentData.year,
          section: studentData.section,
          event_name: data.eventName,
          event_date: data.eventDate,
          od_details: data.odDetails,
          od_letter_url: publicUrl,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your OD application has been submitted successfully.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit OD application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Apply for On-Duty (OD)</CardTitle>
            <CardDescription>
              Fill in the details below to submit your OD application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  {...register("eventName")}
                  placeholder="Enter event name"
                />
                {errors.eventName && (
                  <p className="text-sm text-destructive">{errors.eventName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  {...register("eventDate")}
                />
                {errors.eventDate && (
                  <p className="text-sm text-destructive">{errors.eventDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="odDetails">OD Details</Label>
                <Textarea
                  id="odDetails"
                  {...register("odDetails")}
                  placeholder="Provide detailed information about the event and reason for OD"
                  className="min-h-[100px]"
                />
                {errors.odDetails && (
                  <p className="text-sm text-destructive">{errors.odDetails.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="odLetter">Upload OD Letter (PDF/Image)</Label>
                <Input
                  id="odLetter"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("odLetter")}
                />
                {errors.odLetter && (
                  <p className="text-sm text-destructive">{errors.odLetter.message}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}