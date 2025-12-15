import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
  Tag,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch current blog post
  const { data: articleData, isLoading: articleLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog/slug/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json();
    },
    enabled: !!slug,
  });

  // Fetch all blogs for related posts
  const { data: blogsData } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return response.json();
    },
  });

  const article = articleData;
  const blogPosts = blogsData?.blogs || [];

  // Update SEO meta tags
  useEffect(() => {
    if (article) {
      // Update document title
      document.title = article.metaTitle || `${article.title} | PrideConnect`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.metaDescription || article.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = article.metaDescription || article.excerpt;
        document.head.appendChild(meta);
      }

      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', article.seoKeywords || article.tags.join(', '));
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = article.seoKeywords || article.tags.join(', ');
        document.head.appendChild(meta);
      }

      // Update Open Graph tags
      const updateMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      updateMetaTag('og:title', article.metaTitle || article.title);
      updateMetaTag('og:description', article.metaDescription || article.excerpt);
      updateMetaTag('og:type', 'article');
      updateMetaTag('og:url', window.location.href);
      if (article.featuredImage) {
        updateMetaTag('og:image', `${import.meta.env.VITE_API_BASE_URL}${article.featuredImage}`);
      }
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'PrideConnect - Supporting LGBTQIA+ Community';
    };
  }, [article]);

  if (articleLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Button asChild variant="hero">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const relatedPosts = article ? blogPosts
    .filter(
      (post) => post.slug !== article.slug && post.category === article.category
    )
    .slice(0, 3) : [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Article link has been copied to your clipboard.",
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title);

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
              onClick={() => navigate("/blog")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            <Badge variant="secondary" className="mb-4 capitalize">
              {article.category.replace("-", " ")}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {article.excerpt}
            </p>

            {article.featuredImage && (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${article.featuredImage}`}
                alt={article.title}
                className="w-full max-w-2xl mx-auto rounded-lg mb-6"
              />
            )}

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{article.author}</p>
                  <p className="text-sm">{article.authorBio}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
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
              {/* Main content */}
              {article.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index}>{paragraph.replace("## ", "")}</h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index}>{paragraph.replace("### ", "")}</h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").filter((item) => item.startsWith("- "));
                  return (
                    <ul key={index}>
                      {items.map((item, i) => (
                        <li key={i}>{item.replace("- ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}

              {/* Dynamic sections */}
              {article.sections && article.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mt-8">
                  {section.sectionImage && (
                    <div className="mb-6">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${section.sectionImage}`}
                        alt={section.sectionTitle}
                        className="w-full max-w-2xl mx-auto rounded-lg"
                      />
                      <div className="text-sm text-muted-foreground mt-2 text-center">
                        By {article.author} on {new Date(article.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  )}
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                    {section.sectionTitle}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {section.sectionContent.split("\n\n").map((paragraph, index) => {
                      if (paragraph.startsWith("### ")) {
                        return (
                          <h3 key={index}>{paragraph.replace("### ", "")}</h3>
                        );
                      }
                      if (paragraph.startsWith("- ")) {
                        const items = paragraph.split("\n").filter((item) => item.startsWith("- "));
                        return (
                          <ul key={index}>
                            {items.map((item, i) => (
                              <li key={i}>{item.replace("- ", "")}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={index}>{paragraph}</p>;
                    })}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-8">
              {/* Share */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Article
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

              {/* Tags */}
              <div>
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container-padding mx-auto max-w-7xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-xl border border-border/50 p-6 hover:shadow-soft transition-all duration-300 h-full">
                    <Badge
                      variant="secondary"
                      className="mb-3 capitalize"
                    >
                      {post.category.replace("-", " ")}
                    </Badge>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter to receive the latest articles and community news.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Subscribe Now</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default BlogArticle;
