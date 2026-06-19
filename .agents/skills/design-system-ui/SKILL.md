---
name: design-system-ui
description: Enterprise UI governance and design system enforcement for GLocation, ensuring consistency with Next.js, TailwindCSS v4, and shadcn/ui.
---

# ENTERPRISE UI GOVERNANCE & DESIGN SYSTEM SKILL

## PROPÓSITO
Esta skill actúa como la capa de gobernanza definitiva para la generación de interfaces en el proyecto GLocation. Su objetivo es garantizar la consistencia visual, la integridad arquitectónica y la excelencia técnica en cada componente generado, utilizando Next.js, TailwindCSS v4 y shadcn/ui.

La IA debe actuar como un **System Composer** y **Architecture-Aware UI Assembler**, no como un diseñador creativo experimental.

---

## ARCHITECTURE ENFORCEMENT (MODULAR)
Toda generación de código debe respetar la estructura modular del proyecto:

- **`src/app/`**: Únicamente definición de rutas, Layouts de página y Server Components de entrada. Lógica de UI mínima.
- **`src/modules/[feature]/`**: Contiene la lógica de negocio, componentes específicos de la feature, hooks y servicios.
- **`src/shared/`** (o `src/components/ui`): UI altamente reutilizable, primitivos de shadcn y componentes transversales (Design System Core).
- **Separación de Responsabilidades**: Evitar lógica compleja dentro de `page.tsx`. Delegar en componentes de módulo.

---

## SEMANTIC TOKEN ENFORCEMENT (TailwindCSS v4)
Está estrictamente PROHIBIDO el uso de valores hardcoded, hexadecimales o colores arbitrarios de Tailwind.

### Solo utilizar Tokens Semánticos:
- **Fondos**: `bg-background`, `bg-surface`, `bg-muted`, `bg-accent`
- **Textos**: `text-foreground`, `text-muted-foreground`, `text-primary`, `text-secondary`
- **Bordes**: `border-border`, `border-input`
- **Interactivos**: `bg-primary`, `bg-secondary`, `text-primary-foreground`, `ring-ring`
- **Estados**: `text-success`, `bg-danger`, `border-warning`

### Prohibido:
- `bg-[#ffffff]`, `text-black`, `bg-blue-500`, `p-[13px]`.
- Variables CSS directas en JSX (ej: `style={{ color: 'var(--primary)' }}`). Usar clases de Tailwind.

---

## DATA-THEME & DARK MODE AWARENESS
Toda la UI debe ser agnóstica al tema y soportar `light` y `dark` nativamente:

- **Estrategia**: Utilizar el atributo `data-theme` definido en el root.
- **Evitar**: Modificadores `dark:` manuales si los tokens semánticos ya manejan el cambio de color.
- **Consistencia**: Garantizar que los contrastes sean accesibles en ambos temas.

---

## SHADCN/UI & COMPONENT COMPOSITION
- **Reutilización**: Usar siempre componentes de `@/shared/ui` (o `@/components/ui`) antes de crear nuevos.
- **Extensión**: Si un componente base necesita cambios, extender mediante `variants` (cva) o `className`.
- **Composición**: Construir interfaces complejas mediante la composición de pequeñas piezas atómicas, no mediante componentes monolíticos.
- **Primitivos**: No reinventar lo que ya provee Radix UI o shadcn.

---

## RESPONSIVE & MOBILE-FIRST DESIGN
- **Mobile-First**: Siempre definir estilos base para móvil y escalar con breakpoints (`md:`, `lg:`, etc.).
- **Jerarquía**: Asegurar que la densidad de información sea adecuada para cada pantalla.
- **Layouts**: Preferir CSS Grid y Flexbox sobre anchos fijos (`w-[800px]`).

---

## ACCESSIBILITY (A11Y) OBLIGATORIA
- **Semántica**: Usar tags HTML5 correctos (`main`, `section`, `article`, `nav`, `aside`).
- **Navegación**: Soportar navegación por teclado completa.
- **Estados**: Incluir estados `focus-visible` claros y contrastados.
- **ARIA**: Usar atributos ARIA solo cuando sea estrictamente necesario para accesibilidad dinámica.

---

## MOTION PRINCIPLES (  FEEL)
La animación debe ser atmosférica y sutil:
- **Atmospheric**: Animaciones que guíen al ojo, no que lo distraigan.
- **Subtle**: Duraciones cortas (150ms - 300ms), easings `ease-out` o `spring` suaves.
- **Smooth**: Evitar bounce excesivo o movimientos erráticos.
- **Uso**: Transiciones de opacidad, micro-escalas al interactuar, y layouts fluidos.

---

## AI BEHAVIOR RULES
1. **No Inventar**: Si un token o componente no existe, la IA debe reportarlo y proponer una solución alineada al sistema, no "crear" uno nuevo sobre la marcha.
2. **Validar antes de Escribir**: Verificar que la propuesta cumple con `DESIGN.md`.
3. **Foco en Spacing**: Respetar la escala de spacing definida (4px base).
4. **Cero Creatividad de Estilo**: La creatividad reside en el **Layout, Composición y Jerarquía**, nunca en el estilo base.

---

## VALIDACIÓN OBLIGATORIA (CHECKLIST)
Antes de entregar cualquier fragmento de UI, se debe verificar:

- [ ] **Semantic Tokens**: ¿Usa exclusivamente tokens como `bg-background`?
- [ ] **Architecture**: ¿Está ubicado en el directorio correcto (`modules/`, `shared/`)?
- [ ] **Responsive**: ¿Es mobile-first y funcional en todas las resoluciones?
- [ ] **Theme**: ¿Funciona perfectamente en `light` y `dark` mode?
- [ ] **A11y**: ¿Es accesible y semántico?
- [ ] **shadcn**: ¿Reutiliza componentes base existentes?
- [ ] **Clean Code**: ¿Cero inline styles y cero hardcoded colors?

---

## PRINCIPIO CLAVE
"La excelencia de la UI en GLocation nace de la rigurosidad del sistema. La IA no diseña, ensambla el futuro del sistema siguiendo sus propias reglas de gobernanza."
