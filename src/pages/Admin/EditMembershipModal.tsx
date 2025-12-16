import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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

interface EditMembershipModalProps {
  membership: Membership | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (status: string) => void;
  isUpdating: boolean;
}

const EditMembershipModal = ({ membership, isOpen, onClose, onUpdate, isUpdating }: EditMembershipModalProps) => {
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (membership) {
      setStatus(membership.status);
    }
  }, [membership]);

  const handleUpdate = () => {
    onUpdate(status);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Membership Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Applicant:</label>
            <p>{membership?.firstName} {membership?.lastName} - {membership?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMembershipModal;