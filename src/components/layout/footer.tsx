"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");
  const tContact = useTranslations("Contact");

  return (
    <footer className="relative w-full pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative w-full rounded-[32px] border border-footer-border bg-footer-bg pt-16 pb-8 px-8 md:px-12 overflow-hidden shadow-2xl">

          {/* Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start relative z-10 pb-12">

            {/* Column 1: Logo, Description & Socials */}
            <div className="md:col-span-5 flex flex-col md:border-r md:border-footer-border md:pr-12">
              <div className="flex flex-col items-start">
                <Image
                  src="/LogotipoSLNegativo.svg"
                  alt="GLocation Logo"
                  width={200}
                  height={86}
                  className="h-11 w-auto object-contain"
                />
                <p className="text-[10px] md:text-[11px] font-semibold text-primary uppercase tracking-widest mt-2 select-none font-heading">
                  {t("tagline")}
                </p>
              </div>
              <p className="mt-6 text-sm text-footer-foreground/80 leading-relaxed max-w-sm font-sans">
                {t("description")}
              </p>

              {/* Socials section underneath the description */}
              <div className="mt-10 flex flex-col">
                <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-6 font-heading">
                  {t("followUs")}
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/glocation.ai?igsh=cjd0amJqNzhscHFz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-11 rounded-full bg-footer-icon-bg border border-footer-border flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_12px_rgba(90,57,136,0.3)] hover:scale-105 active:scale-95 group"
                    aria-label="Instagram"
                  >
                    <Image
                      src="/IG.svg"
                      alt="Instagram"
                      width={18}
                      height={18}
                      className="size-[18px] invert opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/glocation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-11 rounded-full bg-footer-icon-bg border border-footer-border flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_12px_rgba(90,57,136,0.3)] hover:scale-105 active:scale-95 group"
                    aria-label="LinkedIn"
                  >
                    <Image
                      src="/IN.svg"
                      alt="LinkedIn"
                      width={18}
                      height={18}
                      className="size-[18px] invert opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="md:col-span-3 flex flex-col md:border-r md:border-footer-border md:pr-8 md:pl-4">
              <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-6 font-heading">
                {t("navigation")}
              </h3>
              <ul className="flex flex-col font-sans text-sm text-footer-foreground/90">
                <li className="border-b border-footer-border/30 py-3 flex items-center">
                  <span className="size-1.5 rounded-full bg-primary inline-block mr-2.5 shrink-0" />
                  <Link href="/" className="hover:text-white transition-colors duration-200">
                    {tNav("home")}
                  </Link>
                </li>
                <li className="border-b border-footer-border/30 py-3 flex items-center">
                  <span className="size-1.5 rounded-full bg-primary inline-block mr-2.5 shrink-0" />
                  <Link href="/equipo" className="hover:text-white transition-colors duration-200">
                    {tNav("team")}
                  </Link>
                </li>
                <li className="border-b border-footer-border/30 py-3 flex items-center">
                  <span className="size-1.5 rounded-full bg-primary inline-block mr-2.5 shrink-0" />
                  <Link href="/demos" className="hover:text-white transition-colors duration-200">
                    {tNav("demos")}
                  </Link>
                </li>
                <li className="py-3 flex items-center">
                  <span className="size-1.5 rounded-full bg-primary inline-block mr-2.5 shrink-0" />
                  <Link href="/contact" className="hover:text-white transition-colors duration-200">
                    {tNav("contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="md:col-span-4 flex flex-col md:pl-8">
              <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-6 font-heading">
                {t("contact")}
              </h3>
              <div className="flex flex-col font-sans text-sm text-footer-foreground/90">
                <div className="border-b border-footer-border/30 py-3 flex items-start gap-3">
                  <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>{tContact("info.address")}</span>
                </div>
                <div className="border-b border-footer-border/30 py-3 flex items-start gap-3">
                  <Phone className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>+57 317 723 2963</span>
                </div>
                <div className="py-3 flex items-start gap-3">
                  <Mail className="size-4 text-primary shrink-0 mt-0.5" />
                  <a href="mailto:comercial@glocation.com.co" className="hover:text-white transition-colors duration-200 font-sans">
                    comercial@glocation.com.co
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Horizontal Divider Line with Centered Glow */}
          <div className="relative w-full h-[1px] bg-footer-border my-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-[1px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-center relative z-10">
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-footer-foreground/60 uppercase tracking-widest font-sans">
              <ShieldCheck className="size-4 text-primary shrink-0" />
              <span>{t("rights", { year: new Date().getFullYear() })}</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}