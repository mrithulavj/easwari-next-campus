import { useState, useMemo } from "react";
import { clubEvents } from "@/data/clubEvents";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'academic' | 'cultural' | 'sports' | 'club';
  clubName?: string;
}

interface CalendarGridProps {
  currentDate: Date;
  view: string;
}

const CalendarGrid = ({ currentDate, view }: CalendarGridProps) => {
  // Convert club events to calendar format and combine with mock events
  const [events] = useState<Event[]>(() => {
    const calendarClubEvents: Event[] = clubEvents.map(event => ({
      id: event.id,
      title: event.title,
      date: new Date(event.date),
      time: event.time,
      type: 'club' as const,
      clubName: event.clubName
    }));

    const mockEvents: Event[] = [
      {
        id: 'mock-1',
        title: 'Annual Tech Fest',
        date: new Date(2024, 9, 15),
        time: '10:00 AM',
        type: 'cultural'
      },
      {
        id: 'mock-2',
        title: 'Mid-term Exams',
        date: new Date(2024, 9, 28),
        time: '9:00 AM',
        type: 'academic'
      },
      {
        id: 'mock-3',
        title: 'Sports Day',
        date: new Date(2024, 10, 5),
        time: '8:00 AM',
        type: 'sports'
      },
      {
        id: 'mock-4',
        title: 'Cultural Night',
        date: new Date(2024, 10, 12),
        time: '6:00 PM',
        type: 'cultural'
      },
      {
        id: 'mock-5',
        title: 'Final Exams',
        date: new Date(2024, 10, 20),
        time: '9:00 AM',
        type: 'academic'
      }
    ];

    return [...calendarClubEvents, ...mockEvents];
  });

  const eventColors = {
    academic: 'bg-blue-100 text-blue-800 border-blue-200',
    cultural: 'bg-purple-100 text-purple-800 border-purple-200',
    sports: 'bg-green-100 text-green-800 border-green-200',
    club: 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const getCalendarDays = useMemo(() => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  }, [currentDate]);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  if (view === 'list') {
    const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
    
    return (
      <div className="campus-card rounded-lg p-6">
        <h3 className="text-xl font-semibold text-campus-navy mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {sortedEvents.map((event) => (
            <div 
              key={event.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-campus-navy/10 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1">
                <h4 className="font-medium text-campus-navy">{event.title}</h4>
                {event.clubName && (
                  <p className="text-xs text-campus-navy/60 mb-1">{event.clubName}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-campus-navy/70">
                  <span>{event.date.toLocaleDateString()}</span>
                  <span>{event.time}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${eventColors[event.type]}`}>
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="campus-card rounded-lg p-6">
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center font-medium text-campus-navy/70 text-sm">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {getCalendarDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isCurrentMonthDate = isCurrentMonth(date);
          const isTodayDate = isToday(date);
          
          return (
            <div 
              key={index}
              className={`
                min-h-[80px] p-1 border border-campus-navy/10 rounded-lg
                ${!isCurrentMonthDate ? 'opacity-40' : ''}
                ${isTodayDate ? 'bg-campus-accent/10 border-campus-accent' : 'hover:bg-campus-navy/5'}
                transition-colors cursor-pointer
              `}
            >
              <div className={`
                text-sm font-medium mb-1 
                ${isTodayDate ? 'text-campus-accent' : 'text-campus-navy'}
                ${!isCurrentMonthDate ? 'text-campus-navy/40' : ''}
              `}>
                {date.getDate()}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div 
                    key={event.id}
                    className={`px-1 py-0.5 rounded text-xs truncate border ${eventColors[event.type]}`}
                    title={`${event.title} - ${event.time}${event.clubName ? ` (${event.clubName})` : ''}`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-campus-navy/60 px-1">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;