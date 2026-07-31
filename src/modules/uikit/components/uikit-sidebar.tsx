"use client";

import * as React from "react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";
import {
  MousePointerClick,
  TextCursorInput,
  AlignLeft,
  Tag,
  ListFilter,
  Search,
  Terminal,
  CheckSquare,
  ToggleLeft,
  Layers,
  Bell,
  MessageSquare,
  LogOut,
  Layout,
  Table as TableIcon,
  Calendar as CalendarIcon,
  Folder as FolderIcon,
  MoreHorizontal,
  Palette,
  Sun,
  Moon,
  Image as ImageIcon,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

/** Section definition for UIKit navigation */
export interface UIKitSection {
  id: string;
  label: string;
  icon: React.ElementType;
  group: "brand" | "actions" | "inputs" | "data" | "feedback" | "overlay";
}

/** All UIKit sections organized by category */
export const UIKIT_SECTIONS: UIKitSection[] = [
  // Brand & Tokens
  { id: "colors", label: "Colors", icon: Palette, group: "brand" },
  { id: "logos", label: "Logos", icon: ImageIcon, group: "brand" },

  // Actions
  { id: "buttons", label: "Buttons", icon: MousePointerClick, group: "actions" },
  { id: "toggle", label: "Toggle", icon: ToggleLeft, group: "actions" },

  // Inputs
  { id: "inputs", label: "Input Group", icon: TextCursorInput, group: "inputs" },
  { id: "textarea", label: "Textarea", icon: AlignLeft, group: "inputs" },
  { id: "combobox", label: "Combobox", icon: ListFilter, group: "inputs" },
  { id: "search", label: "Search", icon: Search, group: "inputs" },
  { id: "command", label: "Command", icon: Terminal, group: "inputs" },
  { id: "checkbox", label: "Checkbox", icon: CheckSquare, group: "inputs" },
  { id: "switch", label: "Switch", icon: ToggleLeft, group: "inputs" },
  { id: "calendar", label: "Calendar", icon: CalendarIcon, group: "inputs" },

  // Data Display
  { id: "badges", label: "Badges", icon: Tag, group: "data" },
  { id: "breadcrumb", label: "Breadcrumb", icon: Layers, group: "data" },
  { id: "tabs", label: "Tabs", icon: Layout, group: "data" },
  { id: "table", label: "Table", icon: TableIcon, group: "data" },
  { id: "avatar", label: "Avatar", icon: Layout, group: "data" },
  { id: "pagination", label: "Pagination", icon: MoreHorizontal, group: "data" },

  // Overlay / Feedback
  { id: "dialog", label: "Dialog", icon: Layers, group: "overlay" },
  { id: "toast", label: "Toast", icon: Bell, group: "overlay" },
  { id: "dropdown", label: "Dropdown", icon: ChevronDown, group: "overlay" },
  { id: "tooltip", label: "Tooltip", icon: MessageSquare, group: "overlay" },
  { id: "cards", label: "Cards", icon: Layout, group: "data" },
];

const GROUP_LABELS: Record<UIKitSection["group"], string> = {
  brand: "Fundamentos",
  actions: "Acciones",
  inputs: "Entradas",
  data: "Visualización",
  feedback: "Retroalimentación",
  overlay: "Overlay & Feedback",
};

interface UIKitSidebarProps {
  activeSection: string | null;
  onNavigate: (sectionId: string) => void;
}

export function UIKitSidebar({ activeSection, onNavigate }: UIKitSidebarProps) {
  const { setOpenMobile } = useSidebar();

  // Local theme state
  const [theme, setTheme] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    const active = document.documentElement.getAttribute("data-theme") as Theme | null;
    setTheme(stored ?? active ?? "light");
  }, []);

  const handleTheme = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
  };

  const handleClick = (sectionId: string) => {
    onNavigate(sectionId);
    setOpenMobile(false);
  };

  // Group sections by category
  const groupedSections = React.useMemo(() => {
    const groups = new Map<UIKitSection["group"], UIKitSection[]>();
    for (const section of UIKIT_SECTIONS) {
      if (!groups.has(section.group)) {
        groups.set(section.group, []);
      }
      groups.get(section.group)!.push(section);
    }
    return groups;
  }, []);

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Resplandor ambiental de degradado como las tarjetas featured */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 size-64 rounded-full bg-primary/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-64 rounded-full bg-secondary/20 blur-3xl pointer-events-none z-0" />

      {/* ── Header: Logo + Trigger toggle ── */}
      <SidebarHeader className="relative px-3 pt-4 pb-3 z-10">
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            {/* Expanded Logos */}
            <Image
              src="/Logo%20horizontal.svg"
              alt="RF Planner Logo"
              width={150}
              height={35}
              className="h-[35px] w-auto dark:hidden group-data-[state=collapsed]:hidden animate-in fade-in duration-300"
              priority
            />
            <Image
              src="/Logo%20horizontal%20blanco.svg"
              alt="RF Planner Logo"
              width={150}
              height={35}
              className="h-[35px] w-auto hidden dark:group-data-[state=expanded]:block group-data-[state=collapsed]:hidden animate-in fade-in duration-300"
              priority
            />

            {/* Collapsed Icon Logos */}
            <Image
              src="/Iso.svg"
              alt="RF Planner Icon"
              width={28}
              height={28}
              className="h-7 w-7 dark:hidden group-data-[state=expanded]:hidden animate-in fade-in duration-300"
              priority
            />
            <Image
              src="/Iso%20blanco.svg"
              alt="RF Planner Icon"
              width={28}
              height={28}
              className="h-7 w-7 hidden dark:group-data-[state=collapsed]:block animate-in fade-in duration-300"
              priority
            />
          </div>

          {/* Controls: Info (?) + SidebarTrigger */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent border-0 p-0 flex items-center justify-center rounded-lg"
              title="Información"
              onClick={() => {
                const el = document.getElementById("colors");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <HelpCircle className="size-[18px]" />
            </Button>
            <SidebarTrigger className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent border-0" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ── Content: Section links ── */}
      <SidebarContent className="relative z-10">
        {Array.from(groupedSections.entries()).map(([group, sections]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel className="text-caption uppercase tracking-widest font-bold text-sidebar-foreground/90">
              {GROUP_LABELS[group]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;

                  return (
                    <SidebarMenuItem key={section.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={section.label}
                        onClick={() => handleClick(section.id)}
                      >
                        <Icon className="shrink-0" />
                        <span>{section.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ── Footer: User info + Theme toggle + Logout ── */}
      <SidebarFooter className="px-3 py-3 relative z-10">
        <SidebarSeparator className="mb-3" />

        {/* Bottom controls: Dark Mode Switch toggle */}
        <div className="flex flex-col gap-1 px-1 mb-3">
          {mounted && (
            <>
              {/* Expanded: Row with icon, label "Modo Oscuro", and Switch toggle */}
              <div className="group-data-[collapsible=icon]:hidden">
                <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border border-sidebar-border/60 bg-sidebar-accent/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-sidebar-foreground">
                    <Moon className="h-4 w-4 text-primary shrink-0" />
                    <span>Modo Oscuro</span>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => handleTheme(checked ? "dark" : "light")}
                    variant="primary"
                    size="sm"
                  />
                </div>
              </div>

              {/* Collapsed: single icon button toggles mode */}
              <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                <Button
                  onClick={() => handleTheme(theme === "light" ? "dark" : "light")}
                  variant="ghost"
                  aria-label="Cambiar tema"
                  className="size-8 rounded-md text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent p-0 border-0"
                >
                  {theme === "dark" ? (
                    <Moon className="h-4 w-4 text-primary" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* User section below */}
        <div className="flex items-center gap-3 px-1 group-data-[collapsible=icon]:justify-center">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="size-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-heading font-bold text-caption group-data-[collapsible=icon]:size-8 transition-all duration-200">
              PR
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 size-2.5 rounded-full bg-success border-2 border-background group-data-[collapsible=icon]:size-2" />
          </div>

          {/* Name + Email + Logout (hidden when collapsed) */}
          <div className="flex flex-1 items-center justify-between gap-2 min-w-0 group-data-[collapsible=icon]:hidden animate-in fade-in slide-in-from-bottom-1 duration-300">
            <div className="flex flex-col min-w-0">
              <span className="text-body-sm font-heading font-semibold text-sidebar-foreground truncate">
                Paula Rozo
              </span>
              <span className="text-caption text-sidebar-foreground/60 truncate">
                paula@glocation.co
              </span>
            </div>
            <Button
              aria-label="Cerrar sesión"
              variant="ghost"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-warning hover:bg-warning/10 hover:border-transparent transition-colors duration-200 border-0 p-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
