# AGM Mission Control

World-class autonomous digital marketing department for AGM Pro Tools.

## Overview

Mission Control is the operational dashboard for AGM's autonomous marketing system. It provides real-time visibility into:

- **Flywheel Status** - Monitor all five stages of the growth flywheel
- **Task Management** - Track and route work across the agent team
- **Content Pipeline** - Manage content from ideation to publication
- **Scheduled Operations** - Calendar view of all automated tasks
- **Memory System** - Access and manage agent memory files

## Architecture

Built with:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide Icons

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Key Features

### Flywheel Monitoring
Tracks the five-stage flywheel:
1. Intelligence → 2. Newsletter → 3. AGM Friday → 4. Product Demo → 5. Customer Adoption

Visual indicators show health of each stage (GREEN/YELLOW/RED) with alerts when any stage goes quiet.

### Task Board
Kanban-style board with:
- To Do / In Progress / Done columns
- Priority levels (High/Medium/Low)
- Agent assignment
- Due dates

### Content Pipeline
Six-stage content workflow:
Ideas → Scripting → Thumbnail → Filming → Editing → Published

Tracks content across all platforms (YouTube, Shorts, Twitter, LinkedIn, Newsletter, TikTok).

### Calendar
Shows all scheduled tasks including:
- Daily briefings (8 AM)
- EOD rundowns (7 PM)
- Weekly AGM Friday episodes
- Scout trend reports
- Agent recurring tasks

### Memory Viewer
Browse and search agent memory files:
- SOUL.md (core directives)
- MEMORY.md (long-term memory)
- Daily logs
- Identity and tool configurations

## Deployment

This dashboard is designed to run locally on the Mission Control Mac Mini. For production deployment:

```bash
npm run build
npm start
```

## Future Enhancements

- Real-time agent status indicators
- Webhook integration for live updates
- Analytics dashboard
- Agent communication logs
- Automated report generation

---

Built by Briggs, Chief of Staff for AGM Mission Control