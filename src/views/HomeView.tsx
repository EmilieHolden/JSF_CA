import { useEffect, useState } from "react"
import type { Product } from "../types/product"
import { getProducts } from "../api/products"
import ProductCard from "../components/ProductCard"
import SearchBar from "../components/SearchBar"
import LoadingState from "../components/LoadingState"
import ErrorState from "../components/ErrorState"

function HomeView() {
  const [products, setProducts] = useState<Product[]>([])
  const [sortOption, setSortOption] = useState("default")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError("Failed to load products.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.discountedPrice - b.discountedPrice

      case "price-high":
        return b.discountedPrice - a.discountedPrice

      case "rating":
        return b.rating - a.rating

      default:
        return 0
    }
  })

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

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">Products</h1>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchBar products={products} />

          <select
            className="rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary sm:w-auto"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default HomeView
