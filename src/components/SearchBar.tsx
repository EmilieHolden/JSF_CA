import { useState } from "react"
import { Link } from "react-router-dom"
import type { Product } from "../types/product"

interface SearchBarProps {
  products: Product[]
}

function SearchBar({ products }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const searchResults = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative w-full sm:max-w-md">
      <label htmlFor="product-search" className="sr-only"></label>
      <input
        className="w-full rounded-md border border-border px-2 py-2.5 text-sm text-text outline-none transition focus:border-primary"
        type="search"
        placeholder="Search products"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {searchTerm && (
        <div className="absolute top-full left-0 z-40 mt-1 max-h-80 w-full overflow-y-auto rounded-md border border-border bg-bg shadow-lg">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex items-center gap-3 border-b border-border px-3 py-3 transition last:border-b-0 hover:bg-beige"
              >
                <img
                  src={product.image.url}
                  alt={product.image.alt}
                  className="h-14 w-14 shrink-0 object-cover rounded"
                />
                <span className="text-sm font-medium">{product.title}</span>
              </Link>
            ))
          ) : (
            <p className="px-3 py-3">No products found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
