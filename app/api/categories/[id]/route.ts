import { type NextRequest, NextResponse } from "next/server"
import { CategoriesService } from "@/lib/categories-service"
import type { UpdateCategoryRequest, CategoryResponse } from "@/types/category"

// GET /api/categories/[id] - Buscar categoria por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const category = await CategoriesService.getCategoryById(id)

    if (!category) {
      const response: CategoryResponse = {
        success: false,
        error: "Categoria não encontrada",
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: CategoryResponse = {
      success: true,
      data: category,
      message: "Categoria encontrada",
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

// PUT /api/categories/[id] - Atualizar categoria
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body: UpdateCategoryRequest = await request.json()

    // Verificar se a categoria existe
    const existingCategory = await CategoriesService.getCategoryById(id)
    if (!existingCategory) {
      const response: CategoryResponse = {
        success: false,
        error: "Categoria não encontrada",
      }
      return NextResponse.json(response, { status: 404 })
    }

    // Se está alterando o nome, verificar se não existe outra categoria com o mesmo nome
    if (body.name && body.name !== existingCategory.name) {
      const slug = body.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim()

      const categoryWithSameName = await CategoriesService.getCategoryBySlug(slug)
      if (categoryWithSameName && categoryWithSameName.id !== id) {
        const response: CategoryResponse = {
          success: false,
          error: "Já existe uma categoria com este nome",
        }
        return NextResponse.json(response, { status: 409 })
      }
    }

    const updatedCategory = await CategoriesService.updateCategory(id, body)

    const response: CategoryResponse = {
      success: true,
      data: updatedCategory,
      message: "Categoria atualizada com sucesso",
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

// DELETE /api/categories/[id] - Deletar categoria
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Verificar se a categoria existe
    const existingCategory = await CategoriesService.getCategoryById(id)
    if (!existingCategory) {
      const response: CategoryResponse = {
        success: false,
        error: "Categoria não encontrada",
      }
      return NextResponse.json(response, { status: 404 })
    }

    const deleted = await CategoriesService.deleteCategory(id)

    if (!deleted) {
      const response: CategoryResponse = {
        success: false,
        error: "Erro ao deletar categoria",
      }
      return NextResponse.json(response, { status: 500 })
    }

    const response: CategoryResponse = {
      success: true,
      message: "Categoria deletada com sucesso",
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
