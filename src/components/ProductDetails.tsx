import type { Product } from "../types/product"
import { useCartStore } from "../stores/cartStore"

interface ProductDetailsProps {
  product: Product
}

function ProductDetails({ product }: ProductDetailsProps) {
  const addItem = useCartStore((state) => state.addItem)
  const hasDiscount = product.discountedPrice < product.price

  return (
    <article>
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="overflow-hidden rounded-lg">
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {product.title}
          </h1>

          <p className="mt-3 text-sm">Rating: {product.rating}</p>

          {hasDiscount ? (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl font-semibold">
                {product.discountedPrice} NOK
              </span>

              <span className="text-neutral-500 line-through">
                {product.price} NOK
              </span>
            </div>
          ) : (
            <p className="mt-4 text-xl font-semibold">{product.price} NOK</p>
          )}

          <p className="mt-6">{product.description}</p>

          {product.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-beige px-3 py-1 text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() => addItem(product)}
            className="mt-8 w-full rounded-md bg-primary opacity-85 px-5 py-3 font-medium text-bg font-light transition hover:opacity-100"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-2xl font-semibold">Reviews</h2>

          <div className="mt-6 space-y-6">
            {product.reviews.map((review) => (
              <article key={review.id}>
                <h3 className="font-semibold">{review.username}</h3>
                <p className="mt-1 text-sm">Rating: {review.rating}</p>
                <p className="mt-2">{review.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

export default ProductDetails
