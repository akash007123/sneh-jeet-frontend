import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  CheckCircle,
  Clock,
  Calendar,
  Image as ImageIcon,
  FileText,
  BookOpen,
  Film,
  Lightbulb,
  UserPlus,
  ArrowUpRight,
  Activity,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { token, user } = useAuth();

  // Queries (kept identical to original for data integrity)
  const { data: contacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch contacts");
      return response.json();
    },
  });

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/event`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json();
    },
  });

  const { data: gallery } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gallery`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch gallery");
      return response.json();
    },
  });

  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch blogs");
      return response.json();
    },
  });

  const { data: stories } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/story`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch stories");
      return response.json();
    },
  });

  const { data: media } = useQuery({
    queryKey: ["media"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/media`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch media");
      return response.json();
    },
  });

  const { data: ideas } = useQuery({
    queryKey: ["ideas"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ideas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch ideas");
      return response.json();
    },
  });

  const { data: members } = useQuery({
    queryKey: ["memberships"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/membership`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch memberships");
      return response.json();
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
  });

  const stats = {
    totalContacts: contacts?.length || 0,
    newContacts: contacts?.filter((c: any) => c.status === "New").length || 0,
    pendingContacts: contacts?.filter((c: any) => c.status === "Pending").length || 0,
    resolvedContacts: contacts?.filter((c: any) => c.status === "Resolved").length || 0,
    totalEvents: events?.length || 0,
    totalGallery: gallery?.length || 0,
    totalBlogs: blogs?.blogs?.length || 0,
    featuredBlogs: blogs?.blogs?.filter((b: any) => b.isFeatured).length || 0,
    totalStories: stories?.stories?.length || 0,
    totalMedia: media?.media?.length || 0,
    totalIdeas: ideas?.ideas?.length || 0,
    totalMembers: members?.length || 0,
    totalUsers: users?.length || 0,
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your NGO today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button>Download Report</Button>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Main Stats Row */}
          <motion.div variants={item} className="lg:col-span-2 row-span-2">
            <Card className="h-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-xl overflow-hidden relative group">
              <div className="absolute right-0 top-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
              <CardHeader>
                <CardTitle className="text-white/90 font-medium">Total Engagement</CardTitle>
                <CardDescription className="text-blue-100">Across all platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{stats.totalContacts + stats.totalUsers + stats.totalMembers}</span>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded-full">+12% from last month</span>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-blue-200 text-sm">Users</p>
                    <p className="text-xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Members</p>
                    <p className="text-xl font-bold">{stats.totalMembers}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Contacts</p>
                    <p className="text-xl font-bold">{stats.totalContacts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stat Cards */}
          <motion.div variants={item}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">New Inquiries</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.newContacts}</div>
                <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> Requires attention
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Issues</CardTitle>
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <Clock className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingContacts}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content Group */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card className="h-full border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-500" /> Content Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <FileText className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-bold">{stats.totalBlogs}</div>
                    <div className="text-xs text-muted-foreground">Blogs</div>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <ImageIcon className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-bold">{stats.totalGallery}</div>
                    <div className="text-xs text-muted-foreground">Photos</div>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <Film className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-bold">{stats.totalMedia}</div>
                    <div className="text-xs text-muted-foreground">Videos</div>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <BookOpen className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-bold">{stats.totalStories}</div>
                    <div className="text-xs text-muted-foreground">Stories</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ideas & Innovation */}
          <motion.div variants={item} className="lg:row-span-2">
            <Card className="h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" /> Ideas
                </CardTitle>
                <CardDescription className="text-slate-400">Community Suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold text-center py-4">{stats.totalIdeas}</div>
                <Button variant="secondary" className="w-full text-xs">View All Ideas</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events Card */}
          <motion.div variants={item}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
                <Activity className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEvents}</div>
                <p className="text-xs text-muted-foreground mt-1">Scheduled events</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Members Card */}
          <motion.div variants={item}>
            <Card className="hover:shadow-md transition-shadow bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Active Members</CardTitle>
                <Users className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.totalMembers}</div>
                <div className="h-1 w-full bg-emerald-200 mt-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[70%]"></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
