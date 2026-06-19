"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-h3 font-heading font-semibold text-foreground mb-1">
          Pagination
        </h3>
        <p className="text-body-sm text-muted-foreground">
          Componente de navegación para dividir contenido en múltiples páginas.
        </p>
      </div>

      <div className="space-y-10">
        {/* Basic Pagination */}
        <div className="space-y-4">
          <h4 className="text-body-sm font-bold uppercase tracking-wider text-muted-foreground">
            Básica
          </h4>
          <div className="p-8 rounded-xl border border-border flex justify-center items-center shadow-sm">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Minimal Pagination */}
        <div className="space-y-4">
          <h4 className="text-body-sm font-bold uppercase tracking-wider text-muted-foreground">
            Minimalista
          </h4>
          <div className="p-8 rounded-xl border border-border flex justify-center items-center shadow-sm">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" text="" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" text="" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
