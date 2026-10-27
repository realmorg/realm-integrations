import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = { title: "Account" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://realm.js.org/dist/realm.css" />
        <link rel="stylesheet" href="https://realm.js.org/dist/ui/theme.css" />
        <script type="module" src="https://realm.js.org/dist/realm.js"></script>
      </head>
      <body>
        <import-element from="/components/user-card.html"></import-element>
        <import-element from="https://realm.js.org/dist/ui/components/field.html"></import-element>
        <import-element from="https://realm.js.org/dist/ui/components/input.html"></import-element>
        <import-element from="https://realm.js.org/dist/ui/components/label.html"></import-element>
        <import-element from="https://realm.js.org/dist/ui/components/button.html"></import-element>
        <main>{children}</main>
      </body>
    </html>
  );
}
