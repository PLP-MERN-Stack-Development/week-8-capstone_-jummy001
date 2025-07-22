import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calendar, MapPin } from "lucide-react";

// Mock event data
const mockEvents = [
  {
    id: "1",
    title: "Tech Innovation Summit 2024",
    description: "Join industry leaders to explore the latest in AI, blockchain, and emerging technologies.",
    date: "2024-03-15",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco Convention Center",
    price: 299,
    category: "Technology",
    attendees: 847,
    maxAttendees: 1000,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    featured: true
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    description: "Learn advanced strategies for social media, SEO, and conversion optimization.",
    date: "2024-03-20",
    time: "10:00 AM - 4:00 PM",
    location: "Marina Bay Sands",
    price: 199,
    category: "Business",
    attendees: 234,
    maxAttendees: 300,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: "3",
    title: "Startup Networking Night",
    description: "Connect with entrepreneurs, investors, and innovators in the startup ecosystem.",
    date: "2024-02-28",
    time: "6:00 PM - 9:00 PM",
    location: "WeWork Downtown",
    price: 0,
    category: "Networking",
    attendees: 156,
    maxAttendees: 200,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: "4",
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering neural networks, deep learning, and practical applications.",
    date: "2024-04-10",
    time: "2:00 PM - 6:00 PM",
    location: "Tech Hub Center",
    price: 149,
    category: "Education",
    attendees: 89,
    maxAttendees: 120,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    featured: true
  },
  {
    id: "5",
    title: "Music Festival Downtown",
    description: "Three days of incredible live music featuring local and international artists.",
    date: "2024-05-15",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park Amphitheater",
    price: 89,
    category: "Music",
    attendees: 2341,
    maxAttendees: 5000,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: "6",
    title: "Health & Wellness Expo",
    description: "Discover the latest in fitness, nutrition, and mental health with expert speakers.",
    date: "2024-03-25",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center Hall B",
    price: 25,
    category: "Health & Wellness",
    attendees: 445,
    maxAttendees: 600,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    featured: false
  }
];

const categories = ["All", "Technology", "Business", "Networking", "Education", "Music", "Health & Wellness"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [eventFilter, setEventFilter] = useState("all");

  const filteredEvents = mockEvents.filter(event => {
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    const filterMatch = eventFilter === "all" || 
      (eventFilter === "featured" && event.featured) ||
      (eventFilter === "free" && event.price === 0) ||
      (eventFilter === "paid" && event.price > 0);
    
    return categoryMatch && filterMatch;
  });

  const featuredEvents = mockEvents.filter(event => event.featured);
  const upcomingEvents = mockEvents.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Featured Events Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Featured
              </Badge>
            </div>
            <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't miss these handpicked events curated by our team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div 
                key={event.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">All Events</h2>
              <p className="text-xl text-muted-foreground">
                Browse all upcoming events in your area
              </p>
            </div>
          </div>

          <Tabs value={eventFilter} onValueChange={setEventFilter} className="mb-8">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="hover:scale-105 transition-transform"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or check back later for new events.
              </p>
              <Button variant="gradient" onClick={() => {
                setSelectedCategory("All");
                setEventFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-xl opacity-90">Events Hosted</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-xl opacity-90">Happy Attendees</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-90">Event Organizers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
