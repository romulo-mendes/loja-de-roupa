import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Moda que Inspira
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Descubra as últimas tendências em moda feminina e masculina. Qualidade, estilo e conforto em cada peça.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/produtos">
                <Button size="lg">Ver Coleção</Button>
              </Link>
              <Button variant="outline" size="lg">
                Ofertas Especiais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Produtos em Destaque</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Confira nossa seleção especial de produtos mais vendidos
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4 md:grid-cols-2">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/produtos">
              <Button variant="outline" size="lg">
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Categorias</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore nossas categorias e encontre exatamente o que procura
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-32 w-32 rounded-full bg-pink-200 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Roupas Femininas"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Feminino</h3>
              <p className="text-gray-600">Vestidos, blusas, calças e muito mais</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-32 w-32 rounded-full bg-blue-200 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Roupas Masculinas"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Masculino</h3>
              <p className="text-gray-600">Camisetas, calças, blazers e acessórios</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-32 w-32 rounded-full bg-green-200 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Acessórios"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Acessórios</h3>
              <p className="text-gray-600">Bolsas, sapatos, joias e mais</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
