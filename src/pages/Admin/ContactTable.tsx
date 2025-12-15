import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Link } from "react-router-dom";
import ViewContactModal from "./ViewContactModal";
import EditStatusModal from "./EditStatusModal";
import DeleteContactModal from "./DeleteContactModal";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'New' | 'Pending' | 'Talk' | 'Resolved';
  createdAt: string;
}

const ContactTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteContact, setDeleteContact] = useState<Contact | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({ title: "Success", description: "Status updated successfully" });
      setSelectedContact(null);
      setEditModalOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({ title: "Success", description: "Contact deleted successfully" });
      setDeleteContact(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete contact", variant: "destructive" });
    },
  });

  const handleView = (contact: Contact) => {
    setViewContact(contact);
    setViewModalOpen(true);
  };

  const handleStatusChange = (contact: Contact) => {
    setSelectedContact(contact);
    setEditModalOpen(true);
  };

  const handleStatusUpdate = (status: string) => {
    if (selectedContact) {
      updateStatusMutation.mutate({ id: selectedContact._id, status });
    }
  };

  const handleDelete = (contact: Contact) => {
    setDeleteContact(contact);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteContact) {
      deleteMutation.mutate(deleteContact._id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Talk': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <MainLayout>
      <PageHero
        badge="Admin"
        title="Contact Management"
        subtitle="View and manage all contact form submissions."
      />

      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
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
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone || 'N/A'}</TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(contact)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(contact)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(contact)}
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

          <ViewContactModal
            contact={viewContact}
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
          />

          <EditStatusModal
            contact={selectedContact}
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUpdate={handleStatusUpdate}
            isUpdating={updateStatusMutation.isPending}
          />

          <DeleteContactModal
            contact={deleteContact}
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            isDeleting={deleteMutation.isPending}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactTable;