import type {
  Product,
  ProductResponse,
  ProductsResponse,
} from "../types/product"

const API_URL = "https://v2.api.noroff.dev/online-shop"

export async function getProducts() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const result: ProductsResponse = await response.json()

  return result.data
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  const result: ProductResponse = await response.json()

  return result.data
}
