import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Resources from "./pages/Resources";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import GetInvolved from "./pages/GetInvolved";
import Stories from "./pages/Stories";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import MediaHub from "./pages/MediaHub";
import Dashboard from "./pages/Admin/Dashboard";
import ContactsPage from "./pages/Admin/ContactsPage";
import EventsPage from "./pages/Admin/EventsPage";
import GalleryPage from "./pages/Admin/GalleryPage";
import BlogsPage from "./pages/Admin/BlogsPage";
import MediaPage from "./pages/Admin/MediaPage";
import IdeasPage from "./pages/Admin/IdeasPage";
import Login from "./pages/Admin/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/media" element={<MediaHub />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/contacts" element={<ProtectedRoute><ContactsPage /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
            <Route path="/admin/blogs" element={<ProtectedRoute><BlogsPage /></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><MediaPage /></ProtectedRoute>} />
            <Route path="/admin/ideas" element={<ProtectedRoute><IdeasPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
