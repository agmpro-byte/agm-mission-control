'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  isChunkError: boolean
}

// A "chunk load error" happens when the browser is running a stale index.html /
// webpack runtime from an OLD build and asks for a hashed JS/CSS chunk that the
// latest deploy has already deleted. Mission Control is a Next.js static export
// on GitHub Pages that rebuilds on every push (True North renders push daily),
// so chunk hashes rotate constantly — any tab left open across a deploy hits this.
// The only real recovery is a full page reload to fetch the fresh chunk map.
function isChunkLoadError(error?: Error): boolean {
  if (!error) return false
  const name = error.name || ''
  const msg = error.message || ''
  return (
    name === 'ChunkLoadError' ||
    /Loading chunk [\w-]+ failed/i.test(msg) ||
    /Loading CSS chunk/i.test(msg) ||
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /importing a module script failed/i.test(msg)
  )
}

const RELOAD_KEY = 'mc_chunk_reload_ts'
// Re-arm the auto-reload after this window so a SECOND deploy later in the same
// session can also self-heal, while a tight failing loop still can't thrash.
const RELOAD_COOLDOWN_MS = 15000

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, isChunkError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, isChunkError: isChunkLoadError(error) }
  }

  componentDidCatch(error: Error) {
    if (!isChunkLoadError(error) || typeof window === 'undefined') return
    try {
      const last = Number(window.sessionStorage.getItem(RELOAD_KEY) || 0)
      if (Date.now() - last > RELOAD_COOLDOWN_MS) {
        window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
        window.location.reload()
      }
    } catch {
      // sessionStorage blocked (private mode / sandbox) — fall back to manual reload UI
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      if (this.state.isChunkError) {
        return (
          <div className="bg-amber-900/20 rounded-lg p-6 border border-amber-800 text-center">
            <p className="text-amber-200 font-medium mb-2">Updating to the latest version…</p>
            <p className="text-sm text-gray-400 mb-3">
              A newer build is available. Reloading to fetch it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700"
            >
              Reload now
            </button>
          </div>
        )
      }

      return (
        <div className="bg-red-900/20 rounded-lg p-6 border border-red-800 text-center">
          <p className="text-red-300 font-medium mb-2">Component failed to load</p>
          <p className="text-sm text-gray-400">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, isChunkError: false })}
            className="mt-3 px-4 py-2 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700"
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
