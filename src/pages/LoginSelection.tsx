import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function LoginSelection() {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  useEffect(() => {
    if (user && role) {
      // Redirect authenticated users to appropriate dashboard
      if (role === "student") navigate("/dashboard");
      else if (role === "club_admin") navigate("/club/dashboard");
      else if (role === "college_admin") navigate("/admin/dashboard");
    }
  }, [user, role, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-campus-navy via-campus-navy to-campus-gold/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Campus Portal
          </h1>
          <p className="text-lg text-white/80">
            Select your account type to continue
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Student Login Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Student Login</CardTitle>
              <CardDescription>
                Access your student dashboard and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => navigate("/login/student")}
              >
                Login as Student
              </Button>
            </CardContent>
          </Card>

          {/* Club Login Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Club Login</CardTitle>
              <CardDescription>
                Manage your club events and members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                size="lg"
                variant="secondary"
                onClick={() => navigate("/login/club")}
              >
                Login as Club
              </Button>
            </CardContent>
          </Card>

          {/* Admin Login Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Manage college schedule and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                size="lg"
                variant="outline"
                onClick={() => navigate("/login/admin")}
              >
                Login as Admin
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/60">
          <p>Need help? Contact support@campus.edu</p>
        </div>
      </div>
    </div>
  );
}
