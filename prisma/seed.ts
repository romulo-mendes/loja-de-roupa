import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...")

  // Limpar dados existentes
  await prisma.cartItem.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  console.log("🗑️  Dados existentes removidos")

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Camisetas",
        slug: "camisetas",
        description: "Camisetas básicas e estampadas para todos os estilos",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Calças",
        slug: "calcas",
        description: "Calças jeans, sociais e casuais",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Vestidos",
        slug: "vestidos",
        description: "Vestidos para todas as ocasiões",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Blazers",
        slug: "blazers",
        description: "Blazers elegantes para ocasiões especiais",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Shorts",
        slug: "shorts",
        description: "Shorts confortáveis para o verão",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Blusas",
        slug: "blusas",
        description: "Blusas femininas de diversos estilos",
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
      },
    }),
  ])

  console.log("✅ Categorias criadas:", categories.length)

  // Criar produtos de exemplo
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Camiseta Básica Premium",
        slug: "camiseta-basica-premium",
        description: "Camiseta básica de algodão premium, confortável e durável. Perfeita para o dia a dia.",
        price: 89.9,
        image: "/placeholder.svg?height=400&width=400",
        images: ["/placeholder.svg?height=400&width=400"],
        sizes: ["P", "M", "G", "GG"],
        colors: ["Branco", "Preto", "Cinza"],
        stock: 50,
        isActive: true,
        isFeatured: true,
        categoryId: categories[0].id, // Camisetas
      },
    }),
    prisma.product.create({
      data: {
        name: "Calça Jeans Skinny",
        slug: "calca-jeans-skinny",
        description: "Calça jeans skinny com modelagem moderna e confortável. Tecido de alta qualidade.",
        price: 159.9,
        image: "/placeholder.svg?height=400&width=400",
        images: ["/placeholder.svg?height=400&width=400"],
        sizes: ["36", "38", "40", "42", "44"],
        colors: ["Azul Escuro", "Azul Claro", "Preto"],
        stock: 30,
        isActive: true,
        isFeatured: true,
        categoryId: categories[1].id, // Calças
      },
    }),
    prisma.product.create({
      data: {
        name: "Vestido Floral Verão",
        slug: "vestido-floral-verao",
        description: "Vestido floral leve e fresco, ideal para os dias quentes de verão.",
        price: 129.9,
        image: "/placeholder.svg?height=400&width=400",
        images: ["/placeholder.svg?height=400&width=400"],
        sizes: ["P", "M", "G", "GG"],
        colors: ["Rosa", "Azul", "Amarelo"],
        stock: 25,
        isActive: true,
        isFeatured: true,
        categoryId: categories[2].id, // Vestidos
      },
    }),
    prisma.product.create({
      data: {
        name: "Blazer Executivo",
        slug: "blazer-executivo",
        description: "Blazer elegante para ocasiões formais e profissionais. Corte moderno e sofisticado.",
        price: 249.9,
        image: "/placeholder.svg?height=400&width=400",
        images: ["/placeholder.svg?height=400&width=400"],
        sizes: ["P", "M", "G", "GG"],
        colors: ["Preto", "Marinho", "Cinza"],
        stock: 15,
        isActive: true,
        isFeatured: true,
        categoryId: categories[3].id, // Blazers
      },
    }),
    prisma.product.create({
      data: {
        name: "Shorts Jeans",
        slug: "shorts-jeans",
        description: "Shorts jeans casual, perfeito para o verão. Confortável e estiloso.",
        price: 79.9,
        image: "/placeholder.svg?height=400&width=400",
        images: ["/placeholder.svg?height=400&width=400"],
        sizes: ["36", "38", "40", "42"],
        colors: ["Azul", "Preto"],
        stock: 40,
        isActive: true,
        isFeatured: false,
        categoryId: categories[4].id, // Shorts
      },
    }),
    prisma.product.create({
      data: {
        name: "Blusa de Tricot",
        slug: "blusa-de-tricot",
        description: "Blusa de tricot macia e aconchegante. Ideal para dias mais frescos.",
        price: 119.9,
        image: "/placeholder.svg?height=400&width=400",
        images: ["/placeholder.svg?height=400&width=400"],
        sizes: ["P", "M", "G", "GG"],
        colors: ["Bege", "Rosa", "Branco"],
        stock: 35,
        isActive: true,
        isFeatured: false,
        categoryId: categories[5].id, // Blusas
      },
    }),
  ])

  console.log("✅ Produtos criados:", products.length)

  console.log("🎉 Seed concluído com sucesso!")
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
