'use client'

import { useState } from 'react'
import { Mail, Users, Building2, TrendingUp, ArrowUp, CheckCircle, Clock, Zap } from 'lucide-react'

interface Client {
  name: string
  platform: string
  status: 'active' | 'onboarding' | 'paused'
  monthlyValue: number
  service: string
}

interface SubscriberData {
  newsletterSubs: number
  targetSubs: number
  clientCount: number
  growth: {
    newSubs: number
    percentage: number
    direction: 'up' | 'down' | 'flat'
  }
  clients: Client[]
}

export default function SubscribersClients() {
  const [data] = useState<SubscriberData>({
    newsletterSubs: 280,
    targetSubs: 500,
    clientCount: 11,
    growth: {
      newSubs: 12,
      percentage: 4.5,
      direction: 'up'
    },
    clients: [
      { name: 'Texas Turf (Ivana)', platform: 'Jobber', status: 'active', monthlyValue: 1119, service: 'ProTools + Marketing' },
      { name: 'Valleywide Pest Control', platform: 'Field Routes', status: 'onboarding', monthlyValue: 597, service: 'ProTools Pro' },
      { name: 'Heavenly Greens', platform: 'CENTAH', status: 'active', monthlyValue: 2847, service: 'Full Suite' },
      { name: 'Artificial Turf Express', platform: 'Jobber', status: 'active', monthlyValue: 997, service: 'ProTools + Hosting' },
      { name: 'Green Meadows Landscaping', platform: 'ServiceTitan', status: 'active', monthlyValue: 797, service: 'ProTools Enterprise' },
      { name: 'Premium Synthetic Lawns', platform: 'Jobber', status: 'active', monthlyValue: 497, service: 'ProTools + Reviews' },
      { name: 'Desert Turf Solutions', platform: 'Housecall Pro', status: 'active', monthlyValue: 297, service: 'ProTools Core' },
      { name: 'Evergreen Installations', platform: 'Field Routes', status: 'active', monthlyValue: 597, service: 'ProTools Pro' },
      { name: 'Turf Masters Inc', platform: 'Jobber', status: 'active', monthlyValue: 397, service: 'ProTools Core' },
      { name: 'Synthetic Grass Pros', platform: 'ServiceTitan', status: 'onboarding', monthlyValue: 997, service: 'ProTools Enterprise' },
      { name: 'Modern Lawn Solutions', platform: 'Jobber', status: 'active', monthlyValue: 647, service: 'ProTools + SEO' }
    ]
  })

  const progressPercentage = (data.newsletterSubs / data.targetSubs) * 100
  const nonCustomerSubs = Math.round(data.newsletterSubs * 0.97) // 97% are non-customers

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Mail className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Subscribers & Clients</h2>
        </div>
        <span className="text-sm text-gray-400">{data.clientCount} Active Clients</span>
      </div>

      {/* Newsletter Subscribers Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-3xl font-bold text-white">
              {data.newsletterSubs}<span className="text-lg text-gray-400"> subscribers</span>
            </p>
            <p className="text-sm text-gray-400">Newsletter audience</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-300">{data.targetSubs}</p>
            <p className="text-sm text-gray-400">Year 1 target</p>
          </div>
        </div>

        <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {progressPercentage.toFixed(0)}% to goal
            </span>
          </div>
        </div>

        <div className="mt-3 flex justify-between text-sm">
          <span className="text-gray-400">
            {nonCustomerSubs} non-customers (97%)
          </span>
          <span className="text-gray-400 flex items-center">
            <ArrowUp className="w-3 h-3 mr-1 text-green-400" />
            +{data.growth.newSubs} this month
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <Mail className="w-5 h-5 text-blue-400 mb-2" />
          <p className="text-2xl font-semibold text-white">{data.newsletterSubs}</p>
          <p className="text-sm text-gray-400">Subscribers</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <Users className="w-5 h-5 text-purple-400 mb-2" />
          <p className="text-2xl font-semibold text-white">{data.clientCount}</p>
          <p className="text-sm text-gray-400">Clients</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-semibold text-white">+{data.growth.percentage}%</p>
          <p className="text-sm text-gray-400">Growth Rate</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <Zap className="w-5 h-5 text-yellow-400 mb-2" />
          <p className="text-2xl font-semibold text-white">3.9%</p>
          <p className="text-sm text-gray-400">Conversion</p>
        </div>
      </div>

      {/* Client List */}
      <div>
        <h3 className="font-medium text-white mb-3 flex items-center justify-between">
          <span>AGM Pro Tools Clients</span>
          <span className="text-xs text-gray-400">Sorted by value</span>
        </h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {data.clients.sort((a, b) => b.monthlyValue - a.monthlyValue).map((client, index) => (
            <div key={index} className="bg-black rounded-lg p-3 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    client.status === 'active' ? 'bg-green-400' : 
                    client.status === 'onboarding' ? 'bg-yellow-400' : 
                    'bg-gray-400'
                  }`} />
                  <div>
                    <p className="font-medium text-white">{client.name}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-400">{client.platform}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">{client.service}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">${client.monthlyValue.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">/month</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriber Quality Insight */}
      <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
        <p className="text-sm text-blue-300">
          <strong>Pipeline Insight:</strong> With 271 non-customer subscribers at 3.9% conversion rate, 
          the newsletter represents ~10 potential new clients ({Math.round(nonCustomerSubs * 0.039)} × $890 avg = ${Math.round(nonCustomerSubs * 0.039 * 890).toLocaleString()}/mo opportunity)
        </p>
      </div>
    </div>
  )
}