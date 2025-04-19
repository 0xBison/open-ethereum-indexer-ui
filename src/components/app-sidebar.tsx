import * as React from "react";
import {
  LayoutDashboard,
  Layers,
  Zap,
  type LucideIcon,
  Fuel,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { ConnectionStatusIndicator } from "./connection-status-indicator";
import { useState, useEffect } from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const API_ROOT = import.meta.env.VITE_API_ROOT;

// Function to fetch event types
const fetchEventTypes = async (): Promise<string[]> => {
  const response = await fetch(`${API_ROOT}/events`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  // Check the actual shape of the data
  if (!Array.isArray(data)) {
    // If the data is nested in a property, try to extract it
    if (data && Array.isArray(data.events)) {
      return data.events;
    }
    if (data && Array.isArray(data.data)) {
      return data.data;
    }
    console.error("Unexpected API response format:", data);
    throw new Error("Invalid response format");
  }

  return data;
};

// Define the structure for navigation items (adjust if needed based on NavMain props)
interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  isClickable?: boolean;
  items?: Omit<NavItem, "icon" | "isClickable" | "items">[]; // Sub-items don't need icons etc.
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOnline, setIsOnline] = useState(true);

  const {
    data: eventTypes,
    isLoading,
    isError,
    error,
  } = useQuery<string[], Error>({
    queryKey: ["eventTypes"],
    queryFn: fetchEventTypes,
    staleTime: 120 * 1000,
    retry: false,
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${API_ROOT}/events`);
        setIsOnline(response.ok);
      } catch {
        setIsOnline(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching event types:", error.message);
    }
  }, [error]);

  // Prepare navigation items
  const navMainItems: NavItem[] = React.useMemo(() => {
    const staticItems: NavItem[] = [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        isActive: currentPath === "/",
      },
      {
        title: "Blocks",
        url: "/blocks",
        icon: Layers,
        isActive: currentPath === "/blocks",
      },
    ];

    const eventNavItems: NavItem[] = [];
    if (eventTypes) {
      eventNavItems.push({
        title: "Events",
        url: "/events",
        icon: Zap,
        isClickable: true,
        isActive: currentPath.startsWith("/events"),
        items: eventTypes.map((eventType) => ({
          title: eventType,
          url: `/events/${eventType}`,
          isActive: currentPath === `/events/${eventType}`,
        })),
      });
    } else if (isLoading) {
      // Optionally add a placeholder or loading indicator for Events
      eventNavItems.push({
        title: "Events",
        url: "/events",
        icon: Zap,
        isClickable: false, // Not clickable while loading
        items: [{ title: "Loading...", url: "#" }],
      });
    } else if (isError) {
      // Optionally add an error indicator
      eventNavItems.push({
        title: "Events (Error)",
        url: "/events",
        icon: Zap,
        isClickable: false,
      });
    }

    // Add Gas Tracker last
    return [
      ...staticItems,
      ...eventNavItems,
      {
        title: "Gas Tracker",
        url: "/gas",
        icon: Fuel,
        isActive: currentPath === "/gas",
      },
    ];
  }, [currentPath, eventTypes, isLoading, isError]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Logo className="h-6 w-6" />
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
            Open EVM Indexer
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter className="px-2 pb-4">
        <div className="flex flex-col gap-2">
          <ThemeToggle />
          <ConnectionStatusIndicator isOnline={isOnline} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
