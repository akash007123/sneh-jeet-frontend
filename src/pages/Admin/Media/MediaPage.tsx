import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import MediaTable from "./MediaTable";
import ViewMediaModal from "./ViewMediaModal";
import EditMediaModal from "./EditMediaModal";
import AddMediaModal from "./AddMediaModal";
import DeleteModal from "../Shared/DeleteModal";
import { useToast } from "@/hooks/use-toast";
import { Media } from "@/types/media";
import { deleteMedia, fetchMedia } from "@/services/mediaApi";

const MediaPage = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { toast } = useToast();

  // Media states
  const [viewMedia, setViewMedia] = useState<Media | null>(null);
  const [viewMediaModalOpen, setViewMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [editMediaModalOpen, setEditMediaModalOpen] = useState(false);
  const [addMediaModalOpen, setAddMediaModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Media | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Queries
  const { data: media, isLoading: mediaLoading } = useQuery({
    queryKey: ["media"],
    queryFn: () => fetchMedia(token),
  });

  const deleteMediaMutation = useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast({ title: "Success", description: "Media deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete media", variant: "destructive" });
    },
  });

  // Handlers
  const handleViewMedia = (media: Media) => {
    setViewMedia(media);
    setViewMediaModalOpen(true);
  };

  const handleEditMedia = (media: Media) => {
    setSelectedMedia(media);
    setEditMediaModalOpen(true);
  };

  const handleDeleteMedia = (media: Media) => {
    setDeleteItem(media);
    setDeleteModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Media</h1>
          <p className="text-muted-foreground">
            Manage your NGO's media content including films and videos.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <MediaTable
            onView={handleViewMedia}
            onEdit={handleEditMedia}
            onAdd={() => setAddMediaModalOpen(true)}
            onDelete={handleDeleteMedia}
          />
        </motion.div>
      </div>

      <ViewMediaModal
        media={viewMedia}
        isOpen={viewMediaModalOpen}
        onClose={() => setViewMediaModalOpen(false)}
      />

      <EditMediaModal
        media={selectedMedia}
        isOpen={editMediaModalOpen}
        onClose={() => setEditMediaModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["media"] })}
      />

      <AddMediaModal
        isOpen={addMediaModalOpen}
        onClose={() => setAddMediaModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["media"] })}
      />

      <DeleteModal
        type="media"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteItem(null);
          setDeleteModalOpen(false);
        }}
        isDeleting={deleteMediaMutation.isPending}
        deleteFunction={(id) => deleteMediaMutation.mutate(id)}
      />
    </AdminLayout>
  );
};

export default MediaPage;