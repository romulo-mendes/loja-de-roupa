import { NextResponse } from "next/server"
import { CategoriesService } from "@/lib/categories-service"
import type { CategoryResponse } from "@/types/category"

// GET /api/admin/categories - Listar todas as categorias (incluindo inativas)
export async function GET() {
  try {
    const categories = await CategoriesService.getAllCategoriesAdmin()

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
