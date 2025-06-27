export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateCategoryRequest {
  name: string
  description?: string
  image?: string
  isActive?: boolean
}

export interface UpdateCategoryRequest {
  name?: string
  description?: string
  image?: string
  isActive?: boolean
}

export interface CategoryResponse {
  success: boolean
  data?: Category | Category[]
  message?: string
  error?: string
}
