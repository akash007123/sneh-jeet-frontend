import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Membership {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  interest?: string;
  status: 'New' | 'Approved' | 'Rejected';
  createdAt: string;
}

interface ViewMembershipModalProps {
  membership: Membership | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewMembershipModal = ({ membership, isOpen, onClose }: ViewMembershipModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Membership Details</DialogTitle>
        </DialogHeader>
        {membership && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Name:</label>
              <p>{membership.firstName} {membership.lastName}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p>{membership.email}</p>
            </div>
            <div>
              <label className="font-semibold">Mobile:</label>
              <p>{membership.mobile || 'N/A'}</p>
            </div>
            <div>
              <label className="font-semibold">Interest:</label>
              <p className="whitespace-pre-wrap">{membership.interest || 'N/A'}</p>
            </div>
            <div>
              <label className="font-semibold">Status:</label>
              <Badge className={getStatusColor(membership.status)}>
                {membership.status}
              </Badge>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewMembershipModal;