'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-red-900/20 rounded-lg p-6 border border-red-800 text-center">
          <p className="text-red-300 font-medium mb-2">Component failed to load</p>
          <p className="text-sm text-gray-400">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
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
