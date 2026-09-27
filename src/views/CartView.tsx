import { useCartStore } from "../stores/cartStore"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Breadcrumbs from "../components/Breadcrumbs"
import { useState, type ChangeEvent, type SubmitEvent } from "react"

interface CheckoutFormData {
  fullName: string
  address: string
  postalCode: string
  city: string
}

interface CheckoutFormErrors {
  fullName?: string
  address?: string
  postalCode?: string
  city?: string
}

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

  function handleRemoveCartItem(productId: string) {
    removeItem(productId)
    toast("Product has been removed from cart")
  }

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    address: "",
    postalCode: "",
    city: "",
  })

  const [errors, setErrors] = useState<CheckoutFormErrors>({})

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function validateCheckout() {
    const newErrors: CheckoutFormErrors = {}

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters."
    }

    if (formData.address.trim().length < 3) {
      newErrors.address = "Please enter a valid address."
    }

    if (formData.postalCode.trim().length < 4) {
      newErrors.postalCode = "Please enter a valid postal code."
    }

    if (formData.city.trim().length < 3) {
      newErrors.city = "Please enter a valid city."
    }

    return newErrors
  }

  function handleCheckout(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateCheckout()

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

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
                    onClick={() => handleRemoveCartItem(item.product.id)}
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

          <div className="mt-8 border-t border-border pt-6">
            <div className="mx-auto w-full max-w-xl">
              <p className="text-xl font-semibold">
                Total: {totalPrice.toFixed(2)} NOK
              </p>

              <form
                onSubmit={handleCheckout}
                noValidate
                className="mt-8 space-y-5"
              >
                <h2 className="text-2xl font-semibold">Customer details</h2>

                <div>
                  <label htmlFor="fullName" className="mb-2 block font-medium">
                    Full name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    className="w-full rounded-md border border-neutral px-3 py-2.5 outline-none transition focus:border-primary"
                  />

                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="mb-2 block font-medium">
                    Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    aria-invalid={!!errors.address}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
                    className="w-full rounded-md border border-neutral px-3 py-2.5 outline-none transition focus:border-primary"
                  />

                  {errors.address && (
                    <p id="address-error" className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block font-medium"
                  >
                    Postal code
                  </label>

                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleChange}
                    aria-invalid={!!errors.postalCode}
                    aria-describedby={
                      errors.postalCode ? "postalCode-error" : undefined
                    }
                    className="w-full rounded-md border border-neutral px-3 py-2.5 outline-none transition focus:border-primary"
                  />

                  {errors.postalCode && (
                    <p
                      id="postalCode-error"
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="mb-2 block font-medium">
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? "city-error" : undefined}
                    className="w-full rounded-md border border-neutral px-3 py-2.5 outline-none transition focus:border-primary"
                  />

                  {errors.city && (
                    <p id="city-error" className="mt-1 text-sm text-red-600">
                      {errors.city}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-primary px-6 py-3 opacity-85 font-medium transition hover:opacity-100 sm:w-auto"
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default CartView
