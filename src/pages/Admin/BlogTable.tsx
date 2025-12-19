import { useState } from "react";
import { Eye, Edit, Trash2, Plus, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
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
import { Blog } from "@/types/blog";
import { useAuth } from "@/contexts/AuthContext";
import {formatDate} from "../utils/formatDate";

interface BlogTableProps {
  onView: (blog: Blog) => void;
  onEdit: (blog: Blog) => void;
  onAdd: () => void;
  onDelete: (blog: Blog) => void;
}

const BlogTable = ({ onView, onEdit, onAdd, onDelete }: BlogTableProps) => {
  const { user } = useAuth();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blog`
      );
      if (!response.ok) throw new Error("Failed to fetch blogs");
      return response.json();
    },
  });


  if (isLoading) {
    return <div className="text-center py-8">Loading blogs...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Blog Posts</CardTitle>
        {user && user.role === "Admin" && (
          <Button onClick={onAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Blog Post
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
            {blogs?.blogs?.map((blog: Blog) => (
              <TableRow key={blog._id}>
                <TableCell className="font-medium max-w-xs">
                  <div className="truncate" title={blog.title}>
                    {blog.title}
                  </div>
                </TableCell>
                <TableCell>{blog.authorName}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {blog.category.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  {blog.isFeatured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </TableCell>
                <TableCell>{formatDate(blog.publishedDate)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(blog)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    {user && user.role === "Admin" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(blog)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(blog)}
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
        {blogs?.blogs?.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No blog posts found. Create your first blog post!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogTable;
