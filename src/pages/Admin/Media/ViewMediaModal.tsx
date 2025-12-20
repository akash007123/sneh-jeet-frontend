import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Media } from "@/types/media";

interface ViewMediaModalProps {
  media: Media | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewMediaModal = ({ media, isOpen, onClose }: ViewMediaModalProps) => {
  if (!media) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{media.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground">{media.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Type</h3>
              <Badge variant="secondary" className="capitalize">
                {media.type.replace("-", " ")}
              </Badge>
            </div>
            <div>
              <h3 className="font-semibold">Duration</h3>
              <p className="text-muted-foreground">{media.duration}</p>
            </div>
            <div>
              <h3 className="font-semibold">Creator</h3>
              <p className="text-muted-foreground">{media.creator}</p>
            </div>
            <div>
              <h3 className="font-semibold">Views</h3>
              <p className="text-muted-foreground">{media.views}</p>
            </div>
          </div>

          {media.category && (
            <div>
              <h3 className="font-semibold">Category</h3>
              <p className="text-muted-foreground">{media.category}</p>
            </div>
          )}

          {media.videoUrl && (
            <div>
              <h3 className="font-semibold">Video URL</h3>
              <a href={media.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {media.videoUrl}
              </a>
            </div>
          )}

          {media.thumbnailUrl && (
            <div>
              <h3 className="font-semibold">Thumbnail URL</h3>
              <a href={media.thumbnailUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {media.thumbnailUrl}
              </a>
            </div>
          )}

          <div className="flex gap-2">
            {media.featured && <Badge>Featured</Badge>}
            <Badge variant={media.published ? "default" : "secondary"}>
              {media.published ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMediaModal;