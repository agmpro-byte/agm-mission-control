'use client'

import { useState } from 'react'
import { Bot, Code, Search, PenTool, Palette, Megaphone, Shield, ArrowRight, Zap, Activity } from 'lucide-react'

interface AgentCard {
  id: string
  name: string
  role: string
  description: string
  skills: string[]
  skillColors: string[]
  borderColor: string
  icon: any
  detailedResponsibilities: string[]
  tools?: string[]
  outputs?: string[]
}

const agents: AgentCard[] = [
  {
    id: 'briggs',
    name: 'Briggs',
    role: 'Chief of Staff',
    description: 'Orchestrates all operations',
    skills: ['Orchestration', 'Clarity', 'Delegation'],
    skillColors: ['bg-blue-600', 'bg-purple-600', 'bg-indigo-600'],
    borderColor: 'border-blue-500',
    icon: Shield,
    detailedResponsibilities: [
      'Route incoming tasks to the appropriate agent',
      'Monitor flywheel health and flag any stage going quiet',
      'Send morning briefings (8 AM) with weather, news, and priorities',
      'Post EOD rundowns (7 PM) with day summary and improvements',
      'Coordinate multi-agent workflows and ensure completion',
      'Track metrics: MRR, installs, newsletter subscribers, content consistency',
      'Escalate decisions requiring human judgment to Troy',
      'Build and maintain Mission Control dashboards'
    ],
    tools: ['Mission Control Dashboard', 'Task routing system', 'Memory management'],
    outputs: ['Daily briefings', 'Status reports', 'Task assignments', 'Metric tracking']
  },
  {
    id: 'harlan',
    name: 'Harlan',
    role: 'Lead Engineer',
    description: 'Builds infrastructure & security',
    skills: ['Engineering', 'Security', 'Automation'],
    skillColors: ['bg-orange-600', 'bg-red-600', 'bg-yellow-600'],
    borderColor: 'border-orange-500',
    icon: Code,
    detailedResponsibilities: [
      'Execute all credentialed operations (API calls, email, production systems)',
      'Build and maintain infrastructure on Home/Office machines',
      'Manage API keys, OAuth tokens, and security credentials',
      'Run morning email triage and Command Center scans',
      'Deploy and configure new agents and systems',
      'Handle Git operations and code deployment',
      'Maintain backup and disaster recovery systems',
      'Bridge gap between Tier 3 agents and production systems'
    ],
    tools: ['Claude Code', 'Git', 'SSH', 'Production APIs', 'Email systems'],
    outputs: ['Infrastructure updates', 'Email summaries', 'System deployments']
  },
  {
    id: 'scout',
    name: 'Scout',
    role: 'Trend Analyst',
    description: 'Industry intelligence',
    skills: ['Speed', 'Radar', 'Intuition'],
    skillColors: ['bg-green-600', 'bg-emerald-600', 'bg-teal-600'],
    borderColor: 'border-green-500',
    icon: Search,
    detailedResponsibilities: [
      'Monitor FSM platforms for updates and new features',
      'Track competitor moves in contractor automation space',
      'Identify regulatory changes (PFAS, EPA, licensing)',
      'Scan for AI/automation trends in the industry',
      'Research marketplace opportunities and threats',
      'Find content opportunities for the flywheel',
      'Generate weekly intelligence reports',
      'Flag urgent competitive threats for immediate action'
    ],
    tools: ['Web search', 'Industry news APIs', 'Competitor monitoring'],
    outputs: ['Intelligence reports', 'Trend analysis', 'Content opportunities', 'Competitive alerts']
  },
  {
    id: 'quill',
    name: 'Quill',
    role: 'Content Writer',
    description: 'Scripts & copy',
    skills: ['Voice', 'Quality', 'Scripts'],
    skillColors: ['bg-purple-600', 'bg-pink-600', 'bg-indigo-600'],
    borderColor: 'border-purple-500',
    icon: PenTool,
    detailedResponsibilities: [
      'Write AGM Friday episode scripts from Scout\'s intelligence',
      'Create monthly Intelligence Report newsletter content',
      'Draft LinkedIn posts for industry authority',
      'Write sales copy for AGM Pro Tools features',
      'Create email sequences for quote follow-up templates',
      'Develop case studies from customer success stories',
      'Write product documentation and help articles',
      'Transform technical features into contractor benefits'
    ],
    tools: ['Content templates', 'SEO optimization', 'Industry voice guidelines'],
    outputs: ['Scripts', 'Newsletters', 'Social posts', 'Sales copy', 'Documentation']
  },
  {
    id: 'pixel',
    name: 'Pixel',
    role: 'Visual Designer',
    description: 'Thumbnails & graphics',
    skills: ['Visual', 'Attention', 'Style'],
    skillColors: ['bg-pink-600', 'bg-rose-600', 'bg-fuchsia-600'],
    borderColor: 'border-pink-500',
    icon: Palette,
    detailedResponsibilities: [
      'Design eye-catching YouTube thumbnails for AGM Friday',
      'Create social media graphics for LinkedIn and Twitter',
      'Design newsletter headers and visual elements',
      'Build presentation slides for demos and webinars',
      'Create infographics from data and statistics',
      'Design Automation Score report templates',
      'Maintain brand consistency across all visuals',
      'A/B test thumbnail variations for engagement'
    ],
    tools: ['AI image generation', 'Design templates', 'Brand guidelines'],
    outputs: ['Thumbnails', 'Social graphics', 'Infographics', 'Presentation slides', 'Brand assets']
  },
  {
    id: 'echo',
    name: 'Echo',
    role: 'Social Media',
    description: 'Distribution & reach',
    skills: ['Viral', 'Speed', 'Reach'],
    skillColors: ['bg-cyan-600', 'bg-sky-600', 'bg-blue-600'],
    borderColor: 'border-cyan-500',
    icon: Megaphone,
    detailedResponsibilities: [
      'Schedule and optimize social media posts across platforms',
      'Adapt content for platform-specific best practices',
      'Monitor engagement and adjust posting strategies',
      'Create distribution plans for AGM Friday episodes',
      'Repurpose long-form content into bite-sized posts',
      'Track competitor social strategies and trends',
      'Build posting calendars aligned with flywheel',
      'Prepare all posts for Troy\'s final approval'
    ],
    tools: ['Platform APIs', 'Analytics tools', 'Scheduling systems', 'Engagement trackers'],
    outputs: ['Social posts', 'Distribution plans', 'Engagement reports', 'Content calendars']
  }
]

export default function MeetTheTeamCompact() {
  const [selectedAgent, setSelectedAgent] = useState<AgentCard | null>(null)
  
  // Add CSS for custom animations
  if (typeof window !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes energyFlow {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
      }
      
      @keyframes spark {
        0% { transform: scale(0.8) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(0.8) rotate(360deg); }
      }
      
      .energy-flow {
        animation: energyFlow 3s ease-in-out infinite;
      }
      
      .spark-rotate {
        animation: spark 4s ease-in-out infinite;
      }
    `
    if (!document.head.querySelector('#meet-team-styles')) {
      style.id = 'meet-team-styles'
      document.head.appendChild(style)
    }
  }

  const renderAgentCard = (agent: AgentCard, size: 'large' | 'medium' | 'small' = 'medium') => {
    const Icon = agent.icon
    const sizeClasses = {
      large: 'p-4',
      medium: 'p-3',
      small: 'p-2'
    }
    const iconSize = {
      large: 'w-6 h-6',
      medium: 'w-5 h-5',
      small: 'w-4 h-4'
    }
    
    return (
      <div
        key={agent.id}
        onClick={() => setSelectedAgent(agent)}
        className={`bg-gray-900 border-2 ${agent.borderColor} rounded-xl ${sizeClasses[size]} cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${
          selectedAgent?.id === agent.id ? 'ring-2 ring-white/30' : ''
        }`}
      >
        <div className="flex items-center space-x-2 mb-2">
          <div className={`p-2 rounded-lg bg-gray-800 ${agent.borderColor} border`}>
            <Icon className={`${iconSize[size]} text-white`} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white text-sm">{agent.name}</h3>
            <p className="text-xs text-gray-400">{agent.role}</p>
          </div>
        </div>
        
        <p className="text-xs text-gray-300 mb-2 line-clamp-1">
          {agent.description}
        </p>
        
        <div className="flex gap-1">
          {agent.skills.slice(0, 2).map((skill, index) => (
            <span
              key={skill}
              className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${agent.skillColors[index]}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 overflow-hidden relative">
      {/* Background energy grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="h-full max-w-7xl mx-auto flex flex-col relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-4 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-gray-800">
          <h1 className="text-3xl font-bold mb-2">Meet the Team</h1>
          <p className="text-sm text-gray-400">
            5 AI agents • 1 machine • Autonomous digital marketing department running 24/7
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Top Row - Leadership */}
          <div className="flex justify-center mb-4">
            {renderAgentCard(agents.find(a => a.id === 'briggs')!, 'large')}
          </div>
          
          <div className="flex justify-center mb-2">
            <div className="w-px h-8 bg-gray-600"></div>
          </div>

          {/* Second Row - Operations */}
          <div className="flex justify-center mb-4">
            {renderAgentCard(agents.find(a => a.id === 'harlan')!, 'medium')}
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-px h-8 bg-gray-600"></div>
          </div>

          {/* Main Flow Row */}
          <div className="flex items-center justify-center gap-6">
            {/* Input */}
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                <span className="inline-flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" />
                  INPUT SIGNAL
                </span>
              </p>
              {renderAgentCard(agents.find(a => a.id === 'scout')!)}
            </div>

            {/* Flow Connection 1 */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 blur-xl"></div>
                <Zap className="w-10 h-10 text-yellow-400 animate-pulse relative z-10 spark-rotate" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border border-yellow-400/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="relative w-12 overflow-hidden">
                <div className="energy-flow absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                <div className="w-full h-0.5 bg-gradient-to-r from-green-500/30 to-transparent"></div>
              </div>
            </div>

            {/* Processing - Content Creation */}
            <div className="flex flex-col gap-2 relative">
              <p className="text-xs uppercase tracking-wider text-gray-500 text-center mb-1">
                <span className="inline-flex items-center gap-1">
                  <Zap className="w-3 h-3 text-purple-400" />
                  TRANSFORM
                </span>
              </p>
              <div className="flex gap-2">
                {renderAgentCard(agents.find(a => a.id === 'quill')!)}
                {renderAgentCard(agents.find(a => a.id === 'pixel')!)}
              </div>
              {/* Center glow effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Flow Connection 2 */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl"></div>
                <Zap className="w-10 h-10 text-yellow-400 animate-pulse relative z-10 spark-rotate" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border border-yellow-400/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
              <div className="relative w-12 overflow-hidden">
                <div className="energy-flow absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" style={{ animationDelay: '1.5s' }}></div>
                <div className="w-full h-0.5 bg-gradient-to-r from-purple-500/30 to-transparent"></div>
              </div>
            </div>

            {/* Output */}
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                <span className="inline-flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" style={{ animationDelay: '1s' }} />
                  OUTPUT ACTION
                </span>
              </p>
              {renderAgentCard(agents.find(a => a.id === 'echo')!)}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="text-center pt-4 mt-auto">
          <p className="text-xs text-gray-500">
            🟢 OPERATIONAL • Mac Mini M4 (16GB) • Click any agent for details
          </p>
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedAgent(null)}>
          <div className="bg-gray-900 rounded-2xl border-2 border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className={`p-6 border-b-2 ${selectedAgent.borderColor}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-800 ${selectedAgent.borderColor} border`}>
                    <selectedAgent.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
                    <p className="text-gray-400">{selectedAgent.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAgent(null)}
                  className="text-gray-400 hover:text-white text-xl w-8 h-8"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Responsibilities</h3>
                <ul className="space-y-1.5">
                  {selectedAgent.detailedResponsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                      <span className="text-gray-500 mt-0.5">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                {selectedAgent.tools && (
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-2">Tools</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedAgent.tools.map((tool) => (
                        <span key={tool} className="px-2 py-1 rounded-lg bg-gray-800 text-gray-300 text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2">Skills</h3>
                  <div className="flex gap-1">
                    {selectedAgent.skills.map((skill, index) => (
                      <span
                        key={skill}
                        className={`px-2 py-1 rounded-full text-xs font-medium text-white ${selectedAgent.skillColors[index]}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}