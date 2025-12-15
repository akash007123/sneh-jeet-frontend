import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

// Generate gradient colors for placeholders
const gradientColors = [
  "from-pride-red to-pride-orange",
  "from-pride-orange to-pride-yellow",
  "from-pride-yellow to-pride-green",
  "from-pride-green to-pride-blue",
  "from-pride-blue to-pride-purple",
  "from-pride-purple to-pride-pink",
  "from-warm to-safe",
  "from-safe to-hope",
  "from-hope to-primary/30",
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([
    { id: "all", label: "All" }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const [itemsResponse, categoriesResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/categories`)
        ]);

        if (!itemsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch gallery data');
        }

        const items = await itemsResponse.json();
        const categoryList = await categoriesResponse.json();

        setGalleryItems(items);
        setCategories([
          { id: "all", label: "All" },
          ...categoryList.map((cat: string) => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const filteredImages = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(img => img.category === activeCategory);

  return (
    <MainLayout>
      <PageHero
        badge="Gallery"
        title="Community Moments"
        subtitle="Celebrating our community through shared memories and experiences."
      />

      {/* Category Filters */}
      <section className="py-8 bg-muted/30 sticky top-16 md:top-20 z-40">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="break-inside-avoid"
                >
                  <button
                    onClick={() => setSelectedImage(image._id)}
                    className="w-full group relative overflow-hidden rounded-xl"
                  >
                    {image.imageUrl ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${image.imageUrl}`}
                        alt={image.title}
                        className={`w-full object-cover aspect-[4/3] ${
                          index % 3 === 0 ? "sm:aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                        }`}
                      />
                    ) : (
                      <div
                        className={`bg-gradient-to-br ${gradientColors[index % gradientColors.length]} aspect-[4/3] ${
                          index % 3 === 0 ? "sm:aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                        }`}
                      />
                    )}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-end">
                      <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-primary-foreground font-medium text-sm">
                          {image.title}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-background/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              {(() => {
                const selectedItem = galleryItems.find(img => img._id === selectedImage);
                return selectedItem?.imageUrl ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${selectedItem.imageUrl}`}
                    alt={selectedItem.title}
                    className="w-full rounded-2xl aspect-video object-cover"
                  />
                ) : (
                  <div className={`bg-gradient-to-br ${gradientColors[0]} rounded-2xl aspect-video`} />
                );
              })()}
              <p className="text-background text-center mt-4 font-medium">
                {galleryItems.find(img => img._id === selectedImage)?.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Gallery;
