import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/lib/theme-provider";
import { BlocksPage } from "@/components/blocks-page";
import { EventsPage } from "@/components/events-page";
import { EventDetailPage } from "@/components/event-detail-page";
import { Dashboard } from "./components/dashboard";
import { GasTrackerPage } from "@/components/gas-tracker";
import { ConnectionStatusBanner } from "@/components/connection-status-banner";
import { ConnectionProvider } from "@/contexts/connection-context";

function PageHeader() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Update page title
  useEffect(() => {
    let title = "Home";
    if (pathSegments.length > 0) {
      title =
        pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() +
        pathSegments[pathSegments.length - 1].slice(1);
    }
    document.title = `${title} | Open EVM Indexer`;
  }, [pathSegments]);

  return (
    <header className="flex h-16 items-center px-4 md:px-6">
      <SidebarTrigger className="mr-2" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <React.Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <span className="font-medium">
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </span>
                  ) : (
                    <Link
                      to={path}
                      className="transition-colors hover:text-foreground"
                    >
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </Link>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

export default function App() {
  const [showConnectionError, setShowConnectionError] = useState(false);

  // Calculate additional margin for the content container
  const contentStyle = {
    marginTop: showConnectionError ? "56px" : "0", // Adjust banner height as needed
  };

  // Create a style element to override the sidebar positioning when banner is visible
  useEffect(() => {
    // Create a style element if it doesn't exist
    let styleEl = document.getElementById("sidebar-override-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "sidebar-override-style";
      document.head.appendChild(styleEl);
    }

    // Update the style content based on banner visibility
    if (showConnectionError) {
      styleEl.textContent = `
        /* Override sidebar positioning when banner is visible */
        .fixed[data-sidebar="sidebar"],
        div[class*="fixed inset-y-0 z-10"] {
          top: 56px !important;
          height: calc(100vh - 56px) !important;
        }
      `;
    } else {
      styleEl.textContent = "";
    }

    return () => {
      if (styleEl) {
        styleEl.textContent = "";
      }
    };
  }, [showConnectionError]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ROOT}/events`);
        setShowConnectionError(!response.ok);
      } catch {
        setShowConnectionError(true);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ConnectionProvider>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <Router>
          <div className="min-h-screen flex flex-col relative">
            <ConnectionStatusBanner
              isVisible={showConnectionError}
              onDismiss={() => setShowConnectionError(false)}
            />

            <div className="flex-1 flex transition-all" style={contentStyle}>
              <SidebarProvider>
                <AppSidebar className="hidden md:flex" />
                <main className="flex-1 w-full">
                  <PageHeader />
                  <div className="w-full">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/blocks" element={<BlocksPage />} />
                      <Route path="/gas" element={<GasTrackerPage />} />
                      <Route path="/events" element={<EventsPage />} />
                      <Route
                        path="/events/:eventId"
                        element={<EventDetailPage />}
                      />
                    </Routes>
                  </div>
                </main>
              </SidebarProvider>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ConnectionProvider>
  );
}
