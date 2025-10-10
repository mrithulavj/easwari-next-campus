import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginSelection from "./pages/LoginSelection";
import StudentLogin from "./pages/auth/StudentLogin";
import ClubLogin from "./pages/auth/ClubLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ClubDashboard from "./pages/ClubDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ClubDetails from "./pages/ClubDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginSelection />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/club" element={<ClubLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/club/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["club_admin"]}>
                  <ClubDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["college_admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/club/:clubId" 
              element={
                <ProtectedRoute>
                  <ClubDetails />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
