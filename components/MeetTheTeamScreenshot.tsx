'use client'

import { useState } from 'react'
import { Bot, Code, Search, PenTool, Palette, Megaphone, Shield, ArrowRight, Zap, Activity } from 'lucide-react'

interface AgentCard {
  id: string
  name: string
  role: string
  description: string
  skills: string[]
  borderColor: string
  glowColor: string
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
    skills: ['Orchestration', 'Routing', 'Monitoring'],
    borderColor: 'border-blue-500',
    glowColor: 'shadow-blue-500/50',
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
    description: 'Infrastructure & security',
    skills: ['Engineering', 'APIs', 'Deploy'],
    borderColor: 'border-orange-500',
    glowColor: 'shadow-orange-500/50',
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
    skills: ['Research', 'Trends', 'Intel'],
    borderColor: 'border-green-500',
    glowColor: 'shadow-green-500/50',
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
    skills: ['Writing', 'Scripts', 'Copy'],
    borderColor: 'border-purple-500',
    glowColor: 'shadow-purple-500/50',
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
    description: 'Graphics & thumbnails',
    skills: ['Design', 'Visuals', 'Brand'],
    borderColor: 'border-pink-500',
    glowColor: 'shadow-pink-500/50',
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
    skills: ['Social', 'Reach', 'Viral'],
    borderColor: 'border-cyan-500',
    glowColor: 'shadow-cyan-500/50',
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

export default function MeetTheTeamScreenshot() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<AgentCard | null>(null)

  // Add CSS for animations
  if (typeof window !== 'undefined' && !document.querySelector('#screenshot-styles')) {
    const style = document.createElement('style')
    style.id = 'screenshot-styles'
    style.textContent = `
      @keyframes flowPulse {
        0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
        50% { opacity: 1; transform: scaleX(1); }
      }
      
      @keyframes sparkSpin {
        from { transform: rotate(0deg) scale(1); }
        to { transform: rotate(360deg) scale(1); }
      }
      
      .flow-pulse { animation: flowPulse 2s ease-in-out infinite; }
      .spark-spin { animation: sparkSpin 3s linear infinite; }
      
      @keyframes glow {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      
      .glow-pulse { animation: glow 2s ease-in-out infinite; }
    `
    document.head.appendChild(style)
  }

  const renderCompactCard = (agent: AgentCard, size: 'sm' | 'md' = 'sm') => {
    const Icon = agent.icon
    const isHovered = hoveredAgent === agent.id
    
    return (
      <div
        key={agent.id}
        onClick={() => setSelectedAgent(agent)}
        onMouseEnter={() => setHoveredAgent(agent.id)}
        onMouseLeave={() => setHoveredAgent(null)}
        className={`
          bg-gray-900 border-2 ${agent.borderColor} rounded-lg p-2 cursor-pointer 
          transition-all duration-300 hover:scale-110 
          ${isHovered ? `shadow-lg ${agent.glowColor}` : ''}
          ${size === 'md' ? 'w-36' : 'w-32'}
        `}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className={`p-1.5 rounded bg-gray-800 ${agent.borderColor} border`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm leading-tight">{agent.name}</h3>
            <p className="text-xs text-gray-400 truncate">{agent.role}</p>
          </div>
        </div>
        
        <div className="flex gap-1 flex-wrap">
          {agent.skills.slice(0, 2).map((skill, i) => (
            <span key={skill} className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-300 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-gray-950 text-white flex items-center justify-center p-8 overflow-hidden relative">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            AGM Mission Control
          </h1>
          <p className="text-gray-400">5 AI Agents • 1 Mac Mini • 24/7 Autonomous Marketing</p>
        </div>

        {/* Agent Layout */}
        <div className="relative">
          {/* Leadership Layer */}
          <div className="flex justify-center mb-3">
            {renderCompactCard(agents.find(a => a.id === 'briggs')!, 'md')}
          </div>
          
          {/* Briggs ↔ Harlan Connection */}
          <div className="flex justify-center items-center mb-3 relative">
            <div className="absolute flex items-center gap-2">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              <div className="flex flex-col items-center">
                <ArrowRight className="w-3 h-3 text-blue-400 transform -rotate-90" />
                <div className="w-px h-4 bg-gradient-to-b from-blue-500 to-orange-500"></div>
                <ArrowRight className="w-3 h-3 text-orange-400 transform rotate-90" />
              </div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
            </div>
            <span className="text-xs text-gray-600 bg-gray-950 px-2 relative z-10">requests ↕ results</span>
          </div>

          {/* Operations Layer */}
          <div className="flex justify-center mb-4">
            {renderCompactCard(agents.find(a => a.id === 'harlan')!, 'md')}
          </div>

          {/* Main Flow */}
          <div className="flex items-center justify-center gap-3">
            {/* Input */}
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1 text-center">Input</p>
              {renderCompactCard(agents.find(a => a.id === 'scout')!)}
            </div>

            {/* Energy Flow 1 */}
            <div className="relative w-16 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-green-500/30 to-purple-500/30 flow-pulse"></div>
              </div>
              <Zap className="w-6 h-6 text-yellow-400 glow-pulse spark-spin relative z-10" />
            </div>

            {/* Content */}
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1 text-center">Transform</p>
              <div className="flex flex-col gap-2">
                {renderCompactCard(agents.find(a => a.id === 'quill')!)}
                {renderCompactCard(agents.find(a => a.id === 'pixel')!)}
              </div>
            </div>

            {/* Energy Flow 2 */}
            <div className="relative w-16 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 flow-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <Zap className="w-6 h-6 text-yellow-400 glow-pulse spark-spin relative z-10" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Output */}
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1 text-center">Output</p>
              {renderCompactCard(agents.find(a => a.id === 'echo')!)}
            </div>
          </div>

          {/* Flywheel indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Intelligence</span>
            </div>
            <ArrowRight className="w-3 h-3 text-gray-600" />
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-xs text-gray-400">Content</span>
            </div>
            <ArrowRight className="w-3 h-3 text-gray-600" />
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-xs text-gray-400">Distribution</span>
            </div>
            <ArrowRight className="w-3 h-3 text-gray-600" />
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              <span className="text-xs text-gray-400">Growth</span>
            </div>
          </div>

          {/* Status line */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">🟢 OPERATIONAL • Building AGM Pro Tools Flywheel 24/7</p>
          </div>
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedAgent(null)}>
          <div className="bg-gray-900 rounded-2xl border-2 border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className={`p-6 border-b-2 ${selectedAgent.borderColor}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-800 ${selectedAgent.borderColor} border`}>
                    <selectedAgent.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedAgent.name}</h2>
                    <p className="text-lg text-gray-400">{selectedAgent.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAgent(null)}
                  className="text-gray-400 hover:text-white text-2xl w-8 h-8"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Responsibilities */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Detailed Responsibilities
                </h3>
                <ul className="space-y-2">
                  {selectedAgent.detailedResponsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start space-x-3 text-gray-300">
                      <span className={`mt-1 ${selectedAgent.glowColor.replace('shadow-', 'text-').replace('/50', '')}`}>▸</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Tools */}
                {selectedAgent.tools && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Tools & Systems</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.tools.map((tool) => (
                        <span key={tool} className="px-3 py-1 rounded-lg bg-gray-800 text-gray-300 text-sm border border-gray-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Core Skills</h3>
                  <div className="flex gap-2">
                    {selectedAgent.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white ${selectedAgent.glowColor.replace('shadow-', 'bg-').replace('/50', '')}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outputs */}
              {selectedAgent.outputs && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Key Outputs</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedAgent.outputs.map((output) => (
                      <div key={output} className="flex items-center space-x-2 text-gray-300">
                        <Zap className={`w-4 h-4 ${selectedAgent.glowColor.replace('shadow-', 'text-').replace('/50', '')}`} />
                        <span>{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}