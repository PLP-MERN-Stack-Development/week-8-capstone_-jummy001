import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Edit, Trash2, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for user events
const mockMyEvents = [
  {
    id: "1",
    title: "Tech Innovation Summit 2025",
    date: "2025-03-15",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco Convention Center",
    attendees: 847,
    maxAttendees: 1000,
    revenue: 252653,
    status: "published",
    category: "Technology"
  },
  {
    id: "2",
    title: "Startup Networking Night",
    date: "2025-02-20",
    time: "6:00 PM - 9:00 PM",
    location: "WeWork Downtown",
    attendees: 45,
    maxAttendees: 50,
    revenue: 0,
    status: "published",
    category: "Networking"
  },
  {
    id: "3",
    title: "AI Workshop Series",
    date: "2025-04-10",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Hub Center",
    attendees: 12,
    maxAttendees: 30,
    revenue: 2400,
    status: "draft",
    category: "Education"
  }
];

const mockTickets = [
  {
    id: "1",
    eventTitle: "Digital Marketing Conference",
    eventDate: "2025-03-20",
    eventTime: "10:00 AM - 4:00 PM",
    location: "Marina Bay Sands",
    ticketType: "VIP",
    price: 199,
    quantity: 2,
    orderDate: "2025-02-15",
    status: "confirmed"
  },
  {
    id: "2",
    eventTitle: "Web Development Bootcamp",
    eventDate: "2025-02-25",
    eventTime: "9:00 AM - 6:00 PM",
    location: "Online Event",
    ticketType: "Standard",
    price: 99,
    quantity: 1,
    orderDate: "2025-02-10",
    status: "confirmed"
  }
];

export default function MyEvents() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEvents = mockMyEvents.filter(event => 
    statusFilter === "all" || event.status === statusFilter
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Events</h1>
            <p className="text-muted-foreground">Manage your events and view your bookings</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/create">
              <Plus className="h-4 w-4" />
              Create New Event
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="organized" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="organized">Events I'm Organizing</TabsTrigger>
            <TabsTrigger value="attending">Events I'm Attending</TabsTrigger>
          </TabsList>

          <TabsContent value="organized" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredEvents.length} event(s) found
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-card-hover transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {event.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge 
                            className={`text-white ${getStatusColor(event.status)}`}
                          >
                            {event.status}
                          </Badge>
                          <Badge variant="outline">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)} • {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees}/{event.maxAttendees} registered</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-lg font-semibold text-primary">
                            ${event.revenue.toLocaleString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/event/${event.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground mb-4">
                    {statusFilter === "all" 
                      ? "You haven't created any events yet." 
                      : `No ${statusFilter} events found.`}
                  </p>
                  <Button variant="gradient" asChild>
                    <Link to="/create">
                      <Plus className="h-4 w-4" />
                      Create Your First Event
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="attending" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockTickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-card-hover transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                        <Badge 
                          className={`mt-2 ${
                            ticket.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                          } text-white`}
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Paid</p>
                        <p className="text-lg font-semibold text-primary">
                          ${(ticket.price * ticket.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(ticket.eventDate)} • {ticket.eventTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{ticket.location}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <p className="text-muted-foreground">
                            {ticket.quantity} × {ticket.ticketType} Ticket
                          </p>
                          <p className="text-muted-foreground">
                            Ordered: {formatDate(ticket.orderDate)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/event/${ticket.id}`}>
                            View Event
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockTickets.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't registered for any events yet.
                  </p>
                  <Button variant="gradient" asChild>
                    <Link to="/">
                      Browse Events
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}