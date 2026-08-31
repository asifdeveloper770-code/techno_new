
import { useEffect, useState } from "react";
import {
  Loader2,
  Trash2,
  Mail,
  Building,
  Calendar,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

function FormattedDate({ dateString }: { dateString: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <span>{new Date(dateString).toLocaleDateString()}</span>;
}

export function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error fetching contacts:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      setContacts([]);
    } else {
      setContacts(data ?? []);
    }

    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Supabase Error updating contact:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return;
    }

    await fetchContacts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase Error deleting contact:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return;
    }

    await fetchContacts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contact Inquiries</h1>

          <p className="text-sm text-muted-foreground">
            Manage inbound project briefs and messages from the contact form.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="mr-2 size-6 animate-spin" />
          Loading inquiries...
        </div>
      ) : contacts.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          No contact submissions found.
        </div>
      ) : (
        <div className="grid gap-4">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="space-y-4 rounded-xl border bg-card p-6 shadow-xs transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{c.name}</h3>

                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="size-3 text-accent" />
                      {c.email}
                    </span>

                    {c.company && (
                      <span className="flex items-center gap-1">
                        <Building className="size-3 text-accent" />
                        {c.company}
                      </span>
                    )}

                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-accent" />
                      <FormattedDate dateString={c.created_at} />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={c.status ?? "New"}
                    onChange={(e) =>
                      updateStatus(c.id, e.target.value)
                    }
                    className="rounded-lg border bg-background px-3 py-1.5 text-xs focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    className="rounded-lg p-2 text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-lg bg-secondary/50 p-4 text-sm leading-relaxed text-foreground">
                {c.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
