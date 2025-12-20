import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Story {
  _id: string;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  isFeatured: boolean;
  readTime: string;
  author: string;
  publishedDate: string;
  category: string;
  type?: string;
}

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch current story
  const { data: story, isLoading } = useQuery({
    queryKey: ['story', id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/story/${id}`);
      if (!response.ok) throw new Error('Failed to fetch story');
      return response.json() as Promise<Story>;
    },
    enabled: !!id,
  });

  // Fetch all stories for related stories
  const { data: storiesData } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/story`);
      if (!response.ok) throw new Error('Failed to fetch stories');
      return response.json();
    },
  });

  const stories = storiesData?.stories || [];

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading story...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!story) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Story Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The story you're looking for doesn't exist.
          </p>
          <Button asChild variant="hero">
            <Link to="/stories">Back to Stories</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const relatedStories = story ? stories
    .filter((s: Story) => s._id !== story._id && s.category === story.category)
    .slice(0, 3) : [];

  const categoryColors: Record<string, string> = {
    personal: "bg-warm text-warm-foreground",
    community: "bg-safe text-safe-foreground",
    resources: "bg-hope text-hope-foreground",
    allies: "bg-primary/10 text-primary",
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Story link has been copied to your clipboard.",
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(story.title);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 relative overflow-hidden">
        {story.image ? (
          <div className="absolute inset-0">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${story.image}`}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        )}
        <div className="relative container-padding mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/stories")}
              className="mb-6 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stories
            </Button>

            <Badge variant="secondary" className={`mb-4 capitalize ${categoryColors[story.category] || "bg-muted text-muted-foreground"}`}>
              {story.type || story.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {story.title}
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
              {story.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">{story.author}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(story.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {story.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
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
              {story.content ? (
                <div dangerouslySetInnerHTML={{ __html: story.content }} />
              ) : (
                <p className="text-muted-foreground">No content available for this story.</p>
              )}
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-6">
              {/* Share */}
              <motion.div
                className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Share Story
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help spread awareness by sharing this story
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="rounded-xl hover:bg-primary/10 hover:border-primary/20 transition-colors"
                    aria-label="Copy link"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container-padding mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Related Stories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover more stories that might interest you
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedStories.map((relatedStory: Story, index: number) => (
                <motion.div
                  key={relatedStory._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/stories/${relatedStory._id}`}
                    className="group block h-full"
                  >
                    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-medium transition-all duration-300 h-full hover:-translate-y-1">
                      {relatedStory.image && (
                        <div className="h-40 overflow-hidden">
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${relatedStory.image}`}
                            alt={relatedStory.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <Badge
                          variant="secondary"
                          className={`mb-3 capitalize ${categoryColors[relatedStory.category] || "bg-muted text-muted-foreground"}`}
                        >
                          {relatedStory.type || relatedStory.category}
                        </Badge>
                        <h3 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {relatedStory.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {relatedStory.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {relatedStory.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(relatedStory.publishedDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Share Your Story
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Your story could inspire and help others. We'd love to hear from you.
            </p>
            <Button asChild variant="hero" size="lg" className="px-8">
              <Link to="/contact">Submit Your Story</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default StoryDetail;