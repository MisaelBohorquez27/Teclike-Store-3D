export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Teclike. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="/privacy" className="text-sm hover:underline">Política de privacidad</a>
            <a href="/terms" className="text-sm hover:underline">Términos de servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}