import { useCartStore } from "../stores/cartStore"
import { useNavigate } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"

function CartView() {
  const navigate = useNavigate()

  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  const totalPrice = items.reduce(
    (total, item) => total + item.product.discountedPrice * item.quantity,
    0
  )

  function handleCheckout() {
    clearCart()
    navigate("/checkout-success")
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs currentPage="Cart" />

      <h1 className="text-3xl font-semibold tracking-tight">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="mt-6">Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-8 space-y-6">
            {items.map((item) => (
              <article
                key={item.product.id}
                className="grid gap-4 border-b border-border pb-6 sm:grid-cols-[120px_1fr_auto]"
              >
                <img
                  src={item.product.image.url}
                  alt={item.product.image.alt}
                  className="aspect-[4/5] w-full rounded-lg object-cover sm:w-[120px]"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {item.product.title}
                  </h2>

                  <p className="mt-2 font-medium">
                    {item.product.discountedPrice} NOK
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="mt-4 text-sm underline transition hover:text-primary"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-3 sm:self-start">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="h-9 w-9 rounded-md border border-border"
                    aria-label={`Decrease quantity of ${item.product.title}`}
                  >
                    -
                  </button>

                  <span className="min-w-6 text-center">{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="h-9 w-9 rounded-md border border-border"
                    aria-label={`Increase quantity of ${item.product.title}`}
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-end gap-4 border-t border-border pt-6">
            <p className="text-xl font-semibold">
              Total: {totalPrice.toFixed(2)} NOK
            </p>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-md bg-primary px-6 py-3 font-medium opacity-85 text-bg transition hover:opacity-100 sm:w-auto"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export default CartView
