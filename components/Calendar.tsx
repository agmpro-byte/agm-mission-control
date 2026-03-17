'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Users, Video, FileText, Bot } from 'lucide-react'

interface Event {
  id: string
  title: string
  type: 'meeting' | 'content' | 'task' | 'bot-task'
  time: string
  date: string
  assignee?: string
  description?: string
  recurring?: boolean
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Briefing',
    type: 'bot-task',
    time: '08:00',
    date: new Date().toISOString().split('T')[0],
    assignee: 'Briggs',
    description: 'Daily weather, news, tasks, flywheel status',
    recurring: true
  },
  {
    id: '2',
    title: 'AGM Friday Recording',
    type: 'content',
    time: '14:00',
    date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    assignee: 'Troy',
    description: 'Weekly episode - PFAS regulations impact'
  },
  {
    id: '3',
    title: 'Scout Trend Report',
    type: 'bot-task',
    time: '12:00',
    date: new Date().toISOString().split('T')[0],
    assignee: 'Scout',
    description: 'Daily market intelligence scan',
    recurring: true
  },
  {
    id: '4',
    title: 'EOD Rundown',
    type: 'bot-task',
    time: '19:00',
    date: new Date().toISOString().split('T')[0],
    assignee: 'Briggs',
    description: 'End of day summary and improvements',
    recurring: true
  },
]

interface CalendarProps {
  compact?: boolean
}

export default function Calendar({ compact = false }: CalendarProps) {
  const [events] = useState<Event[]>(mockEvents)
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="w-4 h-4" />
      case 'content': return <Video className="w-4 h-4" />
      case 'task': return <FileText className="w-4 h-4" />
      case 'bot-task': return <Bot className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'content': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'task': return 'bg-green-100 text-green-800 border-green-200'
      case 'bot-task': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const todaysEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.toDateString() === today.toDateString()
  })

  const upcomingEvents = events
    .filter(event => new Date(event.date) > today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {todaysEvents.length} events
            </span>
          </div>
          <div className="space-y-3">
            {todaysEvents.map(event => (
              <div key={event.id} className={`flex items-start space-x-3 p-3 rounded-lg border ${getEventColor(event.type)}`}>
                {getEventIcon(event.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <span className="text-xs font-medium ml-2">{event.time}</span>
                  </div>
                  <p className="text-xs mt-1">
                    {event.assignee} {event.recurring && '• Recurring'}
                  </p>
                </div>
              </div>
            ))}
            {todaysEvents.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No events scheduled for today
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Full calendar view
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Calendar</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11)
                  setCurrentYear(currentYear - 1)
                } else {
                  setCurrentMonth(currentMonth - 1)
                }
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-medium">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0)
                  setCurrentYear(currentYear + 1)
                } else {
                  setCurrentMonth(currentMonth + 1)
                }
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="h-24" />
          ))}
          
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0]
            const dayEvents = events.filter(e => e.date === date)
            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
            
            return (
              <div
                key={day}
                className={`h-24 p-2 border rounded-lg ${
                  isToday 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{day}</div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs px-1 py-0.5 rounded truncate ${getEventColor(event.type)}`}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Upcoming Events */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}