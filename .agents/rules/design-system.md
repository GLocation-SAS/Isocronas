---
trigger: always_on
---

# DESIGN SYSTEM USAGE RULE (V2)

Esta regla define el uso obligatorio del sistema de diseño en el proyecto GLocation.

---

## 1. FUENTES DE VERDAD

El desarrollo visual y funcional se rige por:

- **Conceptual y Visual:** `DESIGN.md` es la única fuente de verdad para componentes, variantes, estados y comportamiento de la interfaz.
- **Técnica (Tokens):** `src/app/globals.css` es la fuente de verdad para tokens de color, tipografía, espaciado y bordes.

**Figma ya no se utiliza como fuente de verdad.** El código debe ser fiel a `DESIGN.md` y los tokens definidos.

---

## 2. USO DEL SISTEMA DE DISEÑO

Toda interfaz debe construirse utilizando:

- **Componentes:** Base de Shadcn UI, personalizados según `DESIGN.md`.
- **Tokens:** Variables CSS definidas en `globals.css`.
- **Estilos:** Clases de Tailwind basadas exclusivamente en los tokens del sistema.

---

## 3. USO DE COMPONENTES

### Regla principal:
SIEMPRE usar o extender componentes de Shadcn UI (`@/components/ui`) antes de crear nuevos desde cero.

---

### Permitido:
- Importar componentes desde:
  - `@/components/ui` (Shadcn base)
  - `@/components/layout` (Estructura)
  - `@/modules/[module]/components` (Lógica de negocio)
- Personalizar componentes de Shadcn para que coincidan con la estética de `DESIGN.md`.

---

### Prohibido:
- Crear nuevos componentes que ya existan en Shadcn o en el proyecto.
- Duplicar lógica de componentes existentes.
- Ignorar las variantes y estados definidos en `DESIGN.md`.

---

## 4. CREACIÓN DE NUEVOS COMPONENTES

Si un componente NO existe en Shadcn ni en el proyecto:

### OBLIGATORIO:
1. **NO** crearlo automáticamente sin validación.
2. Proponer su creación basándose en los principios de `DESIGN.md`.
3. Utilizar los tokens de `globals.css` para su construcción.

---

## 5. USO DE ESTILOS Y COLORES

### PROHIBICIÓN ESTRICTA:
- **Colores Hardcodeados:** Prohibido usar hex (`#fff`), rgb o hsl directamente en el código.
- **Colores de Tailwind Directos:** Prohibido usar clases como `bg-blue-500`, `text-red-600`, etc.
- **Estilos Inline:** Prohibido el uso de la propiedad `style={{...}}` para diseño visual.
- **Variables CSS Directas:** Evitar `bg-[--color-primary]`, usar `bg-primary`.

---

### OBLIGATORIO:
- **Clases Semánticas:** Usar exclusivamente las clases mapeadas en Tailwind que correspondan a los tokens (ej: `bg-primary`, `text-foreground`, `border-border`, `bg-surface`).
- **Coherencia con globals.css:** Cualquier color usado debe estar definido como un token semántico en `globals.css`.
- **Respeto a Tipografía y Spacing:** Usar las clases de Tailwind configuradas para las fuentes (`font-heading`, `font-sans`) y escalas de espaciado.

---

## 6. CONSISTENCIA CON DESIGN.md

Toda interfaz debe:
- Seguir la jerarquía visual de `DESIGN.md`.
- Respetar los "Do's and Don'ts" del documento.
- Mantener la coherencia de radios (`--radius`) y elevaciones.

---

## 7. COMPORTAMIENTO DE LA IA

La IA debe actuar como:
**Ensamblador y personalizador de componentes Shadcn UI.**

---

### La IA NO debe:
- Inventar colores o escalas de colores fuera de `globals.css`.
- Usar utilidades de color estándar de Tailwind.
- Generar UI que contradiga la arquitectura de tokens.

---

### La IA SÍ debe:
- Reutilizar y componer componentes existentes.
- Aplicar personalizaciones a Shadcn UI vía Tailwind classes usando tokens.
- Verificar siempre `globals.css` antes de aplicar un color.

---

## 8. VALIDACIÓN OBLIGATORIA

Antes de entregar cualquier interfaz, se debe verificar:

✔ ¿Se usaron componentes de Shadcn o existentes?  
✔ ¿Se evitó CUALQUIER color de Tailwind directo (ej: blue-500)?  
✔ ¿Todos los colores usados son tokens semánticos (ej: primary, surface)?  
✔ ¿Se respetó el `DESIGN.md` para la composición?  
✔ ¿Se evitaron estilos inline y hex values?  

Si alguna respuesta es NO → la implementación es **INVÁLIDA**.

---

## 9. PRINCIPIO CLAVE
"Si el token de color no existe en `globals.css` o el componente no está alineado con `DESIGN.md`, no debe existir en el código."