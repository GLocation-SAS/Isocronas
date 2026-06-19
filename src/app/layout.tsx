import Script from "next/script";
import { Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import { cookies } from "next/headers";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata = {
  title: "Lumen360 | Design System",
  description: "Base frontend y sistema de diseño de Lumen360.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Obtener el tema desde las cookies en el servidor para evitar que Next.js
  // elimine el atributo 'data-theme' de la etiqueta html durante las transiciones de ruta
  const cookieStore = await cookies();
  const theme = cookieStore.get("glocation-theme")?.value || "light";

  return (
    <html lang="es" data-theme={theme} className={cn(montserrat.variable, nunito.variable, "font-sans")} suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('glocation-theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = storedTheme || systemTheme;
                  document.documentElement.setAttribute('data-theme', theme);
                  if (!document.cookie.includes('glocation-theme=')) {
                    document.cookie = 'glocation-theme=' + theme + '; path=/; max-age=31536000; SameSite=Lax';
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
