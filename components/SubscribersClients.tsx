'use client'

import { useState } from 'react'
import { Mail, Users, TrendingUp, Zap, ArrowUp } from 'lucide-react'

interface SubscriberData {
  newsletterSubs: number
  targetSubs: number
  nonCustomerPercent: number
  payingClients: number
  linkedInFollowers: number
}

export default function SubscribersClients() {
  const [data] = useState<SubscriberData>({
    newsletterSubs: 280,
    targetSubs: 500,
    nonCustomerPercent: 97,
    payingClients: 2,
    linkedInFollowers: 900,
  })

  const progressPercentage = (data.newsletterSubs / data.targetSubs) * 100
  const nonCustomerSubs = Math.round(data.newsletterSubs * (data.nonCustomerPercent / 100))

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Mail className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Audience & Distribution</h2>
        </div>
        <span className="text-sm text-gray-400">AGM Intelligence Report</span>
      </div>

      {/* Newsletter Subscribers Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-3xl font-bold text-white">
              {data.newsletterSubs}<span className="text-lg text-gray-400"> subscribers</span>
            </p>
            <p className="text-sm text-gray-400">AGM Intelligence Report newsletter</p>
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
            ~{nonCustomerSubs} non-customers ({data.nonCustomerPercent}%) = untapped pipeline
          </span>
          <span className="text-gray-400">Monthly cadence</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <Mail className="w-5 h-5 text-blue-400 mb-2" />
          <p className="text-2xl font-semibold text-white">{data.newsletterSubs}</p>
          <p className="text-sm text-gray-400">Newsletter Subs</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <Users className="w-5 h-5 text-purple-400 mb-2" />
          <p className="text-2xl font-semibold text-white">{data.linkedInFollowers}</p>
          <p className="text-sm text-gray-400">LinkedIn</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-2xl font-semibold text-white">{data.nonCustomerPercent}%</p>
          <p className="text-sm text-gray-400">Non-Customer</p>
        </div>

        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <Zap className="w-5 h-5 text-yellow-400 mb-2" />
          <p className="text-2xl font-semibold text-white">~8</p>
          <p className="text-sm text-gray-400">Current Customers</p>
        </div>
      </div>

      {/* Newsletter Sections */}
      <div className="mb-6">
        <h3 className="font-medium text-white mb-3">Newsletter → Revenue Layer Mapping</h3>
        <div className="space-y-2">
          {[
            { section: 'Industry Intelligence', purpose: 'Authority & trust', revenueLayer: 'Brand' },
            { section: 'Platform Updates', purpose: 'AGM Platform awareness', revenueLayer: 'Platform ($397-$997/mo)' },
            { section: 'Automation Tools', purpose: 'Pro Tools positioning', revenueLayer: 'Pro Tools ($297/mo)' },
            { section: 'AI SEO Insights', purpose: 'Search visibility', revenueLayer: 'AI SEO ($1,297/mo)' },
            { section: 'Tip of the Month', purpose: 'Operator credibility', revenueLayer: 'Trust' },
          ].map((item, index) => (
            <div key={index} className="bg-black rounded-lg p-3 border border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{item.section}</p>
                <p className="text-xs text-gray-400">{item.purpose}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">{item.revenueLayer}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Channels */}
      <div className="mb-6">
        <h3 className="font-medium text-white mb-3">Growth Channels</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-black rounded-lg p-3 border border-blue-800">
            <p className="text-sm font-medium text-blue-400">Jobber Marketplace</p>
            <p className="text-xs text-gray-400">200K users, high intent</p>
            <p className="text-xs text-yellow-300 mt-1">Target: 10 installs/mo</p>
          </div>
          <div className="bg-black rounded-lg p-3 border border-gray-800">
            <p className="text-sm font-medium text-gray-300">AGM Friday Live</p>
            <p className="text-xs text-gray-400">Weekly episodes</p>
            <p className="text-xs text-yellow-300 mt-1">Starting this week</p>
          </div>
          <div className="bg-black rounded-lg p-3 border border-gray-800">
            <p className="text-sm font-medium text-gray-300">LinkedIn</p>
            <p className="text-xs text-gray-400">~900 followers</p>
            <p className="text-xs text-gray-500 mt-1">Weekly insight posts</p>
          </div>
        </div>
      </div>

      {/* Pipeline Insight */}
      <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
        <p className="text-sm text-blue-300">
          <strong>Pipeline Insight:</strong> {nonCustomerSubs} non-customer subscribers at $297/mo avg =
          ${(nonCustomerSubs * 297).toLocaleString()}/mo total addressable pipeline.
          Even 5% conversion = ~${Math.round(nonCustomerSubs * 0.05 * 297).toLocaleString()}/mo new MRR.
        </p>
      </div>
    </div>
  )
}
