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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Membership {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  interest?: string;
  position?: string;
  status: 'New' | 'Pending' | 'Talk' | 'Approved';
  createdAt: string;
}

interface EditMembershipModalProps {
  membership: Membership | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (status: string, position: string) => void;
  isUpdating: boolean;
}

const EditMembershipModal = ({ membership, isOpen, onClose, onUpdate, isUpdating }: EditMembershipModalProps) => {
  const [status, setStatus] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  useEffect(() => {
    if (membership) {
      setStatus(membership.status);
      setPosition(membership.position || "");
    }
  }, [membership]);

  const handleUpdate = () => {
    onUpdate(status, position);
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
            <label className="block text-sm font-medium mb-2">Position</label>
            <Input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position (e.g., Volunteer, Coordinator)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Talk">Talk</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
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