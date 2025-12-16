import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Idea } from "@/types/idea";

interface ViewIdeaModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewIdeaModal = ({ idea, isOpen, onClose }: ViewIdeaModalProps) => {
  if (!idea) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{idea.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground">{idea.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Category</h3>
              <Badge variant="secondary" className="capitalize">
                {idea.category.replace("-", " ")}
              </Badge>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <Badge variant="outline" className="capitalize">
                {idea.status.replace("-", " ")}
              </Badge>
            </div>
            <div>
              <h3 className="font-semibold">Author</h3>
              <p className="text-muted-foreground">{idea.author}</p>
            </div>
            <div>
              <h3 className="font-semibold">Likes</h3>
              <p className="text-muted-foreground">{idea.likes}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant={idea.published ? "default" : "secondary"}>
              {idea.published ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewIdeaModal;