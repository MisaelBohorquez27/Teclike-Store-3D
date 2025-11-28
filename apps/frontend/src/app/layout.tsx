// app/layout.tsx
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-screen flex flex-col justify-between">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
