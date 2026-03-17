'use client'

import { useState, useEffect } from 'react'
import { Brain, FileText, Calendar, Search, RefreshCw, User, Settings, Hash } from 'lucide-react'

interface MemoryFile {
  name: string
  path: string
  type: 'daily' | 'soul' | 'identity' | 'tools' | 'agents' | 'custom'
  lastModified: string
  size: number
  preview?: string
}

export default function MemoryViewer() {
  const [files, setFiles] = useState<MemoryFile[]>([])
  const [selectedFile, setSelectedFile] = useState<MemoryFile | null>(null)
  const [fileContent, setFileContent] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMemoryFiles()
  }, [])

  useEffect(() => {
    if (selectedFile) {
      loadFileContent(selectedFile.path)
    }
  }, [selectedFile])

  const loadMemoryFiles = async () => {
    setLoading(true)
    try {
      // Static deployment — no API available. Show placeholder.
      setFiles([
        { name: 'SOUL.md', path: '/SOUL.md', type: 'soul', lastModified: new Date().toISOString(), size: 0, preview: 'Briggs identity and operating instructions' },
        { name: 'MEMORY.md', path: '/MEMORY.md', type: 'custom', lastModified: new Date().toISOString(), size: 0, preview: 'Long-term memory index' },
      ])
    } catch (error) {
      console.error('Failed to load memory files:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadFileContent = async (filePath: string) => {
    setFileContent('Memory viewer requires a running server (localhost:3001). This static deployment shows structure only.')
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'soul': return <Brain className="w-5 h-5 text-purple-400" />
      case 'daily': return <Calendar className="w-5 h-5 text-blue-400" />
      case 'identity': return <User className="w-5 h-5 text-green-400" />
      case 'tools': return <Settings className="w-5 h-5 text-yellow-400" />
      case 'agents': return <Hash className="w-5 h-5 text-pink-400" />
      default: return <FileText className="w-5 h-5 text-gray-400" />
    }
  }

  const getFileColor = (type: string) => {
    switch (type) {
      case 'soul': return 'bg-gray-900 border-purple-500'
      case 'daily': return 'bg-gray-900 border-blue-500'
      case 'identity': return 'bg-gray-900 border-green-500'
      case 'tools': return 'bg-gray-900 border-yellow-500'
      case 'agents': return 'bg-gray-900 border-pink-500'
      default: return 'bg-gray-900 border-gray-600'
    }
  }

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.preview?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = diff / (1000 * 60 * 60)
    
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${Math.floor(hours)} hours ago`
    if (hours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Memory Viewer</h2>
          </div>
          <button 
            onClick={loadMemoryFiles}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 border border-gray-700"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search memory files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File list */}
          <div className="space-y-3">
            <h3 className="font-medium text-white mb-3">Memory Files ({filteredFiles.length})</h3>
            {loading ? (
              <div className="text-gray-400">Loading memory files...</div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredFiles.map(file => (
                  <div
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedFile?.path === file.path 
                        ? 'ring-2 ring-blue-500 ' + getFileColor(file.type)
                        : getFileColor(file.type)
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getFileIcon(file.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white">{file.name}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {formatFileSize(file.size)} • {formatDate(file.lastModified)}
                        </p>
                        {file.preview && (
                          <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                            {file.preview}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* File preview */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            {selectedFile ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-white">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{selectedFile.path}</p>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <pre className="bg-black p-4 rounded-lg overflow-auto text-sm text-gray-300 border border-gray-800 h-full max-h-[600px] whitespace-pre-wrap">
                    {fileContent}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Brain className="w-12 h-12 mb-3 text-gray-600" />
                <p>Select a memory file to preview</p>
              </div>
            )}
          </div>
        </div>

        {/* Memory stats */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="font-medium text-white mb-4">Memory Statistics</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-black rounded-lg p-4 border border-gray-800">
              <p className="text-sm text-gray-400">Total Files</p>
              <p className="text-2xl font-semibold text-white">{files.length}</p>
            </div>
            <div className="bg-black rounded-lg p-4 border border-gray-800">
              <p className="text-sm text-gray-400">Total Size</p>
              <p className="text-2xl font-semibold text-white">
                {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
              </p>
            </div>
            <div className="bg-black rounded-lg p-4 border border-gray-800">
              <p className="text-sm text-gray-400">Daily Logs</p>
              <p className="text-2xl font-semibold text-white">
                {files.filter(f => f.type === 'daily').length}
              </p>
            </div>
            <div className="bg-black rounded-lg p-4 border border-gray-800">
              <p className="text-sm text-gray-400">Core Files</p>
              <p className="text-2xl font-semibold text-white">
                {files.filter(f => ['soul', 'identity', 'agents', 'tools'].includes(f.type)).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}