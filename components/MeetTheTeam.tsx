'use client'

import { useState } from 'react'
import { Bot, Code, Search, PenTool, Palette, Megaphone, Shield } from 'lucide-react'

interface AgentCard {
  id: string
  name: string
  role: string
  description: string
  skills: string[]
  skillColors: string[]
  borderColor: string
  icon: any
  layer: 'leadership' | 'operations' | 'intelligence' | 'content' | 'distribution'
  detailedResponsibilities: string[]
  tools?: string[]
  outputs?: string[]
}

const agents: AgentCard[] = [
  {
    id: 'briggs',
    name: 'Briggs',
    role: 'Chief of Staff',
    description: 'Orchestrates all operations, routes tasks, monitors flywheel. Your autonomous marketing department commander.',
    skills: ['Orchestration', 'Clarity', 'Delegation'],
    skillColors: ['bg-blue-600', 'bg-purple-600', 'bg-indigo-600'],
    borderColor: 'border-blue-500',
    icon: Shield,
    layer: 'leadership',
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
    description: 'Builds infrastructure, manages credentials, executes production tasks. The technical backbone of Mission Control.',
    skills: ['Engineering', 'Security', 'Automation'],
    skillColors: ['bg-orange-600', 'bg-red-600', 'bg-yellow-600'],
    borderColor: 'border-orange-500',
    icon: Code,
    layer: 'operations',
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
    description: 'Finds leads, tracks signals, scouts industry intelligence. Feeds Stage 1 of the flywheel with actionable insights.',
    skills: ['Speed', 'Radar', 'Intuition'],
    skillColors: ['bg-green-600', 'bg-emerald-600', 'bg-teal-600'],
    borderColor: 'border-green-500',
    icon: Search,
    layer: 'intelligence',
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
    description: 'Writes copy, scripts, newsletter content. Transforms intelligence into compelling narratives.',
    skills: ['Voice', 'Quality', 'Scripts'],
    skillColors: ['bg-purple-600', 'bg-pink-600', 'bg-indigo-600'],
    borderColor: 'border-purple-500',
    icon: PenTool,
    layer: 'content',
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
    role: 'Thumbnail Designer',
    description: 'Designs thumbnails, crafts visuals, creates brand assets that capture attention.',
    skills: ['Visual', 'Attention', 'Style'],
    skillColors: ['bg-pink-600', 'bg-rose-600', 'bg-fuchsia-600'],
    borderColor: 'border-pink-500',
    icon: Palette,
    layer: 'content',
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
    role: 'Social Media Manager',
    description: 'Posts, engages, amplifies reach. Ensures content reaches the right audience at the right time.',
    skills: ['Viral', 'Speed', 'Reach'],
    skillColors: ['bg-cyan-600', 'bg-sky-600', 'bg-blue-600'],
    borderColor: 'border-cyan-500',
    icon: Megaphone,
    layer: 'distribution',
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

export default function MeetTheTeam() {
  const [selectedAgent, setSelectedAgent] = useState<AgentCard | null>(null)

  const renderAgentCard = (agent: AgentCard) => {
    const Icon = agent.icon
    return (
      <div
        key={agent.id}
        onClick={() => setSelectedAgent(agent)}
        className={`bg-gray-900 border-2 ${agent.borderColor} rounded-xl p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl ${
          selectedAgent?.id === agent.id ? 'ring-4 ring-white/20' : ''
        }`}
      >
        <div className="flex items-start space-x-4 mb-4">
          <div className={`p-3 rounded-lg bg-gray-800 ${agent.borderColor} border`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
            <p className="text-sm text-gray-400">{agent.role}</p>
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-wider">CLICK →</span>
        </div>
        
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          {agent.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {agent.skills.map((skill, index) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${agent.skillColors[index]}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const leadership = agents.filter(a => a.layer === 'leadership')
  const operations = agents.filter(a => a.layer === 'operations')
  const intelligence = agents.filter(a => a.layer === 'intelligence')
  const content = agents.filter(a => a.layer === 'content')
  const distribution = agents.filter(a => a.layer === 'distribution')

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-gray-800">
          <h1 className="text-5xl font-bold mb-4">Meet the Team</h1>
          <p className="text-xl text-gray-400">
            5 AI agents on 1 machine, each with a real role and a real purpose.
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Building an autonomous digital marketing department that runs 24/7. Research markets. Write content.
            <br />Create visuals. Ship products. All without being told what to do.
          </p>
        </div>

        {/* Leadership Layer */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-1 max-w-md">
              {leadership.map(renderAgentCard)}
            </div>
          </div>

          {/* Operations Layer */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-12 w-px bg-gray-700"></div>
          </div>
          
          <div className="text-center mb-4">
            <span className="text-sm uppercase tracking-wider text-gray-500">
              ⚙️ OPERATIONS
            </span>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 max-w-md">
              {operations.map(renderAgentCard)}
            </div>
          </div>

          {/* Input/Output Layers */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Intelligence Input */}
            <div>
              <div className="text-center mb-4">
                <span className="text-sm uppercase tracking-wider text-gray-500">
                  ↙ INPUT SIGNAL
                </span>
              </div>
              <div className="space-y-4">
                {intelligence.map(renderAgentCard)}
              </div>
            </div>

            {/* Center Connection */}
            <div className="flex items-center justify-center">
              <div className="text-6xl text-gray-700">⚡</div>
            </div>

            {/* Content & Distribution Output */}
            <div>
              <div className="text-center mb-4">
                <span className="text-sm uppercase tracking-wider text-gray-500">
                  OUTPUT ACTION ↘
                </span>
              </div>
              <div className="space-y-4">
                {content.map(renderAgentCard)}
                {distribution.map(renderAgentCard)}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed View */}
        {selectedAgent && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 z-50" onClick={() => setSelectedAgent(null)}>
            <div className="bg-gray-900 rounded-2xl border-2 border-gray-700 max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className={`p-8 border-b-2 ${selectedAgent.borderColor}`}>
                <div className="flex items-center justify-between mb-4">
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
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-300">{selectedAgent.description}</p>
              </div>

              <div className="p-8 space-y-6">
                {/* Responsibilities */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Detailed Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedAgent.detailedResponsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start space-x-3 text-gray-300">
                        <span className="text-gray-500 mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                {selectedAgent.tools && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Tools & Systems</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.tools.map((tool) => (
                        <span key={tool} className="px-3 py-1 rounded-lg bg-gray-800 text-gray-300 text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outputs */}
                {selectedAgent.outputs && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Key Outputs</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedAgent.outputs.map((output) => (
                        <div key={output} className="flex items-center space-x-2 text-gray-300">
                          <span className="text-green-500">✓</span>
                          <span>{output}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Core Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedAgent.skills.map((skill, index) => (
                      <span
                        key={skill}
                        className={`px-4 py-2 rounded-full text-sm font-medium text-white ${selectedAgent.skillColors[index]}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Status */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            🟢 OPERATIONAL • Running on Mac Mini M4 (16GB) • Workspace file routing active
          </p>
        </div>
      </div>
    </div>
  )
}