import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import logo from "@/assets/logo1.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
] as const;

const aboutLinks = [
  { to: "/work", label: "Our Work" },
  { to: "/project-analysis", label: "Project Analysis" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 z-50 w-full"
    >
      <div
        className={`mx-auto mt-4 flex w-[min(1240px,94vw)] items-center justify-between rounded-full border border-border px-5 py-3 transition-all duration-500 ${scrolled ? "bg-background/90 shadow-lg backdrop-blur-xl" : "bg-background/60 backdrop-blur-md"
          }`}
      >
        <Link
          to="/"
          className="flex h-12 w-36 items-center justify-start overflow-visible"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Technogate logo"
            className="h-14 w-28 object-contain"
          />
        </Link>
        


        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{
                className: "text-foreground bg-secondary",
              }}
              inactiveProps={{
                className: "text-muted-foreground",
              }}
              className="rounded-full px-3.5 py-2 text-[0.8rem] font-medium transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}

          {/* About Us Dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="
      flex items-center gap-1
      rounded-full
      px-3.5 py-2
      text-[0.8rem]
      font-medium
      text-muted-foreground
      transition-colors
      hover:text-accent
    "
            >
              About Us

              <svg
                className="
        h-3.5 w-3.5
        transition-transform duration-300
        group-hover:rotate-180
      "
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className="
      invisible
      absolute
      left-1/2
      top-full
      z-50
      w-60
      -translate-x-1/2
      pt-3
      opacity-0
      transition-all
      duration-200
      group-hover:visible
      group-hover:opacity-100
    "
            >
              <div
                className="
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-background/90
        shadow-xl
        backdrop-blur-xl
      "
              >
                {aboutLinks.map((item, index) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
            group/item
            flex
            items-center
            justify-between
            px-5
            py-3.5
            text-sm
            font-medium
            text-muted-foreground
            transition-all
            duration-200
            hover:bg-secondary/70
            hover:text-foreground
            ${index !== aboutLinks.length - 1
                        ? "border-b border-border"
                        : ""
                      }
          `}
                  >
                    <span>{item.label}</span>

                    <span
                      className="
              -translate-x-1
              opacity-0
              transition-all
              duration-200
              group-hover/item:translate-x-0
              group-hover/item:opacity-100
              text-accent
            "
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            to="/contact"
            className="ml-2 rounded-full px-5 py-2 text-[0.8rem] font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{ background: "var(--gradient-metal)" }}
          >
            Start a project
          </Link>
        </nav>

        <button
          aria-label="Toggle navigation"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 flex w-[min(1240px,94vw)] flex-col gap-1 rounded-3xl border border-border bg-background/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}
