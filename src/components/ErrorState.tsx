interface ErrorStateProps {
  title: string
  message: string
  variant?: "error" | "border"
}

function ErrorState({ title, message, variant = "error" }: ErrorStateProps) {
  const isError = variant === "error"

  return (
    <section
      className="flex min-h-[320px] items-center justify-center px-4 py-12 text-center"
      role={isError ? "alert" : undefined}
    >
      <div className="max-w-md">
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg ${
            isError ? "bg-red-50 text-red-700" : "bg-beige text-text"
          }`}
          aria-hidden="true"
        >
          !
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-text">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-text">{message}</p>
      </div>
    </section>
  )
}

export default ErrorState
