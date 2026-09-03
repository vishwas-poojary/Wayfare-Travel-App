export function LoadingSpinner({ label = 'Loading' }) {
  return (
    <div className="flex items-center gap-3 text-sm text-ink-600/70" role="status" aria-live="polite">
      <span className="relative flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-60" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-gold-500" />
      </span>
      <span>{label}…</span>
    </div>
  )
}

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-rust-500/30 bg-rust-500/5 px-4 py-3 text-sm text-rust-500"
    >
      <p className="font-medium">Couldn't load this.</p>
      <p className="mt-0.5 text-rust-500/80">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-md border border-rust-500/40 px-3 py-1 text-xs font-medium text-rust-500 transition hover:bg-rust-500/10 focus-visible:outline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title = 'Nothing here yet', hint, action }) {
  return (
    <div className="rounded-xl border border-dashed border-ink-900/15 px-6 py-8 text-center">
      <p className="font-display text-lg text-ink-800">{title}</p>
      {hint && <p className="mx-auto mt-1 max-w-sm text-sm text-ink-600/70">{hint}</p>}
      {action}
    </div>
  )
}
