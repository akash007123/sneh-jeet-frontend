import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, ArrowLeft, Plus } from "lucide-react";
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
import ViewEventModal from "./ViewEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";
import AddEventModal from "./AddEventModal";

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

const EventTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState<Event | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/event`);
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/event/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: "Success", description: "Event deleted successfully" });
      setDeleteEvent(null);
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete event", variant: "destructive" });
    },
  });

  const handleView = (event: Event) => {
    setViewEvent(event);
    setViewModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const handleDelete = (event: Event) => {
    setDeleteEvent(event);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteEvent) {
      deleteMutation.mutate(deleteEvent._id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <MainLayout>
      <PageHero
        badge="Admin"
        title="Event Management"
        subtitle="View and manage all events."
      />

      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="mb-6 flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
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
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{formatDate(event.date)}</TableCell>
                        <TableCell>{event.time}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {event.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(event)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(event)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(event)}
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

          <ViewEventModal
            event={viewEvent}
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
          />

          <EditEventModal
            event={selectedEvent}
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSuccess={() => queryClient.invalidateQueries({ queryKey: ['events'] })}
          />

          <DeleteEventModal
            event={deleteEvent}
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            isDeleting={deleteMutation.isPending}
          />

          <AddEventModal
            isOpen={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onSuccess={() => queryClient.invalidateQueries({ queryKey: ['events'] })}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default EventTable;