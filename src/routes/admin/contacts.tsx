import { createFileRoute } from "@tanstack/react-router";
import { AdminContacts } from "@/components/AdminContacts";

export const Route = createFileRoute("/admin/contacts")({
  component: AdminContacts,
});