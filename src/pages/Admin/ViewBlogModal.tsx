import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Section {
  sectionTitle: string;
  sectionContent: string;
  sectionImage?: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  isFeatured: boolean;
  tags: string[];
  readTime: string;
  authorName: string;
  authorBio?: string;
  publishedDate: string;
  category: string;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  sections: Section[];
}

interface ViewBlogModalProps {
  blog: Blog | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewBlogModal = ({ blog, isOpen, onClose }: ViewBlogModalProps) => {
  if (!blog) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View Blog Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Title</h4>
                  <p className="text-foreground">{blog.title}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Category</h4>
                  <Badge variant="secondary" className="capitalize">
                    {blog.category.replace("-", " ")}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Slug</h4>
                <p className="text-foreground font-mono text-sm">{blog.slug}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Excerpt</h4>
                <p className="text-foreground">{blog.excerpt}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Content</h4>
                <div className="bg-muted p-4 rounded-md max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{blog.content}</pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Read Time</h4>
                  <p className="text-foreground">{blog.readTime}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Featured</h4>
                  <Badge variant={blog.isFeatured ? "default" : "secondary"}>
                    {blog.isFeatured ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Published</h4>
                  <p className="text-foreground text-sm">{formatDate(blog.publishedDate)}</p>
                </div>
              </div>

              {blog.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Tags</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {blog.featuredImage && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Featured Image</h4>
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${blog.featuredImage}`}
                    alt={blog.title}
                    className="w-full max-w-sm h-32 object-cover rounded-md mt-2"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Author Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Author Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Author Name</h4>
                  <p className="text-foreground">{blog.authorName}</p>
                </div>
                {blog.authorBio && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Author Bio</h4>
                    <p className="text-foreground">{blog.authorBio}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          {blog.sections && blog.sections.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sections ({blog.sections.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blog.sections.map((section, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      Section {index + 1}: {section.sectionTitle}
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Content
                        </h5>
                        <div className="bg-muted p-3 rounded-md max-h-24 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-sm">{section.sectionContent}</pre>
                        </div>
                      </div>
                      {section.sectionImage && (
                        <div>
                          <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Image
                          </h5>
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${section.sectionImage}`}
                            alt={section.sectionTitle}
                            className="w-full max-w-sm h-24 object-cover rounded-md mt-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* SEO Information */}
          {(blog.metaTitle || blog.metaDescription || blog.seoKeywords) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blog.metaTitle && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Meta Title</h4>
                    <p className="text-foreground">{blog.metaTitle}</p>
                  </div>
                )}
                {blog.metaDescription && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Meta Description</h4>
                    <p className="text-foreground">{blog.metaDescription}</p>
                  </div>
                )}
                {blog.seoKeywords && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">SEO Keywords</h4>
                    <p className="text-foreground">{blog.seoKeywords}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBlogModal;