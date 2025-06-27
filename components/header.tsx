"use client"

import Link from "next/link"
import { ShoppingBag, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { state } = useCart()
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl">ModaStore</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              Início
            </Link>
            <Link href="/produtos" className="transition-colors hover:text-foreground/80">
              Produtos
            </Link>
            <Link href="/categorias" className="transition-colors hover:text-foreground/80">
              Categorias
            </Link>
            <Link href="/sobre" className="transition-colors hover:text-foreground/80">
              Sobre
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-4 w-4" />
          </Button>

          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/" className="text-lg font-medium">
                  Início
                </Link>
                <Link href="/produtos" className="text-lg font-medium">
                  Produtos
                </Link>
                <Link href="/categorias" className="text-lg font-medium">
                  Categorias
                </Link>
                <Link href="/sobre" className="text-lg font-medium">
                  Sobre
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
