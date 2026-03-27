# Session Summary - Neo4j MCP Setup & Memory Genesis Skill

**Date:** 2025-03-03

## Accomplished

### 1. Fixed Local Neo4j Authentication
- Changed default password from `neo4j` to `memento2024`
- Updated `~/.claude.json` with new credentials
- Updated default password in `src/storage/neo4j/Neo4jConfig.ts`
- Rebuilt project successfully

### 2. Created Agent Realign Skill (with Hooks)
**Location:** `~/.claude/skills/agent-realign/`

**Purpose:** Session realignment and quality control using Genesis Protocol

**New: Automatic Hook Integration**
- `~/.claude/hooks/user-prompt-agent-realign.ts` - Detects drift before user prompt
- `~/.claude/hooks/project-memory-bridge.ts` - Smart per-project memory
- `~/.claude/settings.json` - Hook registered for UserPromptSubmit

**Project Memory System**
- Per-project memory stored in `~/.claude/project-memories/`
- Auto-detects project type (node, python, rust, go)
- Commands: `genesis-remember`, `genesis-query`, `genesis-realign`
- Detects agent drift, laziness, fake projects
- Triggers Genesis Protocol for intent-driven memory retrieval (NOT blind search)
- Quality control for half-baked work
- Session handoff between agents

**Key Commands:**
```bash
genesis-remember "Something to remember"    # Save to memory
genesis-query "neo4j password"          # Search memory
genesis-reset                            # Handoff to new agent
genesis-check-quality                     # Quality checklist
```

**Install:**
```bash
~/.claude/skills/memory-genesis/scripts/install.sh
```

### 3. Saved to Genesis Memory
- Local Neo4j password: `memento2024`
- Neo4j auth fix: Default password must be changed via `ALTER CURRENT USER SET PASSWORD`

## Key Learnings

### Neo4j Setup
- Default password `neo4j` must be changed on first use
- Use Neo4j Browser at http://localhost:7474 or ngrok URL
- Password change command: `ALTER CURRENT USER SET PASSWORD FROM 'old' TO 'new'`
- Always use `bolt://localhost:7687` not `http://` for Neo4j connections

### Genesis Protocol
- **NO BLIND SEARCH** - Only search when context is genuinely missing
- Search NOT when: debugging with stack trace, user says "new project", same topic continues
- Search YES when: agent lost track, after handoff, quality declined
- Use specific query format with aspect, labels, and query string

### Quality Standards
- Skills must have: clear purpose, trigger conditions, actionable content, <500 lines
- Code must have: tests, error handling, proper types, documentation
- Responses must be: concrete, complete, verified

## Files Modified

- `src/storage/neo4j/Neo4jConfig.ts` - Updated default password
- `~/.claude.json` - Updated Neo4j password
- `~/.claude/skills/memory-genesis/` - Created new skill

## Next Steps

1. Add aliases to shell:
```bash
echo 'source ~/.claude/memory/genesis-aliases.sh' >> ~/.zshrc
```

2. Test Memento MCP with new credentials

3. Reset Neo4j Aura password (has Cyrillic character issue)

4. Deploy to Railway with correct environment variables
