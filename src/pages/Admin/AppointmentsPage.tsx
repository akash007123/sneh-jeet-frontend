import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "../utils/formatDate";
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
import AdminTablePagination from "@/components/ui/admin-table-pagination";
import ViewAppointmentModal from "./Appointment/ViewAppointmentModal";
import EditAppointmentModal from "./Appointment/EditAppointmentModal";
import DeleteModal from "./Shared/DeleteModal";

interface Appointment {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  status: "New" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

const AppointmentsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token, user } = useAuth();

  // Appointment states
  const [viewAppointment, setViewAppointment] = useState<Appointment | null>(null);
  const [viewAppointmentModalOpen, setViewAppointmentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editAppointmentModalOpen, setEditAppointmentModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Appointment | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Queries
  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["appointments", statusFilter],
    queryFn: async () => {
      const url = statusFilter === "All" ? `${import.meta.env.VITE_API_BASE_URL}/api/appointments` : `${import.meta.env.VITE_API_BASE_URL}/api/appointments?status=${statusFilter}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch appointments");
      return response.json();
    },
  });

  // Mutations
  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ id, name, mobile, email, message, status }: { id: string; name: string; mobile: string; email: string; message: string; status: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, mobile, email, message, status }),
        }
      );
      if (!response.ok) throw new Error("Failed to update appointment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast({ title: "Success", description: "Appointment updated successfully" });
      setSelectedAppointment(null);
      setEditAppointmentModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive",
      });
    },
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete appointment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast({ title: "Success", description: "Appointment deleted successfully" });
      setDeleteItem(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete appointment",
        variant: "destructive",
      });
    },
  });

  // Pagination calculations
  const paginatedAppointments = appointments?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil((appointments?.length || 0) / itemsPerPage);

  // Handlers
  const handleViewAppointment = (appointment: Appointment) => {
    setViewAppointment(appointment);
    setViewAppointmentModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditAppointmentModalOpen(true);
  };

  const handleUpdateAppointment = (appointmentData: { name: string; mobile: string; email: string; message: string; status: string }) => {
    if (selectedAppointment) {
      updateAppointmentMutation.mutate({ id: selectedAppointment._id, ...appointmentData });
    }
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    setDeleteItem(appointment);
    setDeleteModalOpen(true);
  };

  const confirmDeleteAppointment = () => {
    if (deleteItem) {
      deleteAppointmentMutation.mutate(deleteItem._id);
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">
            Manage appointment bookings and communications.
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
                <CardTitle>Appointment Bookings</CardTitle>
                <div className="flex items-center gap-2">
                  <label htmlFor="status-filter" className="text-sm font-medium">Filter by Status:</label>
                  <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setCurrentPage(1); }}>
                    <SelectTrigger id="status-filter" className="w-32">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {appointmentsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAppointments?.map((appointment: Appointment, index: number) => (
                        <TableRow key={appointment._id}>
                          <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                          <TableCell className="font-medium">
                            {appointment.name}
                          </TableCell>
                          <TableCell>{appointment.email}</TableCell>
                          <TableCell>{appointment.mobile}</TableCell>
                          <TableCell>
                            <Badge
                              className={getAppointmentStatusColor(
                                appointment.status
                              )}
                            >
                              {appointment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {formatDate(
                              appointment.createdAt
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewAppointment(appointment)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>

                              {user && user.role === 'Admin' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleEditAppointment(appointment)
                                    }
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteAppointment(appointment)}
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
                  <AdminTablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(value) => { setItemsPerPage(value); setCurrentPage(1); }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ViewAppointmentModal
        appointment={viewAppointment}
        isOpen={viewAppointmentModalOpen}
        onClose={() => setViewAppointmentModalOpen(false)}
      />

      <EditAppointmentModal
        appointment={selectedAppointment}
        isOpen={editAppointmentModalOpen}
        onClose={() => setEditAppointmentModalOpen(false)}
        onUpdate={handleUpdateAppointment}
        isUpdating={updateAppointmentMutation.isPending}
      />

      <DeleteModal
        type="appointment"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteAppointment}
        isDeleting={deleteAppointmentMutation.isPending}
      />
    </AdminLayout>
  );
};

export default AppointmentsPage;