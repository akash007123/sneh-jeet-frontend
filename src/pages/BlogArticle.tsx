import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Tag,
  BookOpen,
  MessageCircle,
  Send,
  Mail,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import LGBTLoading from "@/components/ui/LGBTLoading";

interface Comment {
  _id: string;
  name: string;
  email: string;
  comment: string;
  profileImage?: string;
  createdAt: string;
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  const [readingProgress, setReadingProgress] = useState(0);

  // Comment form state
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    profileImage: null as File | null,
    comment: '',
  });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit comment state
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    comment: '',
    profileImage: null as File | null,
  });
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current blog post
  const { data: articleData, isLoading: articleLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog/slug/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json();
    },
    enabled: !!slug,
  });

  // Fetch all blogs for related posts
  const { data: blogsData } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return response.json();
    },
  });

  const article = articleData;
  const blogPosts = blogsData?.blogs || [];

  // Fetch comments for this blog
  const { data: commentsData } = useQuery({
    queryKey: ['comments', article?._id],
    queryFn: async () => {
      if (!article?._id) return { comments: [], total: 0 };
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/blog/${article._id}`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      return response.json();
    },
    enabled: !!article?._id,
  });

  // Fetch comment count
  const { data: countData } = useQuery({
    queryKey: ['comment-count', article?._id],
    queryFn: async () => {
      if (!article?._id) return { count: 0 };
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/blog/${article._id}/count`);
      if (!response.ok) throw new Error('Failed to fetch comment count');
      return response.json();
    },
    enabled: !!article?._id,
  });

  // Update SEO meta tags
  useEffect(() => {
    if (article) {
      // Update document title
      document.title = article.metaTitle || `${article.title} | PrideConnect`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.metaDescription || article.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = article.metaDescription || article.excerpt;
        document.head.appendChild(meta);
      }

      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', article.seoKeywords || article.tags.join(', '));
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = article.seoKeywords || article.tags.join(', ');
        document.head.appendChild(meta);
      }

      // Update Open Graph tags
      const updateMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      updateMetaTag('og:title', article.metaTitle || article.title);
      updateMetaTag('og:description', article.metaDescription || article.excerpt);
      updateMetaTag('og:type', 'article');
      updateMetaTag('og:url', window.location.href);
      if (article.featuredImage) {
        updateMetaTag('og:image', `${import.meta.env.VITE_API_BASE_URL}${article.featuredImage}`);
      }
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'PrideConnect - Supporting LGBTQIA+ Community';
    };
  }, [article]);

  // Reading progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Update comments state when data is fetched
  useEffect(() => {
    if (commentsData) {
      setComments(commentsData.comments || []);
    }
    if (countData) {
      setCommentCount(countData.count || 0);
    }
  }, [commentsData, countData]);

  if (articleLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center py-20">
          <LGBTLoading
            message="Loading article..."
            size="lg"
            variant="pride"
          />
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Button asChild variant="hero">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const relatedPosts = article ? blogPosts
    .filter(
      (post) => post.slug !== article.slug && post.category === article.category
    )
    .slice(0, 3) : [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Article link has been copied to your clipboard.",
    });
  };

  // Handle comment form input changes
  const handleCommentFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      setCommentForm(prev => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setCommentForm(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentForm.name || !commentForm.email || !commentForm.comment) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!article?._id) {
      toast({
        title: "Error",
        description: "Unable to submit comment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingComment(true);

    try {
      const formData = new FormData();
      formData.append('blogId', article._id);
      formData.append('name', commentForm.name);
      formData.append('email', commentForm.email);
      formData.append('comment', commentForm.comment);
      if (commentForm.profileImage) {
        formData.append('profileImage', commentForm.profileImage);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // Reset form
      setCommentForm({
        name: '',
        email: '',
        profileImage: null,
        comment: '',
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Refresh comments and count
      queryClient.invalidateQueries({ queryKey: ['comments', article._id] });
      queryClient.invalidateQueries({ queryKey: ['comment-count', article._id] });

      toast({
        title: "Comment Submitted!",
        description: "Thank you for your comment!",
      });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Handle edit comment form input changes
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      setEditForm(prev => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Start editing a comment
  const startEditingComment = (comment: Comment) => {
    setEditingComment(comment._id);
    setEditForm({
      name: comment.name,
      email: comment.email,
      comment: comment.comment,
      profileImage: null,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingComment(null);
    setEditForm({
      name: '',
      email: '',
      comment: '',
      profileImage: null,
    });
    if (editFileInputRef.current) {
      editFileInputRef.current.value = '';
    }
  };

  // Update comment
  const handleUpdateComment = async (e: React.FormEvent, commentId: string) => {
    e.preventDefault();

    if (!editForm.name || !editForm.email || !editForm.comment) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingComment(true);

    try {
      const formData = new FormData();
      formData.append('name', editForm.name);
      formData.append('email', editForm.email);
      formData.append('comment', editForm.comment);
      if (editForm.profileImage) {
        formData.append('profileImage', editForm.profileImage);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      // Reset edit form
      cancelEditing();

      // Refresh comments
      queryClient.invalidateQueries({ queryKey: ['comments', article._id] });

      toast({
        title: "Comment Updated!",
        description: "The comment has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingComment(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      // Refresh comments and count
      queryClient.invalidateQueries({ queryKey: ['comments', article._id] });
      queryClient.invalidateQueries({ queryKey: ['comment-count', article._id] });

      toast({
        title: "Comment Deleted",
        description: "The comment has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title);

  return (
    <MainLayout>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 relative overflow-hidden">
        {article.featuredImage ? (
          <div className="absolute inset-0">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${article.featuredImage}`}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        )}
        <div className="relative container-padding mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/blog")}
              className="mb-6 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            <Badge variant="secondary" className="mb-4 capitalize bg-white/90 text-foreground">
              {article.category.replace("-", " ")}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {article.title}
            </h1>

            <div className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.excerpt }} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">{article.authorName}</p>
                  <p className="text-sm text-white/70">{article.authorBio}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      {article.sections && article.sections.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container-padding mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border/50 p-6"
            >
              <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Table of Contents
              </h2>
              <nav>
                <ul className="space-y-2">
                  {article.sections.map((section, index) => (
                    <li key={index}>
                      <a
                        href={`#section-${index}`}
                        className="text-primary hover:text-primary/80 transition-colors text-sm"
                      >
                        {section.sectionTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="py-12 md:py-16 bg-background">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_200px] gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            >
              {/* Main content */}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />

              {/* Dynamic sections */}
              {article.sections && article.sections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  id={`section-${sectionIndex}`}
                  className="mt-12 scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  {section.sectionImage && (
                    <div className="mb-6">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${section.sectionImage}`}
                        alt={section.sectionTitle}
                        className="w-full max-w-3xl mx-auto rounded-xl shadow-soft"
                      />
                      <div className="text-sm text-muted-foreground mt-3 text-center">
                        By {article.authorName} on {new Date(article.publishedDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  )}
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6 leading-tight">
                    {section.sectionTitle}
                  </h2>
                  <div className="prose prose-lg max-w-none
                    prose-headings:font-display prose-headings:text-foreground
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base
                    prose-li:text-muted-foreground
                    prose-strong:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground">
                    <div dangerouslySetInnerHTML={{ __html: section.sectionContent }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-6">
              {/* Share */}
              <motion.div
                className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Share Article
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help spread awareness by sharing this article
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="rounded-xl hover:bg-primary/10 hover:border-primary/20 transition-colors"
                    aria-label="Copy link"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Badge variant="secondary" className="capitalize hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container-padding mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-primary" />
              Comments ({commentCount})
            </h2>
            <p className="text-muted-foreground text-lg">
              Join the conversation and share your thoughts
            </p>
          </motion.div>

          {/* Comment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border/50 p-8 mb-12 shadow-soft"
          >
            <h3 className="text-xl font-display font-bold text-foreground mb-6">
              Leave a Comment
            </h3>
            <form onSubmit={handleSubmitComment} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={commentForm.name}
                    onChange={handleCommentFormChange}
                    placeholder="Your name"
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={commentForm.email}
                    onChange={handleCommentFormChange}
                    placeholder="your.email@example.com"
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profileImage" className="text-sm font-medium text-foreground">
                  Profile Picture (Optional)
                </Label>
                <Input
                  ref={fileInputRef}
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleCommentFormChange}
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a profile picture (max 2MB, JPG, PNG, GIF, WebP)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-sm font-medium text-foreground">
                  Comment *
                </Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={commentForm.comment}
                  onChange={handleCommentFormChange}
                  placeholder="Share your thoughts about this article..."
                  required
                  rows={5}
                  className="rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmittingComment}
                className="w-full md:w-auto px-8 py-3 rounded-xl"
                variant="hero"
              >
                {isSubmittingComment ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Comments List */}
          {comments.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {comments.slice(0, showAllComments ? comments.length : 3).map((comment, index) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
                >
                  {editingComment === comment._id ? (
                    // Edit Form
                    <form onSubmit={(e) => handleUpdateComment(e, comment._id)} className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          {editForm.profileImage ? (
                            <img
                              src={URL.createObjectURL(editForm.profileImage)}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : comment.profileImage ? (
                            <img
                              src={`${import.meta.env.VITE_API_BASE_URL}${comment.profileImage}`}
                              alt={`${comment.name}'s profile`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <User className="w-6 h-6 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="grid md:grid-cols-2 gap-3">
                            <Input
                              name="name"
                              value={editForm.name}
                              onChange={handleEditFormChange}
                              placeholder="Name"
                              required
                              className="rounded-xl"
                            />
                            <Input
                              name="email"
                              type="email"
                              value={editForm.email}
                              onChange={handleEditFormChange}
                              placeholder="Email"
                              required
                              className="rounded-xl"
                            />
                          </div>
                          <Input
                            ref={editFileInputRef}
                            name="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleEditFormChange}
                            className="rounded-xl"
                          />
                          <Textarea
                            name="comment"
                            value={editForm.comment}
                            onChange={handleEditFormChange}
                            placeholder="Comment"
                            required
                            rows={3}
                            className="rounded-xl resize-none"
                          />
                          <div className="flex gap-2">
                            <Button
                              type="submit"
                              size="sm"
                              disabled={isUpdatingComment}
                              className="rounded-xl"
                            >
                              {isUpdatingComment ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              ) : (
                                <>
                                  <Check className="w-4 h-4 mr-1" />
                                  Save
                                </>
                              )}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={cancelEditing}
                              className="rounded-xl"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    // Display Comment
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        {comment.profileImage ? (
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${comment.profileImage}`}
                            alt={`${comment.name}'s profile`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-foreground">{comment.name}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          {user && user.role === 'Admin' && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => startEditingComment(comment)}
                                className="h-8 w-8 p-0 hover:bg-primary/10 text-blue-500"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteComment(comment._id)}
                                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap max-h-[200px] overflow-auto">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {comments.length > 3 && (
                <div className="text-center pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="rounded-xl"
                  >
                    {showAllComments
                      ? `Show Less`
                      : `Show ${comments.length - 3} More Comments`
                    }
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                No comments yet
              </h3>
              <p className="text-muted-foreground">
                Be the first to share your thoughts on this article!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container-padding mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Related Articles
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover more content that might interest you
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-medium transition-all duration-300 h-full hover:-translate-y-1">
                      {post.featuredImage && (
                        <div className="h-40 overflow-hidden">
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${post.featuredImage}`}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <Badge
                          variant="secondary"
                          className="mb-3 capitalize bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {post.category.replace("-", " ")}
                        </Badge>
                        <h3 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        <div className="text-muted-foreground text-sm line-clamp-3 mb-4 prose max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, community news, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="px-8">
                <Link to="/contact">Subscribe Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/blog">View All Articles</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BlogArticle;
