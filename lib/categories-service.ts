import { prisma } from "@/lib/prisma"
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category"

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim()
}

export class CategoriesService {
  static async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await prisma.category.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          name: "asc",
        },
      })

      return categories.map((category) => ({
        ...category,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }))
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
      throw new Error("Erro ao buscar categorias")
    }
  }

  static async getAllCategoriesAdmin(): Promise<Category[]> {
    try {
      const categories = await prisma.category.findMany({
        orderBy: [{ isActive: "desc" }, { name: "asc" }],
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
      })

      return categories.map((category) => ({
        ...category,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }))
    } catch (error) {
      console.error("Erro ao buscar categorias (admin):", error)
      throw new Error("Erro ao buscar categorias")
    }
  }

  static async getCategoryById(id: string): Promise<Category | null> {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
      })

      if (!category) return null

      return {
        ...category,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }
    } catch (error) {
      console.error("Erro ao buscar categoria por ID:", error)
      throw new Error("Erro ao buscar categoria")
    }
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const category = await prisma.category.findUnique({
        where: { slug },
      })

      if (!category) return null

      return {
        ...category,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }
    } catch (error) {
      console.error("Erro ao buscar categoria por slug:", error)
      throw new Error("Erro ao buscar categoria")
    }
  }

  static async createCategory(data: CreateCategoryRequest): Promise<Category> {
    try {
      const slug = generateSlug(data.name)

      // Verificar se já existe uma categoria com o mesmo slug
      const existingCategory = await prisma.category.findUnique({
        where: { slug },
      })

      if (existingCategory) {
        throw new Error("Já existe uma categoria com este nome")
      }

      const category = await prisma.category.create({
        data: {
          name: data.name,
          slug,
          description: data.description,
          image: data.image,
          isActive: data.isActive ?? true,
        },
      })

      return {
        ...category,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Erro ao criar categoria")
    }
  }

  static async updateCategory(id: string, data: UpdateCategoryRequest): Promise<Category | null> {
    try {
      // Verificar se a categoria existe
      const existingCategory = await prisma.category.findUnique({
        where: { id },
      })

      if (!existingCategory) {
        return null
      }

      const updateData: any = { ...data }

      // Se está alterando o nome, gerar novo slug
      if (data.name && data.name !== existingCategory.name) {
        const newSlug = generateSlug(data.name)

        // Verificar se não existe outra categoria com o mesmo slug
        const categoryWithSameSlug = await prisma.category.findUnique({
          where: { slug: newSlug },
        })

        if (categoryWithSameSlug && categoryWithSameSlug.id !== id) {
          throw new Error("Já existe uma categoria com este nome")
        }

        updateData.slug = newSlug
      }

      const category = await prisma.category.update({
        where: { id },
        data: updateData,
      })

      return {
        ...category,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Erro ao atualizar categoria")
    }
  }

  static async deleteCategory(id: string): Promise<boolean> {
    try {
      // Verificar se a categoria existe
      const existingCategory = await prisma.category.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
      })

      if (!existingCategory) {
        return false
      }

      // Verificar se a categoria tem produtos associados
      if (existingCategory._count.products > 0) {
        throw new Error("Não é possível deletar uma categoria que possui produtos associados")
      }

      await prisma.category.delete({
        where: { id },
      })

      return true
    } catch (error) {
      console.error("Erro ao deletar categoria:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Erro ao deletar categoria")
    }
  }

  static async toggleCategoryStatus(id: string): Promise<Category | null> {
    try {
      const existingCategory = await prisma.category.findUnique({
        where: { id },
      })

      if (!existingCategory) {
        return null
      }

      const category = await prisma.category.update({
        where: { id },
        data: {
          isActive: !existingCategory.isActive,
        },
      })

      return {
        ...category,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }
    } catch (error) {
      console.error("Erro ao alterar status da categoria:", error)
      throw new Error("Erro ao alterar status da categoria")
    }
  }

  static async getCategoriesWithProductCount(): Promise<(Category & { productCount: number })[]> {
    try {
      const categories = await prisma.category.findMany({
        where: {
          isActive: true,
        },
        include: {
          _count: {
            select: {
              products: {
                where: {
                  isActive: true,
                },
              },
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      })

      return categories.map((category) => ({
        ...category,
        productCount: category._count.products,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }))
    } catch (error) {
      console.error("Erro ao buscar categorias com contagem de produtos:", error)
      throw new Error("Erro ao buscar categorias")
    }
  }
}
