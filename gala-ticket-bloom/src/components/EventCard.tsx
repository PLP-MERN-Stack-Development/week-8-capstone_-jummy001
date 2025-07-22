import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  featured?: boolean;
}

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className = "" }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const spotsLeft = event.maxAttendees - event.attendees;
  const isAlmostFull = spotsLeft <= 10;
  const isFull = spotsLeft <= 0;

  return (
    <Card className={`group hover:shadow-card-hover transition-all duration-300 hover:scale-105 animate-fade-in bg-gradient-card ${className}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur">
              {event.category}
            </Badge>
          </div>
          {event.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-primary text-white">
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-1 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.date)}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{event.attendees}/{event.maxAttendees} attending</span>
            {isAlmostFull && !isFull && (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                {spotsLeft} spots left
              </Badge>
            )}
            {isFull && (
              <Badge variant="destructive">
                Sold Out
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          {event.price === 0 ? 'Free' : `$${event.price}`}
        </div>
        <Button 
          variant="gradient" 
          asChild
          disabled={isFull}
          className="shadow-card hover:shadow-card-hover"
        >
          <Link to={`/event/${event.id}`}>
            {isFull ? 'Sold Out' : 'Get Tickets'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}