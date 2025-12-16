export interface Section {
  sectionTitle: string;
  sectionContent: string;
  sectionImage?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  isFeatured: boolean;
  tags: string[];
  readTime: string;
  authorName: string;
  authorBio?: string;
  publishedDate: string;
  category: string;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  sections: Section[];
  createdAt: string;
}