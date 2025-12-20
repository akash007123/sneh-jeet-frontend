import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/layouts/AdminLayout";
import StoryTable from "./StoryTable";
import ViewStoryModal from "./ViewStoryModal";
import EditStoryModal from "./EditStoryModal";
import AddStoryModal from "./AddStoryModal";
import DeleteModal from "../Shared/DeleteModal";

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

const StoriesPage = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { toast } = useToast();

  // Story states
  const [viewStory, setViewStory] = useState<Story | null>(null);
  const [viewStoryModalOpen, setViewStoryModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [editStoryModalOpen, setEditStoryModalOpen] = useState(false);
  const [addStoryModalOpen, setAddStoryModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Story | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Queries
  const { data: stories, isLoading: storiesLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/story`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch stories");
      return response.json();
    },
  });

  // Mutations
  const deleteStoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/story/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete story");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      toast({ title: "Success", description: "Story deleted successfully" });
      setDeleteItem(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete story",
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleViewStory = (story: Story) => {
    setViewStory(story);
    setViewStoryModalOpen(true);
  };

  const handleEditStory = (story: Story) => {
    setSelectedStory(story);
    setEditStoryModalOpen(true);
  };

  const handleDeleteStory = (story: Story) => {
    setDeleteItem(story);
    setDeleteModalOpen(true);
  };

  const confirmDeleteStory = () => {
    if (deleteItem) {
      deleteStoryMutation.mutate(deleteItem._id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Stories</h1>
          <p className="text-muted-foreground">
            Manage community stories and testimonials.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StoryTable
            onView={handleViewStory}
            onEdit={handleEditStory}
            onAdd={() => setAddStoryModalOpen(true)}
            onDelete={handleDeleteStory}
          />
        </motion.div>
      </div>

      <ViewStoryModal
        story={viewStory}
        isOpen={viewStoryModalOpen}
        onClose={() => setViewStoryModalOpen(false)}
      />

      <EditStoryModal
        story={selectedStory}
        isOpen={editStoryModalOpen}
        onClose={() => setEditStoryModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["stories"] })}
      />

      <AddStoryModal
        isOpen={addStoryModalOpen}
        onClose={() => setAddStoryModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["stories"] })}
      />

      <DeleteModal
        type="story"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteStory}
        isDeleting={deleteStoryMutation.isPending}
      />
    </AdminLayout>
  );
};

export default StoriesPage;