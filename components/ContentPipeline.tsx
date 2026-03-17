'use client'

import { useState } from 'react'
import { ArrowRight, Lightbulb, Edit, Image, Film, Upload, CheckCircle2 } from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  platform: 'youtube' | 'shorts' | 'twitter' | 'linkedin' | 'newsletter' | 'tiktok'
  stage: 'ideas' | 'scripting' | 'thumbnail' | 'filming' | 'editing' | 'published'
  assignee?: string
  createdAt: string
  movedAt?: string
  notes?: string
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'How PFAS Regulations Will Change Turf Industry',
    platform: 'youtube',
    stage: 'scripting',
    assignee: 'Quill',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    notes: 'AGM Friday episode - focus on compliance solutions'
  },
  {
    id: '2',
    title: 'Contractor Automation Score Launch',
    platform: 'newsletter',
    stage: 'ideas',
    assignee: 'Scout',
    createdAt: new Date().toISOString(),
    notes: 'Free diagnostic tool as lead magnet'
  },
  {
    id: '3',
    title: 'ServiceTitan vs Jobber Integration Comparison',
    platform: 'shorts',
    stage: 'thumbnail',
    assignee: 'Pixel',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: '4',
    title: '5 Costly Mistakes Contractors Make with Quote Follow-ups',
    platform: 'linkedin',
    stage: 'editing',
    assignee: 'Quill',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
]

const stages = [
  { id: 'ideas', label: 'Ideas', icon: Lightbulb, color: 'purple' },
  { id: 'scripting', label: 'Scripting', icon: Edit, color: 'blue' },
  { id: 'thumbnail', label: 'Thumbnail', icon: Image, color: 'green' },
  { id: 'filming', label: 'Filming', icon: Film, color: 'yellow' },
  { id: 'editing', label: 'Editing', icon: Film, color: 'orange' },
  { id: 'published', label: 'Published', icon: CheckCircle2, color: 'gray' },
]

const platforms = {
  youtube: { label: 'YouTube', color: 'bg-red-100 text-red-800' },
  shorts: { label: 'Shorts', color: 'bg-pink-100 text-pink-800' },
  twitter: { label: 'Twitter', color: 'bg-blue-100 text-blue-800' },
  linkedin: { label: 'LinkedIn', color: 'bg-indigo-100 text-indigo-800' },
  newsletter: { label: 'Newsletter', color: 'bg-green-100 text-green-800' },
  tiktok: { label: 'TikTok', color: 'bg-purple-100 text-purple-800' },
}

interface ContentPipelineProps {
  compact?: boolean
}

export default function ContentPipeline({ compact = false }: ContentPipelineProps) {
  const [content] = useState<ContentItem[]>(mockContent)

  const getContentByStage = (stage: string) => 
    content.filter(item => item.stage === stage)

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Content Pipeline</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {content.filter(c => c.stage !== 'published').length} in progress
            </span>
          </div>
          
          {/* Mini pipeline visualization */}
          <div className="flex items-center justify-between mb-4">
            {stages.slice(0, -1).map((stage, index) => {
              const count = getContentByStage(stage.id).length
              const Icon = stage.icon
              return (
                <div key={stage.id} className="flex items-center">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      count > 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                        {count}
                      </span>
                    )}
                  </div>
                  {index < stages.length - 2 && (
                    <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="space-y-2">
            {content.filter(c => c.stage !== 'published').slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${platforms[item.platform].color}`}>
                    {platforms[item.platform].label}
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                    {item.title}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {stages.find(s => s.id === item.stage)?.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Content Pipeline</h2>
      </div>

      <div className="p-6">
        {/* Pipeline stages */}
        <div className="grid grid-cols-6 gap-4">
          {stages.map((stage) => {
            const Icon = stage.icon
            const stageContent = getContentByStage(stage.id)
            
            return (
              <div key={stage.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-gray-500" />
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {stage.label}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {stageContent.length}
                  </span>
                </div>

                <div className="space-y-2 min-h-[400px]">
                  {stageContent.map(item => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${platforms[item.platform].color}`}>
                          {platforms[item.platform].label}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h4>
                      
                      {item.assignee && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {item.assignee}
                        </p>
                      )}
                      
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      
                      {item.notes && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Platform summary */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Platform Distribution</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(platforms).map(([key, platform]) => {
              const count = content.filter(c => c.platform === key).length
              return (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className={`text-sm px-2 py-1 rounded ${platform.color}`}>
                    {platform.label}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}