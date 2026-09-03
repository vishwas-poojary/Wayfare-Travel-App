import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled error in app:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-sand-50 px-5 text-center">
          <h1 className="font-display text-3xl text-ink-900">Something went off course.</h1>
          <p className="mt-2 max-w-sm text-ink-600/70">
            An unexpected error occurred. Refreshing the page usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-ink-900 px-6 py-3 text-sm text-sand-50 transition hover:bg-ink-700"
          >
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
