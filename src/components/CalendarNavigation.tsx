import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const CalendarNavigation = ({ 
  currentView, 
  onViewChange, 
  currentDate, 
  onDateChange 
}: CalendarNavigationProps) => {
  const views = [
    { key: 'month', label: 'Month' },
    { key: 'week', label: 'Week' },
    { key: 'day', label: 'Day' },
    { key: 'list', label: 'List' },
  ];

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    onDateChange(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = 
      currentView === 'month' 
        ? { year: 'numeric', month: 'long' }
        : { year: 'numeric', month: 'long', day: 'numeric' };
    
    return currentDate.toLocaleDateString('en-US', options);
  };

  return (
    <div className="campus-card rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Calendar className="h-6 w-6 text-campus-navy" />
          <h2 className="text-2xl font-semibold text-campus-navy">
            Events Calendar
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="secondary"
            onClick={goToToday}
            className="bg-campus-beige text-campus-navy hover:bg-campus-navy hover:text-campus-cream"
          >
            Today
          </Button>
          
          <div className="flex items-center gap-1 mx-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="text-campus-navy hover:bg-campus-beige"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-lg font-medium text-campus-navy min-w-48 text-center">
              {formatDate()}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="text-campus-navy hover:bg-campus-beige"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-1">
            {views.map((view) => (
              <Button
                key={view.key}
                variant={currentView === view.key ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(view.key)}
                className={
                  currentView === view.key
                    ? "bg-campus-navy text-campus-cream hover:bg-campus-navy-light"
                    : "text-campus-navy hover:bg-campus-beige"
                }
              >
                {view.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarNavigation;