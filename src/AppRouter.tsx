import { Routes, Route } from "react-router-dom";
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
import MediaDetail from "./pages/MediaDetail";
import Dashboard from "./pages/Admin/Dashboard";
import ContactsPage from "./pages/Admin/ContactsPage";
import SubscriptionsPage from "./pages/Admin/SubscriptionsPage";
import EventsPage from "./pages/Admin/EventsPage";
import GalleryPage from "./pages/Admin/GalleryPage";
import BlogsPage from "./pages/Admin/BlogsPage";
import StoriesPage from "./pages/Admin/StoriesPage";
import MediaPage from "./pages/Admin/MediaPage";
import IdeasPage from "./pages/Admin/IdeasPage";
import MembersPage from "./pages/Admin/MembersPage";
import Login from "./pages/Admin/Login";
import NotFound from "./pages/NotFound";

const AppRouter = () => (
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
    <Route path="/media/:slug" element={<MediaDetail />} />
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin" element={<Dashboard />} />
    <Route path="/admin/contacts" element={<ContactsPage />} />
    <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
    <Route path="/admin/events" element={<EventsPage />} />
    <Route path="/admin/gallery" element={<GalleryPage />} />
    <Route path="/admin/blogs" element={<BlogsPage />} />
    <Route path="/admin/stories" element={<StoriesPage />} />
    <Route path="/admin/media" element={<MediaPage />} />
    <Route path="/admin/ideas" element={<IdeasPage />} />
    {/* <Route path="/admin/members" element={<MembersPage />} /> */}

    <Route
      path="/admin/members"
      element={
        <ProtectedRoute roles={["Admin", "HR"]}>
          <MembersPage />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
