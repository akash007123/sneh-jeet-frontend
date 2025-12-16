import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import BlogTable from "./BlogTable";
import ViewBlogModal from "./ViewBlogModal";
import EditBlogModal from "./EditBlogModal";
import AddBlogModal from "./AddBlogModal";
import DeleteModal from "./DeleteModal";

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
  createdAt: string;
}

const BlogsPage = () => {
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
        onConfirm={() => {
          // The delete logic is handled in BlogTable component
          setDeleteItem(null);
          setDeleteModalOpen(false);
        }}
        isDeleting={false}
      />
    </AdminLayout>
  );
};

export default BlogsPage;