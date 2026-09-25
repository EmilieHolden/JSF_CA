import { Link } from "react-router-dom"

function NotFoundView() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>

      <p className="mt-4">The page you are looking for does not exist.</p>

      <Link to="/" className="mt-6 inline-block text-primary hover:underline">
        Back to products
      </Link>
    </main>
  )
}

export default NotFoundView
