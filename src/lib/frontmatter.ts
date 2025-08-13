// Simple frontmatter parser that works in Cloudflare Workers
export interface FrontmatterResult {
  data: Record<string, any>;
  content: string;
}

export function parseFrontmatter(input: string): FrontmatterResult {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = input.match(frontmatterRegex);
  
  if (!match) {
    return {
      data: {},
      content: input
    };
  }
  
  const [, frontmatterStr, content] = match;
  const data: Record<string, any> = {};
  
  // Parse simple YAML frontmatter
  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmed.slice(0, colonIndex).trim();
    let value = trimmed.slice(colonIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    data[key] = value;
  }
  
  return {
    data,
    content: content.trim()
  };
}