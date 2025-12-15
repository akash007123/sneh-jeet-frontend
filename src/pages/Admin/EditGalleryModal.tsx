import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

interface EditGalleryModalProps {
  galleryItem: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditGalleryModal = ({ galleryItem, isOpen, onClose, onSuccess }: EditGalleryModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (galleryItem) {
      setFormData({
        title: galleryItem.title,
        category: galleryItem.category,
        description: galleryItem.description || "",
      });
      setSelectedFile(null);
    }
  }, [galleryItem]);

  const updateGalleryMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/${galleryItem?._id}`, {
        method: 'PUT',
        body: data,
      });
      if (!response.ok) throw new Error('Failed to update gallery item');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast({ title: "Success", description: "Gallery item updated successfully" });
      handleClose();
      onSuccess();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update gallery item", variant: "destructive" });
    },
  });

  const handleClose = () => {
    setFormData({ title: "", category: "", description: "" });
    setSelectedFile(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      toast({ title: "Error", description: "Title and category are required", variant: "destructive" });
      return;
    }

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('category', formData.category);
    if (formData.description) submitData.append('description', formData.description);
    if (selectedFile) submitData.append('image', selectedFile);

    updateGalleryMutation.mutate(submitData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!galleryItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Gallery Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pride">Pride</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="workshops">Workshops</SelectItem>
                <SelectItem value="celebrations">Celebrations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter description (optional)"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image">New Image (optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            {galleryItem.imageUrl && (
              <p className="text-sm text-muted-foreground mt-1">
                Current image will be replaced if you select a new one
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateGalleryMutation.isPending}>
              {updateGalleryMutation.isPending ? "Updating..." : "Update Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGalleryModal;