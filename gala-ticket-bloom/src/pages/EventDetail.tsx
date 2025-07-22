import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Share2, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock event data
const mockEvent = {
  id: "1",
  title: "Tech Innovation Summit 2025",
  description: "Join us for the biggest tech innovation summit of the year. Learn from industry leaders, network with peers, and discover the latest trends in technology.",
  fullDescription: "The Tech Innovation Summit 2025 is a premier event bringing together technology leaders, innovators, and visionaries from around the world. This full-day conference features keynote presentations, panel discussions, networking sessions, and hands-on workshops covering the latest developments in artificial intelligence, blockchain, cloud computing, and emerging technologies.\n\nAttendees will have the opportunity to:\n• Learn from 20+ industry experts and thought leaders\n• Participate in interactive workshops and breakout sessions\n• Network with 500+ tech professionals and entrepreneurs\n• Explore cutting-edge technology demonstrations\n• Access exclusive content and resources\n\nWhether you're a startup founder, enterprise executive, developer, or tech enthusiast, this summit will provide valuable insights and connections to advance your career and business.",
  date: "2025-03-15",
  time: "9:00 AM - 6:00 PM",
  location: "San Francisco Convention Center",
  address: "747 Howard St, San Francisco, CA 94103",
  price: 299,
  category: "Technology",
  attendees: 847,
  maxAttendees: 1000,
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
  featured: true,
  organizer: {
    name: "TechEvents Inc.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    rating: 4.8,
    eventsHosted: 25
  },
  speakers: [
    {
      name: "Sarah Chen",
      role: "CTO, InnovateTech",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1ab?w=60&h=60&fit=crop&crop=face",
      topic: "The Future of AI in Enterprise"
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder, BlockchainVentures",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      topic: "Decentralized Finance Revolution"
    }
  ]
};

export default function EventDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const event = mockEvent; // In real app, fetch by id
  const spotsLeft = event.maxAttendees - event.attendees;
  const isAlmostFull = spotsLeft <= 50;

  const handleBookTickets = () => {
    toast({
      title: "Tickets Reserved!",
      description: `${selectedTickets} ticket(s) for ${event.title} have been added to your cart.`,
    });
  };

  const handleShare = () => {
    navigator.share?.({
      title: event.title,
      text: event.description,
      url: window.location.href,
    }) || toast({
      title: "Link Copied!",
      description: "Event link has been copied to your clipboard.",
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Event removed from your saved events" : "Event saved to your bookmarks",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Event Header */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back button and actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Button variant="secondary" size="sm" asChild>
            <Link to="/">← Back to Events</Link>
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleBookmark}
              className={isBookmarked ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary">
                {event.category}
              </Badge>
              {event.featured && (
                <Badge className="bg-gradient-primary">
                  Featured Event
                </Badge>
              )}
              {isAlmostFull && (
                <Badge variant="destructive">
                  Almost Full - {spotsLeft} spots left
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {event.fullDescription.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="speakers" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Speakers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-card">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={speaker.avatar} alt={speaker.name} />
                            <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-lg">{speaker.name}</h4>
                            <p className="text-muted-foreground">{speaker.role}</p>
                            <p className="text-sm text-primary font-medium mt-2">{speaker.topic}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{event.location}</h4>
                        <p className="text-muted-foreground">{event.address}</p>
                      </div>
                      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Map would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendee Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Reviews will be available after the event</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book Tickets</span>
                  <span className="text-2xl font-bold text-primary">
                    ${event.price}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Number of tickets:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTickets(Math.max(1, selectedTickets - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{selectedTickets}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTickets(Math.min(10, selectedTickets + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${event.price * selectedTickets}</span>
                  </div>
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleBookTickets}
                >
                  Book {selectedTickets} Ticket{selectedTickets > 1 ? 's' : ''}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>{spotsLeft} tickets remaining</p>
                  <p>Free cancellation until 24 hours before event</p>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Event Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                    <AvatarFallback>{event.organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{event.organizer.name}</h4>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{event.organizer.rating}</span>
                      <span>•</span>
                      <span>{event.organizer.eventsHosted} events</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Attendees</span>
                  </span>
                  <span className="font-semibold">{event.attendees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Event Date</span>
                  </span>
                  <span className="font-semibold">{formatDate(event.date)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}