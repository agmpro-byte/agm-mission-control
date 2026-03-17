'use client'

import { useState } from 'react'
import { Building2, Users, TrendingUp, DollarSign, CheckCircle, Clock, Zap, Globe, AlertTriangle } from 'lucide-react'

interface Client {
  name: string
  type: 'Operator' | 'External' | 'Pipeline'
  fsmPlatform: string
  integrationStatus: 'live' | 'in_progress' | 'planned'
  products: {
    integration?: number
    platform?: number
    aiSEO?: number
  }
  totalMonthly: number
  notes: string
}

interface ClientData {
  activeClients: number
  pipelineClients: number
  targetClients: number
  totalMRR: number
  avgClientValue: number
  clients: Client[]
}

export default function ClientsDashboard() {
  const [data] = useState<ClientData>({
    activeClients: 2,
    pipelineClients: 1,
    targetClients: 220,
    totalMRR: 1094,
    avgClientValue: 547,
    clients: [
      {
        name: 'Texas Turf (Ivana)',
        type: 'External',
        fsmPlatform: 'Jobber',
        integrationStatus: 'live',
        products: { platform: 797 },
        totalMonthly: 797,
        notes: 'First external customer. 4 workflows live, self-healing Layers 1-4. Founding partner — free integration as proof of concept.'
      },
      {
        name: 'Heavenly Greens',
        type: 'Operator',
        fsmPlatform: 'CENTAH / Salesforce',
        integrationStatus: 'live',
        products: { integration: 297 },
        totalMonthly: 297,
        notes: 'Troy\'s company. Costco lead intake → AGM + Salesforce. Polling every 5 min. HG Polly (Voice AI) in development.'
      },
      {
        name: 'Valleywide Pest',
        type: 'Pipeline',
        fsmPlatform: 'Field Routes',
        integrationStatus: 'in_progress',
        products: {},
        totalMonthly: 0,
        notes: '8,373 customers, 4,599 subscriptions. 49% phone-only (no email). APIs connected, data audit complete. Building sync engine.'
      }
    ]
  })

  const liveClients = data.clients.filter(c => c.integrationStatus === 'live')
  const progressPercentage = Math.max((data.activeClients / data.targetClients) * 100, 1)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live': return { bg: 'bg-green-900', text: 'text-green-300', label: 'Live' }
      case 'in_progress': return { bg: 'bg-yellow-900', text: 'text-yellow-300', label: 'In Progress' }
      case 'planned': return { bg: 'bg-gray-700', text: 'text-gray-300', label: 'Planned' }
      default: return { bg: 'bg-gray-700', text: 'text-gray-300', label: status }
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-semibold text-white">AGM Pro Tools — Customers</h2>
        </div>
        <span className="text-sm text-gray-400">${data.totalMRR.toLocaleString()} MRR</span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-xs text-gray-500">Paying Customers</p>
          <p className="text-2xl font-semibold text-white">{data.activeClients}</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-xs text-gray-500">Pipeline</p>
          <p className="text-2xl font-semibold text-yellow-400">{data.pipelineClients}</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-xs text-gray-500">Live MRR</p>
          <p className="text-2xl font-semibold text-green-400">${data.totalMRR.toLocaleString()}</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-xs text-gray-500">ARR (Projected)</p>
          <p className="text-2xl font-semibold text-white">${(data.totalMRR * 12).toLocaleString()}</p>
        </div>
      </div>

      {/* Year 1 Target */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <p className="text-sm text-gray-400">Year 1 Target: ~220 subscribers @ $297/mo = ~$65K MRR</p>
          <p className="text-sm text-gray-400">{progressPercentage.toFixed(1)}%</p>
        </div>
        <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Early stage — product is built, activation is the gap. Flywheel + Jobber Marketplace are the growth engines.
        </p>
      </div>

      {/* FSM Platform Coverage */}
      <div className="mb-6">
        <h3 className="font-medium text-white mb-3">FSM Platform Coverage</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-black rounded-lg p-3 border border-green-800">
            <p className="text-sm font-medium text-green-400">Jobber</p>
            <p className="text-xs text-gray-400">~200K service businesses</p>
            <p className="text-xs text-green-300 mt-1">Live — Texas Turf</p>
          </div>
          <div className="bg-black rounded-lg p-3 border border-green-800">
            <p className="text-sm font-medium text-green-400">CENTAH / Salesforce</p>
            <p className="text-xs text-gray-400">Enterprise / Franchise</p>
            <p className="text-xs text-green-300 mt-1">Live — Heavenly Greens</p>
          </div>
          <div className="bg-black rounded-lg p-3 border border-yellow-800">
            <p className="text-sm font-medium text-yellow-400">Field Routes</p>
            <p className="text-xs text-gray-400">Pest control vertical</p>
            <p className="text-xs text-yellow-300 mt-1">Building — Valleywide</p>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div>
        <h3 className="font-medium text-white mb-3">Customer Detail</h3>
        <div className="space-y-3">
          {data.clients.map((client, index) => {
            const badge = getStatusBadge(client.integrationStatus)
            return (
              <div key={index} className="bg-black rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <p className="font-medium text-white">{client.name}</p>
                    <span className={`text-xs px-2 py-1 ${badge.bg} ${badge.text} rounded`}>
                      {badge.label}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                      {client.fsmPlatform}
                    </span>
                  </div>
                  <div className="text-right">
                    {client.totalMonthly > 0 ? (
                      <p className="font-semibold text-white">${client.totalMonthly.toLocaleString()}/mo</p>
                    ) : (
                      <p className="font-semibold text-yellow-400">TBD</p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400">{client.notes}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Strategic Insight */}
      <div className="mt-6 p-4 bg-indigo-900/20 rounded-lg border border-indigo-800">
        <p className="text-sm text-indigo-300">
          <strong>3 customers, 3 FSM platforms</strong> — each integration proves multi-FSM architecture works. Not a &ldquo;Jobber tool&rdquo; — the automation layer between ANY FSM and AGM. Valleywide (8,373 customers) is the enterprise scale test.
        </p>
      </div>
    </div>
  )
}
