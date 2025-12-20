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
import { useAuth } from "@/contexts/AuthContext";
import {formatDate} from '../../utils/formatDate';

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

interface StoryTableProps {
  onView: (story: Story) => void;
  onEdit: (story: Story) => void;
  onAdd: () => void;
  onDelete: (story: Story) => void;
}

const StoryTable = ({ onView, onEdit, onAdd, onDelete }: StoryTableProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/story`
      );
      if (!response.ok) throw new Error("Failed to fetch stories");
      return response.json();
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/story/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete story");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      toast({ title: "Success", description: "Story deleted successfully" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete story",
        variant: "destructive",
      });
    },
  });


  if (isLoading) {
    return <div className="text-center py-8">Loading stories...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Stories</CardTitle>
        {user && user.role === "Admin" && (
          <Button onClick={onAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Story
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stories?.stories?.map((story: Story) => (
              <TableRow key={story._id}>
                <TableCell className="font-medium max-w-xs">
                  <div className="truncate" title={story.title}>
                    {story.title}
                  </div>
                </TableCell>
                <TableCell>{story.author}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {story.type || story.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  {story.isFeatured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </TableCell>
                <TableCell>{formatDate(story.publishedDate)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(story)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    {user && user.role === "Admin" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(story)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(story)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {stories?.stories?.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No stories found. Create your first story!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoryTable;