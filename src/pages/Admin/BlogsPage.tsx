import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/layouts/AdminLayout";
import BlogTable from "./BlogTable";
import ViewBlogModal from "./ViewBlogModal";
import EditBlogModal from "./EditBlogModal";
import AddBlogModal from "./AddBlogModal";
import DeleteModal from "./DeleteModal";
import { Blog } from "@/types/blog";

const BlogsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token } = useAuth();

  // Blog states
  const [viewBlog, setViewBlog] = useState<Blog | null>(null);
  const [viewBlogModalOpen, setViewBlogModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [editBlogModalOpen, setEditBlogModalOpen] = useState(false);
  const [addBlogModalOpen, setAddBlogModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Blog | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Queries
  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blog`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch blogs");
      return response.json();
    },
  });

  // Mutations
  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blog/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete blog");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast({ title: "Success", description: "Blog deleted successfully" });
      setDeleteItem(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleViewBlog = (blog: Blog) => {
    setViewBlog(blog);
    setViewBlogModalOpen(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditBlogModalOpen(true);
  };

  const handleDeleteBlog = (blog: Blog) => {
    setDeleteItem(blog);
    setDeleteModalOpen(true);
  };

  const confirmDeleteBlog = () => {
    if (deleteItem) {
      deleteBlogMutation.mutate(deleteItem._id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="text-muted-foreground">
            Manage your NGO's blog posts and articles.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <BlogTable
            onView={handleViewBlog}
            onEdit={handleEditBlog}
            onAdd={() => setAddBlogModalOpen(true)}
            onDelete={handleDeleteBlog}
          />
        </motion.div>
      </div>

      <ViewBlogModal
        blog={viewBlog}
        isOpen={viewBlogModalOpen}
        onClose={() => setViewBlogModalOpen(false)}
      />

      <EditBlogModal
        blog={selectedBlog}
        isOpen={editBlogModalOpen}
        onClose={() => setEditBlogModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["blogs"] })}
      />

      <AddBlogModal
        isOpen={addBlogModalOpen}
        onClose={() => setAddBlogModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["blogs"] })}
      />

      <DeleteModal
        type="blog"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteBlog}
        isDeleting={deleteBlogMutation.isPending}
      />
    </AdminLayout>
  );
};

export default BlogsPage;