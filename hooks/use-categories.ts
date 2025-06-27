"use client"

import { useState, useEffect } from "react"
import type { Category, CreateCategoryRequest, UpdateCategoryRequest, CategoryResponse } from "@/types/category"

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/categories")
      const data: CategoryResponse = await response.json()

      if (data.success && Array.isArray(data.data)) {
        setCategories(data.data)
      } else {
        setError(data.error || "Erro ao carregar categorias")
      }
    } catch (err) {
      setError("Erro de conexão")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const createCategory = async (categoryData: CreateCategoryRequest): Promise<Category | null> => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })

      const data: CategoryResponse = await response.json()

      if (data.success && data.data && !Array.isArray(data.data)) {
        setCategories((prev) => [...prev, data.data as Category])
        return data.data as Category
      } else {
        throw new Error(data.error || "Erro ao criar categoria")
      }
    } catch (err) {
      throw err
    }
  }

  const updateCategory = async (id: string, categoryData: UpdateCategoryRequest): Promise<Category | null> => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })

      const data: CategoryResponse = await response.json()

      if (data.success && data.data && !Array.isArray(data.data)) {
        setCategories((prev) => prev.map((cat) => (cat.id === id ? (data.data as Category) : cat)))
        return data.data as Category
      } else {
        throw new Error(data.error || "Erro ao atualizar categoria")
      }
    } catch (err) {
      throw err
    }
  }

  const deleteCategory = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })

      const data: CategoryResponse = await response.json()

      if (data.success) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id))
      } else {
        throw new Error(data.error || "Erro ao deletar categoria")
      }
    } catch (err) {
      throw err
    }
  }

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/admin/categories")
      const data: CategoryResponse = await response.json()

      if (data.success && Array.isArray(data.data)) {
        setCategories(data.data)
      } else {
        setError(data.error || "Erro ao carregar categorias")
      }
    } catch (err) {
      setError("Erro de conexão")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const toggleCategoryStatus = async (id: string): Promise<Category | null> => {
    try {
      const response = await fetch(`/api/admin/categories/${id}/toggle`, {
        method: "PATCH",
      })

      const data: CategoryResponse = await response.json()

      if (data.success && data.data && !Array.isArray(data.data)) {
        setCategories((prev) => prev.map((cat) => (cat.id === id ? (data.data as Category) : cat)))
        return data.data as Category
      } else {
        throw new Error(data.error || "Erro ao alterar status da categoria")
      }
    } catch (err) {
      throw err
    }
  }

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    toggleCategoryStatus,
  }
}
