import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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

interface ViewEventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewEventModal = ({ event, isOpen, onClose }: ViewEventModalProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>
        {event && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Title:</label>
              <p>{event.title}</p>
            </div>
            <div>
              <label className="font-semibold">Date:</label>
              <p>{formatDate(event.date)}</p>
            </div>
            <div>
              <label className="font-semibold">Time:</label>
              <p>{event.time}</p>
            </div>
            <div>
              <label className="font-semibold">Location:</label>
              <p>{event.location}</p>
            </div>
            <div>
              <label className="font-semibold">Category:</label>
              <Badge variant="secondary">
                {event.category}
              </Badge>
            </div>
            <div>
              <label className="font-semibold">Description:</label>
              <p className="whitespace-pre-wrap">{event.description}</p>
            </div>
            {event.image && (
              <div>
                <label className="font-semibold">Image:</label>
                <p>{event.image}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewEventModal;