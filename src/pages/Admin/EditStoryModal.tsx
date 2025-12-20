import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CKEditorComponent from "@/components/ui/CKEditorComponent";

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

interface EditStoryModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditStoryModal = ({ story, isOpen, onClose, onSuccess }: EditStoryModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    isFeatured: false,
    readTime: "",
    author: "",
    category: "",
    type: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const updateStoryMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/story/${story?._id}`, {
        method: 'PUT',
        body: data,
      });
      if (!response.ok) throw new Error('Failed to update story');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      toast({ title: "Success", description: "Story updated successfully" });
      handleClose();
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update story",
        variant: "destructive"
      });
    },
  });

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title,
        excerpt: story.excerpt,
        content: story.content || "",
        isFeatured: story.isFeatured,
        readTime: story.readTime,
        author: story.author,
        category: story.category,
        type: story.type || "",
      });
      setImage(null);
    }
  }, [story]);

  const handleClose = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      isFeatured: false,
      readTime: "",
      author: "",
      category: "",
      type: "",
    });
    setImage(null);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();

    // Add basic form data
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString());
    });

    // Add image
    if (image) {
      submitData.append('image', image);
    }

    updateStoryMutation.mutate(submitData);
  };

  if (!story) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Story</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Story Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief summary of the story"
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <CKEditorComponent
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  placeholder="Full story content (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="resources">Resources</SelectItem>
                      <SelectItem value="allies">Allies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Custom Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    placeholder="e.g., Personal Journey, Health Guide"
                  />
                </div>
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
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                />
                <Label htmlFor="isFeatured">Featured Story</Label>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="image">Story Image</Label>
                  {story?.image && !image && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // To remove image, we can handle this in backend
                        setImage(null);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove Image
                    </Button>
                  )}
                </div>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to keep current image, or select a new file to replace it
                </p>
                {story?.image && !image && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Current image: {story.image.split('/').pop()}
                    </p>
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${story.image}`}
                      alt="Current story image"
                      className="w-32 h-20 object-cover rounded border"
                    />
                  </div>
                )}
                {image && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      New image: {image.name}
                    </p>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="New story image"
                      className="w-32 h-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateStoryMutation.isPending}>
              {updateStoryMutation.isPending ? "Updating..." : "Update Story"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStoryModal;