import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Lightbulb,
  User,
  Calendar,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Idea } from "@/types/idea";
import LGBTLoading from "@/components/ui/LGBTLoading";

const statusColors: Record<string, string> = {
  "open": "bg-safe/20 text-safe border-safe/30",
  "in-progress": "bg-warm/20 text-warm border-warm/30",
  "planned": "bg-hope/20 text-hope border-hope/30",
};

const statusIcons: Record<string, React.ReactNode> = {
  "open": <Lightbulb className="w-4 h-4" />,
  "in-progress": <TrendingUp className="w-4 h-4" />,
  "planned": <Calendar className="w-4 h-4" />,
};

const IdeaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: idea, isLoading } = useQuery({
    queryKey: ['idea', slug],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ideas/slug/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch idea');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <LGBTLoading
            message="Loading idea..."
            size="lg"
            variant="rainbow"
          />
        </div>
      </MainLayout>
    );
  }

  if (!idea) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Idea Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The idea you're looking for doesn't exist.
          </p>
          <Button asChild variant="hero">
            <Link to="/media">Back to Media Hub</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Idea link has been copied to your clipboard.",
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(idea.title);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
              onClick={() => navigate("/media")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Media Hub
            </Button>

            {/* Idea Image */}
            {idea.imageUrl && (
              <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${idea.imageUrl}`}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="capitalize">
                {idea.category || "General"}
              </Badge>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[idea.status]}`}>
                {statusIcons[idea.status]}
                <span className="ml-1">
                  {idea.status === "in-progress" ? "In Progress" : idea.status === "open" ? "Open" : "Planned"}
                </span>
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {idea.title}
            </h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{idea.author}</p>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThumbsUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{idea.likes}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{formatDate(idea.createdAt)}</p>
                  <p className="text-sm text-muted-foreground">Created</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Idea Content */}
      <article className="py-12 md:py-16 bg-background">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Description */}
              <div className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              >
                <p className="text-lg leading-relaxed">{idea.description}</p>
              </div>

              {/* Engagement Section */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Like ({idea.likes})
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Comment
                    </Button>
                  </div>
                  <Button variant="pride">
                    Support This Idea
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-8">
              {/* Share */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Idea
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

              {/* Idea Details */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4">
                  Idea Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm">{idea.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ThumbsUp className="w-4 h-4 text-primary" />
                    <span className="text-sm">{idea.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <Badge variant="secondary" className={`capitalize ${statusColors[idea.status]}`}>
                      {idea.status.replace("-", " ")}
                    </Badge>
                  </div>
                  {idea.category && (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Lightbulb className="w-3 h-3" />
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {idea.category}
                      </Badge>
                    </div>
                  )}
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Created on {formatDate(idea.createdAt)}
                    </p>
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
            Have an Idea to Share?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join our community and contribute your ideas for positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/media">View All Ideas</Link>
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

export default IdeaDetail;