import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClubDetails from "./pages/ClubDetails";
import ODApplication from "./pages/ODApplication";
import FacultyDashboard from "./pages/FacultyDashboard";
import HODDashboard from "./pages/HODDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/club/:clubId" element={<ClubDetails />} />
          <Route path="/od-application" element={<ODApplication />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/hod/dashboard" element={<HODDashboard />} />
          <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
