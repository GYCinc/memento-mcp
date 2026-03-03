#!/bin/bash

# Memento MCP - Railway Deployment Script
# This script automates the deployment of Memento MCP to Railway

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() { echo -e "${BLUE}ℹ${NC} $1"; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }

# Check if Railway CLI is installed
check_railway_cli() {
    print_info "Checking Railway CLI installation..."

    if ! command -v railway &> /dev/null; then
        print_error "Railway CLI is not installed."
        echo ""
        print_info "To install Railway CLI, run:"
        echo "  npm install -g @railway/cli"
        echo ""
        print_info "Or with yarn:"
        echo "  yarn global add @railway/cli"
        exit 1
    fi

    print_success "Railway CLI is installed"
    railway --version
}

# Check if user is authenticated
check_authentication() {
    print_info "Checking Railway authentication..."

    if ! railway whoami &> /dev/null; then
        print_warning "You are not logged in to Railway."
        echo ""
        print_info "Please log in:"
        railway login
        echo ""
        print_success "Authenticated successfully"
    else
        print_success "Already authenticated as: $(railway whoami)"
    fi
}

# Check if git repository exists
check_git_repository() {
    print_info "Checking git repository..."

    if [ ! -d ".git" ]; then
        print_error "Not a git repository. Please run this script from the project root."
        echo ""
        print_info "To initialize git:"
        echo "  git init"
        echo "  git add ."
        echo "  git commit -m 'Initial commit'"
        exit 1
    fi

    print_success "Git repository found"
}

# Check if remote is set
check_git_remote() {
    print_info "Checking git remote..."

    if ! git remote get-url origin &> /dev/null; then
        print_warning "No git remote 'origin' found."
        echo ""
        print_info "Please add a GitHub remote:"
        echo "  git remote add origin https://github.com/YOUR_USERNAME/memento-mcp.git"
        echo ""
        print_info "Then push your code:"
        echo "  git push -u origin main"
        exit 1
    fi

    local remote_url=$(git remote get-url origin)
    print_success "Remote found: $remote_url"
}

# Create or link Railway project
setup_railway_project() {
    print_info "Setting up Railway project..."

    # Check if already in a Railway project
    if railway status &> /dev/null; then
        print_success "Already in a Railway project"
        return
    fi

    echo ""
    print_info "Choose an option:"
    echo "  1) Create new Railway project"
    echo "  2) Link to existing Railway project"
    echo ""
    read -p "Enter choice (1 or 2): " choice

    case $choice in
        1)
            print_info "Creating new Railway project..."
            railway init
            print_success "Project created"
            ;;
        2)
            print_info "Linking to existing project..."
            railway link
            print_success "Project linked"
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
}

# Add environment variables
setup_environment_variables() {
    print_info "Setting up environment variables..."

    echo ""
    print_warning "You'll need to provide the following information:"
    echo "  - Neo4j URI (e.g., bolt://xxx.databases.neo4j.io:7687)"
    echo "  - Neo4j username (usually 'neo4j')"
    echo "  - Neo4j password"
    echo "  - OpenAI API key (optional, for semantic search)"
    echo ""

    # Neo4j URI
    read -p "Neo4j URI: " neo4j_uri
    if [ -n "$neo4j_uri" ]; then
        railway variables set NEO4J_URI="$neo4j_uri"
        print_success "NEO4J_URI set"
    fi

    # Neo4j Username
    read -p "Neo4j Username [neo4j]: " neo4j_username
    neo4j_username=${neo4j_username:-neo4j}
    railway variables set NEO4J_USERNAME="$neo4j_username"
    print_success "NEO4J_USERNAME set"

    # Neo4j Password (set as secret)
    read -s -p "Neo4j Password: " neo4j_password
    echo ""
    if [ -n "$neo4j_password" ]; then
        railway variables set NEO4J_PASSWORD="$neo4j_password"
        print_success "NEO4J_PASSWORD set"
    fi

    # OpenAI API Key (optional, set as secret)
    echo ""
    read -p "OpenAI API Key (press Enter to skip): " openai_key
    if [ -n "$openai_key" ]; then
        railway variables set OPENAI_API_KEY="$openai_key"
        print_success "OPENAI_API_KEY set"
    else
        print_warning "Skipping OPENAI_API_KEY (semantic search will use random embeddings)"
    fi

    # Optional variables with defaults
    railway variables set NEO4J_DATABASE="neo4j"
    railway variables set NEO4J_VECTOR_INDEX="entity_embeddings"
    railway variables set NEO4J_VECTOR_DIMENSIONS="1536"
    railway variables set NEO4J_SIMILARITY_FUNCTION="cosine"
    railway variables set DEBUG="true"

    print_success "Optional variables set with defaults"
}

# Deploy to Railway
deploy_service() {
    print_info "Deploying to Railway..."

    if railway up &> /dev/null; then
        print_success "Deployment initiated"
    else
        print_error "Deployment failed"
        exit 1
    fi
}

# Show deployment status
show_status() {
    echo ""
    print_info "Deployment status:"
    echo ""

    # Wait a moment for deployment to start
    sleep 2

    if railway status &> /dev/null; then
        railway status
    fi

    echo ""
    print_info "To view logs, run:"
    echo "  railway logs"
    echo ""
    print_info "To open in browser:"
    echo "  railway open"
}

# Main execution
main() {
    echo ""
    echo "╔═══════════════════════════════════════════════════════╗"
    echo "║   Memento MCP - Railway Deployment Script            ║"
    echo "╚═══════════════════════════════════════════════════════╝"
    echo ""

    # Run checks
    check_railway_cli
    check_authentication
    check_git_repository
    check_git_remote

    # Setup
    setup_railway_project

    echo ""
    print_warning "Before deploying, make sure your code is pushed to GitHub:"
    echo "  git push"
    echo ""
    read -p "Press Enter to continue after pushing to GitHub..."

    # Environment variables
    echo ""
    read -p "Do you want to set environment variables now? (y/n): " set_vars
    if [[ $set_vars =~ ^[Yy]$ ]]; then
        setup_environment_variables
    else
        print_warning "Skipping environment variables. Set them later with:"
        echo "  railway variables set NEO4J_URI=..."
    fi

    # Deploy
    deploy_service

    # Show status
    show_status

    echo ""
    print_success "Deployment complete!"
    echo ""
    print_info "Next steps:"
    echo "  1. Monitor deployment: railway logs"
    echo "  2. Open dashboard: railway open"
    echo "  3. Set spending limit in Railway billing settings"
    echo ""
}

# Run main function
main
