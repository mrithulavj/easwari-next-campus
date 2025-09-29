import { useState } from "react";
import CampusHeader from "@/components/CampusHeader";
import CalendarNavigation from "@/components/CalendarNavigation";
import CalendarGrid from "@/components/CalendarGrid";
import ClubCards from "@/components/ClubCards";

const Index = () => {
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-campus-navy">
      <CampusHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <CalendarNavigation
          currentView={currentView}
          onViewChange={setCurrentView}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
        
        <CalendarGrid currentDate={currentDate} view={currentView} />
        
        <div className="mt-12">
          <ClubCards />
        </div>
      </div>
    </div>
  );
};

export default Index;
