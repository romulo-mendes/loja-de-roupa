import { type NextRequest, NextResponse } from "next/server"
import { CategoriesService } from "@/lib/categories-service"
import type { CreateCategoryRequest, CategoryResponse } from "@/types/category"

// GET /api/categories - Listar todas as categorias ativas
export async function GET() {
  try {
    const categories = await CategoriesService.getAllCategories()

    const response: CategoryResponse = {
      success: true,
      data: categories,
      message: "Categorias recuperadas com sucesso",
    }

    return NextResponse.json(response)
  } catch (error) {
    const response: CategoryResponse = {
      success: false,
      error: "Erro interno do servidor",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/categories - Criar nova categoria
export async function POST(request: NextRequest) {
  try {
    const body: CreateCategoryRequest = await request.json()

    // Validação básica
    if (!body.name || body.name.trim().length === 0) {
      const response: CategoryResponse = {
        success: false,
        error: "Nome da categoria é obrigatório",
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Verificar se já existe uma categoria com o mesmo nome
    const existingCategory = await CategoriesService.getCategoryBySlug(
      body.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim(),
    )

    if (existingCategory) {
      const response: CategoryResponse = {
        success: false,
        error: "Já existe uma categoria com este nome",
      }
      return NextResponse.json(response, { status: 409 })
    }

    const newCategory = await CategoriesService.createCategory(body)

    const response: CategoryResponse = {
      success: true,
      data: newCategory,
      message: "Categoria criada com sucesso",
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    const response: CategoryResponse = {
      success: false,
      error: "Erro interno do servidor",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
