import { Link } from "react-router-dom"
import type { Product } from "../types/product"

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountedPrice < product.price

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      )
    : 0

  return (
    <article>
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />

          {hasDiscount && (
            <span className="rounded-md absolute top-3 left-3 bg-secondary px-2 py-1 text-xs font-medium text-text">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <div className="pt-3">
          <h2 className="text-base font-medium">{product.title}</h2>

          <p className="mt-1 text-sm">Rating: {product.rating}</p>

          {hasDiscount ? (
            <div className="mt-2 flex items-center gap-2">
              <span className="font-semibold">
                {product.discountedPrice} NOK
              </span>

              <span className="text-sm text-neutral-500 line-through">
                {product.price} NOK
              </span>
            </div>
          ) : (
            <p className="mt-2 font-semibold">{product.price} NOK</p>
          )}
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
