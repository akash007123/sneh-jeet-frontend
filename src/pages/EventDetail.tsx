import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Tag,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const categoryColors: Record<string, string> = {
  celebration: "bg-pride-pink/10 text-pride-pink",
  workshop: "bg-pride-blue/10 text-pride-blue",
  support: "bg-safe text-safe-foreground",
  social: "bg-warm text-warm-foreground",
  volunteer: "bg-hope text-hope-foreground",
};

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/event/slug/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch event');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">Loading event...</div>
        </div>
      </MainLayout>
    );
  }

  if (!event) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Event Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The event you're looking for doesn't exist.
          </p>
          <Button asChild variant="hero">
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Event link has been copied to your clipboard.",
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(event.title);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const isUpcoming = new Date(event.date) >= new Date();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container-padding mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/events")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>

            <Badge variant="secondary" className="mb-4 capitalize">
              {event.category.replace("-", " ")}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{formatDate(event.date)}</p>
                  <p className="text-sm text-muted-foreground">
                    {isUpcoming ? "Upcoming Event" : "Past Event"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{event.location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Content */}
      <article className="py-12 md:py-16 bg-background">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_200px] gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            >
              {event.image && (
                <div className="mb-8">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl"
                  />
                </div>
              )}
              <div className="text-lg leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: event.description }} />
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-8">
              {/* Share */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Event
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full"
                  >
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full"
                  >
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full"
                  >
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="rounded-full"
                    aria-label="Copy link"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4">
                  Event Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <Badge variant="secondary" className={`capitalize ${categoryColors[event.category] || "bg-muted text-muted-foreground"}`}>
                      {event.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Join Our Community
          </h2>
          <p className="text-muted-foreground mb-6">
            Stay connected and get involved with our upcoming events and initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/events">View All Events</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EventDetail;