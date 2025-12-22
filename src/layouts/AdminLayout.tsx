import { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Image,
  FileText,
  Film,
  Lightbulb,
  LogOut,
  UserPlus,
  BookOpen,
  Mail,
  Users,
  User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, navigate]);

  const menuItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member', 'User'],
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: User,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member', 'User'],
    },
    {
      title: "Contacts",
      url: "/admin/contacts",
      icon: MessageSquare,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Subscriptions",
      url: "/admin/subscriptions",
      icon: Mail,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Events",
      url: "/admin/events",
      icon: Calendar,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: Image,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: FileText,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Stories",
      url: "/admin/stories",
      icon: BookOpen,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Media",
      url: "/admin/media",
      icon: Film,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Ideas",
      url: "/admin/ideas",
      icon: Lightbulb,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Members",
      url: "/admin/members",
      icon: UserPlus,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.profilePic ? `${import.meta.env.VITE_API_BASE_URL}${user.profilePic}` : undefined} alt="Profile" />
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Admin Panel</span>
              <span className="text-xs text-muted-foreground">
                {user?.name} - {user?.role}
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.filter(item => item.roles.includes(user?.role)).map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { logout(); navigate('/admin/login'); }}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;