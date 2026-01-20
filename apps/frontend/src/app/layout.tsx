// app/layout.tsx
import "./globals.css";
import { AuthProvider } from "@/context/authcontext";
import { CartProvider } from "@/context/cartcontext";
import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { Navbar2 } from "@/components/layouts/navbar2";

export const metadata = {
  title: "Teclike Store",
  description: "E-commerce de tecnología",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="relative bg-gray-950 text-gray-200">
        {/* Fondo global con luces */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-md h-112 bg-cyan-500/10 rounded-full blur-[160px]" />
          <div className="absolute -bottom-32 -right-32 w-md h-112 bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <AuthProvider>
          <CartProvider>
            <Header />
            <Navbar2 />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

