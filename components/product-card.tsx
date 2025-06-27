"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <Badge variant="secondary" className="text-xs">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-lg">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          <Link href={`/produto/${product.id}`}>
            <Button size="sm">Ver Detalhes</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
