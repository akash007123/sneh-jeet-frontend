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

type DeletableItem = Contact | Event | GalleryItem;

interface DeleteModalProps {
  type: 'contact' | 'event' | 'gallery';
  item: DeletableItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteModal = ({ type, item, isOpen, onClose, onConfirm, isDeleting }: DeleteModalProps) => {
  const getTitle = () => {
    switch (type) {
      case 'contact': return 'Delete Contact';
      case 'event': return 'Delete Event';
      case 'gallery': return 'Delete Gallery Item';
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
            onClick={onConfirm}
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