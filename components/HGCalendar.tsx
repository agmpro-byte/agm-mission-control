'use client'

import { Calendar as CalendarIcon, ExternalLink } from 'lucide-react'

const HG_CALENDAR_URL = 'https://troy-byte.github.io/hg-calendar/'

export default function HGCalendar() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-6 h-6 text-cyan-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">HG Calendar</h2>
            <p className="text-xs text-gray-500">Heavenly Greens &mdash; Salesforce + AGM Events</p>
          </div>
        </div>
        <a
          href={HG_CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Open Full Screen</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Embedded Calendar */}
      <div className="rounded-lg overflow-hidden border border-gray-800" style={{ height: 'calc(100vh - 160px)' }}>
        <iframe
          src={HG_CALENDAR_URL}
          className="w-full h-full border-0"
          title="HG Calendar"
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
