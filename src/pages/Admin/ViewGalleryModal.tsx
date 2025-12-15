import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

interface ViewGalleryModalProps {
  galleryItem: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewGalleryModal = ({ galleryItem, isOpen, onClose }: ViewGalleryModalProps) => {
  if (!galleryItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>View Gallery Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {galleryItem.imageUrl && (
            <div className="flex justify-center">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${galleryItem.imageUrl}`}
                alt={galleryItem.title}
                className="max-w-full max-h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Title</label>
              <p className="text-sm">{galleryItem.title}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <p className="text-sm capitalize">{galleryItem.category}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-sm">{galleryItem.description || 'No description'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Created At</label>
              <p className="text-sm">{new Date(galleryItem.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewGalleryModal;