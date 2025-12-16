import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
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
import ViewEventModal from "./ViewEventModal";
import EditEventModal from "./EditEventModal";
import AddEventModal from "./AddEventModal";
import DeleteModal from "./DeleteModal";

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image?: string;
  createdAt: string;
}

const EventsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { user } = useAuth();

  // Event states
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [viewEventModalOpen, setViewEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  // Delete states
  const [deleteItem, setDeleteItem] = useState<Event | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Queries
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/event`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json();
    },
  });

  // Mutations
  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/event/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete event");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({ title: "Success", description: "Event deleted successfully" });
      setDeleteItem(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleViewEvent = (event: Event) => {
    setViewEvent(event);
    setViewEventModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setEditEventModalOpen(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setDeleteItem(event);
    setDeleteModalOpen(true);
  };

  const confirmDeleteEvent = () => {
    if (deleteItem) {
      deleteEventMutation.mutate(deleteItem._id);
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">
            Manage your NGO's events and activities.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Events</CardTitle>
              {user && user.role === "Admin" && (
                <Button onClick={() => setAddEventModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {eventsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events?.map((event: Event) => (
                      <TableRow key={event._id}>
                        <TableCell className="font-medium">
                          {event.title}
                        </TableCell>
                        <TableCell>{formatEventDate(event.date)}</TableCell>
                        <TableCell>{event.time}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{event.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewEvent(event)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>

                            {user && user.role === "Admin" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditEvent(event)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteEvent(event)}
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
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ViewEventModal
        event={viewEvent}
        isOpen={viewEventModalOpen}
        onClose={() => setViewEventModalOpen(false)}
      />

      <EditEventModal
        event={selectedEvent}
        isOpen={editEventModalOpen}
        onClose={() => setEditEventModalOpen(false)}
        onSuccess={() =>
          queryClient.invalidateQueries({ queryKey: ["events"] })
        }
      />

      <AddEventModal
        isOpen={addEventModalOpen}
        onClose={() => setAddEventModalOpen(false)}
        onSuccess={() =>
          queryClient.invalidateQueries({ queryKey: ["events"] })
        }
      />

      <DeleteModal
        type="event"
        item={deleteItem}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteEvent}
        isDeleting={deleteEventMutation.isPending}
      />
    </AdminLayout>
  );
};

export default EventsPage;
