import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types/blog";
import CKEditorComponent from "@/components/ui/CKEditorComponent";

interface Section {
  sectionTitle: string;
  sectionContent: string;
  sectionImage?: string | File;
}

interface EditBlogModalProps {
  blog: Blog | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditBlogModal = ({ blog, isOpen, onClose, onSuccess }: EditBlogModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    isFeatured: false,
    tags: "",
    readTime: "",
    authorName: "",
    authorBio: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
    seoKeywords: "",
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  const updateBlogMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog/${blog?._id}`, {
        method: 'PUT',
        body: data,
      });
      if (!response.ok) throw new Error('Failed to update blog');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({ title: "Success", description: "Blog post updated successfully" });
      handleClose();
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post",
        variant: "destructive"
      });
    },
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        isFeatured: blog.isFeatured,
        tags: blog.tags.join(', '),
        readTime: blog.readTime,
        authorName: blog.authorName,
        authorBio: blog.authorBio || "",
        category: blog.category,
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        seoKeywords: blog.seoKeywords || "",
      });
      setSections(blog.sections || []);
      setFeaturedImage(null);
    }
  }, [blog]);

  const handleClose = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      isFeatured: false,
      tags: "",
      readTime: "",
      authorName: "",
      authorBio: "",
      category: "",
      metaTitle: "",
      metaDescription: "",
      seoKeywords: "",
    });
    setFeaturedImage(null);
    setSections([]);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSection = () => {
    setSections(prev => [...prev, { sectionTitle: "", sectionContent: "" }]);
  };

  const updateSection = (index: number, field: keyof Section, value: string | File) => {
    setSections(prev => prev.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    ));
  };

  const removeSection = (index: number) => {
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();

    // Add basic form data
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString());
    });

    // Add featured image
    if (featuredImage) {
      submitData.append('featuredImage', featuredImage);
    } else if (blog?.featuredImage && featuredImage === null) {
      // Special case: remove existing featured image
      submitData.append('removeFeaturedImage', 'true');
    }

    // Prepare sections data without File objects
    const sectionsData = sections.map(section => ({
      ...section,
      sectionImage: typeof section.sectionImage === 'string' ? section.sectionImage : null
    }));

    // Add sections as JSON
    submitData.append('sections', JSON.stringify(sectionsData));

    // Add section images
    sections.forEach((section) => {
      if (section.sectionImage instanceof File) {
        submitData.append('sectionImages', section.sectionImage);
      }
    });

    updateBlogMutation.mutate(submitData);
  };

  if (!blog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., education, mental-health"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <CKEditorComponent
                  value={formData.excerpt}
                  onChange={(value) => handleInputChange('excerpt', value)}
                  placeholder="Brief summary of the blog post"
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <CKEditorComponent
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  placeholder="Main content of the blog post"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="readTime">Read Time *</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange('readTime', e.target.value)}
                    placeholder="e.g., 5 min read"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="Comma-separated tags"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                />
                <Label htmlFor="isFeatured">Featured Post</Label>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="featuredImage">Featured Image</Label>
                  {blog?.featuredImage && !featuredImage && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // To remove featured image, we need to send an empty string or null
                        // But since FormData doesn't handle null well, we'll handle this in backend
                        setFeaturedImage(null);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove Image
                    </Button>
                  )}
                </div>
                <Input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to keep current image, or select a new file to replace it
                </p>
                {blog?.featuredImage && !featuredImage && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Current image: {blog.featuredImage.split('/').pop()}
                    </p>
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${blog.featuredImage}`}
                      alt="Current featured image"
                      className="w-32 h-20 object-cover rounded border"
                    />
                  </div>
                )}
                {featuredImage && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      New image: {featuredImage.name}
                    </p>
                    <img
                      src={URL.createObjectURL(featuredImage)}
                      alt="New featured image"
                      className="w-32 h-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
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
                  <Label htmlFor="authorName">Author Name *</Label>
                  <Input
                    id="authorName"
                    value={formData.authorName}
                    onChange={(e) => handleInputChange('authorName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="authorBio">Author Bio</Label>
                  <Input
                    id="authorBio"
                    value={formData.authorBio}
                    onChange={(e) => handleInputChange('authorBio', e.target.value)}
                    placeholder="Brief bio of the author"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Sections */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Sections</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addSection}>
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.map((section, index) => (
                <Card key={index} className="border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm">Section {index + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSection(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={section.sectionTitle}
                        onChange={(e) => updateSection(index, 'sectionTitle', e.target.value)}
                        placeholder="Section title"
                      />
                    </div>
                    <div>
                      <Label>Section Content</Label>
                      <CKEditorComponent
                        value={section.sectionContent}
                        onChange={(value) => updateSection(index, 'sectionContent', value)}
                        placeholder="Section content"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <Label>Section Image</Label>
                        {(typeof section.sectionImage === 'string' && section.sectionImage) || section.sectionImage instanceof File ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => updateSection(index, 'sectionImage', '')}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove Image
                          </Button>
                        ) : null}
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateSection(index, 'sectionImage', e.target.files?.[0] || '')}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave empty to keep current image, or select a new file to replace it
                      </p>
                      {typeof section.sectionImage === 'string' && section.sectionImage && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground mb-2">
                            Current image: {section.sectionImage.split('/').pop()}
                          </p>
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${section.sectionImage}`}
                            alt="Current section image"
                            className="w-32 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                      {section.sectionImage instanceof File && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground mb-2">
                            New image: {section.sectionImage.name}
                          </p>
                          <img
                            src={URL.createObjectURL(section.sectionImage)}
                            alt="New section image"
                            className="w-32 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {sections.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No sections added yet. Click "Add Section" to create structured content.
                </p>
              )}
            </CardContent>
          </Card>

          {/* SEO Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SEO Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  placeholder="SEO title for search engines"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="SEO description for search engines"
                />
              </div>
              <div>
                <Label htmlFor="seoKeywords">SEO Keywords</Label>
                <Input
                  id="seoKeywords"
                  value={formData.seoKeywords}
                  onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                  placeholder="Comma-separated keywords"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateBlogMutation.isPending}>
              {updateBlogMutation.isPending ? "Updating..." : "Update Blog Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogModal;