import { useState } from "react";
import { Eye, Edit, Trash2, Plus, ThumbsUp } from "lucide-react";
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
import { Idea } from "@/types/idea";

interface IdeasTableProps {
  onView: (idea: Idea) => void;
  onEdit: (idea: Idea) => void;
  onAdd: () => void;
  onDelete: (idea: Idea) => void;
}

const IdeasTable = ({ onView, onEdit, onAdd, onDelete }: IdeasTableProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: ideas, isLoading } = useQuery({
    queryKey: ['ideas'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ideas`);
      if (!response.ok) throw new Error('Failed to fetch ideas');
      return response.json();
    },
  });

  const likeIdeaMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ideas/${id}/like`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to like idea');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to like idea", variant: "destructive" });
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading ideas...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Community Ideas</CardTitle>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Idea
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideas?.ideas?.map((idea: Idea) => (
              <TableRow key={idea._id}>
                <TableCell className="font-medium max-w-xs">
                  <div className="truncate" title={idea.title}>
                    {idea.title}
                  </div>
                </TableCell>
                <TableCell>{idea.author}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {idea.category.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {idea.status.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {idea.likes}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={idea.published ? "default" : "secondary"}>
                    {idea.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(idea)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(idea)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(idea)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {ideas?.ideas?.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No ideas found. Create your first community idea!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IdeasTable;