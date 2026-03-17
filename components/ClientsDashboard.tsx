'use client'

import { useState } from 'react'
import { Building2, Users, TrendingUp, DollarSign, CheckCircle, Clock, Zap, Globe, Search } from 'lucide-react'

interface Client {
  name: string
  type: 'Manufacturer' | 'Dealer' | 'Retailer'
  services: {
    agmBuild?: number
    agmGrow?: number
    agmScale?: number
    aiSEO?: number
    hosting?: number
  }
  totalMonthly: number
  status: 'active' | 'onboarding' | 'paused'
}

interface ClientData {
  activeClients: number
  targetClients: number
  totalMRR: number
  avgClientValue: number
  serviceBreakdown: {
    agmBuild: number
    agmGrow: number
    agmScale: number
    aiSEO: number
    hosting: number
  }
  clients: Client[]
}

export default function ClientsDashboard() {
  const [data] = useState<ClientData>({
    activeClients: 11,
    targetClients: 75,
    totalMRR: 9186, // Calculated from actual client data
    avgClientValue: 835,
    serviceBreakdown: {
      agmBuild: 3,
      agmGrow: 5,
      agmScale: 1,
      aiSEO: 4,
      hosting: 8
    },
    clients: [
      { 
        name: 'Realturf', 
        type: 'Manufacturer', 
        services: { agmGrow: 697 }, 
        totalMonthly: 697, 
        status: 'active' 
      },
      { 
        name: 'Amazing Turf & Lawn', 
        type: 'Dealer', 
        services: { agmBuild: 497, aiSEO: 997, hosting: 25 }, 
        totalMonthly: 1519, 
        status: 'active' 
      },
      { 
        name: 'Texas Turf USA', 
        type: 'Dealer', 
        services: { agmGrow: 797, hosting: 25 }, 
        totalMonthly: 822, 
        status: 'active' 
      },
      { 
        name: 'Alpha Turf', 
        type: 'Dealer', 
        services: { agmGrow: 697 }, 
        totalMonthly: 697, 
        status: 'active' 
      },
      { 
        name: 'Sunburst Landscaping', 
        type: 'Dealer', 
        services: { agmGrow: 797, aiSEO: 997, hosting: 25 }, 
        totalMonthly: 1819, 
        status: 'active' 
      },
      { 
        name: 'Turf Prep', 
        type: 'Dealer', 
        services: { agmBuild: 497 }, 
        totalMonthly: 497, 
        status: 'active' 
      },
      { 
        name: 'East Coast Turf Pros', 
        type: 'Dealer', 
        services: { hosting: 25 }, 
        totalMonthly: 25, 
        status: 'active' 
      },
      { 
        name: 'Oasis Turf', 
        type: 'Dealer', 
        services: { agmScale: 997, hosting: 75 }, 
        totalMonthly: 1072, 
        status: 'active' 
      },
      { 
        name: 'DFW', 
        type: 'Dealer', 
        services: { agmBuild: 497, aiSEO: 997, hosting: 25 }, 
        totalMonthly: 1519, 
        status: 'active' 
      },
      { 
        name: 'JNR Home Improvement', 
        type: 'Dealer', 
        services: { agmGrow: 797 }, 
        totalMonthly: 797, 
        status: 'active' 
      },
      { 
        name: 'Turf Casa', 
        type: 'Retailer', 
        services: { hosting: 25 }, 
        totalMonthly: 25, 
        status: 'active' 
      }
    ]
  })

  const progressPercentage = (data.activeClients / data.targetClients) * 100

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'agmBuild': return '🏗️'
      case 'agmGrow': return '📈'
      case 'agmScale': return '🚀'
      case 'aiSEO': return '🔍'
      case 'hosting': return '🌐'
      default: return '📊'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-semibold text-white">AGM Clients</h2>
        </div>
        <span className="text-sm text-gray-400">${data.totalMRR.toLocaleString()} MRR</span>
      </div>

      {/* Client Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-3xl font-bold text-white">
              {data.activeClients}<span className="text-lg text-gray-400"> clients</span>
            </p>
            <p className="text-sm text-gray-400">Active AGM accounts</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-300">{data.targetClients}</p>
            <p className="text-sm text-gray-400">Year 1 target</p>
          </div>
        </div>

        <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {progressPercentage.toFixed(0)}% of target
            </span>
          </div>
        </div>

        <div className="mt-3 text-center text-sm text-gray-400">
          {data.targetClients - data.activeClients} more clients to hit Year 1 goal
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-lg mb-1">🏗️</p>
          <p className="text-xs text-gray-500">AGM Build</p>
          <p className="text-xl font-semibold text-white">{data.serviceBreakdown.agmBuild}</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-lg mb-1">📈</p>
          <p className="text-xs text-gray-500">AGM Grow</p>
          <p className="text-xl font-semibold text-white">{data.serviceBreakdown.agmGrow}</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-lg mb-1">🚀</p>
          <p className="text-xs text-gray-500">AGM Scale</p>
          <p className="text-xl font-semibold text-white">{data.serviceBreakdown.agmScale}</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-lg mb-1">🔍</p>
          <p className="text-xs text-gray-500">AI SEO</p>
          <p className="text-xl font-semibold text-white">{data.serviceBreakdown.aiSEO}</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-gray-800 text-center">
          <p className="text-lg mb-1">🌐</p>
          <p className="text-xs text-gray-500">Hosting</p>
          <p className="text-xl font-semibold text-white">{data.serviceBreakdown.hosting}</p>
        </div>
      </div>

      {/* Client List */}
      <div>
        <h3 className="font-medium text-white mb-3 flex items-center justify-between">
          <span>All Clients</span>
          <span className="text-xs text-gray-400">Sorted by monthly value</span>
        </h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {data.clients.sort((a, b) => b.totalMonthly - a.totalMonthly).map((client, index) => (
            <div key={index} className="bg-black rounded-lg p-3 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{client.name}</p>
                    <div className="text-right">
                      <p className="font-semibold text-white">${client.totalMonthly.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">/month</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{client.type}</span>
                    <div className="flex items-center space-x-2">
                      {client.services.agmBuild && (
                        <span className="text-xs px-2 py-1 bg-blue-900 text-blue-300 rounded">
                          Build ${client.services.agmBuild}
                        </span>
                      )}
                      {client.services.agmGrow && (
                        <span className="text-xs px-2 py-1 bg-green-900 text-green-300 rounded">
                          Grow ${client.services.agmGrow}
                        </span>
                      )}
                      {client.services.agmScale && (
                        <span className="text-xs px-2 py-1 bg-purple-900 text-purple-300 rounded">
                          Scale ${client.services.agmScale}
                        </span>
                      )}
                      {client.services.aiSEO && (
                        <span className="text-xs px-2 py-1 bg-orange-900 text-orange-300 rounded">
                          SEO ${client.services.aiSEO}
                        </span>
                      )}
                      {client.services.hosting && (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                          Host ${client.services.hosting}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Insights */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-900/20 rounded-lg border border-green-800">
          <p className="text-sm text-green-300">
            <strong>Bundle Opportunity:</strong> Sunburst & DFW show the power of bundles at $1,819/mo each
          </p>
        </div>
        <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-800">
          <p className="text-sm text-indigo-300">
            <strong>Upsell Path:</strong> 5 clients on Build ($497) could upgrade to Grow ($797) = +$1,500 MRR
          </p>
        </div>
      </div>
    </div>
  )
}