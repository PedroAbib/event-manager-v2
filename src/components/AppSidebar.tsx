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
      <SidebarHeader className="flex  justify-between">
        <div className="flex items-center">
          <SidebarTrigger className="w-10 h-10 min-w-10 min-h-10"/>
          {state === "expanded" && (
            <h2 className="text-xl font-bold p-2">Event Manager</h2>
          )}
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
                          "flex items-center gap-2"
                        )}
                      >
                        <item.icon className='w-5 h-5 min-w-5 min-h-5'/>
                        <span className="font-medium">{item.label}</span>
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
