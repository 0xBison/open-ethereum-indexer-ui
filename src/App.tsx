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
import React, { useEffect } from "react";
import { ThemeProvider } from "@/lib/theme-provider";
import { Dashboard } from "@/components/dashboard";
import { BlocksPage } from "@/components/blocks-page";
import { EventsPage } from "@/components/events-page";

// Create basic page components
const Blocks = () => <div className="p-4">Blocks Page</div>;
const Events = () => <div className="p-4">Events Overview Page</div>;
const EventPage = () => {
  const eventName = window.location.pathname.split("/").pop();
  return <div className="p-4">Event Details: {eventName}</div>;
};

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
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <Router>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar className="hidden md:flex" />
            <main className="flex-1">
              <PageHeader />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/blocks" element={<BlocksPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:eventName" element={<EventsPage />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  );
}
