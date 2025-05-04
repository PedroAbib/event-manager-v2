import { NavLink } from 'react-router-dom';
import { Calendar, Home, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarTrigger,
  useSidebar
} from "src/components/ui/sidebar";
import { cn } from "src/lib/utils";
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/registrations', label: 'Registrations', icon: Users },
  { path: '/events', label: 'Events', icon: Calendar },
];

export function AppSidebar() {
  const { state } = useSidebar();
  
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className="flex justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="w-9 h-9 min-w-9 min-h-9"/>
          <h2 className={cn(
            "text-xl font-bold p-2",
            "transition-all duration-300 ease-in-out",
            "whitespace-nowrap overflow-hidden",
            state === "collapsed" ? "opacity-0 max-w-0 px-0" : "opacity-100 max-w-full"
          )}>Event Manager</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <NavLink to={item.path}>
                    {({ isActive }) => (
                      <SidebarMenuButton 
                        isActive={isActive} 
                        tooltip={item.label} 
                        className={cn(
                          "cursor-pointer h-10 text-base",
                          "flex items-center gap-2",
                          state === "collapsed" && "justify-center"
                        )}
                      >
                        <item.icon className={cn(
                          'w-5 h-5 min-w-5 min-h-5 transition-all duration-200',
                          isActive 
                            ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] filter brightness-125' 
                            : 'opacity-60'
                        )}/>
                        <span className={cn(
                          "font-medium",
                          state === "collapsed" && "hidden"
                        )}>
                          {item.label}
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <ThemeToggle/>
      </SidebarFooter>
    </Sidebar>
  );
}
