import * as React from "react";
import { LayoutDashboard, Layers, Zap } from "lucide-react";

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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      isClickable: true,
    },
    {
      title: "Blocks",
      url: "/blocks",
      icon: Layers,
      isClickable: true,
    },
    {
      title: "Events",
      url: "/events",
      icon: Zap,
      isClickable: true,
      items: [
        {
          title: "Transfer",
          url: "/events/transfer",
        },
        {
          title: "Vote",
          url: "/events/vote",
        },
        {
          title: "Swap",
          url: "/events/swap",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="px-2 pb-4">
        <ThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
