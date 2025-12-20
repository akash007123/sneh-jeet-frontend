import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import LGBTLoading from "@/components/ui/LGBTLoading";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

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

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>(
    [{ id: "all", label: "All" }]
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const [itemsRes, catsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/categories`),
        ]);
        if (!itemsRes.ok || !catsRes.ok)
          throw new Error("Failed to fetch gallery");
        const items = await itemsRes.json();
        const cats = await catsRes.json();
        setGalleryItems(items);
        setCategories([
          { id: "all", label: "All" },
          ...cats.map((c: string) => ({
            id: c,
            label: c.charAt(0).toUpperCase() + c.slice(1),
          })),
        ]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryData();
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory);

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
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          {loading ? (
            <LGBTLoading
              message="Loading gallery..."
              size="lg"
              variant="hearts"
            />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={img._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="break-inside-avoid"
                >
                  <button
                    onClick={() => setSelectedImage(img._id)}
                    className="w-full group relative overflow-hidden rounded-xl"
                  >
                    {img.imageUrl ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${
                          img.imageUrl
                        }`}
                        alt={img.title}
                        className="w-full object-contain"
                      />
                    ) : (
                      <div
                        className={`bg-gradient-to-br ${
                          gradientColors[idx % gradientColors.length]
                        } aspect-[4/3]`}
                      />
                    )}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-end">
                      <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-primary-foreground font-medium text-sm">
                          {img.title}
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

      {/* Light-box Modal */}
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
              className="max-w-4xl w-full relative"
            >
              {(() => {
                const currentIndex = filteredImages.findIndex(
                  (i) => i._id === selectedImage
                );
                const item = galleryItems.find((i) => i._id === selectedImage);
                return (
                  <>
                    {/* Previous */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentIndex > 0)
                          setSelectedImage(
                            filteredImages[currentIndex - 1]._id
                          );
                      }}
                      disabled={currentIndex <= 0}
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                                 w-10 h-10 rounded-full
                                 bg-black/40 backdrop-blur
                                 flex items-center justify-center
                                 text-white shadow-lg
                                 hover:bg-black/60 transition
                                 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Next */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentIndex < filteredImages.length - 1)
                          setSelectedImage(
                            filteredImages[currentIndex + 1]._id
                          );
                      }}
                      disabled={currentIndex >= filteredImages.length - 1}
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                                 w-10 h-10 rounded-full
                                 bg-black/40 backdrop-blur
                                 flex items-center justify-center
                                 text-white shadow-lg
                                 hover:bg-black/60 transition
                                 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image */}
                    {item?.imageUrl ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${
                          item.imageUrl
                        }`}
                        alt={item.title}
                        className="w-full rounded-2xl aspect-video object-cover"
                      />
                    ) : (
                      <div
                        className={`bg-gradient-to-br ${gradientColors[0]} rounded-2xl aspect-video`}
                      />
                    )}

                    {/* Caption */}
                    <p className="text-background text-center mt-4">
                      {item?.title}
                    </p>
                    {/* <p className="text-background text-center mt-4 ">
                      <p
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    </p> */}
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
