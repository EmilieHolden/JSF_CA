import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../api/products"
import type { Product } from "../types/product"
import ProductDetails from "../components/ProductDetails"
import LoadingState from "../components/LoadingState"
import ErrorState from "../components/ErrorState"
import Breadcrumbs from "../components/Breadcrumbs"

function ProductView() {
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchProduct(productId: string) {
      try {
        const data = await getProduct(productId)
        setProduct(data)
      } catch {
        setError("Failed to load product.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct(id)
  }, [id])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingState />
      </div>
    )
  }

  if (error) {
    return <ErrorState title="Unable to load product" message={error} />
  }

  if (!product) {
    return (
      <ErrorState
        title="Product not found"
        message="We could not find this product."
        variant="border"
      />
    )
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs currentPage={product.title} />

      <ProductDetails product={product} />
    </main>
  )
}

export default ProductView
