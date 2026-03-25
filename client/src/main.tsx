import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Switch, Route, Link } from "wouter";
import { Calendar, Users, QrCode, Plus, ChevronRight, LayoutDashboard } from "lucide-react";
import "./index.css";

const queryClient = new QueryClient();

function Dashboard() {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["/api/sessions"],
  });

  return (
    <div className="flex flex-col gap-8">
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground">Here's an overview of your attendance sessions.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Create Session
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Calendar size={20} />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
          <h3 className="text-2xl font-bold">{sessions?.length || 0}</h3>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
            <Users size={20} />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Active Participants</p>
          <h3 className="text-2xl font-bold">128</h3>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
            <QrCode size={20} />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Scans Today</p>
          <h3 className="text-2xl font-bold">42</h3>
        </div>
      </div>

      <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-lg">Recent Sessions</h3>
          <button className="text-sm text-primary font-medium hover:underline">View all</button>
        </div>
        <div className="divide-y divide-border">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground italic">Loading sessions...</div>
          ) : sessions?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground italic">No sessions found. Create your first one!</div>
          ) : sessions?.map((session: any) => (
            <div key={session.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  {session.title.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-primary transition-colors">{session.title}</h4>
                  <p className="text-xs text-muted-foreground">{session.status.toUpperCase()} • {new Date(session.startTime).toLocaleDateString()}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border p-6 flex flex-col gap-8 hidden lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <QrCode size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">AttendX</h1>
          </div>

          <nav className="flex flex-col gap-2">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={Calendar} label="Sessions" />
            <SidebarItem icon={Users} label="Participants" />
          </nav>

          <div className="mt-auto bg-muted/50 p-4 rounded-2xl flex flex-col gap-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Architecture and Design foundations are now fully operational.
            </p>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
             <div className="lg:hidden flex items-center gap-3">
                <QrCode size={24} className="text-primary" />
                <span className="font-bold text-lg">AttendX</span>
             </div>
             <div className="ml-auto flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold">Instructor Account</p>
                  <p className="text-xs text-muted-foreground">Admin Access</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/10" />
             </div>
          </header>

          <main className="flex-1 p-8 max-w-6xl w-full mx-auto">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route>
                <div className="text-center p-20">
                  <h1 className="text-2xl font-bold">404 Page Not Found</h1>
                  <Link href="/" className="text-primary hover:underline mt-4 inline-block">Return to Dashboard</Link>
                </div>
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find root element");

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
