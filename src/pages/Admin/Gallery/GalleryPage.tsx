import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2, Plus, Image } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ViewGalleryModal from "./ViewGalleryModal";
import EditGalleryModal from "./EditGalleryModal";
import AddGalleryModal from "./AddGalleryModal";
import DeleteModal from "../Shared//DeleteModal";
import {formatDate} from "../../utils/formatDate";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

const GalleryPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { user } = useAuth();

  // Gallery states
  const [viewGalleryItem, setViewGalleryItem] = useState<GalleryItem | null>(
    null
  );
  const [viewGalleryModalOpen, setViewGalleryModalOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] =
    useState<GalleryItem | null>(null);
  const [editGalleryModalOpen, setEditGalleryModalOpen] = useState(false);
  const [addGalleryModalOpen, setAddGalleryModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<GalleryItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Queries
  const { data: gallery, isLoading: galleryLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch gallery");
      return response.json();
    },
  });

  // Mutations
  const deleteGalleryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete gallery item");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      });
      setDeleteItem(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      });
    },
  });

  // Pagination calculations
  const paginatedGallery = gallery?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil((gallery?.length || 0) / itemsPerPage);

  // Handlers
  const handleViewGalleryItem = (item: GalleryItem) => {
    setViewGalleryItem(item);
    setViewGalleryModalOpen(true);
  };

  const handleEditGalleryItem = (item: GalleryItem) => {
    setSelectedGalleryItem(item);
    setEditGalleryModalOpen(true);
  };

  const handleDeleteGalleryItem = (item: GalleryItem) => {
    setDeleteItem(item);
    setDeleteModalOpen(true);
  };

  const confirmDeleteGalleryItem = () => {
    if (deleteItem) {
      deleteGalleryMutation.mutate(deleteItem._id);
    }
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {pages.map(page => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">
            Manage your NGO's gallery images and media.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gallery</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm">Items per page:</label>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => { setItemsPerPage(Number(value)); setCurrentPage(1); }}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {user && user.role === "Admin" && (
                  <Button onClick={() => setAddGalleryModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Gallery Item
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {galleryLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedGallery?.map((item: GalleryItem) => (
                        <TableRow key={item._id}>
                          <TableCell className="font-medium">
                            {item.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {item.imageUrl ? (
                              <img
                                src={`${import.meta.env.VITE_API_BASE_URL}${
                                  item.imageUrl
                                }`}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                <Image className="w-6 h-6 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {formatDate(item.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewGalleryItem(item)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {user && user.role === "Admin" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditGalleryItem(item)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteGalleryItem(item)}
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
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                      {renderPagination()}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ViewGalleryModal
        galleryItem={viewGalleryItem}
        isOpen={viewGalleryModalOpen}
        onClose={() => setViewGalleryModalOpen(false)}
      />

      <EditGalleryModal
        galleryItem={selectedGalleryItem}
        isOpen={editGalleryModalOpen}
        onClose={() => setEditGalleryModalOpen(false)}
        onSuccess={() =>
          queryClient.invalidateQueries({ queryKey: ["gallery"] })
        }
      />

      <AddGalleryModal
        isOpen={addGalleryModalOpen}
        onClose={() => setAddGalleryModalOpen(false)}
        onSuccess={() =>
          queryClient.invalidateQueries({ queryKey: ["gallery"] })
        }
      />

      <DeleteModal
        type="gallery"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteGalleryItem}
        isDeleting={deleteGalleryMutation.isPending}
      />
    </AdminLayout>
  );
};

export default GalleryPage;
