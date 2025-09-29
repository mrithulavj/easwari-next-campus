import { useParams, Link } from "react-router-dom";
import { clubs } from "@/data/clubs";
import { clubEvents } from "@/data/clubEvents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import EventCard from "@/components/EventCard";
import { ArrowLeft, Users } from "lucide-react";

const ClubDetails = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const club = clubs.find(c => c.id === clubId);

  if (!club) {
    return (
      <div className="min-h-screen bg-campus-navy flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Club Not Found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getClubEvents = (type?: string) => {
    const events = clubEvents.filter(event => event.clubId === clubId);
    if (type) {
      return events.filter(event => event.type === type);
    }
    return events;
  };

  const Icon = club.icon;

  return (
    <div className="min-h-screen bg-campus-navy">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-white hover:text-campus-gold">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-campus-gold">{club.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <Link to="/" className="mb-6 inline-block">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-campus-navy">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clubs
          </Button>
        </Link>

        {/* Club Header */}
        <Card className="mb-8 bg-white/95 backdrop-blur">
          <CardHeader>
            <div className="flex items-start gap-6">
              <div className="p-4 bg-campus-navy rounded-lg">
                <Icon className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <CardTitle className="text-3xl">{club.name}</CardTitle>
                  <Badge variant="secondary">{club.category}</Badge>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{club.memberCount} members</span>
                </div>
                <CardDescription className="text-lg leading-relaxed">
                  {club.fullDescription}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Events Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-white data-[state=active]:text-campus-navy">All Events</TabsTrigger>
            <TabsTrigger value="upcoming-events" className="text-white data-[state=active]:bg-white data-[state=active]:text-campus-navy">Events</TabsTrigger>
            <TabsTrigger value="auditions" className="text-white data-[state=active]:bg-white data-[state=active]:text-campus-navy">Auditions</TabsTrigger>
            <TabsTrigger value="registrations" className="text-white data-[state=active]:bg-white data-[state=active]:text-campus-navy">Registrations</TabsTrigger>
            <TabsTrigger value="workshops" className="text-white data-[state=active]:bg-white data-[state=active]:text-campus-navy">Workshops</TabsTrigger>
            <TabsTrigger value="meetings" className="text-white data-[state=active]:bg-white data-[state=active]:text-campus-navy">Meetings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getClubEvents().length > 0 ? (
                getClubEvents().map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">No events scheduled at the moment.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upcoming-events" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getClubEvents('upcoming-events').length > 0 ? (
                getClubEvents('upcoming-events').map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">No upcoming events scheduled.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="auditions" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getClubEvents('auditions').length > 0 ? (
                getClubEvents('auditions').map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">No auditions scheduled at the moment.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="registrations" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getClubEvents('registrations').length > 0 ? (
                getClubEvents('registrations').map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">No registrations open at the moment.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getClubEvents('workshops').length > 0 ? (
                getClubEvents('workshops').map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">No workshops scheduled at the moment.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getClubEvents('meetings').length > 0 ? (
                getClubEvents('meetings').map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">No meetings scheduled at the moment.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClubDetails;