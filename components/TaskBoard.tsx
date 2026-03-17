'use client'

import { useState } from 'react'
import { Plus, Clock, CheckCircle, Circle, AlertCircle } from 'lucide-react'

interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignee?: string
  dueDate?: string
  createdAt: string
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Build Mission Control Dashboard',
    description: 'Create Next.js dashboard with task board, calendar, and content pipeline',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Briggs',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Set up Flywheel Monitoring',
    description: 'Track Intelligence → Newsletter → AGM Friday → Demo → Adoption stages',
    status: 'todo',
    priority: 'high',
    assignee: 'Briggs',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Research competitor FSM integrations',
    description: 'Analyze ServiceTitan, Housecall Pro marketplace strategies',
    status: 'todo',
    priority: 'medium',
    assignee: 'Scout',
    createdAt: new Date().toISOString(),
  },
]

const columns = [
  { id: 'todo', title: 'To Do', color: 'gray' },
  { id: 'in-progress', title: 'In Progress', color: 'blue' },
  { id: 'done', title: 'Done', color: 'green' },
]

interface TaskBoardProps {
  compact?: boolean
}

export default function TaskBoard({ compact = false }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  const getTasksByStatus = (status: string) => 
    tasks.filter(task => task.status === status)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'done': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />
      default: return <Circle className="w-4 h-4 text-gray-400" />
    }
  }

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Tasks</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {tasks.filter(t => t.status !== 'done').length} active
            </span>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 4).map(task => (
              <div key={task.id} className="flex items-start space-x-3">
                <StatusIcon status={task.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.assignee} • {task.priority} priority
                  </p>
                </div>
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Task Board</h2>
          <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div key={column.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {column.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {getTasksByStatus(column.id).length}
                </span>
              </div>
              
              <div className="space-y-3">
                {getTasksByStatus(column.id).map(task => (
                  <div
                    key={task.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {task.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{task.assignee || 'Unassigned'}</span>
                      {task.dueDate && (
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}