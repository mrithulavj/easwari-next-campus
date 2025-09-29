import { useState, useMemo } from "react";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'academic' | 'cultural' | 'sports' | 'club';
}

interface CalendarGridProps {
  currentDate: Date;
  view: string;
}

const CalendarGrid = ({ currentDate, view }: CalendarGridProps) => {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Annual Tech Fest',
      date: new Date(2024, 9, 15),
      time: '10:00 AM',
      type: 'cultural'
    },
    {
      id: '2',
      title: 'YRC Blood Drive',
      date: new Date(2024, 9, 18),
      time: '9:00 AM',
      type: 'club'
    },
    {
      id: '3',
      title: 'Rotaract Community Service',
      date: new Date(2024, 9, 22),
      time: '2:00 PM',
      type: 'club'
    },
    {
      id: '4',
      title: 'Enlit Literary Meet',
      date: new Date(2024, 9, 25),
      time: '11:00 AM',
      type: 'cultural'
    },
    {
      id: '5',
      title: 'Mid-term Exams',
      date: new Date(2024, 9, 28),
      time: '9:00 AM',
      type: 'academic'
    }
  ]);

  const eventColors = {
    academic: 'bg-red-100 text-red-800 border-red-200',
    cultural: 'bg-purple-100 text-purple-800 border-purple-200',
    sports: 'bg-green-100 text-green-800 border-green-200',
    club: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const getCalendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
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
    return (
      <div className="campus-card rounded-lg p-6">
        <div className="space-y-4">
          {events
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-campus-navy/10">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-campus-navy">
                      {event.date.getDate()}
                    </div>
                    <div className="text-sm text-campus-navy/70">
                      {event.date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-campus-navy">{event.title}</h3>
                    <p className="text-sm text-campus-navy/70">{event.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${eventColors[event.type]}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
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
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 text-center font-semibold text-campus-navy border-b border-campus-navy/20">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {getCalendarDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDate = isToday(date);
          
          return (
            <div
              key={index}
              className={`min-h-20 p-2 border border-campus-navy/10 ${
                isCurrentMonthDay 
                  ? 'bg-white' 
                  : 'bg-campus-navy/5'
              } ${
                isTodayDate 
                  ? 'ring-2 ring-campus-accent' 
                  : ''
              } hover:bg-campus-beige/50 transition-colors`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isCurrentMonthDay 
                  ? 'text-campus-navy' 
                  : 'text-campus-navy/40'
              } ${
                isTodayDate 
                  ? 'text-campus-accent font-bold' 
                  : ''
              }`}>
                {date.getDate()}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate border ${eventColors[event.type]}`}
                    title={`${event.title} - ${event.time}`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-campus-navy/60 font-medium">
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