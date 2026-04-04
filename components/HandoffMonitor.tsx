'use client'

import { useState, useEffect } from 'react'
import { ArrowRightLeft, FileJson, Clock, AlertCircle, CheckCircle, Timer } from 'lucide-react'

interface HandoffFile {
  name: string
  path: string
  lastUpdated?: string
  size?: number
  status: 'fresh' | 'stale' | 'missing' | 'pending'
  description: string
  schedule: string
}

export default function HandoffMonitor() {
  const [handoffs, setHandoffs] = useState<HandoffFile[]>([
    {
      name: 'Email Triage',
      path: 'latest.json',
      description: 'ACTION/REVIEW/FYI/INTEL categorization',
      schedule: '6:30 AM Daily',
      status: 'pending'
    },
    {
      name: 'Command Center',
      path: 'latest_command_center.json',
      description: 'Google Sheets data (all tabs)',
      schedule: '6:30 AM Daily',
      status: 'pending'
    },
    {
      name: 'Full Briefing',
      path: 'latest_full_briefing.json',
      description: 'System health, webhooks, cron status',
      schedule: '6:30 AM Daily',
      status: 'pending'
    }
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fresh':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'stale':
        return <Clock className="w-5 h-5 text-yellow-400" />
      case 'missing':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'pending':
        return <Timer className="w-5 h-5 text-blue-400" />
      default:
        return null
    }
  }

  const getStatusText = (status: string, lastUpdated?: string) => {
    switch (status) {
      case 'fresh':
        return lastUpdated ? `Fresh (${new Date(lastUpdated).toLocaleTimeString()})` : 'Fresh'
      case 'stale':
        return 'Needs refresh'
      case 'missing':
        return 'File missing'
      case 'pending':
        return 'Awaiting first run'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh':
        return 'bg-green-400'
      case 'stale':
        return 'bg-yellow-400'
      case 'missing':
        return 'bg-red-400'
      case 'pending':
        return 'bg-blue-400'
      default:
        return 'bg-gray-400'
    }
  }

  const anyMissing = handoffs.some(h => h.status === 'missing')
  const allPending = handoffs.every(h => h.status === 'pending')

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ArrowRightLeft className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-semibold text-white">Harlan → Briggs Pipeline</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            .tmp/handoffs/harlan_to_briggs/
          </span>
        </div>
      </div>

      {/* Pipeline Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-400">Pipeline Status</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            allPending ? 'bg-blue-900/50 text-blue-300 border border-blue-800' :
            anyMissing ? 'bg-red-900/50 text-red-300 border border-red-800' : 
            'bg-green-900/50 text-green-300 border border-green-800'
          }`}>
            {allPending ? 'Waiting for First Run' : anyMissing ? 'Action Required' : 'Operational'}
          </div>
        </div>

        {/* Visual Pipeline */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-20 h-1 bg-gray-700 rounded"></div>
            <div className={`w-3 h-3 rounded-full ${getStatusColor(handoffs[0].status)}`}></div>
          </div>
          <div className="flex items-center">
            <div className="w-20 h-1 bg-gray-700 rounded"></div>
            <div className={`w-3 h-3 rounded-full ${getStatusColor(handoffs[1].status)}`}></div>
          </div>
          <div className="flex items-center">
            <div className="w-20 h-1 bg-gray-700 rounded"></div>
            <div className={`w-3 h-3 rounded-full ${getStatusColor(handoffs[2].status)}`}></div>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="space-y-3">
        {handoffs.map((handoff, index) => (
          <div key={index} className={`bg-black rounded-lg p-4 border ${
            handoff.status === 'missing' ? 'border-red-800' : 
            handoff.status === 'pending' ? 'border-blue-800' : 
            'border-gray-800'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getStatusIcon(handoff.status)}
                <div>
                  <h4 className="font-medium text-white">{handoff.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{handoff.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500 flex items-center">
                      <FileJson className="w-3 h-3 mr-1" />
                      {handoff.path}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {handoff.schedule}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  handoff.status === 'fresh' ? 'text-green-400' :
                  handoff.status === 'stale' ? 'text-yellow-400' :
                  handoff.status === 'pending' ? 'text-blue-400' :
                  'text-red-400'
                }`}>
                  {getStatusText(handoff.status, handoff.lastUpdated)}
                </p>
                {handoff.size && (
                  <p className="text-xs text-gray-500 mt-1">
                    {(handoff.size / 1024).toFixed(1)} KB
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Messages */}
      {allPending && (
        <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
          <h4 className="font-medium text-blue-300 mb-2 flex items-center">
            <Timer className="w-4 h-4 mr-2" />
            Waiting for First Cron Run
          </h4>
          <p className="text-sm text-blue-400">
            Harlan's morning cron jobs will begin at 5:30 AM PT tomorrow. 
            The pipeline will populate automatically during the briefing sequence.
          </p>
        </div>
      )}

      {anyMissing && !allPending && (
        <div className="mt-4 p-4 bg-red-900/20 rounded-lg border border-red-800">
          <h4 className="font-medium text-red-300 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Action Required
          </h4>
          <p className="text-sm text-red-400">
            Some handoff files are missing. Check cron job configuration.
          </p>
        </div>
      )}
    </div>
  )
}