"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { categories } from "@/lib/products"

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: number[]
  onPriceRangeChange: (range: number[]) => void
  selectedSizes: string[]
  onSizeChange: (sizes: string[]) => void
}

const sizes = ["P", "M", "G", "GG", "36", "38", "40", "42", "44"]

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedSizes,
  onSizeChange,
}: ProductFiltersProps) {
  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      onSizeChange([...selectedSizes, size])
    } else {
      onSizeChange(selectedSizes.filter((s) => s !== size))
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={300}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tamanhos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
              />
              <Label htmlFor={size} className="text-sm font-normal">
                {size}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
