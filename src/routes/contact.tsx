import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Reveal, RevealWords } from "@/components/site/Reveal";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Technogate — Start a Project" },
      {
        name: "description",
        content:
          "Talk to Technogate in Karachi, Pakistan. Email Info@technogate.global or call +92 370 0290706 to scope your software, design or Meta ads project.",
      },
      { property: "og:title", content: "Contact Technogate — Start a Project" },
      {
        property: "og:description",
        content:
          "Tell us what you're building and we'll return an architecture, a timeline and a number.",
      },
    ],
  }),
  component: Contact,
});

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "Info@technogate.global",
    href: "mailto:Info@technogate.global",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 370 0290706",
    href: "tel:+923700290706",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Karachi, Pakistan",
  },
];

const fields = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    placeholder: "Jane Doe",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Company name",
  },
];

function Contact() {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sending) {
      return;
    }

    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    // Client-side validation
    if (!name || !email || !message) {
      toast.error("Please fill in your name, email, and project details.");
      setSending(false);
      return;
    }

    try {
      console.log("Submitting contact form:", {
        name,
        email,
        company,
        message,
      });

      const { data, error } = await supabase
        .from("contact_submissions")
        .insert({
          name,
          email,
          company: company || null,
          message,
          status: "New",
        })
        .select()
        .single();

      console.log("Contact submission response:", {
        data,
        error,
      });

      if (error) {
        console.error("Supabase contact submission error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });

        throw error;
      }

      console.log("Contact submission inserted successfully:", data);

      form.reset();

      toast.success("Brief received — we'll be in touch shortly.");
    } catch (err: unknown) {
      console.error("Contact form submission failed:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Failed to send brief. Please try again.";

      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="relative mx-auto grid w-[min(1200px,92vw)] gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <span className="text-xs tracking-[0.35em] text-accent uppercase">
              Contact
            </span>
          </Reveal>

          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold sm:text-5xl">
            <RevealWords text="Let's talk about what you're building." />
          </h1>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Send us the brief. We'll respond within one business day with
              next steps and the right people from our team.
            </p>
          </Reveal>

          <div className="mt-12 space-y-3">
            {details.map((d, i) => (
              <Reveal key={d.label} delay={0.2 + i * 0.07}>
                <div className="flex items-center gap-4 rounded-2xl surface-glass metal-border glow-hover p-5">
                  <d.icon className="size-5 shrink-0 text-accent" />

                  <div>
                    <div className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                      {d.label}
                    </div>

                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-sm font-medium hover:text-accent"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium">
                        {d.value}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-4xl surface-glass metal-border p-8 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  className={
                    f.name === "company" ? "sm:col-span-2" : ""
                  }
                >
                  <label
                    htmlFor={f.name}
                    className="text-[0.65rem] tracking-[0.28em] text-muted-foreground uppercase"
                  >
                    {f.label}
                  </label>

                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.name !== "company"}
                    placeholder={f.placeholder}
                    className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.24, duration: 0.6 }}
                className="sm:col-span-2"
              >
                <label
                  htmlFor="message"
                  className="text-[0.65rem] tracking-[0.28em] text-muted-foreground uppercase"
                >
                  Project details
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="What are you building, and what does success look like?"
                  className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                />
              </motion.div>
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: "var(--gradient-metal)" }}
            >
              {sending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send brief
                  <Send className="size-4" />
                </>
              )}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
