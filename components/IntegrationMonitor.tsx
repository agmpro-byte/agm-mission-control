'use client'

import { useState, useEffect } from 'react'
import { Zap, CheckCircle, AlertCircle, XCircle, RefreshCw, Activity } from 'lucide-react'

interface Integration {
  id: string
  name: string
  platform: string
  client: string
  status: 'operational' | 'degraded' | 'error' | 'pending'
  lastSync: string
  metrics: {
    customersTotal: number
    customersSynced: number
    subscriptions: number
    errorRate: number
    uptime: number
  }
  durability?: number
  features?: string[]
}

export default function IntegrationMonitor() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'jobber-texas-turf',
      name: 'Texas Turf',
      platform: 'Jobber → AGM',
      client: 'Ivana',
      status: 'operational',
      lastSync: new Date(Date.now() - 300000).toISOString(), // 5 min ago
      metrics: {
        customersTotal: 0,
        customersSynced: 0,
        subscriptions: 0,
        errorRate: 0,
        uptime: 99.9
      },
      durability: 10,
      features: ['4 workflows live', 'Self-healing Layers 1-4', 'Health endpoint', 'Event store', 'Quote lifecycle sync']
    },
    {
      id: 'field-routes-valleywide',
      name: 'Valleywide Pest',
      platform: 'Field Routes → AGM',
      client: 'Valleywide Pest Control',
      status: 'pending',
      lastSync: new Date(Date.now() - 86400000).toISOString(),
      metrics: {
        customersTotal: 8373,
        customersSynced: 0,
        subscriptions: 4599,
        errorRate: 0,
        uptime: 0
      },
      features: ['APIs connected', 'Data audit complete', '49% phone-only (no email)', 'Sync engine building']
    },
    {
      id: 'centah-salesforce',
      name: 'HG Costco',
      platform: 'CENTAH → Salesforce',
      client: 'Heavenly Greens',
      status: 'operational',
      lastSync: new Date(Date.now() - 900000).toISOString(), // 15 min ago
      metrics: {
        customersTotal: 0,
        customersSynced: 0,
        subscriptions: 0,
        errorRate: 0,
        uptime: 99.5
      },
      features: ['Costco lead intake', 'Email polling every 5 min', 'AGM + Salesforce dual write', 'HG Polly (Voice AI) in dev']
    }
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'degraded': return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />
      case 'pending': return <RefreshCw className="w-5 h-5 text-gray-400" />
      default: return <Activity className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500'
      case 'degraded': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      case 'pending': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const formatLastSync = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
    return `${Math.floor(minutes / 1440)}d ago`
  }

  const operationalCount = integrations.filter(i => i.status === 'operational').length
  const totalCustomers = integrations.reduce((acc, i) => acc + i.metrics.customersTotal, 0)
  const syncedCustomers = integrations.reduce((acc, i) => acc + i.metrics.customersSynced, 0)

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Integration Health</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">
            {operationalCount}/{integrations.length} Operational
          </span>
          <div className={`w-3 h-3 rounded-full ${getStatusColor('operational')} animate-pulse`} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-black rounded-lg p-3 border border-gray-800">
          <p className="text-2xl font-semibold text-white">{totalCustomers.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Total Customers</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800">
          <p className="text-2xl font-semibold text-white">{syncedCustomers.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Synced</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800">
          <p className="text-2xl font-semibold text-white">
            {((syncedCustomers / totalCustomers) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-400">Sync Rate</p>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="space-y-4">
        {integrations.map(integration => (
          <div 
            key={integration.id} 
            className={`bg-black rounded-lg p-4 border transition-all ${
              integration.status === 'error' ? 'border-red-500' : 'border-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(integration.status)}
                <div>
                  <h3 className="font-medium text-white">{integration.name}</h3>
                  <p className="text-sm text-gray-400">{integration.platform}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-300 capitalize">{integration.status}</p>
                <p className="text-xs text-gray-500">Last sync: {formatLastSync(integration.lastSync)}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-500">Customers</p>
                <p className="text-sm font-medium text-white">
                  {integration.metrics.customersSynced}/{integration.metrics.customersTotal}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Subscriptions</p>
                <p className="text-sm font-medium text-white">{integration.metrics.subscriptions}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Error Rate</p>
                <p className={`text-sm font-medium ${
                  integration.metrics.errorRate > 1 ? 'text-red-400' : 'text-white'
                }`}>
                  {integration.metrics.errorRate}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Uptime</p>
                <p className="text-sm font-medium text-white">{integration.metrics.uptime}%</p>
              </div>
              {integration.durability && (
                <div>
                  <p className="text-xs text-gray-500">Durability</p>
                  <p className="text-sm font-medium text-white">{integration.durability}/10</p>
                </div>
              )}
            </div>

            {/* Features */}
            {integration.features && (
              <div className="flex flex-wrap gap-2">
                {integration.features.map((feature, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}