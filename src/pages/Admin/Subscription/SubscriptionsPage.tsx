import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
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
import DeleteModal from "../Shared/DeleteModal";
import {formatDate} from "../../utils/formatDate";
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { saveAs } from 'file-saver';

interface Subscription {
  _id: string;
  email: string;
  status: "active" | "unsubscribed";
  subscribedAt: string;
}

const SubscriptionsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token, user } = useAuth();

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Subscription | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Queries
  const { data: subscriptions, isLoading: subscriptionsLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/subscriptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch subscriptions");
      return response.json();
    },
  });

  // Mutations
  const updateSubscriptionStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/subscriptions/${id}`,
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
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({ title: "Success", description: "Status updated successfully" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const deleteSubscriptionMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/subscriptions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete subscription");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({ title: "Success", description: "Subscription deleted successfully" });
      setDeleteItem(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleToggleStatus = (subscription: Subscription) => {
    const newStatus = subscription.status === "active" ? "unsubscribed" : "active";
    updateSubscriptionStatusMutation.mutate({ id: subscription._id, status: newStatus });
  };

  const handleDeleteSubscription = (subscription: Subscription) => {
    setDeleteItem(subscription);
    setDeleteModalOpen(true);
  };

  const confirmDeleteSubscription = () => {
    if (deleteItem) {
      deleteSubscriptionMutation.mutate(deleteItem._id);
    }
  };

  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "unsubscribed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Export functions
  const exportToCSV = () => {
    if (!subscriptions || subscriptions.length === 0) return;

    const headers = ['Email', 'Status', 'Subscribed At'];
    const csvData = subscriptions.map((subscription: Subscription) => [
      subscription.email,
      subscription.status,
      formatDate(subscription.subscribedAt)
    ]);

    const csvContent = [headers, ...csvData].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'subscriptions.csv');
  };

  const exportToPDF = () => {
    if (!subscriptions || subscriptions.length === 0) return;

    const doc = new jsPDF();
    doc.text('Subscriptions Report', 14, 20);

    const tableColumn = ['Email', 'Status', 'Subscribed At'];
    const tableRows = subscriptions.map((subscription: Subscription) => [
      subscription.email,
      subscription.status,
      formatDate(subscription.subscribedAt)
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('subscriptions.pdf');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage email subscriptions and communications.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Email Subscriptions</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={exportToCSV}>
                    Export CSV
                  </Button>
                  <Button variant="outline" onClick={exportToPDF}>
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {subscriptionsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscribed At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions?.map((subscription: Subscription) => (
                      <TableRow key={subscription._id}>
                        <TableCell className="font-medium">
                          {subscription.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getSubscriptionStatusColor(
                              subscription.status
                            )}
                          >
                            {subscription.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatDate(
                            subscription.subscribedAt
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(subscription)}
                              disabled={updateSubscriptionStatusMutation.isPending}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>

                            {user && user.role === 'Admin' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteSubscription(subscription)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
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

      <DeleteModal
        type="subscription"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteSubscription}
        isDeleting={deleteSubscriptionMutation.isPending}
      />
    </AdminLayout>
  );
};

export default SubscriptionsPage;