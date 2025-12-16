import { useState } from "react";
import { Eye, Edit, Trash2, Plus, Star } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Media } from "@/types/media";

interface MediaTableProps {
  onView: (media: Media) => void;
  onEdit: (media: Media) => void;
  onAdd: () => void;
  onDelete: (media: Media) => void;
}

const MediaTable = ({ onView, onEdit, onAdd, onDelete }: MediaTableProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: media, isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/media`);
      if (!response.ok) throw new Error('Failed to fetch media');
      return response.json();
    },
  });

  const deleteMediaMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/media/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete media');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast({ title: "Success", description: "Media deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete media", variant: "destructive" });
    },
  });

  const handleDeleteConfirm = (media: Media) => {
    deleteMediaMutation.mutate(media._id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading media...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Media Content</CardTitle>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Media
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {media?.media?.map((item: Media) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium max-w-xs">
                  <div className="truncate" title={item.title}>
                    {item.title}
                  </div>
                </TableCell>
                <TableCell>{item.creator}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {item.type.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.featured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={item.published ? "default" : "secondary"}>
                    {item.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(item)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {media?.media?.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No media found. Create your first media content!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaTable;