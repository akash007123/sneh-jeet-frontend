import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Eye, ThumbsUp, Lightbulb, Film, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mediaContent, creativeIdeas, mediaCategories, ideaCategories } from "@/data/mockData";

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

const statusColors: Record<string, string> = {
  "open": "bg-safe/20 text-safe border-safe/30",
  "in-progress": "bg-warm/20 text-warm border-warm/30",
  "planned": "bg-hope/20 text-hope border-hope/30",
};

const gradientColors = [
  "from-pride-red to-pride-orange",
  "from-pride-orange to-pride-yellow",
  "from-pride-yellow to-pride-green",
  "from-pride-green to-pride-blue",
  "from-pride-blue to-pride-purple",
  "from-pride-purple to-pride-pink",
  "from-warm to-safe",
  "from-safe to-hope",
];

const MediaHub = () => {
  const [activeMediaCategory, setActiveMediaCategory] = useState("all");
  const [activeIdeaCategory, setActiveIdeaCategory] = useState("all");

  const filteredMedia = activeMediaCategory === "all"
    ? mediaContent
    : mediaContent.filter(item => item.type === activeMediaCategory);

  const filteredIdeas = activeIdeaCategory === "all"
    ? creativeIdeas
    : creativeIdeas.filter(idea => idea.category === activeIdeaCategory);

  const featuredMedia = mediaContent.filter(m => m.featured);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <MainLayout>
      <PageHero
        badge="Media Hub"
        title="Films, Content & Ideas"
        subtitle="Explore inspiring short films, educational content, and community-driven ideas that celebrate and support our community."
      />

      <Tabs defaultValue="media" className="w-full">
        {/* Tab Navigation */}
        <section className="py-6 bg-muted/30 sticky top-16 md:top-20 z-40">
          <div className="container-padding mx-auto max-w-7xl">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 h-12">
              <TabsTrigger value="media" className="text-base">
                <Film className="w-4 h-4 mr-2" />
                Media & Films
              </TabsTrigger>
              <TabsTrigger value="ideas" className="text-base">
                <Lightbulb className="w-4 h-4 mr-2" />
                Ideas
              </TabsTrigger>
            </TabsList>
          </div>
        </section>

        {/* Media Tab Content */}
        <TabsContent value="media" className="mt-0">
          {/* Featured Videos */}
          <section className="section-padding bg-background">
            <div className="container-padding mx-auto max-w-7xl">
              <SectionHeading
                badge="Featured"
                title="Must Watch"
                subtitle="Our most impactful and popular content"
                align="left"
              />

              <div className="grid md:grid-cols-3 gap-6">
                {featuredMedia.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index % gradientColors.length]}`} />
                      <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-foreground/80 text-background text-xs font-medium">
                        {item.duration}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeColors[item.type]}`}>
                        {typeIcons[item.type]}
                        {item.type === "short-film" ? "Short Film" : item.type === "educational" ? "Educational" : "Content"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {formatViews(item.views)}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Category Filters */}
          <section className="py-6 bg-muted/30">
            <div className="container-padding mx-auto max-w-7xl">
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {mediaCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveMediaCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeMediaCategory === category.id
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

          {/* All Media Grid */}
          <section className="section-padding bg-background">
            <div className="container-padding mx-auto max-w-7xl">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMedia.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer bg-card rounded-xl border border-border overflow-hidden card-hover"
                  >
                    <div className="relative aspect-video">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index % gradientColors.length]}`} />
                      <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-primary ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-foreground/80 text-background text-xs font-medium">
                        {item.duration}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[item.type]}`}>
                          {typeIcons[item.type]}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          {formatViews(item.views)}
                        </span>
                      </div>

                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {item.title}
                      </h4>

                      <p className="text-xs text-muted-foreground">
                        By {item.creator}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Ideas Tab Content */}
        <TabsContent value="ideas" className="mt-0">
          {/* Ideas Header */}
          <section className="section-padding bg-background">
            <div className="container-padding mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Lightbulb className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Community Ideas Board
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    Share your ideas for community projects, initiatives, and improvements. Vote on ideas you love and help bring them to life.
                  </p>
                  <Button variant="pride">
                    Submit Your Idea
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>

              {/* Idea Category Filters */}
              <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
                {ideaCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveIdeaCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeIdeaCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground border border-border"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Ideas Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIdeas.map((idea, index) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl border border-border p-6 card-hover"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColors[index % gradientColors.length]} flex items-center justify-center`}>
                        <Lightbulb className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[idea.status]}`}>
                        {idea.status === "in-progress" ? "In Progress" : idea.status === "open" ? "Open" : "Planned"}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {idea.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {idea.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        By {idea.author}
                      </span>
                      <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {idea.likes}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Submit Content CTA */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-safe/5 to-hope/5">
        <div className="container-padding mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Have a Story to Share?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We're always looking for new voices and perspectives. Submit your short film, educational content, or creative idea.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="pride" size="lg">
                <Film className="w-5 h-5 mr-2" />
                Submit Content
              </Button>
              <Button variant="outline" size="lg">
                <Lightbulb className="w-5 h-5 mr-2" />
                Share an Idea
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default MediaHub;
