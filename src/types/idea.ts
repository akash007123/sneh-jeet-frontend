export interface Idea {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: 'open' | 'in-progress' | 'planned';
  author: string;
  likes: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}