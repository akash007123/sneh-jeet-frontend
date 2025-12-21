import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Membership {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  interest?: string;
  position?: string;
  image?: string;
  status: 'New' | 'Pending' | 'Talk' | 'Approved';
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
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Talk': return 'bg-purple-100 text-purple-800';
      case 'Approved': return 'bg-green-100 text-green-800';
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
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={membership.image ? `${import.meta.env.VITE_API_BASE_URL}${membership.image}` : undefined}
                  alt={`${membership.firstName} ${membership.lastName}`}
                />
                <AvatarFallback className="text-lg">
                  {membership.firstName[0]}{membership.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{membership.firstName} {membership.lastName}</h3>
                <p className="text-sm text-muted-foreground">Profile Image {membership.image ? 'Uploaded' : 'Not Provided'}</p>
              </div>
            </div>
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
              <label className="font-semibold">Position:</label>
              <p>{membership.position || 'N/A'}</p>
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