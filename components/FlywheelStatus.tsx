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
}

const mockStages: FlywheelStage[] = [
  {
    id: 'intelligence',
    name: 'Intelligence',
    status: 'green',
    lastActivity: '2 hours ago',
    metrics: { current: 47, target: 50, unit: 'signals/week' },
    message: 'Scout tracking 12 competitor moves this week'
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    status: 'green',
    lastActivity: '3 days ago',
    metrics: { current: 280, target: 500, unit: 'subscribers' },
    message: 'Next issue drafting - PFAS regulations focus'
  },
  {
    id: 'agm-friday',
    name: 'AGM Friday',
    status: 'yellow',
    lastActivity: '6 days ago',
    metrics: { current: 1, target: 1, unit: 'episode/week' },
    message: 'Episode due tomorrow - script needed'
  },
  {
    id: 'demo',
    name: 'Product Demo',
    status: 'green',
    lastActivity: '1 day ago',
    metrics: { current: 8, target: 10, unit: 'demos/week' },
    message: '3 demos scheduled this week'
  },
  {
    id: 'adoption',
    name: 'Customer Adoption',
    status: 'green',
    lastActivity: '4 days ago',
    metrics: { current: 2, target: 5, unit: 'new customers/month' },
    message: 'ServiceTitan integration driving interest'
  }
]

export default function FlywheelStatus() {
  const [stages, setStages] = useState<FlywheelStage[]>(mockStages)
  const [overallHealth, setOverallHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy')

  useEffect(() => {
    // Calculate overall health
    const redCount = stages.filter(s => s.status === 'red').length
    const yellowCount = stages.filter(s => s.status === 'yellow').length
    
    if (redCount > 0) {
      setOverallHealth('critical')
    } else if (yellowCount > 1) {
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
      case 'green': return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'yellow': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
      case 'red': return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      default: return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800'
    }
  }

  const getHealthColor = () => {
    switch (overallHealth) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Flywheel Status</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getHealthColor()}`}>
            {overallHealth === 'healthy' ? 'All Systems Go' : 
             overallHealth === 'warning' ? 'Attention Needed' : 'Critical'}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Flywheel Visualization */}
        <div className="mb-8">
          <div className="flex items-center justify-between space-x-2">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex-1">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(stage.status)}
                  {index < stages.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600" />
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                  {stage.name}
                </p>
              </div>
            ))}
          </div>
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
                  <h3 className="font-medium text-gray-900 dark:text-white">{stage.name}</h3>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stage.lastActivity}
                </span>
              </div>

              {stage.metrics && (
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {stage.metrics.current} / {stage.metrics.target} {stage.metrics.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        stage.status === 'green' ? 'bg-green-500' :
                        stage.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(stage.metrics.current / stage.metrics.target) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {stage.message && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{stage.message}</p>
              )}
            </div>
          ))}
        </div>

        {/* Action Required */}
        {overallHealth !== 'healthy' && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Recommended Actions
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {stages.filter(s => s.status === 'yellow' || s.status === 'red').map(stage => (
                    <li key={stage.id}>
                      • {stage.name}: {
                        stage.id === 'agm-friday' ? 'Script needed for tomorrow\'s episode' :
                        stage.id === 'newsletter' ? 'Schedule next issue content' :
                        'Review and take action'
                      }
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}