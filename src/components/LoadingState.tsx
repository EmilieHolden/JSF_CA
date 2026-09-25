function LoadingState() {
  return (
    <div className="inline-flex" role="status" aria-label="loading">
      <span
        className="flex h-6 items-center justify-center gap-0.5"
        aria-hidden="true"
      >
        <span className="h-2.5 w-1 rounded-full bg-primary origin-center [animation:spinner-wave_0.9s_ease-in-out_infinite_0s]" />
        <span className="h-3.5 w-1 rounded-full bg-primary origin-center [animation:spinner-wave_0.9s_ease-in-out_infinite_0.12s]" />
        <span className="h-4.5 w-1 rounded-full bg-primary origin-center [animation:spinner-wave_0.9s_ease-in-out_infinite_0.24s]" />
        <span className="h-3.5 w-1 rounded-full bg-primary origin-center [animation:spinner-wave_0.9s_ease-in-out_infinite_0.36s]" />
        <span className="h-2.5 w-1 rounded-full bg-primary origin-center [animation:spinner-wave_0.9s_ease-in-out_infinite_0.48s]" />
      </span>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingState
