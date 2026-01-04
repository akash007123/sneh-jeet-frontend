import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  User,
  ChevronsUpDown,
  Bell,
  Search,
  Settings
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001');

    socket.on('newContact', (data) => {
      console.log('New contact received:', data);
      setNotifications(prev => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/admin/contacts') {
      setNotifications([]);
    }
  }, [location.pathname]);

  const menuItems = [
    {
      group: "Overview",
      items: [
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
      ]
    },
    {
      group: "Management",
      items: [
        {
          title: "Contacts",
          url: "/admin/contacts",
          icon: MessageSquare,
          roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
        },
        {
          title: "Appointments",
          url: "/admin/appointments",
          icon: Calendar,
          roles: ['Admin', 'Manager', 'Vice-manager', 'HR', 'Volunteer', 'Member'],
        },
        {
          title: "Subscriptions",
          url: "/admin/subscriptions",
          icon: Mail,
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
      ]
    },
    {
      group: "Content",
      items: [
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
      ]
    }
  ];

  if (!user) return null;

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const path = location.pathname.split('/').filter(x => x);
    // Remove 'admin' from the start for cleaner display if desired, or keep it
    return path.map((segment, index) => {
      const url = `/${path.slice(0, index + 1).join('/')}`;
      const isLast = index === path.length - 1;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        url,
        isLast
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/admin">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.profilePic ? `${import.meta.env.VITE_API_BASE_URL}${user.profilePic}` : undefined} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">Admin Panel</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {menuItems.map((group, index) => (
            <SidebarGroup key={group.group}>
              <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.filter(item => item.roles.includes(user.role)).map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.profilePic ? `${import.meta.env.VITE_API_BASE_URL}${user.profilePic}` : undefined} alt={user.name} />
                      <AvatarFallback className="rounded-lg">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.profilePic ? `${import.meta.env.VITE_API_BASE_URL}${user.profilePic}` : undefined} alt={user.name} />
                        <AvatarFallback className="rounded-lg">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user.name}</span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {/* Add settings/notifications here if needed */}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); navigate('/admin/login'); }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b bg-background/50 backdrop-blur-md sticky top-0 z-10 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <BreadcrumbItem key={crumb.url} className="hidden md:block">
                    {crumb.isLast ? (
                      <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink asChild>
                          <Link to={crumb.url}>{crumb.title}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="rounded-lg border bg-background pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
              />
            </div>
            <DropdownMenu onOpenChange={(open) => !open && setNotifications([])}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <DropdownMenuItem key={index} className="flex flex-col items-start p-4">
                      <div className="font-medium">New Contact Form Submission</div>
                      <div className="text-sm text-muted-foreground">
                        From: {notification.name} ({notification.email})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Subject: {notification.subject}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
                {notifications.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/contacts" className="w-full text-center">
                        View All Contacts
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 space-y-4 p-4 pt-0 md:p-8 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;