import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, Calendar, Clock, ArrowRight, User } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch blogs
  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return response.json();
    },
  });

  // Fetch blog categories
  const { data: categoriesData } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    },
  });

  const blogPosts = blogsData?.blogs || [];
  const blogCategories = [
    { id: "all", label: "All Posts" },
    ...(categoriesData?.map((cat: string) => ({ id: cat, label: cat.replace("-", " ") })) || [])
  ];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        activeCategory === "all" || post.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <MainLayout>
      <PageHero
        title="Blog & News"
        subtitle="Stay informed with the latest news, educational content, and community updates"
        badge="Stay Connected"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-base rounded-xl border-border/50 focus:border-primary"
                aria-label="Search blog posts"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                  aria-pressed={activeCategory === category.id}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-center text-muted-foreground mb-8">
            Showing {filteredPosts.length} article
            {filteredPosts.length !== 1 ? "s" : ""}
          </p>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No articles found matching your search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-8">
                    Featured Articles
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <Link to={`/blog/${post.slug}`}>
                           <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-medium transition-all duration-300 h-full flex flex-col">
                             {/* Featured Image or Gradient Header */}
                             <div className="h-32 relative overflow-hidden">
                               {post.featuredImage ? (
                                 <img
                                   src={`${import.meta.env.VITE_API_BASE_URL}${post.featuredImage}`}
                                   alt={post.title}
                                   className="w-full h-full object-cover"
                                 />
                               ) : (
                                 <div className="h-32 pride-gradient opacity-80"></div>
                               )}
                               <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">
                                 Featured
                               </Badge>
                             </div>

                            <div className="p-6 flex flex-col flex-grow">
                              <Badge
                                variant="secondary"
                                className="w-fit mb-3 capitalize"
                              >
                                {post.category.replace("-", " ")}
                              </Badge>

                              <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>

                              <div className="text-muted-foreground mb-4 line-clamp-3 flex-grow prose max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                              </div>

                              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  <span>{post.authorName}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.publishedDate).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              {regularPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-8">
                    {featuredPosts.length > 0 ? "More Articles" : "All Articles"}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {regularPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <Link to={`/blog/${post.slug}`}>
                          <div className="bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-soft transition-all duration-300 flex flex-col h-full">
                            {post.featuredImage && (
                              <img
                                src={`${import.meta.env.VITE_API_BASE_URL}${post.featuredImage}`}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                              />
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <Badge
                                  variant="secondary"
                                  className="capitalize shrink-0"
                                >
                                  {post.category.replace("-", " ")}
                                </Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {post.readTime}
                                </span>
                              </div>

                              <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>

                              <div className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow prose max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                              </div>

                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  {post.authorName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(post.publishedDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Want to Share Your Story?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for community voices. If you have a story,
              insight, or experience to share, we'd love to hear from you.
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">
                Submit Your Story <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;
