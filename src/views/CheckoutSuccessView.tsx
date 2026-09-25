import { Link } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"

function CheckoutSuccessView() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs currentPage="Checkout Success" />

      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Thank you for your order
        </h1>

        <p className="mt-4 text-lg">
          Your purchase was completed successfully.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-primary opacity-85 text-bg px-6 py-3 font-medium transition hover:opacity-100"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  )
}

export default CheckoutSuccessView
