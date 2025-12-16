import { useState } from "react";
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

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddMediaModal = ({ isOpen, onClose, onSuccess }: AddMediaModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    duration: "",
    creator: "",
    featured: false,
    published: false,
    category: "",
    videoFile: null as File | null,
    thumbnailFile: null as File | null,
  });

  const createMediaMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const formDataToSend = new FormData();

      // Append text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'videoFile' && key !== 'thumbnailFile' && value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });

      // Append files
      if (data.videoFile) {
        formDataToSend.append('videoFile', data.videoFile);
      }
      if (data.thumbnailFile) {
        formDataToSend.append('thumbnailFile', data.thumbnailFile);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/media`, {
        method: 'POST',
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to create media');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast({ title: "Success", description: "Media created successfully" });
      handleClose();
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create media",
        variant: "destructive"
      });
    },
  });

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      type: "",
      duration: "",
      creator: "",
      featured: false,
      published: false,
      category: "",
      videoFile: null,
      thumbnailFile: null,
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMediaMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Media</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                placeholder="e.g., short-film, educational, content"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the media content"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 5:30"
                required
              />
            </div>
            <div>
              <Label htmlFor="creator">Creator *</Label>
              <Input
                id="creator"
                value={formData.creator}
                onChange={(e) => handleInputChange('creator', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="Optional category"
              />
            </div>
            <div>
              <Label htmlFor="videoFile">Video File</Label>
              <Input
                id="videoFile"
                type="file"
                accept="video/*"
                onChange={(e) => handleInputChange('videoFile', e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="thumbnailFile">Thumbnail File</Label>
            <Input
              id="thumbnailFile"
              type="file"
              accept="image/*"
              onChange={(e) => handleInputChange('thumbnailFile', e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => handleInputChange('published', checked)}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMediaMutation.isPending}>
              {createMediaMutation.isPending ? "Creating..." : "Create Media"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMediaModal;