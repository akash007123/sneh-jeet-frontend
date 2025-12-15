import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, CheckCircle, Clock, Calendar, Edit, Trash2, Eye, Plus, Image } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import DeleteContactModal from "./DeleteContactModal";
import ViewEventModal from "./ViewEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";
import AddEventModal from "./AddEventModal";
import ViewGalleryModal from "./ViewGalleryModal";
import EditGalleryModal from "./EditGalleryModal";
import DeleteGalleryModal from "./DeleteGalleryModal";
import AddGalleryModal from "./AddGalleryModal";

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

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Contact states
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [viewContactModalOpen, setViewContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editContactModalOpen, setEditContactModalOpen] = useState(false);
  const [deleteContact, setDeleteContact] = useState<Contact | null>(null);
  const [deleteContactModalOpen, setDeleteContactModalOpen] = useState(false);

  // Event states
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [viewEventModalOpen, setViewEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState<Event | null>(null);
  const [deleteEventModalOpen, setDeleteEventModalOpen] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  // Gallery states
  const [viewGalleryItem, setViewGalleryItem] = useState<GalleryItem | null>(null);
  const [viewGalleryModalOpen, setViewGalleryModalOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [editGalleryModalOpen, setEditGalleryModalOpen] = useState(false);
  const [deleteGalleryItem, setDeleteGalleryItem] = useState<GalleryItem | null>(null);
  const [deleteGalleryModalOpen, setDeleteGalleryModalOpen] = useState(false);
  const [addGalleryModalOpen, setAddGalleryModalOpen] = useState(false);

  // Queries
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    },
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/event`);
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    },
  });

  const { data: gallery, isLoading: galleryLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery`);
      if (!response.ok) throw new Error('Failed to fetch gallery');
      return response.json();
    },
  });

  // Mutations
  const updateContactStatusMutation = useMutation({
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
      setEditContactModalOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    },
  });

  const deleteContactMutation = useMutation({
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
      setDeleteContactModalOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete contact", variant: "destructive" });
    },
  });

  const deleteEventMutation = useMutation({
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
      setDeleteEventModalOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete event", variant: "destructive" });
    },
  });

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete gallery item');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast({ title: "Success", description: "Gallery item deleted successfully" });
      setDeleteGalleryItem(null);
      setDeleteGalleryModalOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete gallery item", variant: "destructive" });
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
    setDeleteContact(contact);
    setDeleteContactModalOpen(true);
  };

  const confirmDeleteContact = () => {
    if (deleteContact) {
      deleteContactMutation.mutate(deleteContact._id);
    }
  };

  const handleViewEvent = (event: Event) => {
    setViewEvent(event);
    setViewEventModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setEditEventModalOpen(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setDeleteEvent(event);
    setDeleteEventModalOpen(true);
  };

  const confirmDeleteEvent = () => {
    if (deleteEvent) {
      deleteEventMutation.mutate(deleteEvent._id);
    }
  };

  const handleViewGalleryItem = (item: GalleryItem) => {
    setViewGalleryItem(item);
    setViewGalleryModalOpen(true);
  };

  const handleEditGalleryItem = (item: GalleryItem) => {
    setSelectedGalleryItem(item);
    setEditGalleryModalOpen(true);
  };

  const handleDeleteGalleryItem = (item: GalleryItem) => {
    setDeleteGalleryItem(item);
    setDeleteGalleryModalOpen(true);
  };

  const confirmDeleteGalleryItem = () => {
    if (deleteGalleryItem) {
      deleteGalleryMutation.mutate(deleteGalleryItem._id);
    }
  };

  const getContactStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Talk': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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

  // Mock data - in real app, fetch from API
  const stats = {
    totalContacts: contacts?.length || 0,
    newContacts: contacts?.filter(c => c.status === 'New').length || 0,
    pendingContacts: contacts?.filter(c => c.status === 'Pending').length || 0,
    resolvedContacts: contacts?.filter(c => c.status === 'Resolved').length || 0,
    totalEvents: events?.length || 0,
    totalGallery: gallery?.length || 0,
  };

  return (
    <MainLayout>
      <PageHero
        badge="Admin"
        title="Dashboard"
        subtitle="Manage your NGO's contact submissions and communications."
      />

      <section className="section-padding bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalContacts}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.newContacts}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingContacts}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.resolvedContacts}</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalEvents}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gallery Items</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalGallery}</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Tabs defaultValue="contacts" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="contacts" className="mt-6">
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
                              <TableCell className="font-medium">{contact.name}</TableCell>
                              <TableCell>{contact.email}</TableCell>
                              <TableCell>{contact.phone || 'N/A'}</TableCell>
                              <TableCell>{contact.subject}</TableCell>
                              <TableCell>
                                <Badge className={getContactStatusColor(contact.status)}>
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
                                    onClick={() => handleViewContact(contact)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditContactStatus(contact)}
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
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Events</CardTitle>
                    <Button onClick={() => setAddEventModalOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
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
                              <TableCell className="font-medium">{event.title}</TableCell>
                              <TableCell>{formatEventDate(event.date)}</TableCell>
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
                                    onClick={() => handleViewEvent(event)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>

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
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Gallery</CardTitle>
                    <Button onClick={() => setAddGalleryModalOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Gallery Item
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {galleryLoading ? (
                      <div className="text-center py-8">Loading...</div>
                    ) : (
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
                          {gallery?.map((item: GalleryItem) => (
                            <TableRow key={item._id}>
                              <TableCell className="font-medium">{item.title}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="capitalize">
                                  {item.category}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {item.imageUrl ? (
                                  <img
                                    src={`${import.meta.env.VITE_API_BASE_URL}${item.imageUrl}`}
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
                                {new Date(item.createdAt).toLocaleDateString()}
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
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

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

      <DeleteContactModal
        contact={deleteContact}
        isOpen={deleteContactModalOpen}
        onClose={() => setDeleteContactModalOpen(false)}
        onConfirm={confirmDeleteContact}
        isDeleting={deleteContactMutation.isPending}
      />

      <ViewEventModal
        event={viewEvent}
        isOpen={viewEventModalOpen}
        onClose={() => setViewEventModalOpen(false)}
      />

      <EditEventModal
        event={selectedEvent}
        isOpen={editEventModalOpen}
        onClose={() => setEditEventModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['events'] })}
      />

      <DeleteEventModal
        event={deleteEvent}
        isOpen={deleteEventModalOpen}
        onClose={() => setDeleteEventModalOpen(false)}
        onConfirm={confirmDeleteEvent}
        isDeleting={deleteEventMutation.isPending}
      />

      <AddEventModal
        isOpen={addEventModalOpen}
        onClose={() => setAddEventModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['events'] })}
      />

      <ViewGalleryModal
        galleryItem={viewGalleryItem}
        isOpen={viewGalleryModalOpen}
        onClose={() => setViewGalleryModalOpen(false)}
      />

      <EditGalleryModal
        galleryItem={selectedGalleryItem}
        isOpen={editGalleryModalOpen}
        onClose={() => setEditGalleryModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['gallery'] })}
      />

      <DeleteGalleryModal
        galleryItem={deleteGalleryItem}
        isOpen={deleteGalleryModalOpen}
        onClose={() => setDeleteGalleryModalOpen(false)}
        onConfirm={confirmDeleteGalleryItem}
        isDeleting={deleteGalleryMutation.isPending}
      />

      <AddGalleryModal
        isOpen={addGalleryModalOpen}
        onClose={() => setAddGalleryModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ['gallery'] })}
      />
    </MainLayout>
  );
};

export default Dashboard;