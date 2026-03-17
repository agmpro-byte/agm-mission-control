'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Mail, Users, Target, ArrowUp, ArrowDown, CheckCircle, Clock, DollarSign } from 'lucide-react'

interface SubscriberData {
  currentMRR: number
  targetMRR: number
  clientCount: number
  serviceLines: number
  growth: {
    amount: number
    percentage: number
    direction: 'up' | 'down' | 'flat'
  }
  clients: Array<{
    name: string
    mrr: number
    platform: string
    status: 'live' | 'trial' | 'pending'
  }>
}

export default function RevenueDashboard() {
  const [revenue, setRevenue] = useState<RevenueData>({
    currentMRR: 9786,
    targetMRR: 65000,
    clientCount: 11,
    serviceLines: 7,
    growth: {
      amount: 1250,
      percentage: 14.6,
      direction: 'up'
    },
    clients: [
      { name: 'Texas Turf (Ivana)', mrr: 2500, platform: 'Jobber', status: 'live' },
      { name: 'Valleywide Pest', mrr: 1800, platform: 'Field Routes', status: 'pending' },
      { name: 'Client 3', mrr: 1200, platform: 'CENTAH', status: 'live' },
      { name: 'Client 4', mrr: 950, platform: 'Jobber', status: 'live' },
      { name: 'Client 5', mrr: 875, platform: 'AGM', status: 'live' },
    ]
  })

  const progressPercentage = (revenue.currentMRR / revenue.targetMRR) * 100
  const remainingMRR = revenue.targetMRR - revenue.currentMRR
  const monthsToGoal = Math.ceil(remainingMRR / revenue.growth.amount)

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Revenue Dashboard</h2>
        </div>
        <span className="text-sm text-gray-400">Year 1 Target</span>
      </div>

      {/* MRR Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-3xl font-bold text-white">
              ${revenue.currentMRR.toLocaleString()}<span className="text-lg text-gray-400">/mo</span>
            </p>
            <p className="text-sm text-gray-400">Current MRR</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-300">
              ${revenue.targetMRR.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">Target MRR</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {progressPercentage.toFixed(1)}% of Goal
            </span>
          </div>
        </div>

        <div className="mt-3 flex justify-between text-sm">
          <span className="text-gray-400">
            ${remainingMRR.toLocaleString()} to goal
          </span>
          <span className="text-gray-400">
            ~{monthsToGoal} months at current growth
          </span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-blue-400" />
            <span className={`text-xs flex items-center ${
              revenue.growth.direction === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {revenue.growth.direction === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {revenue.growth.percentage}%
            </span>
          </div>
          <p className="text-2xl font-semibold text-white mt-2">{revenue.clientCount}</p>
          <p className="text-sm text-gray-400">Active Clients</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <Target className="w-5 h-5 text-purple-400" />
          <p className="text-2xl font-semibold text-white mt-2">{revenue.serviceLines}</p>
          <p className="text-sm text-gray-400">Service Lines</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <p className="text-2xl font-semibold text-white mt-2">
            +${revenue.growth.amount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">Monthly Growth</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <DollarSign className="w-5 h-5 text-yellow-400" />
          <p className="text-2xl font-semibold text-white mt-2">
            ${Math.round(revenue.currentMRR / revenue.clientCount)}
          </p>
          <p className="text-sm text-gray-400">Avg Client Value</p>
        </div>
      </div>

      {/* Top Clients */}
      <div>
        <h3 className="font-medium text-white mb-3">Top Clients by MRR</h3>
        <div className="space-y-2">
          {revenue.clients.map((client, index) => (
            <div key={index} className="bg-black rounded-lg p-3 border border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    client.status === 'live' ? 'bg-green-400' : 
                    client.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                  <div>
                    <p className="font-medium text-white">{client.name}</p>
                    <p className="text-xs text-gray-400">{client.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">${client.mrr.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">/month</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}