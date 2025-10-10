import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-campus-navy via-campus-navy to-campus-gold/20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">College Admin Dashboard</h1>
          <Button onClick={signOut} variant="outline">
            Logout
          </Button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Welcome, Administrator!</h2>
          <p className="text-muted-foreground mb-4">
            Email: {user?.email}
          </p>
          <div className="space-y-4">
            <p className="text-lg">Admin management features coming soon:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Add/Delete holidays</li>
              <li>Update timetable</li>
              <li>Manage all events and clubs</li>
              <li>Send college-wide notifications</li>
              <li>Prepone/Postpone/Cancel classes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
