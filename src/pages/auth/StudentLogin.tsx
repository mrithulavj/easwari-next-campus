import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const studentLoginSchema = z.object({
  registrationNumber: z.string()
    .regex(/^\d{12}$/, "Registration number must be exactly 12 digits")
    .trim(),
  phoneNumber: z.string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .trim(),
});

type StudentLoginForm = z.infer<typeof studentLoginSchema>;

export default function StudentLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<StudentLoginForm>({
    resolver: zodResolver(studentLoginSchema),
    defaultValues: {
      registrationNumber: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: StudentLoginForm) => {
    setLoading(true);
    try {
      // Check if student exists in database
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("registration_number", data.registrationNumber)
        .eq("phone_number", data.phoneNumber)
        .maybeSingle();

      if (studentError) throw studentError;

      if (!studentData) {
        toast.error("Invalid credentials. Please check your registration number and phone number.");
        return;
      }

      // Sign in with email (we'll use reg number as email for auth)
      const email = `${data.registrationNumber}@student.campus.edu`;
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: data.phoneNumber,
      });

      if (signInError) throw signInError;

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-campus-navy via-campus-navy to-campus-gold/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            className="w-fit mb-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <CardTitle className="text-2xl">Student Login</CardTitle>
          <CardDescription>
            Enter your registration number and phone number to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="310625104217"
                        maxLength={12}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="8925321432"
                        maxLength={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
