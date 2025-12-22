import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  isFeatured: boolean;
  category: string;
  authorName: string;
  publishedDate: string;
  createdAt: string;
}

interface Media {
  _id: string;
  title: string;
  slug: string;
  type: string;
  creator: string;
  published: boolean;
  createdAt: string;
}

interface Idea {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  published: boolean;
  createdAt: string;
}

interface Story {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  publishedDate: string;
}

interface Subscription {
  _id: string;
  email: string;
  status: "active" | "unsubscribed";
  subscribedAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string;
  createdAt: string;
}

interface Membership {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  interest?: string;
  status: "New" | "Pending" | "Talk" | "Approved";
  createdAt: string;
}

interface Appointment {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  status: "New" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

type DeletableItem = Contact | Event | GalleryItem | Blog | Media | Idea | Story | Subscription | User | Membership | Appointment;

interface DeleteModalProps {
  type: 'contact' | 'event' | 'gallery' | 'blog' | 'media' | 'idea' | 'story' | 'subscription' | 'user' | 'membership' | 'appointment';
  item: DeletableItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  deleteFunction?: (id: string) => void;
}

const DeleteModal = ({ type, item, isOpen, onClose, onConfirm, isDeleting, deleteFunction }: DeleteModalProps) => {
  const getTitle = () => {
    switch (type) {
      case 'contact': return 'Delete Contact';
      case 'event': return 'Delete Event';
      case 'gallery': return 'Delete Gallery Item';
      case 'blog': return 'Delete Blog Post';
      case 'media': return 'Delete Media';
      case 'idea': return 'Delete Idea';
      case 'story': return 'Delete Story';
      case 'subscription': return 'Delete Subscription';
      case 'user': return 'Delete User';
      case 'membership': return 'Delete Membership';
      case 'appointment': return 'Delete Appointment';
      default: return 'Delete Item';
    }
  };

  const getDescription = () => {
    const itemName = getItemName();
    return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
  };

  const getItemName = () => {
    if (!item) return '';
    switch (type) {
      case 'contact': return `${(item as Contact).name} - ${(item as Contact).subject}`;
      case 'event': return (item as Event).title;
      case 'gallery': return (item as GalleryItem).title;
      case 'blog': return (item as Blog).title;
      case 'media': return (item as Media).title;
      case 'idea': return (item as Idea).title;
      case 'story': return (item as Story).title;
      case 'subscription': return (item as Subscription).email;
      case 'user': return (item as User).name;
      case 'membership': return `${(item as Membership).firstName} ${(item as Membership).lastName}`;
      case 'appointment': return (item as Appointment).name;
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              if (deleteFunction && item) {
                deleteFunction(item._id);
              }
              onConfirm();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;