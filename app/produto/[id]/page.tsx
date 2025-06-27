"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { products } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"

export default function ProductPage() {
  const params = useParams()
  const { dispatch } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selecione as opções",
        description: "Por favor, selecione o tamanho e a cor antes de adicionar ao carrinho.",
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...product,
        quantity,
        selectedSize,
        selectedColor,
      },
    })

    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mt-2">R$ {product.price.toFixed(2).replace(".", ",")}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label className="text-base font-semibold">Tamanho</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={size} />
                      <Label htmlFor={size} className="cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold">Cor</Label>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {product.colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <RadioGroupItem value={color} id={color} />
                      <Label htmlFor={color} className="cursor-pointer">
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold">Quantidade</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
