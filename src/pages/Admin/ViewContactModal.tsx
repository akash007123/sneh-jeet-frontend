import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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

interface ViewContactModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewContactModal = ({ contact, isOpen, onClose }: ViewContactModalProps) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
        </DialogHeader>
        {contact && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Name:</label>
              <p>{contact.name}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p>{contact.email}</p>
            </div>
            <div>
              <label className="font-semibold">Phone:</label>
              <p>{contact.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="font-semibold">Subject:</label>
              <p>{contact.subject}</p>
            </div>
            <div>
              <label className="font-semibold">Message:</label>
              <p className="whitespace-pre-wrap">{contact.message}</p>
            </div>
            <div>
              <label className="font-semibold">Status:</label>
              <Badge className={getStatusColor(contact.status)}>
                {contact.status}
              </Badge>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewContactModal;