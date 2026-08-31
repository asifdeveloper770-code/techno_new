import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  Trash2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AdminContacts } from "@/components/AdminContacts";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "roles" | "contacts">("overview");

  const [roles, setRoles] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [newRole, setNewRole] = useState({
    title: "",
    type: "Full-time",
    location: "",
    team: "Engineering",
    copy: "",
    skills: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    const { data: rolesData } = await supabase.from("job_roles").select("*");
    const { data: appsData } = await supabase.from("applications").select("*");
    const { data: contactsData } = await supabase.from("contact_submissions").select("*");

    if (rolesData) setRoles(rolesData);
    if (appsData) setApplications(appsData);
    if (contactsData) setContacts(contactsData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = newRole.skills.split(",").map((s) => s.trim()).filter(Boolean);
    const { error } = await supabase.from("job_roles").insert([{ ...newRole, skills: skillsArray }]);
    if (error) return alert(error.message);

    setNewRole({ title: "", type: "Full-time", location: "", team: "Engineering", copy: "", skills: "" });
    fetchData();
  };

  const handleDeleteRole = async (id: string) => {
    await supabase.from("job_roles").delete().eq("id", id);
    fetchData();
  };

  const updateAppStatus = async (id: string, status: string) => {
    await supabase.from("applications").update({ status }).eq("id", id);
    fetchData();
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border p-6 space-y-4">
          <h2 className="text-xl font-semibold">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm text-foreground bg-background"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm text-foreground bg-background"
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-2 text-sm font-medium text-primary-foreground cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-card p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-wide">Technogate Admin</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "overview" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <LayoutDashboard className="size-4" /> Overview
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "contacts" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <MessageSquare className="size-4" /> Inquiries ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "applications" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <FileText className="size-4" /> Applications ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "roles" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <Briefcase className="size-4" /> Job Roles ({roles.length})
            </button>
          </nav>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <LogOut className="size-4" /> Sign Out
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-xl border p-6 bg-card">
                <span className="text-sm text-muted-foreground">New Inquiries</span>
                <p className="mt-2 text-3xl font-bold">
                  {contacts.filter((c) => c.status === "New").length}
                </p>
              </div>
              <div className="rounded-xl border p-6 bg-card">
                <span className="text-sm text-muted-foreground">Total Inquiries</span>
                <p className="mt-2 text-3xl font-bold">{contacts.length}</p>
              </div>
              <div className="rounded-xl border p-6 bg-card">
                <span className="text-sm text-muted-foreground">Total Applications</span>
                <p className="mt-2 text-3xl font-bold">{applications.length}</p>
              </div>
              <div className="rounded-xl border p-6 bg-card">
                <span className="text-sm text-muted-foreground">Active Roles</span>
                <p className="mt-2 text-3xl font-bold">{roles.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contacts" && <AdminContacts />}

        {activeTab === "applications" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Job Applications</h1>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-secondary/50 font-semibold">
                  <tr>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">Applied Role</th>
                    <th className="p-4">Portfolio</th>
                    <th className="p-4">CV / Resume</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td className="p-4">
                        <p className="font-semibold">{app.full_name}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                      </td>
                      <td className="p-4">{app.job_title}</td>
                      <td className="p-4">
                        {app.portfolio_url ? (
                          <a href={app.portfolio_url} target="_blank" className="text-accent flex items-center gap-1 hover:underline">
                            Link <ExternalLink className="size-3" />
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="p-4">
                        <a href={app.resume_url} target="_blank" className="text-accent flex items-center gap-1 hover:underline">
                          View CV <ExternalLink className="size-3" />
                        </a>
                      </td>
                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => updateAppStatus(app.id, e.target.value)}
                          className="rounded border px-2 py-1 text-xs bg-background"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Accepted">Accepted</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "roles" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-4">Add New Job Role</h1>
              <form onSubmit={handleCreateRole} className="grid gap-4 max-w-xl border p-6 rounded-xl bg-card">
                <input
                  type="text"
                  placeholder="Role Title"
                  required
                  value={newRole.title}
                  onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
                  className="rounded-lg border px-3 py-2 text-sm bg-background"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Type (e.g. Full-time)"
                    required
                    value={newRole.type}
                    onChange={(e) => setNewRole({ ...newRole, type: e.target.value })}
                    className="rounded-lg border px-3 py-2 text-sm bg-background"
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Karachi / Hybrid)"
                    required
                    value={newRole.location}
                    onChange={(e) => setNewRole({ ...newRole, location: e.target.value })}
                    className="rounded-lg border px-3 py-2 text-sm bg-background"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Team (e.g. Engineering)"
                  required
                  value={newRole.team}
                  onChange={(e) => setNewRole({ ...newRole, team: e.target.value })}
                  className="rounded-lg border px-3 py-2 text-sm bg-background"
                />
                <textarea
                  placeholder="Job Description Copy"
                  required
                  value={newRole.copy}
                  onChange={(e) => setNewRole({ ...newRole, copy: e.target.value })}
                  className="rounded-lg border px-3 py-2 text-sm bg-background h-24"
                />
                <input
                  type="text"
                  placeholder="Skills (comma separated, e.g. React, TypeScript)"
                  value={newRole.skills}
                  onChange={(e) => setNewRole({ ...newRole, skills: e.target.value })}
                  className="rounded-lg border px-3 py-2 text-sm bg-background"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground"
                >
                  <Plus className="size-4" /> Add Role
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Active Roles</h2>
              <div className="grid gap-4">
                {roles.map((r) => (
                  <div key={r.id} className="flex items-center justify-between border p-4 rounded-xl bg-card">
                    <div>
                      <h3 className="font-semibold">{r.title}</h3>
                      <p className="text-xs text-muted-foreground">{r.team} • {r.location} • {r.type}</p>
                    </div>
                    <button onClick={() => handleDeleteRole(r.id)} className="text-destructive p-2 hover:bg-secondary rounded-lg">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );

}