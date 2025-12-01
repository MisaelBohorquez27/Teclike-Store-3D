// app/layout.tsx
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Navbar2 } from "@/components/Navbar2";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar2 />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
