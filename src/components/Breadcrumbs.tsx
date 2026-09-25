import { Link } from "react-router-dom"

interface BreadcrumbsProps {
  currentPage: string
}

function Breadcrumbs({ currentPage }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex items-center gap-2">
        <li>
          <Link to="/" className="transition hover:text-primary">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-neutral-500">
          {currentPage}
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs
