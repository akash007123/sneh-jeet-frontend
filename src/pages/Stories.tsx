import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, User, Tag, ArrowRight } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { stories } from "@/data/mockData";

const categories = [
  { id: "all", label: "All Stories" },
  { id: "personal", label: "Personal" },
  { id: "community", label: "Community" },
  { id: "resources", label: "Resources" },
  { id: "allies", label: "Allies" },
];

const categoryColors: Record<string, string> = {
  personal: "bg-warm text-warm-foreground",
  community: "bg-safe text-safe-foreground",
  resources: "bg-hope text-hope-foreground",
  allies: "bg-primary/10 text-primary",
};

const Stories = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredStories = activeCategory === "all"
    ? stories
    : stories.filter(story => story.category === activeCategory);

  const featuredStories = filteredStories.filter(s => s.featured);
  const otherStories = filteredStories.filter(s => !s.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <MainLayout>
      <PageHero
        badge="Stories"
        title="Community Voices"
        subtitle="Real stories of courage, resilience, and hope from our community members."
      />

      {/* Category Filters */}
      <section className="py-8 bg-muted/30 sticky top-16 md:top-20 z-40">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
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

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-padding mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Featured Stories
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredStories.map((story, index) => (
                <motion.article
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden card-hover"
                >
                  {/* Image placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-warm via-safe to-hope" />

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[story.category] || "bg-muted text-muted-foreground"}`}>
                        {story.category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {story.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {story.title}
                    </h3>

                    <p className="text-muted-foreground mb-4">
                      {story.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {story.author}
                        <span>•</span>
                        {formatDate(story.date)}
                      </div>

                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Stories */}
      <section className="section-padding bg-muted/30">
        <div className="container-padding mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            All Stories
          </h2>

          {otherStories.length === 0 && featuredStories.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              No stories found in this category.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStories.map((story, index) => (
                <motion.article
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl p-5 border border-border card-hover"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[story.category] || "bg-muted text-muted-foreground"}`}>
                      {story.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {story.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {story.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{story.author}</span>
                    <span>•</span>
                    <span>{formatDate(story.date)}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Share Your Story
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your story could inspire and help others. We'd love to hear from you.
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">Submit Your Story</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Stories;
