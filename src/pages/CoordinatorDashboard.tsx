import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, MessageSquare, Download } from "lucide-react";

interface ODApplication {
  id: string;
  student_name: string;
  registration_number: string;
  department: string;
  class_name: string;
  event_name: string;
  event_date: string;
  od_details: string;
  od_letter_url: string;
  overall_status: string;
  faculty_status: string;
  faculty_comments: string | null;
  coordinator_status: string;
  coordinator_comments: string | null;
  hod_status: string;
  created_at: string;
}

export default function CoordinatorDashboard() {
  const [applications, setApplications] = useState<ODApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get coordinator data to filter by their class
      const { data: coordinatorData } = await supabase
        .from("class_coordinators")
        .select("department, year, section")
        .eq("user_id", user.id)
        .single();

      if (!coordinatorData) throw new Error("Coordinator data not found");

      const { data, error } = await supabase
        .from("od_applications")
        .select("*")
        .eq("department", coordinatorData.department)
        .eq("year", coordinatorData.year)
        .eq("section", coordinatorData.section)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    applicationId: string,
    status: "approved" | "rejected" | "needs_info"
  ) => {
    setActioningId(applicationId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: coordinatorData } = await supabase
        .from("class_coordinators")
        .select("id")
        .eq("user_id", user.id)
        .single();

      const updateData: any = {
        coordinator_status: status,
        coordinator_approved_at: new Date().toISOString(),
        coordinator_approved_by: coordinatorData?.id,
      };

      if (comments[applicationId]) {
        updateData.coordinator_comments = comments[applicationId];
      }

      const { error } = await supabase
        .from("od_applications")
        .update(updateData)
        .eq("id", applicationId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });

      fetchApplications();
      setComments((prev) => {
        const newComments = { ...prev };
        delete newComments[applicationId];
        return newComments;
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update application",
        variant: "destructive",
      });
    } finally {
      setActioningId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
      needs_info: "outline",
    };
    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.replace("_", " ")}
      </Badge>
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Class Coordinator Dashboard</h1>
          <p className="text-muted-foreground">Review and manage OD applications for your class</p>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{app.student_name}</CardTitle>
                    <CardDescription>
                      {app.registration_number} • {app.department} • {app.class_name}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(app.overall_status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Event:</p>
                    <p className="text-muted-foreground">{app.event_name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Date:</p>
                    <p className="text-muted-foreground">{new Date(app.event_date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-sm">Details:</p>
                  <p className="text-sm text-muted-foreground">{app.od_details}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <p className="font-medium text-sm">OD Letter:</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(app.od_letter_url, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    View/Download
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Faculty Status:</p>
                    {getStatusBadge(app.faculty_status)}
                  </div>
                  <div>
                    <p className="font-medium">Coordinator Status:</p>
                    {getStatusBadge(app.coordinator_status)}
                  </div>
                  <div>
                    <p className="font-medium">HOD Status:</p>
                    {getStatusBadge(app.hod_status)}
                  </div>
                </div>

                {app.faculty_comments && (
                  <div className="pt-2">
                    <p className="font-medium text-sm">Faculty Comments:</p>
                    <p className="text-sm text-muted-foreground">{app.faculty_comments}</p>
                  </div>
                )}

                {app.coordinator_status === "pending" && (
                  <div className="space-y-3 pt-4 border-t">
                    <Textarea
                      placeholder="Add comments (optional)"
                      value={comments[app.id] || ""}
                      onChange={(e) =>
                        setComments((prev) => ({ ...prev, [app.id]: e.target.value }))
                      }
                      className="min-h-[60px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAction(app.id, "approved")}
                        disabled={actioningId === app.id}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleAction(app.id, "needs_info")}
                        disabled={actioningId === app.id}
                        variant="outline"
                        className="flex-1"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Need Info
                      </Button>
                      <Button
                        onClick={() => handleAction(app.id, "rejected")}
                        disabled={actioningId === app.id}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                )}

                {app.coordinator_comments && (
                  <div className="pt-4 border-t">
                    <p className="font-medium text-sm">Coordinator Comments:</p>
                    <p className="text-sm text-muted-foreground">{app.coordinator_comments}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {applications.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No OD applications found for your class
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}