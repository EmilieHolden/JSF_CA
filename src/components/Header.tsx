import { Link, NavLink } from "react-router-dom"
import { useCartStore } from "../stores/cartStore"

function Header() {
  const items = useCartStore((state) => state.items)

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  return (
    <header className="sticky z-50 top-0 border-b border-beige bg-bg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-semibold font-heading text-text">
          Altora
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-5 text-sm font-body font-medium sm:gap-7">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "font-bold text-primary" : "hover:text-primary"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "font-bold text-primary" : "hover:text-primary"
                }
              >
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cart"
                aria-label={`Shopping cart with ${totalItems} items`}
                className={({ isActive }) =>
                  isActive ? "font-bold text-primary" : "hover:text-primary"
                }
              >
                <div className="flex">
                  <span className="material-symbols-outlined">
                    shopping_bag
                  </span>
                  <div>{totalItems}</div>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
