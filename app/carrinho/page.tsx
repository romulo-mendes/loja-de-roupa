"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground">Adicione alguns produtos incríveis ao seu carrinho!</p>
          <Link href="/produtos">
            <Button>Continuar Comprando</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Tamanho: {item.selectedSize} | Cor: {item.selectedColor}
                    </p>
                    <p className="font-bold">R$ {item.price.toFixed(2).replace(".", ",")}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {state.total.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete:</span>
                <span>Grátis</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>R$ {state.total.toFixed(2).replace(".", ",")}</span>
              </div>

              <Button className="w-full" size="lg">
                Finalizar Compra
              </Button>

              <Link href="/produtos">
                <Button variant="outline" className="w-full bg-transparent">
                  Continuar Comprando
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
