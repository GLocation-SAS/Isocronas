"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UIKitSidebar, UIKIT_SECTIONS } from "../components/uikit-sidebar";
import { RadialButtonShowcase } from "../components/radial-button-showcase";
import { InputGroupShowcase } from "../components/input-group-showcase";
import { BadgeShowcase } from "../components/badge-showcase";
import { TextareaShowcase } from "../components/textarea-showcase";
import { ComboboxShowcase } from "../components/combobox-showcase";
import { SearchShowcase } from "../components/search-showcase";
import { CommandShowcase } from "../components/command-showcase";
import { CheckboxShowcase } from "../components/checkbox-showcase";
import { SwitchShowcase } from "../components/switch-showcase";
import { DialogShowcase } from "../components/dialog-showcase";
import { ToastShowcase } from "../components/toast-showcase";
import { TooltipShowcase } from "../components/tooltip-showcase";
import { BreadcrumbShowcase } from "../components/breadcrumb-showcase";
import { TabsShowcase } from "../components/tabs-showcase";
import { TableShowcase } from "../components/table-showcase";
import { CalendarShowcase } from "../components/calendar-showcase";
import { PaginationShowcase } from "../components/pagination-showcase";
import { AvatarShowcase } from "../components/avatar-showcase";
import { FolderShowcase } from "../components/folder-showcase";
import { CardShowcase } from "../components/card-showcase";
import { ToggleShowcase } from "../components/toggle-showcase";
import { ChatAssistantShowcase } from "../components/chat-assistant-showcase";
import { ChatIntranetShowcase } from "../components/chat-intranet-showcase";
import { StyleGuide } from "../components/style-guide";

/**
 * Maps section IDs to their showcase components.
 * Order determines render order in the content area.
 */
const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  colors: StyleGuide,
  buttons: RadialButtonShowcase,
  inputs: InputGroupShowcase,
  textarea: TextareaShowcase,
  badges: BadgeShowcase,
  combobox: ComboboxShowcase,
  search: SearchShowcase,
  command: CommandShowcase,
  checkbox: CheckboxShowcase,
  switch: SwitchShowcase,
  dialog: DialogShowcase,
  toast: ToastShowcase,
  tooltip: TooltipShowcase,
  breadcrumb: BreadcrumbShowcase,
  tabs: TabsShowcase,
  table: TableShowcase,
  calendar: CalendarShowcase,
  avatar: AvatarShowcase,
  folders: FolderShowcase,
  cards: CardShowcase,
  toggle: ToggleShowcase,
  "chat-assistant": ChatAssistantShowcase,
  "chat-intranet": ChatIntranetShowcase,
  pagination: PaginationShowcase,
};

export function UIKitView() {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const sectionRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const isScrollingRef = React.useRef(false);

  /** Register a section ref for intersection observation */
  const setSectionRef = React.useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el);
    } else {
      sectionRefs.current.delete(id);
    }
  }, []);

  /** Scroll to section on sidebar click */
  const handleNavigate = React.useCallback((sectionId: string) => {
    const el = sectionRefs.current.get(sectionId);
    if (el) {
      isScrollingRef.current = true;
      setActiveSection(sectionId);
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // Reset the scrolling flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, []);

  /** IntersectionObserver to track active section on scroll */
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update during programmatic scrolling
        if (isScrollingRef.current) return;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    // Observe all section elements after mount
    const timer = setTimeout(() => {
      sectionRefs.current.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={true}>
        <UIKitSidebar activeSection={activeSection} onNavigate={handleNavigate} />

        <SidebarInset>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-6 space-y-10">
              {/* Hero section */}
              <section className="text-center p-8 rounded-xl border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-h1 font-heading font-bold text-primary mb-2">
                  GLocation UI Kit
                </h2>
                <p className="text-muted-foreground">
                  Explora los componentes   del sistema de diseño.
                </p>
              </section>

              {/* Style Guide (Visual Guide) */}
              <div id="colors" ref={(el) => setSectionRef("colors", el)} className="scroll-mt-20">
                <StyleGuide />
              </div>

              {/* Dynamic showcase sections */}
              {UIKIT_SECTIONS.filter(s => s.id !== "colors").map((section) => {
                const ShowcaseComponent = SECTION_COMPONENTS[section.id];
                if (!ShowcaseComponent) return null;

                return (
                  <div
                    key={section.id}
                    id={section.id}
                    ref={(el) => setSectionRef(section.id, el)}
                    className="scroll-mt-20"
                  >
                    <ShowcaseComponent />
                  </div>
                );
              })}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
