import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import IdeasTable from "./IdeasTable";
import ViewIdeaModal from "./ViewIdeaModal";
import EditIdeaModal from "./EditIdeaModal";
import AddIdeaModal from "./AddIdeaModal";
import DeleteModal from "../Shared/DeleteModal";
import { useToast } from "@/hooks/use-toast";
import { Idea } from "@/types/idea";
import { deleteIdea, fetchIdeas } from "@/services/ideasApi";

const IdeasPage = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { toast } = useToast();

  // Idea states
  const [viewIdea, setViewIdea] = useState<Idea | null>(null);
  const [viewIdeaModalOpen, setViewIdeaModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [editIdeaModalOpen, setEditIdeaModalOpen] = useState(false);
  const [addIdeaModalOpen, setAddIdeaModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Idea | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Queries
  const { data: ideas, isLoading: ideasLoading } = useQuery({
    queryKey: ["ideas"],
    queryFn: () => fetchIdeas(token),
  });

  const deleteIdeaMutation = useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      toast({ title: "Success", description: "Idea deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete idea", variant: "destructive" });
    },
  });

  // Handlers
  const handleViewIdea = (idea: Idea) => {
    setViewIdea(idea);
    setViewIdeaModalOpen(true);
  };

  const handleEditIdea = (idea: Idea) => {
    setSelectedIdea(idea);
    setEditIdeaModalOpen(true);
  };

  const handleDeleteIdea = (idea: Idea) => {
    setDeleteItem(idea);
    setDeleteModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Ideas</h1>
          <p className="text-muted-foreground">
            Manage your NGO's community ideas and initiatives.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <IdeasTable
            onView={handleViewIdea}
            onEdit={handleEditIdea}
            onAdd={() => setAddIdeaModalOpen(true)}
            onDelete={handleDeleteIdea}
          />
        </motion.div>
      </div>

      <ViewIdeaModal
        idea={viewIdea}
        isOpen={viewIdeaModalOpen}
        onClose={() => setViewIdeaModalOpen(false)}
      />

      <EditIdeaModal
        idea={selectedIdea}
        isOpen={editIdeaModalOpen}
        onClose={() => setEditIdeaModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["ideas"] })}
      />

      <AddIdeaModal
        isOpen={addIdeaModalOpen}
        onClose={() => setAddIdeaModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["ideas"] })}
      />

      <DeleteModal
        type="idea"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteItem(null);
          setDeleteModalOpen(false);
        }}
        isDeleting={deleteIdeaMutation.isPending}
        deleteFunction={(id) => deleteIdeaMutation.mutate(id)}
      />
    </AdminLayout>
  );
};

export default IdeasPage;