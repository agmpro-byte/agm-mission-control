'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Home, Calendar as CalendarIcon, Brain, Zap, Activity, Settings, Users, DollarSign, GitBranch, ArrowRightLeft, FileText } from 'lucide-react'
import ErrorBoundary from '@/components/ErrorBoundary'

// Dynamically import components to avoid SSR issues
const TaskBoard = dynamic(() => import('@/components/TaskBoard'), { ssr: false })
const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false })
const MemoryViewer = dynamic(() => import('@/components/MemoryViewer'), { ssr: false })
const MemoryMonitor = dynamic(() => import('@/components/MemoryMonitor'), { ssr: false })
const ContentPipeline = dynamic(() => import('@/components/ContentPipeline'), { ssr: false })
const FlywheelStatus = dynamic(() => import('@/components/FlywheelStatus'), { ssr: false })
const MeetTheTeamDetailed = dynamic(() => import('@/components/MeetTheTeamDetailed'), { ssr: false })
const ClientsDashboard = dynamic(() => import('@/components/ClientsDashboard'), { ssr: false })
const IntegrationMonitor = dynamic(() => import('@/components/IntegrationMonitor'), { ssr: false })
const HandoffMonitor = dynamic(() => import('@/components/HandoffMonitor'), { ssr: false })
const AgentStatusMonitor = dynamic(() => import('@/components/AgentStatusMonitor'), { ssr: false })
const PublishingPipeline = dynamic(() => import('@/components/PublishingPipeline'), { ssr: false })

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: GitBranch },
  { id: 'agents', label: 'Agents', icon: Users },
  { id: 'handoffs', label: 'Handoffs', icon: ArrowRightLeft },
  { id: 'publishing', label: 'Publishing', icon: FileText },
  { id: 'tasks', label: 'Task Board', icon: Activity },
  { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
  { id: 'pipeline', label: 'Content Pipeline', icon: Zap },
  { id: 'memory', label: 'Memory', icon: Brain },
]

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ClientsDashboard />
              <FlywheelStatus />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IntegrationMonitor />
              <AgentStatusMonitor />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HandoffMonitor />
              <ContentPipeline />
            </div>
          </div>
        )
      case 'clients':
        return <ClientsDashboard />
      case 'integrations':
        return <IntegrationMonitor />
      case 'agents':
        return (
          <div className="space-y-6">
            <AgentStatusMonitor />
            <MeetTheTeamDetailed />
          </div>
        )
      case 'handoffs':
        return <HandoffMonitor />
      case 'publishing':
        return <PublishingPipeline />
      case 'tasks':
        return <TaskBoard />
      case 'calendar':
        return <Calendar />
      case 'pipeline':
        return <ContentPipeline />
      case 'memory':
        return (
          <div className="space-y-6">
            <MemoryMonitor />
            <MemoryViewer />
          </div>
        )
      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                This section is under construction
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              A World-Class Autonomous Marketing Department
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white absolute left-1/2 transform -translate-x-1/2">
              AGM Mission Control
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary>
          {renderContent()}
        </ErrorBoundary>
      </main>
    </div>
  )
}