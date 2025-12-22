import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../../utils/formatDate";

interface Appointment {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  status: "New" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

interface ViewAppointmentModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewAppointmentModal = ({ appointment, isOpen, onClose }: ViewAppointmentModalProps) => {
  if (!appointment) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            View the details of this appointment booking.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-sm">{appointment.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge className={getAppointmentStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-sm">{appointment.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Mobile</label>
            <p className="text-sm">{appointment.mobile}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Message</label>
            <p className="text-sm bg-muted p-3 rounded-md">{appointment.message}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Created At</label>
            <p className="text-sm">{formatDate(appointment.createdAt)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAppointmentModal;