import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const WORKSPACE_PATH = '/Users/scott/.openclaw/workspace'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filePath = searchParams.get('path')
  
  try {
    if (!filePath) {
      // List all memory files
      const files = await getMemoryFiles()
      return NextResponse.json({ files })
    }
    
    // Read specific file content
    const fullPath = path.join(WORKSPACE_PATH, filePath)
    // Security: ensure path doesn't escape workspace
    if (!fullPath.startsWith(WORKSPACE_PATH)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }
    
    const content = await fs.readFile(fullPath, 'utf-8')
    const stats = await fs.stat(fullPath)
    
    return NextResponse.json({
      content,
      path: filePath,
      size: stats.size,
      lastModified: stats.mtime.toISOString()
    })
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}

async function getMemoryFiles() {
  const memoryFiles = []
  
  // Check root files
  const rootFiles = ['SOUL.md', 'MEMORY.md', 'IDENTITY.md', 'USER.md', 'AGENTS.md', 'TOOLS.md', 'HEARTBEAT.md']
  for (const file of rootFiles) {
    try {
      const stats = await fs.stat(path.join(WORKSPACE_PATH, file))
      const content = await fs.readFile(path.join(WORKSPACE_PATH, file), 'utf-8')
      memoryFiles.push({
        name: file,
        path: '/' + file,
        type: getFileType(file),
        size: stats.size,
        lastModified: stats.mtime.toISOString(),
        preview: content.substring(0, 200) + '...'
      })
    } catch (error) {
      // File doesn't exist, skip
    }
  }
  
  // Check memory directory
  try {
    const memoryDir = path.join(WORKSPACE_PATH, 'memory')
    const files = await fs.readdir(memoryDir)
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(memoryDir, file)
        const stats = await fs.stat(filePath)
        const content = await fs.readFile(filePath, 'utf-8')
        
        memoryFiles.push({
          name: file,
          path: '/memory/' + file,
          type: 'daily',
          size: stats.size,
          lastModified: stats.mtime.toISOString(),
          preview: content.substring(0, 200) + '...'
        })
      }
    }
  } catch (error) {
    // Memory directory doesn't exist, skip
  }
  
  return memoryFiles.sort((a, b) => 
    new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  )
}

function getFileType(filename: string): string {
  if (filename === 'SOUL.md') return 'soul'
  if (filename === 'IDENTITY.md') return 'identity'
  if (filename === 'TOOLS.md') return 'tools'
  if (filename === 'AGENTS.md') return 'agents'
  if (filename.includes('20')) return 'daily'
  return 'custom'
}