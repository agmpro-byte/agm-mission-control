'use client'

import { useState, useEffect } from 'react'
import { Activity, AlertCircle, CheckCircle, XCircle, TrendingUp } from 'lucide-react'

interface FlywheelStage {
  id: string
  name: string
  status: 'green' | 'yellow' | 'red'
  lastActivity?: string
  metrics?: {
    current: number
    target: number
    unit: string
  }
  message?: string
  actionNeeded?: string
}

const realStages: FlywheelStage[] = [
  {
    id: 'intelligence',
    name: 'Intelligence',
    status: 'red',
    lastActivity: 'Not yet operational',
    metrics: { current: 0, target: 50, unit: 'signals/week' },
    message: 'Scout agent not yet deployed. Manual research only.',
    actionNeeded: 'Deploy Scout signal pipeline on Mac Mini'
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    status: 'green',
    lastActivity: 'Monthly cadence',
    metrics: { current: 280, target: 500, unit: 'subscribers' },
    message: 'AGM Intelligence Report — ~280 subs, 97% non-customers. Monthly send via GHL.'
  },
  {
    id: 'agm-friday',
    name: 'AGM Friday',
    status: 'yellow',
    lastActivity: 'Not yet launched',
    metrics: { current: 0, target: 1, unit: 'episode/week' },
    message: 'Content pipeline starting this week. First publish target: Friday.',
    actionNeeded: 'Get first episode through the pipeline this week'
  },
  {
    id: 'demo',
    name: 'Product Demo',
    status: 'yellow',
    lastActivity: 'Organic only',
    metrics: { current: 0, target: 10, unit: 'demos/week' },
    message: 'No structured demo pipeline yet. Conversion is organic via newsletter + marketplace.',
    actionNeeded: 'Build demo video for AGMProTools.com'
  },
  {
    id: 'adoption',
    name: 'Customer Adoption',
    status: 'yellow',
    lastActivity: '2 paying, 1 building',
    metrics: { current: 2, target: 5, unit: 'customers/month' },
    message: 'HG ($297) + Texas Turf ($797) live. Valleywide in progress. Case studies not yet written.',
    actionNeeded: 'Write Texas Turf case study for content pipeline'
  }
]

export default function FlywheelStatus() {
  const [stages] = useState<FlywheelStage[]>(realStages)
  const [overallHealth, setOverallHealth] = useState<'healthy' | 'warning' | 'critical'>('warning')

  useEffect(() => {
    const redCount = stages.filter(s => s.status === 'red').length
    const yellowCount = stages.filter(s => s.status === 'yellow').length

    if (redCount > 1) {
      setOverallHealth('critical')
    } else if (redCount > 0 || yellowCount > 1) {
      setOverallHealth('warning')
    } else {
      setOverallHealth('healthy')
    }
  }, [stages])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'yellow': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'red': return <XCircle className="w-5 h-5 text-red-500" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-900/20 border-green-800'
      case 'yellow': return 'bg-yellow-900/20 border-yellow-800'
      case 'red': return 'bg-red-900/20 border-red-800'
      default: return 'bg-gray-900/20 border-gray-800'
    }
  }

  const getHealthBadge = () => {
    switch (overallHealth) {
      case 'healthy': return { text: 'All Systems Go', classes: 'text-green-400 bg-green-900/30 border-green-700' }
      case 'warning': return { text: 'Early Stage — Building', classes: 'text-yellow-400 bg-yellow-900/30 border-yellow-700' }
      case 'critical': return { text: 'Critical Gaps', classes: 'text-red-400 bg-red-900/30 border-red-700' }
    }
  }

  const badge = getHealthBadge()

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-800">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Flywheel Status</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${badge.classes}`}>
            {badge.text}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Flywheel Flow Visualization */}
        <div className="mb-8">
          <div className="flex items-center justify-between space-x-2">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex-1">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(stage.status)}
                  {index < stages.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-700" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  {stage.name}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            Intelligence → Newsletter → Content → Demos → Customers → (loop back)
          </p>
        </div>

        {/* Stage Details */}
        <div className="space-y-4">
          {stages.map(stage => (
            <div
              key={stage.id}
              className={`rounded-lg border p-4 transition-all ${getStatusColor(stage.status)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(stage.status)}
                  <h3 className="font-medium text-white">{stage.name}</h3>
                </div>
                <span className="text-sm text-gray-400">
                  {stage.lastActivity}
                </span>
              </div>

              {stage.metrics && (
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="font-medium text-white">
                      {stage.metrics.current} / {stage.metrics.target} {stage.metrics.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        stage.status === 'green' ? 'bg-green-500' :
                        stage.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max((stage.metrics.current / stage.metrics.target) * 100, stage.metrics.current > 0 ? 2 : 0)}%` }}
                    />
                  </div>
                </div>
              )}

              {stage.message && (
                <p className="text-sm text-gray-400">{stage.message}</p>
              )}
            </div>
          ))}
        </div>

        {/* Consistency Reminder */}
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-1">
                Flywheel Cadence (Consistency = Everything)
              </h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• <strong className="text-white">Weekly:</strong> AGM Friday episode + LinkedIn insight post</li>
                <li>• <strong className="text-white">Monthly:</strong> Intelligence Report newsletter</li>
                <li>• <strong className="text-white">This Week:</strong> Get first content piece through the full pipeline → publish Friday</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Items */}
        {stages.filter(s => s.actionNeeded).length > 0 && (
          <div className="mt-4 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800">
            <h4 className="font-medium text-yellow-300 mb-2">Actions Needed</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              {stages.filter(s => s.actionNeeded).map(stage => (
                <li key={stage.id}>• <strong className="text-white">{stage.name}:</strong> {stage.actionNeeded}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
