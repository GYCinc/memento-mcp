# Railway Deployment Guide for Memento MCP

Complete guide for deploying Memento MCP to Railway cloud platform.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Neo4j Setup Options](#neo4j-setup-options)
4. [GitHub Repository Setup](#github-repository-setup)
5. [Railway Deployment (Web Dashboard)](#railway-deployment-web-dashboard)
6. [Railway Deployment (CLI Script)](#railway-deployment-cli-script)
7. [Environment Variables](#environment-variables)
8. [Verification](#verification)
9. [Troubleshooting](#troubleshooting)
10. [Cost Estimates](#cost-estimates)

---

## Quick Start

**Fastest path to deployment:**

1. Set up Neo4j AuraDB Free account
2. Push code to GitHub
3. Open Railway app on your phone
4. Click "New Project" → "Deploy from GitHub repo"
5. Add environment variables
6. Deploy!

---

## Prerequisites

Before deploying to Railway, you need:

- [ ] GitHub account
- [ ] Railway account (sign up at [railway.com](https://railway.com))
- [ ] Neo4j database (AuraDB or self-hosted)
- [ ] (Optional) OpenAI API key for semantic search

---

## Neo4j Setup Options

Memento MCP requires a Neo4j database. Choose one:

### Option A: Neo4j AuraDB (Recommended - Free Tier Available)

**Cost:** $0 (Free Tier)

**Steps:**

1. Go to [neo4j.com/cloud/aura/](https://neo4j.com/cloud/aura/)
2. Click "Start Free" and create an account
3. Select "AuraDB Free" plan
4. Create a new database instance
5. Save your connection details:
   - Connection URL (looks like `bolt://xxx.databases.neo4j.io:7687`)
   - Username (usually `neo4j`)
   - Password (you set this)

**Pros:** Managed service, free tier available, zero maintenance
**Cons:** External service (separate from Railway)

### Option B: Neo4j on Railway

**Cost:** ~$10-15/month

**Steps:**

1. In Railway dashboard, create a new service
2. Select "Deploy from Docker Image"
3. Use image: `neo4j:latest`
4. Set environment variables:
   - `NEO4J_AUTH=neo4j/your_password`
   - `NEO4J_PLUGINS=["apoc"]`
5. Deploy the service
6. Get the internal Railway URL from service details

**Connection String:** `bolt://<service-name>.railway.internal:7687`

**Pros:** Single platform, private network
**Cons:** You manage backups/updates, costs more

---

## GitHub Repository Setup

Railway deploys directly from GitHub repositories.

### Step 1: Initialize Git (if not already)

```bash
cd /path/to/memento-mcp
git init
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `memento-mcp` (or your preference)
3. Choose Public or Private
4. DO NOT initialize with README (you already have code)
5. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/memento-mcp.git

# Add all files
git add .

# Commit
git commit -m "Initial commit - Memento MCP ready for Railway deployment"

# Push to main branch
git push -u origin main
```

**Important:** The `.gitignore` has been updated to include `dist/` which Railway needs for deployment.

---

## Railway Deployment (Web Dashboard)

### From Desktop Browser:

1. Go to [railway.com](https://railway.com) and log in
2. Click **"New Project"**
3. Click **"Deploy from GitHub repo"**
4. Select your `memento-mcp` repository
5. Railway will detect the Dockerfile automatically
6. Click **"Deploy"**

### From Railway Mobile App:

1. Open Railway app on your phone
2. Tap **"New Project"**
3. Tap **"Deploy from GitHub repo"**
4. Select your `memento-mcp` repository
5. Tap **"Deploy"**

---

## Environment Variables

After deploying, add your environment variables:

### In Railway Dashboard:

1. Go to your project → **memento-mcp** service
2. Click **"Variables"** tab
3. Add the following variables:

### Required Variables (set as Secrets 🔒):

```
NEO4J_URI=bolt://your-neo4j-instance:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_password
OPENAI_API_KEY=sk-... (if using OpenAI)
```

### Optional Variables (set as Regular Variables):

```
NEO4J_DATABASE=neo4j
NEO4J_VECTOR_INDEX=entity_embeddings
NEO4J_VECTOR_DIMENSIONS=1536
NEO4J_SIMILARITY_FUNCTION=cosine
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
EMBEDDING_RATE_LIMIT_TOKENS=20
EMBEDDING_RATE_LIMIT_INTERVAL=60000
DEBUG=true
```

**To set a Secret:** Click the "Secret" toggle when adding a variable in Railway.

---

## Railway Deployment (CLI Script)

For automated deployment from your terminal:

### Install Railway CLI:

```bash
npm install -g @railway/cli
```

### Run the Deployment Script:

```bash
# Make the script executable
chmod +x scripts/deploy-railway.sh

# Run the script
./scripts/deploy-railway.sh
```

The script will:
- Check if Railway CLI is installed
- Guide you through authentication
- Create a new Railway project
- Deploy your service
- Prompt for environment variables

---

## Verification

After deployment, verify everything works:

### 1. Check Service Status

In Railway dashboard, your `memento-mcp` service should show:
- Status: **Running** (green indicator)
- No errors in logs

### 2. Check Logs

Click the **"Logs"** tab in Railway and look for:

```
✓ Storage provider initialized
✓ Neo4j connection successful
✓ MCP server running
```

### 3. Test MCP Connection

The MCP server uses stdio transport, so it's designed to be connected by MCP clients like:
- Claude Desktop
- Cursor IDE
- GitHub Copilot

Configure your MCP client to use the Railway service (this typically requires SSE transport configuration, which is beyond the scope of this guide).

---

## Troubleshooting

### Service Won't Start

**Check logs for:**
- `NEO4J_URI` connection errors
- Missing environment variables
- TypeScript build errors

**Solution:** Verify all required environment variables are set correctly.

### Neo4j Connection Failed

**Error:** `Failed to connect to Neo4j`

**Solutions:**
1. Verify Neo4j instance is running
2. Check `NEO4J_URI` is correct
3. Ensure firewall allows Railway to reach Neo4j
4. For AuraDB: verify IP whitelist (if configured)
5. For Railway Neo4j: Use internal `.railway.internal` URL

### Build Failures

**Error:** `Module not found` or build errors

**Solution:** Ensure `dist/` directory is committed to Git (check `.gitignore`).

### High Costs

**If you see unexpected charges:**

1. Check Railway usage metrics
2. Consider pausing services when not in use
3. Use Neo4j AuraDB Free tier instead of Railway-hosted Neo4j
4. Set a spending limit in Railway billing settings

---

## Cost Estimates

| Component | Free Tier | Estimated Monthly Cost |
|-----------|-----------|----------------------|
| Memento MCP on Railway | ✅ $5 credits included | $0 (within credits) |
| Neo4j AuraDB Free | ✅ Free tier available | $0 |
| Neo4j on Railway | ❌ Not free | ~$10-15/month |
| **Total (with AuraDB)** | | **$0/month** |
| **Total (Railway Neo4j)** | | **$10-15/month** |

**Railway Pricing:**
- CPU: $0.00000772/second (~$20/month per vCPU if running 24/7)
- RAM: $0.015/GB-month
- Free tier: $5/month credits included

**Your Memento MCP service is lightweight** and should stay within free tier credits for typical usage.

---

## Next Steps

After successful deployment:

1. ✅ Set up spending limit in Railway billing settings (optional)
2. ✅ Configure monitoring/alerts (optional)
3. ✅ Set up automatic deployments from GitHub main branch
4. ✅ Document your Neo4j connection details somewhere safe

---

## Support

- **Railway Documentation:** [docs.railway.com](https://docs.railway.com)
- **Neo4j AuraDB:** [neo4j.com/cloud/aura/](https://neo4j.com/cloud/aura/)
- **Memento MCP Issues:** [github.com/gannonh/memento-mcp/issues](https://github.com/gannonh/memento-mcp/issues)
