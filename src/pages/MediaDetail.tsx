import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Eye,
  Clock,
  User,
  Film,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Media } from "@/types/media";

const typeIcons: Record<string, React.ReactNode> = {
  "short-film": <Film className="w-4 h-4" />,
  "educational": <BookOpen className="w-4 h-4" />,
  "content": <Sparkles className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  "short-film": "bg-warm text-warm-foreground",
  "educational": "bg-safe text-safe-foreground",
  "content": "bg-hope text-hope-foreground",
};

const MediaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: media, isLoading } = useQuery({
    queryKey: ['media', slug],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/media/slug/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch media');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">Loading media...</div>
        </div>
      </MainLayout>
    );
  }

  if (!media) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Media Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The media you're looking for doesn't exist.
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
      description: "Media link has been copied to your clipboard.",
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(media.title);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

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

            <Badge variant="secondary" className="mb-4 capitalize">
              {media.type === "short-film" ? "Short Film" : media.type === "educational" ? "Educational" : "Content"}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {media.title}
            </h1>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{media.creator}</p>
                  <p className="text-sm text-muted-foreground">Creator</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{formatViews(media.views)}</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{media.duration}</p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  {typeIcons[media.type]}
                </div>
                <div>
                  <p className="font-medium text-foreground capitalize">
                    {media.type.replace("-", " ")}
                  </p>
                  <p className="text-sm text-muted-foreground">Type</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Content */}
      <article className="py-12 md:py-16 bg-background">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Video Player */}
              {media.videoUrl && (
                <div className="mb-8">
                  <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                    <video
                      controls
                      poster={media.thumbnailUrl ? `${import.meta.env.VITE_API_BASE_URL}${media.thumbnailUrl}` : undefined}
                      className="w-full h-full"
                      preload="metadata"
                    >
                      <source src={`${import.meta.env.VITE_API_BASE_URL}${media.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

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
                <p className="text-lg leading-relaxed">{media.description}</p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-8">
              {/* Share */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Media
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

              {/* Media Details */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4">
                  Media Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm">{media.creator}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="text-sm">{formatViews(media.views)} views</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">{media.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                      {typeIcons[media.type]}
                    </div>
                    <Badge variant="secondary" className={`capitalize ${typeColors[media.type] || "bg-muted text-muted-foreground"}`}>
                      {media.type.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Published on {formatDate(media.createdAt)}
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
            Explore More Content
          </h2>
          <p className="text-muted-foreground mb-6">
            Discover inspiring short films, educational content, and community-driven ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/media">View All Media</Link>
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

export default MediaDetail;