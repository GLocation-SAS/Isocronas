import { UIKitView } from "@/modules/uikit/views/uikit-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Kit | GLocation",
  description: "Explora los componentes y tokens del sistema de diseño de GLocation.",
};

export default function UIKitPage() {
  return <UIKitView />;
}
