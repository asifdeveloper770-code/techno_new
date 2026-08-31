import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import logo from "@/assets/logo1.png";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border">
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="relative mx-auto w-[min(1200px,92vw)] py-16">
        <Reveal className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Technogate logo"
                className="h-14 w-28 object-contain"
              />

              {/* <span className="ml-3 text-base font-semibold tracking-[0.28em] uppercase">
                Technogate
              </span> */}
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Technology • Innovation • Solutions. We engineer digital infrastructure for
              companies that intend to lead their category, not follow it.
            </p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Navigate
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/work", label: "Our Work" },
                { to: "/project-analysis", label: "Project Analysis" },
                { to: "/careers", label: "Careers" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (

                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Direct line
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href="mailto:Info@technogate.global"
                  className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-accent" />
                  Info@technogate.global
                </a>
              </li>
              <li>
                <a
                  href="tel:+923700290706"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 text-accent" />
                  +92 370 0290706
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="size-4 text-accent" />
                Karachi, Pakistan
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Technogate. All rights reserved.</span>
          <span className="tracking-[0.3em] uppercase">Karachi — Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
