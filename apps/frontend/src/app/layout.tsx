// app/layout.tsx
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Navbar2 } from "@/components/Navbar2";
import { Header } from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="relative bg-gray-950 text-gray-200">
        {/* Fondo global con luces */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-cyan-500/10 rounded-full blur-[160px]" />
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

