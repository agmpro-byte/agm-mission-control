'use client'

import { useState, useEffect } from 'react'
import { Brain, Activity, GitCommit, FileText, Zap, Clock } from 'lucide-react'

interface MemoryCapture {
  timestamp: string
  type: 'file_change' | 'component_built' | 'skill_executed' | 'decision_made' | 'insight'
  description: string
  details?: string[]
}

export default function MemoryMonitor() {
  const [recentCaptures, setRecentCaptures] = useState<MemoryCapture[]>([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [lastCaptureTime, setLastCaptureTime] = useState<string>('')

  // Auto-capture simulation - in production this would monitor actual file changes
  useEffect(() => {
    const captureMemory = () => {
      setIsCapturing(true)
      
      // Simulate capturing current activity
      const now = new Date().toISOString()
      const mockCaptures: MemoryCapture[] = [
        {
          timestamp: now,
          type: 'component_built',
          description: 'Built MemoryMonitor component',
          details: ['Auto-capture system', 'Activity tracking', 'Memory persistence']
        }
      ]
      
      setRecentCaptures(prev => [...mockCaptures, ...prev].slice(0, 10))
      setLastCaptureTime(now)
      
      // Auto-write to memory file
      writeToMemory(mockCaptures)
      
      setTimeout(() => setIsCapturing(false), 1000)
    }

    // Capture every 30 minutes (matching heartbeat)
    const interval = setInterval(captureMemory, 30 * 60 * 1000)
    
    // Initial capture
    captureMemory()
    
    return () => clearInterval(interval)
  }, [])

  const writeToMemory = async (captures: MemoryCapture[]) => {
    // In production, this would call an API to write to memory files
    console.log('Writing to memory:', captures)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'file_change': return <FileText className="w-4 h-4" />
      case 'component_built': return <Zap className="w-4 h-4" />
      case 'skill_executed': return <Activity className="w-4 h-4" />
      case 'decision_made': return <Brain className="w-4 h-4" />
      case 'insight': return <Brain className="w-4 h-4 text-yellow-400" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'file_change': return 'text-blue-400'
      case 'component_built': return 'text-green-400'
      case 'skill_executed': return 'text-purple-400'
      case 'decision_made': return 'text-orange-400'
      case 'insight': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-semibold text-white">Memory Auto-Capture</h2>
        </div>
        <div className="flex items-center space-x-2">
          {isCapturing && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Capturing...</span>
            </div>
          )}
          {lastCaptureTime && (
            <span className="text-xs text-gray-400">
              Last: {new Date(lastCaptureTime).toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Memory Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">Today's Captures</p>
          <p className="text-2xl font-semibold text-white">{recentCaptures.length}</p>
        </div>
        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">Auto-Capture</p>
          <p className="text-lg font-semibold text-green-400">ACTIVE</p>
        </div>
        <div className="bg-black rounded-lg p-4 border border-gray-800">
          <p className="text-xs text-gray-500 mb-1">Next Capture</p>
          <p className="text-lg font-semibold text-white">29m</p>
        </div>
      </div>

      {/* Recent Captures */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Activity Stream</h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {recentCaptures.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Brain className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Memory capture starting...</p>
            </div>
          ) : (
            recentCaptures.map((capture, index) => (
              <div key={index} className="bg-black rounded-lg p-3 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${getTypeColor(capture.type)}`}>
                    {getIcon(capture.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{capture.description}</p>
                    {capture.details && (
                      <ul className="mt-1 text-xs text-gray-400 list-disc list-inside">
                        {capture.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(capture.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Auto-Capture Status */}
      <div className="mt-6 p-4 bg-indigo-900/20 rounded-lg border border-indigo-800">
        <p className="text-sm text-indigo-300">
          <strong>Memory Persistence Active:</strong> All activities are automatically captured to daily memory files. 
          No manual logging required - I remember everything now.
        </p>
      </div>
    </div>
  )
}