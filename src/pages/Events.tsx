import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Filter, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import LGBTLoading from "@/components/ui/LGBTLoading";

const categories = [
  { id: "all", label: "All Events" },
  { id: "celebration", label: "Celebrations" },
  { id: "workshop", label: "Workshops" },
  { id: "support", label: "Support Groups" },
  { id: "social", label: "Social" },
  { id: "volunteer", label: "Volunteer" },
];

const categoryColors: Record<string, string> = {
  celebration: "bg-pride-pink/10 text-pride-pink",
  workshop: "bg-pride-blue/10 text-pride-blue",
  support: "bg-safe text-safe-foreground",
  social: "bg-warm text-warm-foreground",
  volunteer: "bg-hope text-hope-foreground",
};

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/event`);
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    },
  });

  const filteredEvents = activeCategory === "all"
    ? events
    : events.filter(event => event.category === activeCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date();
  };

  // Get unique categories from events
  const eventCategories = Array.from(new Set(events.map(event => event.category)));
  const dynamicCategories = [
    { id: "all", label: "All Events" },
    ...eventCategories.map((cat: string) => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))
  ];

  const upcomingEvents = filteredEvents.filter(e => isUpcoming(e.date));
  const pastEvents = filteredEvents.filter(e => !isUpcoming(e.date));

  return (
    <MainLayout>
      <Helmet>
        <title>Events - Sneh Jeet NGO</title>
        <meta name="description" content="Join us for workshops, celebrations, support groups, and social events. Everyone is welcome in our inclusive community." />
        <meta name="keywords" content="events, LGBTQIA+, workshops, celebrations, support groups, social events, community" />
        <link rel="canonical" href="/events" />
        <meta property="og:title" content="Events - Sneh Jeet NGO" />
        <meta property="og:description" content="Join us for workshops, celebrations, support groups, and social events. Everyone is welcome in our inclusive community." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="/events" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Events - Sneh Jeet NGO" />
        <meta name="twitter:description" content="Join us for workshops, celebrations, support groups, and social events. Everyone is welcome in our inclusive community." />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>
      <PageHero
        badge="Events"
        title="Community Events"
        subtitle="Join us for workshops, celebrations, support groups, and more. Everyone is welcome."
      />

      {/* Filters */}
      <section className="py-8 bg-muted/30 sticky top-16 md:top-20 z-40">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
            {dynamicCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Upcoming Events
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <LGBTLoading
                message="Loading events..."
                size="lg"
                variant="stars"
              />
            </div>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              No upcoming events in this category. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden card-hover"
                >
                  {/* Event image */}
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[event.category] || "bg-muted text-muted-foreground"}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: event.description }} />

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate(`/events/${event.slug}`)}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-padding mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Past Events
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl p-4 border border-border opacity-75"
                >
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${categoryColors[event.category] || "bg-muted text-muted-foreground"}`}>
                    {event.category}
                  </span>
                  <h3 className="font-medium text-foreground mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default Events;
