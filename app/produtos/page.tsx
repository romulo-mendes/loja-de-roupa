"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "Todos" || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      const sizeMatch = selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size))

      return categoryMatch && priceMatch && sizeMatch
    })
  }, [selectedCategory, priceRange, selectedSizes])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Produtos</h1>
            <p className="text-muted-foreground mt-2">{filteredProducts.length} produto(s) encontrado(s)</p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedSizes={selectedSizes}
                onSizeChange={setSelectedSizes}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedSizes={selectedSizes}
              onSizeChange={setSelectedSizes}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum produto encontrado com os filtros selecionados.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedCategory("Todos")
                    setPriceRange([0, 300])
                    setSelectedSizes([])
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
