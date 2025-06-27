import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ModaStore</h3>
            <p className="text-gray-400">Sua loja de moda online com as melhores tendências e qualidade.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-white">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categorias</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/produtos" className="hover:text-white">
                  Feminino
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-white">
                  Masculino
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-white">
                  Acessórios
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-white">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@modasstore.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2024 ModaStore. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
