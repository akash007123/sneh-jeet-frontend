import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Story {
  _id: string;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  isFeatured: boolean;
  readTime: string;
  author: string;
  publishedDate: string;
  category: string;
  type?: string;
}

interface ViewStoryModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewStoryModal = ({ story, isOpen, onClose }: ViewStoryModalProps) => {
  if (!story) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{story.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          {story.image && (
            <div className="w-full">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${story.image}`}
                alt={story.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>By {story.author}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div>{formatDate(story.publishedDate)}</div>
            <Separator orientation="vertical" className="h-4" />
            <div>{story.readTime}</div>
            <Separator orientation="vertical" className="h-4" />
            <Badge variant="secondary">{story.type || story.category}</Badge>
            {story.isFeatured && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <Badge variant="default">Featured</Badge>
              </>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Excerpt</h3>
            <p className="text-muted-foreground">{story.excerpt}</p>
          </div>

          {/* Content */}
          {story.content && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Full Story</h3>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{story.content}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStoryModal;