import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomElement<Props = object> = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Props;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "import-element": CustomElement<{ from: string }>;
      "user-card": CustomElement<{ name: string; plan: string }>;
      "ui-field": CustomElement;
      "ui-label": CustomElement<{ for: string }>;
      "ui-input": CustomElement<{ name: string; type?: string; required?: boolean }>;
      "ui-button": CustomElement<{ type?: "button" | "submit" | "reset" }>;
    }
  }
}
