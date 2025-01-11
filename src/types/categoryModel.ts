import { Product } from "./productModel"

export type Category = {
  id: number
  name: string
  description?: string | null
  parentCategoryId?: number | null
  parentCategory?: Category | null
  subCategories: Category[]
  products: Product[]
}
