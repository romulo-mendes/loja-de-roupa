import { type NextRequest, NextResponse } from "next/server"
import { CategoriesService } from "@/lib/categories-service"
import type { CategoryResponse } from "@/types/category"

// PATCH /api/admin/categories/[id]/toggle - Alternar status ativo/inativo
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    const updatedCategory = await CategoriesService.toggleCategoryStatus(id)

    const response: CategoryResponse = {
      success: true,
      data: updatedCategory,
      message: `Categoria ${updatedCategory?.isActive ? "ativada" : "desativada"} com sucesso`,
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
