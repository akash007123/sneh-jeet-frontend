export interface Media {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  views: number;
  duration: string;
  creator: string;
  featured: boolean;
  published: boolean;
  category?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}