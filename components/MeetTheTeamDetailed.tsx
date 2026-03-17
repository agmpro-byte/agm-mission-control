'use client'

import { useState } from 'react'
import { Bot, Code, Search, PenTool, Palette, Megaphone, Shield, ArrowRight, Zap, Activity, ChevronRight, Sparkles } from 'lucide-react'

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
  tools: string[]
  outputs: string[]
  metrics?: string
}

const agents: AgentCard[] = [
  {
    id: 'briggs',
    name: 'Briggs',
    role: 'Chief of Staff',
    description: 'Orchestrates all operations, routes tasks, monitors flywheel health 24/7',
    skills: ['Orchestration', 'Routing', 'Monitoring'],
    borderColor: 'border-blue-500',
    glowColor: 'shadow-blue-500/50',
    icon: Shield,
    detailedResponsibilities: [
      'Route incoming tasks to the appropriate agent based on expertise',
      'Monitor flywheel health and flag any stage going quiet >7 days',
      'Send morning briefings at 8 AM with weather, news, and priorities',
      'Post EOD rundowns at 7 PM with day summary and improvement proposals',
      'Coordinate multi-agent workflows and ensure task completion',
      'Track key metrics: MRR, marketplace installs, newsletter subscribers',
      'Escalate decisions requiring human judgment to Troy immediately',
      'Build and maintain Mission Control dashboards and reporting'
    ],
    tools: ['Mission Control Dashboard', 'Task Routing System', 'Memory Management', 'Workspace Files'],
    outputs: ['Daily Briefings', 'Status Reports', 'Task Assignments', 'Metric Dashboards', 'EOD Summaries'],
    metrics: '24/7 Operations • 5 Agents Managed'
  },
  {
    id: 'harlan',
    name: 'Harlan',
    role: 'Lead Engineer',
    description: 'Tier 2 credentialed access, bridges gap between agents and production systems',
    skills: ['Engineering', 'Security', 'Deployment'],
    borderColor: 'border-orange-500',
    glowColor: 'shadow-orange-500/50',
    icon: Code,
    detailedResponsibilities: [
      'Execute all credentialed operations requiring API keys or OAuth tokens',
      'Build and maintain infrastructure on secure Home/Office machines',
      'Manage all API keys, OAuth tokens, and security credentials safely',
      'Run morning email triage at 6 AM and extract actionable items',
      'Deploy and configure new agents with proper isolation and security',
      'Handle all Git operations, code deployment, and version control',
      'Maintain backup and disaster recovery systems for business continuity',
      'Bridge the security gap between Tier 3 agents and production systems'
    ],
    tools: ['Claude Code', 'Git/GitHub', 'SSH Access', 'Production APIs', 'Email Systems', 'Docker'],
    outputs: ['Infrastructure Updates', 'Email Summaries', 'System Deployments', 'Security Reports'],
    metrics: 'Tier 2 Access • Zero Credentials Exposed'
  },
  {
    id: 'scout',
    name: 'Scout',
    role: 'Trend Analyst',
    description: 'Feeds Stage 1 of flywheel with industry intelligence and competitor insights',
    skills: ['Research', 'Analysis', 'Intuition'],
    borderColor: 'border-green-500',
    glowColor: 'shadow-green-500/50',
    icon: Search,
    detailedResponsibilities: [
      'Monitor all major FSM platforms for updates, features, and pricing changes',
      'Track competitor moves in the contractor automation space daily',
      'Identify regulatory changes affecting contractors (PFAS, EPA, licensing)',
      'Scan for AI/automation trends that could impact the industry',
      'Research marketplace opportunities, threats, and partnership options',
      'Find content opportunities that align with flywheel objectives',
      'Generate comprehensive weekly intelligence reports for the team',
      'Flag urgent competitive threats for immediate executive attention'
    ],
    tools: ['Web Search APIs', 'Industry News Feeds', 'Competitor Monitoring', 'Trend Analysis Tools'],
    outputs: ['Intelligence Reports', 'Trend Analysis', 'Content Opportunities', 'Competitive Alerts', 'Market Insights'],
    metrics: '50+ Signals/Week • 24hr Alert Response'
  },
  {
    id: 'quill',
    name: 'Quill',
    role: 'Content Writer',
    description: 'Transforms intelligence into compelling narratives that drive the flywheel',
    skills: ['Copywriting', 'Storytelling', 'SEO'],
    borderColor: 'border-purple-500',
    glowColor: 'shadow-purple-500/50',
    icon: PenTool,
    detailedResponsibilities: [
      'Write AGM Friday episode scripts from Scout\'s weekly intelligence',
      'Create monthly Intelligence Report newsletters for 280+ subscribers',
      'Draft LinkedIn posts establishing Troy as industry thought leader',
      'Write persuasive sales copy for AGM Pro Tools features and benefits',
      'Create email sequences for automated quote follow-up campaigns',
      'Develop detailed case studies from customer success stories',
      'Write comprehensive product documentation and help articles',
      'Transform technical features into clear contractor benefits'
    ],
    tools: ['Content Templates', 'SEO Optimization', 'Voice Guidelines', 'Industry Terminology', 'Copy Frameworks'],
    outputs: ['Episode Scripts', 'Newsletters', 'Social Posts', 'Sales Copy', 'Documentation', 'Case Studies'],
    metrics: '8+ Assets/Week • 97% Non-Customer Reach'
  },
  {
    id: 'pixel',
    name: 'Pixel',
    role: 'Visual Designer',
    description: 'Creates eye-catching visuals that stop the scroll and drive engagement',
    skills: ['Design', 'Branding', 'Psychology'],
    borderColor: 'border-pink-500',
    glowColor: 'shadow-pink-500/50',
    icon: Palette,
    detailedResponsibilities: [
      'Design high-CTR YouTube thumbnails for AGM Friday episodes',
      'Create platform-optimized social media graphics for LinkedIn/Twitter',
      'Design professional newsletter headers and visual elements',
      'Build compelling presentation slides for demos and webinars',
      'Create data-driven infographics from statistics and insights',
      'Design Automation Score report templates that contractors love',
      'Maintain strict brand consistency across all visual assets',
      'A/B test thumbnail variations to maximize engagement rates'
    ],
    tools: ['AI Image Generation', 'Design Templates', 'Brand Guidelines', 'Color Psychology', 'A/B Testing'],
    outputs: ['YouTube Thumbnails', 'Social Graphics', 'Infographics', 'Slide Decks', 'Brand Assets', 'Reports'],
    metrics: '20+ Visuals/Week • 2.3x CTR Improvement'
  },
  {
    id: 'echo',
    name: 'Echo',
    role: 'Social Media Manager',
    description: 'Amplifies content reach, ensures right message reaches right audience at right time',
    skills: ['Distribution', 'Timing', 'Virality'],
    borderColor: 'border-cyan-500',
    glowColor: 'shadow-cyan-500/50',
    icon: Megaphone,
    detailedResponsibilities: [
      'Schedule and optimize social media posts across all platforms',
      'Adapt content for platform-specific best practices and algorithms',
      'Monitor real-time engagement and adjust posting strategies',
      'Create comprehensive distribution plans for AGM Friday episodes',
      'Repurpose long-form content into platform-optimized bite-sized posts',
      'Track competitor social strategies and identify opportunities',
      'Build monthly posting calendars aligned with flywheel objectives',
      'Prepare all posts for Troy\'s final approval before publishing'
    ],
    tools: ['Platform APIs', 'Analytics Dashboards', 'Scheduling Tools', 'Engagement Trackers', 'Hashtag Research'],
    outputs: ['Social Posts', 'Distribution Plans', 'Engagement Reports', 'Content Calendars', 'Performance Metrics'],
    metrics: '30+ Posts/Week • 5x Reach Amplification'
  }
]

export default function MeetTheTeamDetailed() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)

  // Add CSS animations
  if (typeof window !== 'undefined' && !document.querySelector('#detailed-styles')) {
    const style = document.createElement('style')
    style.id = 'detailed-styles'
    style.textContent = `
      @keyframes flowPulse {
        0% { opacity: 0; transform: scaleX(0); }
        50% { opacity: 1; transform: scaleX(1); }
        100% { opacity: 0; transform: scaleX(0); }
      }
      
      @keyframes dataStream {
        0% { transform: translateY(100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-100%); opacity: 0; }
      }
      
      .flow-pulse { animation: flowPulse 3s ease-in-out infinite; }
      .data-stream { animation: dataStream 5s linear infinite; }
      
      @keyframes glow {
        0%, 100% { opacity: 0.5; filter: blur(10px); }
        50% { opacity: 1; filter: blur(20px); }
      }
      
      .glow-effect { animation: glow 3s ease-in-out infinite; }
    `
    document.head.appendChild(style)
  }

  const renderDetailedAgent = (agent: AgentCard, size: 'large' | 'normal' = 'normal') => {
    const Icon = agent.icon
    const isHovered = hoveredAgent === agent.id
    
    return (
      <div
        key={agent.id}
        onMouseEnter={() => setHoveredAgent(agent.id)}
        onMouseLeave={() => setHoveredAgent(null)}
        className={`bg-gray-900/90 backdrop-blur border-2 ${agent.borderColor} rounded-xl ${
          size === 'large' ? 'p-4' : 'p-3'
        } transition-all duration-300 relative overflow-hidden ${
          isHovered ? `shadow-2xl ${agent.glowColor} scale-[1.01]` : ''
        }`}
      >
        {/* Background glow effect */}
        {isHovered && (
          <div className={`absolute inset-0 ${agent.glowColor.replace('shadow-', 'bg-').replace('/50', '/20')} glow-effect`} />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-2 mb-3">
            <div className={`p-2 rounded-lg bg-gray-800/80 ${agent.borderColor} border backdrop-blur`}>
              <Icon className={`${size === 'large' ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-white ${size === 'large' ? 'text-lg' : 'text-base'}`}>{agent.name}</h3>
              <div className="text-gray-400 text-xs">
                <span>{agent.role}</span>
                <span className="text-gray-500 ml-1">| {agent.description}</span>
              </div>
            </div>

          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mb-3">
            {agent.skills.map((skill) => (
              <span key={skill} className={`text-xs px-2 py-1 rounded-full font-medium ${
                agent.glowColor.replace('shadow-', 'bg-').replace('/50', '/80')
              } text-white border ${agent.borderColor}`}>
                {skill}
              </span>
            ))}
          </div>

          {/* Responsibilities */}
          <div className="mb-3">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Key Responsibilities
            </p>
            <div className="space-y-1">
              {agent.detailedResponsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-1 group">
                  <ChevronRight className={`w-2 h-2 mt-0.5 flex-shrink-0 transition-colors ${
                    agent.glowColor.replace('shadow-', 'text-').replace('/50', '')
                  } opacity-50 group-hover:opacity-100`} />
                  <p className="text-[11px] text-gray-300 leading-snug">{resp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Outputs Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-800">
            {/* Tools */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tools</p>
              <div className="flex flex-wrap gap-1">
                {agent.tools.map((tool) => (
                  <span key={tool} className="text-[10px] px-1.5 py-0.5 bg-gray-800/50 backdrop-blur text-gray-400 rounded border border-gray-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Outputs */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Outputs</p>
              <div className="flex flex-wrap gap-1">
                {agent.outputs.map((output) => (
                  <span key={output} className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    agent.borderColor
                  } ${agent.glowColor.replace('shadow-', 'bg-').replace('/50', '/10')}`}>
                    {output}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 overflow-hidden relative">
      {/* Animated grid background */}
      <div className="fixed inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Data streams animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="data-stream absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="data-stream absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" style={{animationDelay: '1s'}}></div>
        <div className="data-stream absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[2400px] mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
            AGM Mission Control — Meet the Team
          </h1>
          <p className="text-gray-400 text-sm">5 AI Agents • 24/7 Autonomous Digital Marketing Department</p>
        </div>

        {/* Leadership Layer - Full Width */}
        <div className="grid grid-cols-2 gap-6 mb-2 px-[15%]">
          <div className="relative">
            {renderDetailedAgent(agents.find(a => a.id === 'briggs')!, 'large')}
          </div>
          <div className="relative">
            {renderDetailedAgent(agents.find(a => a.id === 'harlan')!, 'large')}
          </div>
        </div>

        {/* Briggs ↔ Harlan Connection */}
        <div className="flex items-center justify-center mb-2 relative h-6">
          <div className="flex items-center gap-2">
            <div className="text-xs text-blue-400">Orchestration</div>
            <div className="relative w-32 h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-yellow-400/20 to-orange-500/20"></div>
              <div className="flow-pulse absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
            <Zap className="w-6 h-6 text-yellow-400" />
            <div className="relative w-32 h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-400/20 to-blue-500/20"></div>
              <div className="flow-pulse absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" style={{animationDelay: '1.5s'}}></div>
            </div>
            <div className="text-xs text-orange-400">Engineering</div>
          </div>
        </div>

        {/* Main Flow - Full Width */}
        <div className="flex-1 grid grid-cols-[1fr_auto_2fr_auto_1fr] gap-3 items-start">
          {/* Scout */}
          <div>
            <div className="text-center mb-2">
              <p className="text-xs font-bold text-green-400 uppercase tracking-wider">
                ↓ Stage 1: Intelligence
              </p>
            </div>
            {renderDetailedAgent(agents.find(a => a.id === 'scout')!)}
          </div>

          {/* Energy Flow */}
          <div className="flex items-center justify-center">
            <Zap className="w-6 h-6 text-green-400 animate-pulse" />
          </div>

          {/* Quill & Pixel */}
          <div>
            <div className="text-center mb-2">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                ⚡ Stage 2: Content
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {renderDetailedAgent(agents.find(a => a.id === 'quill')!)}
              {renderDetailedAgent(agents.find(a => a.id === 'pixel')!)}
            </div>
          </div>

          {/* Energy Flow */}
          <div className="flex items-center justify-center">
            <Zap className="w-6 h-6 text-purple-400 animate-pulse" style={{animationDelay: '0.5s'}} />
          </div>

          {/* Echo */}
          <div>
            <div className="text-center mb-2">
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Stage 3: Distribution →
              </p>
            </div>
            {renderDetailedAgent(agents.find(a => a.id === 'echo')!)}
          </div>
        </div>

        {/* Flywheel Status Bar */}
        <div className="mt-3 flex items-center justify-center">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 px-6 py-2 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-green-400">OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-500 uppercase">Flywheel:</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-green-400">Intelligence</span>
                <ArrowRight className="w-2 h-2 text-gray-600" />
                <span className="text-[10px] text-purple-400">Content</span>
                <ArrowRight className="w-2 h-2 text-gray-600" />
                <span className="text-[10px] text-cyan-400">Distribution</span>
                <ArrowRight className="w-2 h-2 text-gray-600" />
                <span className="text-[10px] text-blue-400">Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}// Updated Sun Mar 15 16:25:44 PDT 2026
// Force refresh Sun Mar 15 16:51:05 PDT 2026
