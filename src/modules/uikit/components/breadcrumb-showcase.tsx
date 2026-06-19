import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, ShoppingCart, CreditCard, CheckCircle2, Layers } from "lucide-react";

export function BreadcrumbShowcase() {
  return (
    <section className="grid gap-8 p-8 rounded-xl border border-border bg-background shadow-xs overflow-hidden">
      <div className="space-y-2">
        <h2 className="text-h3 font-bold flex items-center gap-2">
          <Layers className="size-5 text-primary" />
          Componentes de Navegación: Breadcrumb
        </h2>
        <p className="text-sm text-muted-foreground">
          Rutas de navegación jerárquicas con estética de cápsula y soporte para estados activos, iconos y menús colapsados.
        </p>
      </div>

      <div className="space-y-12">
        {/* DEFAULT CAPSULE */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Estilo Base (Solo Texto)
          </h3>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">HOME</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">CART</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>PAYMENT</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* WITH ICONS */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Con Iconos
          </h3>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <Home className="size-3.5" />
                  HOME
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <ShoppingCart className="size-3.5" />
                  CART
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <CheckCircle2 className="size-3.5" />
                  REVIEW
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <CreditCard className="size-3.5" />
                  PAYMENT
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* COLLAPSED / ELLIPSIS */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Colapsado con Menú
          </h3>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">HOME</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center">
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem className="text-[10px] font-heading font-bold tracking-widest uppercase">DOCUMENTATION</DropdownMenuItem>
                    <DropdownMenuItem className="text-[10px] font-heading font-bold tracking-widest uppercase">THEMES</DropdownMenuItem>
                    <DropdownMenuItem className="text-[10px] font-heading font-bold tracking-widest uppercase">GITHUB</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">COMPONENTS</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>BREADCRUMB</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* DESIGN NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 border-t border-border pt-8">
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Arquitectura Capsule
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            El diseño utiliza <code className="text-foreground">surface</code> con desenfoque para el contenedor principal y un relleno sólido en el color <code className="text-foreground">primary</code> para resaltar el paso actual.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Tipografía y Tracking
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Se aplica <code className="text-foreground">font-heading</code> en mayúsculas con espaciado expandido para asegurar una estética profesional y técnica, coherente con el sistema GLocation.
          </p>
        </div>
      </div>
    </section>
  );
}
