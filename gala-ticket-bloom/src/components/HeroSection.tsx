import { Search, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import heroImage from "@/assets/hero-event.jpg";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Event hero" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>
      
      <div className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Amazing
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Events Near You
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            From conferences to concerts, find and book tickets for the best events in your area.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search events, venues, or organizers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-background/95 backdrop-blur border-0 shadow-elegant"
              />
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>1000+ Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>50k+ Attendees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Easy Discovery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}