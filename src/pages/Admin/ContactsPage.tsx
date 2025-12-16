import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2 } from "lucide-react";
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
import ViewContactModal from "./ViewContactModal";
import EditStatusModal from "./EditStatusModal";
import DeleteModal from "./DeleteModal";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "New" | "Pending" | "Talk" | "Resolved";
  createdAt: string;
}

const ContactsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token } = useAuth();

  // Contact states
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [viewContactModalOpen, setViewContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editContactModalOpen, setEditContactModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Contact | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Queries
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch contacts");
      return response.json();
    },
  });

  // Mutations
  const updateContactStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast({ title: "Success", description: "Status updated successfully" });
      setSelectedContact(null);
      setEditContactModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete contact");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast({ title: "Success", description: "Contact deleted successfully" });
      setDeleteItem(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleViewContact = (contact: Contact) => {
    setViewContact(contact);
    setViewContactModalOpen(true);
  };

  const handleEditContactStatus = (contact: Contact) => {
    setSelectedContact(contact);
    setEditContactModalOpen(true);
  };

  const handleUpdateContactStatus = (status: string) => {
    if (selectedContact) {
      updateContactStatusMutation.mutate({ id: selectedContact._id, status });
    }
  };

  const handleDeleteContact = (contact: Contact) => {
    setDeleteItem(contact);
    setDeleteModalOpen(true);
  };

  const confirmDeleteContact = () => {
    if (deleteItem) {
      deleteContactMutation.mutate(deleteItem._id);
    }
  };

  const getContactStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Talk":
        return "bg-purple-100 text-purple-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">
            Manage contact submissions and communications.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {contactsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts?.map((contact: Contact) => (
                      <TableRow key={contact._id}>
                        <TableCell className="font-medium">
                          {contact.name}
                        </TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone || "N/A"}</TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell>
                          <Badge
                            className={getContactStatusColor(
                              contact.status
                            )}
                          >
                            {contact.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(
                            contact.createdAt
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewContact(contact)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleEditContactStatus(contact)
                              }
                            >
                              <Edit className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteContact(contact)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ViewContactModal
        contact={viewContact}
        isOpen={viewContactModalOpen}
        onClose={() => setViewContactModalOpen(false)}
      />

      <EditStatusModal
        contact={selectedContact}
        isOpen={editContactModalOpen}
        onClose={() => setEditContactModalOpen(false)}
        onUpdate={handleUpdateContactStatus}
        isUpdating={updateContactStatusMutation.isPending}
      />

      <DeleteModal
        type="contact"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteContact}
        isDeleting={deleteContactMutation.isPending}
      />
    </AdminLayout>
  );
};

export default ContactsPage;