'use client'

import { useState } from 'react'
import { FileText, Edit3, CheckCircle, Send, Clock, AlertCircle } from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  type: 'blog' | 'video' | 'social' | 'email' | 'report'
  platform: string
  status: 'draft' | 'review' | 'approved' | 'published'
  assignedAgent: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  wordCount?: number
  notes?: string
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Why 30% of Your Quotes Die in Silence',
    type: 'blog',
    platform: 'Website',
    status: 'draft',
    assignedAgent: 'Quill',
    dueDate: '2026-03-18',
    priority: 'high',
    wordCount: 1200,
    notes: 'Based on Scout\'s HVAC pain signals'
  },
  {
    id: '2',
    title: 'Quote Follow-Up Reality Check',
    type: 'social',
    platform: 'LinkedIn',
    status: 'draft',
    assignedAgent: 'Quill',
    dueDate: '2026-03-17',
    priority: 'high',
    wordCount: 250
  },
  {
    id: '3',
    title: 'March Trends: PFAS Regulations Impact',
    type: 'report',
    platform: 'Email',
    status: 'review',
    assignedAgent: 'Quill',
    dueDate: '2026-03-20',
    priority: 'medium',
    notes: 'Awaiting Troy approval'
  },
  {
    id: '4',
    title: 'AGM Friday: ServiceTitan Integration Deep Dive',
    type: 'video',
    platform: 'YouTube',
    status: 'approved',
    assignedAgent: 'Pixel',
    dueDate: '2026-03-22',
    priority: 'high',
    notes: 'Thumbnail ready, script approved'
  }
]

const stages = [
  { id: 'draft', label: 'Draft', icon: Edit3, color: 'gray' },
  { id: 'review', label: 'Review', icon: Clock, color: 'yellow' },
  { id: 'approved', label: 'Approved', icon: CheckCircle, color: 'green' },
  { id: 'published', label: 'Published', icon: Send, color: 'blue' }
]

export default function PublishingPipeline() {
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [filter, setFilter] = useState<string>('all')

  const getContentByStatus = (status: string) => 
    content.filter(item => item.status === status)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return '📝'
      case 'video': return '🎥'
      case 'social': return '📱'
      case 'email': return '📧'
      case 'report': return '📊'
      default: return '📄'
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const filteredContent = filter === 'all' 
    ? content 
    : content.filter(item => item.platform.toLowerCase() === filter)

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">Publishing Pipeline</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {content.filter(c => c.status !== 'published').length} items in progress
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Platform Filter */}
        <div className="mb-6 flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Platforms
          </button>
          {['Website', 'YouTube', 'LinkedIn', 'Email'].map(platform => (
            <button
              key={platform}
              onClick={() => setFilter(platform.toLowerCase())}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === platform.toLowerCase() 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Pipeline Stages */}
        <div className="grid grid-cols-4 gap-4">
          {stages.map(stage => (
            <div key={stage.id} className="bg-black rounded-lg p-4 border border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <stage.icon className={`w-5 h-5 ${
                    stage.color === 'gray' ? 'text-gray-400' :
                    stage.color === 'yellow' ? 'text-yellow-400' :
                    stage.color === 'green' ? 'text-green-400' :
                    stage.color === 'blue' ? 'text-blue-400' :
                    'text-gray-400'
                  }`} />
                  <h3 className="font-medium text-white">{stage.label}</h3>
                </div>
                <span className="text-sm text-gray-500">
                  {getContentByStatus(stage.id).length}
                </span>
              </div>

              <div className="space-y-2 min-h-[400px]">
                {getContentByStatus(stage.id).map(item => {
                  const daysLeft = getDaysUntilDue(item.dueDate)
                  const isOverdue = daysLeft < 0
                  const isDueSoon = daysLeft >= 0 && daysLeft <= 2

                  if (filter !== 'all' && item.platform.toLowerCase() !== filter) {
                    return null
                  }

                  return (
                    <div 
                      key={item.id} 
                      className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-lg mr-2">{getTypeIcon(item.type)}</span>
                        <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-medium text-white mb-1 line-clamp-2">
                        {item.title}
                      </h4>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">{item.platform}</span>
                        <span className="text-xs text-gray-400">{item.assignedAgent}</span>
                      </div>

                      {item.wordCount && (
                        <p className="text-xs text-gray-500 mb-2">
                          {item.wordCount} words
                        </p>
                      )}

                      <div className={`text-xs flex items-center ${
                        isOverdue ? 'text-red-400' : 
                        isDueSoon ? 'text-yellow-400' : 
                        'text-gray-500'
                      }`}>
                        {isOverdue && <AlertCircle className="w-3 h-3 mr-1" />}
                        {isOverdue ? `${Math.abs(daysLeft)}d overdue` : 
                         daysLeft === 0 ? 'Due today' :
                         `${daysLeft}d left`}
                      </div>

                      {item.notes && (
                        <p className="text-xs text-gray-500 mt-2 italic line-clamp-2">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                {content.filter(c => c.priority === 'high').length}
              </p>
              <p className="text-sm text-gray-400">High Priority</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                {content.filter(c => getDaysUntilDue(c.dueDate) < 0).length}
              </p>
              <p className="text-sm text-red-400">Overdue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                {content.filter(c => c.status === 'review').length}
              </p>
              <p className="text-sm text-yellow-400">Awaiting Review</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                {content.filter(c => 
                  c.status === 'approved' && getDaysUntilDue(c.dueDate) >= 0
                ).length}
              </p>
              <p className="text-sm text-green-400">Ready to Publish</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}