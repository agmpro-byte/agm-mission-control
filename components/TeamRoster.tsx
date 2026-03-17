'use client'

import { useState, useEffect } from 'react'
import { Users, Bot, CheckCircle, XCircle, AlertCircle, Activity } from 'lucide-react'

interface Agent {
  id: string
  name: string
  role: string
  emoji: string
  status: 'online' | 'offline' | 'busy'
  workspace: string
  lastActivity?: string
  currentTask?: string
}

const agents: Agent[] = [
  {
    id: 'main',
    name: 'Briggs',
    role: 'Chief of Staff - Orchestration & Coordination',
    emoji: '🎖️',
    status: 'online',
    workspace: '~/.openclaw/workspace',
    currentTask: 'Managing Mission Control'
  },
  {
    id: 'scout',
    name: 'Scout',
    role: 'Trend Analyst - Industry Intelligence',
    emoji: '🔍',
    status: 'online',
    workspace: '~/.openclaw/workspace-scout',
    currentTask: 'Ready for assignments'
  },
  {
    id: 'quill',
    name: 'Quill',
    role: 'Content Writer - Scripts & Copy',
    emoji: '✍️',
    status: 'online',
    workspace: '~/.openclaw/workspace-quill',
    currentTask: 'Ready for assignments'
  },
  {
    id: 'pixel',
    name: 'Pixel',
    role: 'Thumbnail Designer - Visual Assets',
    emoji: '🎨',
    status: 'online',
    workspace: '~/.openclaw/workspace-pixel',
    currentTask: 'Ready for assignments'
  },
  {
    id: 'echo-agent',
    name: 'Echo',
    role: 'Social Media Manager - Distribution',
    emoji: '📢',
    status: 'online',
    workspace: '~/.openclaw/workspace-echo',
    currentTask: 'Ready for assignments'
  }
]

export default function TeamRoster() {
  const [team] = useState<Agent[]>(agents)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'busy': return <Activity className="w-5 h-5 text-yellow-500" />
      case 'offline': return <XCircle className="w-5 h-5 text-gray-400" />
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-50 border-green-200'
      case 'busy': return 'bg-yellow-50 border-yellow-200'
      case 'offline': return 'bg-gray-50 border-gray-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Agent Team Roster</h2>
          <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-full">
            {team.filter(a => a.status === 'online').length} / {team.length} Online
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {team.map(agent => (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedAgent?.id === agent.id 
                  ? 'ring-2 ring-blue-500 ' + getStatusColor(agent.status)
                  : getStatusColor(agent.status)
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{agent.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: {agent.id}</p>
                  </div>
                </div>
                {getStatusIcon(agent.status)}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{agent.role}</p>
              
              {agent.currentTask && (
                <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-700 dark:text-blue-300">
                  {agent.currentTask}
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedAgent && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {selectedAgent.emoji} {selectedAgent.name} Details
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Workspace</label>
                <p className="text-sm text-gray-900 dark:text-white font-mono">{selectedAgent.workspace}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                <p className="text-sm text-gray-900 dark:text-white capitalize">{selectedAgent.status}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Activity</label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {selectedAgent.currentTask || 'Idle - Ready for assignments'}
                </p>
              </div>

              {selectedAgent.id !== 'main' && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    To communicate with {selectedAgent.name}, use the routing system or direct message via configured channels.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Team Architecture</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• All agents are Tier 3 (zero credentials)</li>
            <li>• Each agent has isolated workspace</li>
            <li>• Communication via OpenClaw routing system</li>
            <li>• All agents report to Briggs for orchestration</li>
          </ul>
        </div>
      </div>
    </div>
  )
}