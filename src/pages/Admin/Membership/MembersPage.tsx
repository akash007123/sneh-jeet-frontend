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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import AdminTablePagination from "@/components/ui/admin-table-pagination";
import ViewMembershipModal from "./ViewMembershipModal";
import EditMembershipModal from "./EditMembershipModal";
import DeleteModal from "../Shared/DeleteModal";
import AdminAddMember from "./AdminAddMember";
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import {formatDate} from "../../utils/formatDate"

interface Membership {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  alternateMobile?: string;
  address?: {
    houseFlatNo?: string;
    streetArea?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pinZipCode?: string;
  };
  currentAddress?: {
    sameAsPermanent?: boolean;
    houseFlatNo?: string;
    streetArea?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pinZipCode?: string;
  };
  idProofType?: string;
  idProofFile?: string;
  education?: string;
  job?: string;
  gender?: string;
  dateOfBirth?: string;
  age?: number;
  nationality?: string;
  maritalStatus?: string;
  bloodGroup?: string;
  languagesKnown?: string[];
  previousNgoExperience?: {
    hasExperience?: boolean;
    details?: string;
  };
  socialMediaProfiles?: {
    linkedIn?: string;
    facebook?: string;
    instagram?: string;
  };
  interest?: string;
  position?: string;
  image?: string;
  status: "New" | "Pending" | "Talk" | "Approved";
  createdAt: string;
}

const MembersPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token } = useAuth();

  // Membership states
  const [viewMembership, setViewMembership] = useState<Membership | null>(null);
  const [viewMembershipModalOpen, setViewMembershipModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const [editMembershipModalOpen, setEditMembershipModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Membership | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Add member states
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Queries
  const { data: memberships, isLoading: membershipsLoading } = useQuery({
    queryKey: ["memberships", statusFilter],
    queryFn: async () => {
      const url = statusFilter === "All" ? `${import.meta.env.VITE_API_BASE_URL}/api/membership` : `${import.meta.env.VITE_API_BASE_URL}/api/membership?status=${statusFilter}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch memberships");
      return response.json();
    },
  });

  // Mutations
  const updateMembershipStatusMutation = useMutation({
    mutationFn: async ({ id, status, position }: { id: string; status: string; position: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/membership/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status, position }),
        }
      );
      if (!response.ok) throw new Error("Failed to update membership");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
      toast({ title: "Success", description: "Status updated successfully" });
      setSelectedMembership(null);
      setEditMembershipModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const deleteMembershipMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/membership/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete membership");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
      toast({ title: "Success", description: "Membership deleted successfully" });
      setDeleteItem(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete membership",
        variant: "destructive",
      });
    },
  });

  // Pagination calculations
  const paginatedMemberships = memberships?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil((memberships?.length || 0) / itemsPerPage);

  // Handlers
  const handleViewMembership = (membership: Membership) => {
    setViewMembership(membership);
    setViewMembershipModalOpen(true);
  };

  const handleEditMembershipStatus = (membership: Membership) => {
    setSelectedMembership(membership);
    setEditMembershipModalOpen(true);
  };

  const handleUpdateMembershipStatus = (status: string, position: string) => {
    if (selectedMembership) {
      updateMembershipStatusMutation.mutate({ id: selectedMembership._id, status, position });
    }
  };

  const handleDeleteMembership = (membership: Membership) => {
    setDeleteItem(membership);
    setDeleteModalOpen(true);
  };

  const confirmDeleteMembership = () => {
    if (deleteItem) {
      deleteMembershipMutation.mutate(deleteItem._id);
    }
  };

  const getMembershipStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Talk":
        return "bg-purple-100 text-purple-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Export functions
  const exportToCSV = () => {
    if (!memberships || memberships.length === 0) return;

    const headers = ['Name', 'Email', 'Mobile', 'Position', 'Has Image', 'Status', 'Date'];
    const csvData = memberships.map((membership: Membership) => [
      `${membership.firstName} ${membership.lastName}`,
      membership.email,
      membership.mobile || 'N/A',
      membership.position || 'N/A',
      membership.image ? 'Yes' : 'No',
      membership.status,
      formatDate(membership.createdAt)
    ]);

    const csvContent = [headers, ...csvData].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'memberships.csv');
  };

  const exportToPDF = () => {
    if (!memberships || memberships.length === 0) return;

    const doc = new jsPDF();
    doc.text('Memberships Report', 14, 20);

    const tableColumn = ['Name', 'Email', 'Mobile', 'Position', 'Has Image', 'Status', 'Date'];
    const tableRows = memberships.map((membership: Membership) => [
      `${membership.firstName} ${membership.lastName}`,
      membership.email,
      membership.mobile || 'N/A',
      membership.position || 'N/A',
      membership.image ? 'Yes' : 'No',
      membership.status,
      formatDate(membership.createdAt)
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('memberships.pdf');
  };


  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground">
            Manage membership applications and communications.
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
                <CardTitle>Membership Applications</CardTitle>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <label htmlFor="status-filter" className="text-sm font-medium">Filter by Status:</label>
                    <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setCurrentPage(1); }}>
                      <SelectTrigger id="status-filter" className="w-32">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Talk">Talk</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setAddMemberModalOpen(true)}>
                    Add Member
                  </Button>
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
              {membershipsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedMemberships?.map((membership: Membership) => (
                        <TableRow key={membership._id}>
                          <TableCell>
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={membership.image ? `${import.meta.env.VITE_API_BASE_URL}${membership.image}` : undefined}
                                alt={`${membership.firstName} ${membership.lastName}`}
                              />
                              <AvatarFallback>
                                {membership.firstName[0]}{membership.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {membership.firstName} {membership.lastName}
                          </TableCell>
                          <TableCell>{membership.email}</TableCell>
                          <TableCell>{membership.mobile || "N/A"}</TableCell>
                          <TableCell>{membership.position || "N/A"}</TableCell>
                          <TableCell>
                            <Badge
                              className={getMembershipStatusColor(
                                membership.status
                              )}
                            >
                              {membership.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {formatDate(
                              membership.createdAt
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewMembership(membership)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleEditMembershipStatus(membership)
                                }
                              >
                                <Edit className="w-4 h-4" />
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteMembership(membership)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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

      <ViewMembershipModal
        membership={viewMembership}
        isOpen={viewMembershipModalOpen}
        onClose={() => setViewMembershipModalOpen(false)}
      />

      <EditMembershipModal
        membership={selectedMembership}
        isOpen={editMembershipModalOpen}
        onClose={() => setEditMembershipModalOpen(false)}
        onUpdate={handleUpdateMembershipStatus}
        isUpdating={updateMembershipStatusMutation.isPending}
      />

      <DeleteModal
        type="membership"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteMembership}
        isDeleting={deleteMembershipMutation.isPending}
      />

      <AdminAddMember
        isOpen={addMemberModalOpen}
        onClose={() => setAddMemberModalOpen(false)}
      />
    </AdminLayout>
  );
};

export default MembersPage;