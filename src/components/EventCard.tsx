import { ClubEvent } from "@/types/club";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";

interface EventCardProps {
  event: ClubEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const getEventTypeColor = (type: ClubEvent['type']) => {
    const colors = {
      'upcoming-events': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'auditions': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'registrations': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'workshops': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'meetings': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };
    return colors[type];
  };

  const getStatusColor = (status: ClubEvent['status']) => {
    const colors = {
      'open': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'closed': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'upcoming': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };
    return colors[status];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {event.clubName}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getEventTypeColor(event.type)}>
              {event.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
            <Badge className={getStatusColor(event.status)}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{event.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
          </div>

          {event.registrationRequired && event.status === 'open' && (
            <Button className="w-full mt-4">
              <Users className="h-4 w-4 mr-2" />
              Register Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;