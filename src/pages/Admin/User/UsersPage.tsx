import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2, User, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "../../utils/formatDate";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AdminTablePagination from "@/components/ui/admin-table-pagination";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";
import DeleteModal from "../Shared/DeleteModal";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string;
  createdAt: string;
  isActive: boolean;
}

const UsersPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token, user: currentUser } = useAuth();

  // Modal states
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [viewUserModalOpen, setViewUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<User | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Queries
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users", statusFilter],
    queryFn: async () => {
      const url = statusFilter === "All" ? `${import.meta.env.VITE_API_BASE_URL}/api/users` : `${import.meta.env.VITE_API_BASE_URL}/api/users?status=${statusFilter}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
  });

  // Mutations
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive }),
        }
      );
      if (!response.ok) throw new Error("Failed to update user status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "Success", description: "User status updated successfully" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "Success", description: "User deleted successfully" });
      setDeleteModalOpen(false);
      setDeleteItem(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    },
  });

  // Pagination calculations
  const paginatedUsers = users?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);

  // Handlers
  const handleViewUser = (user: User) => {
    setViewUser(user);
    setViewUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUserModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setDeleteItem(user);
    setDeleteModalOpen(true);
  };

  const handleToggleStatus = (user: User, isActive: boolean) => {
    toggleStatusMutation.mutate({ id: user._id, isActive });
  };

  const confirmDeleteUser = () => {
    if (deleteItem) {
      deleteUserMutation.mutate(deleteItem._id);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "Vice-manager":
        return "bg-green-100 text-green-800";
      case "HR":
        return "bg-purple-100 text-purple-800";
      case "Volunteer":
        return "bg-orange-100 text-orange-800";
      case "Member":
        return "bg-teal-100 text-teal-800";
      case "User":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">
              Manage user accounts and their information.
            </p>
          </div>
          {currentUser?.role === 'Admin' && (
            <Button onClick={() => setAddUserModalOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Users</CardTitle>
                <div className="flex items-center gap-2">
                  <label htmlFor="status-filter" className="text-sm font-medium">Filter by Status:</label>
                  <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setCurrentPage(1); }}>
                    <SelectTrigger id="status-filter" className="w-32">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Profile</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers?.map((user: User) => (
                        <TableRow key={user._id}>
                          <TableCell>
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={user.profilePic ? `${import.meta.env.VITE_API_BASE_URL}${user.profilePic}` : undefined}
                                alt={user.name}
                              />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={user.isActive ? "active" : "inactive"}
                              onValueChange={(value) => handleToggleStatus(user, value === "active")}
                              disabled={toggleStatusMutation.isPending}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {formatDate(user.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewUser(user)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(user)}
                                disabled={deleteUserMutation.isPending}
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

      <AddUserModal
        isOpen={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setAddUserModalOpen(false);
        }}
      />

      <ViewUserModal
        user={viewUser}
        isOpen={viewUserModalOpen}
        onClose={() => setViewUserModalOpen(false)}
      />

      <EditUserModal
        user={selectedUser}
        isOpen={editUserModalOpen}
        onClose={() => setEditUserModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setEditUserModalOpen(false);
          setSelectedUser(null);
        }}
      />

      <DeleteModal
        type="user"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
        isDeleting={deleteUserMutation.isPending}
      />
    </AdminLayout>
  );
};

export default UsersPage;