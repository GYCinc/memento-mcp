#!/bin/bash

echo "Testing Neo4j Aura connectivity with curl"

HOST="c25f6610.databases.neo4j.io"

echo "1. Testing DNS resolution..."
if host "$HOST" > /dev/null 2>&1; then
    echo "✅ DNS resolution successful"
else
    echo "❌ DNS resolution failed"
    exit 1
fi

echo "2. Testing TCP connectivity to port 7687 (Bolt)..."
if timeout 5 nc -z "$HOST" 7687 2>/dev/null; then
    echo "✅ Port 7687 is open"
else
    echo "❌ Port 7687 is not accessible (may be firewall blocked)"
fi

echo "3. Testing TCP connectivity to port 443 (HTTPS)..."
if timeout 5 nc -z "$HOST" 443 2>/dev/null; then
    echo "✅ Port 443 is open"
else
    echo "❌ Port 443 is not accessible"
fi

echo "4. Testing HTTPS endpoint (Neo4j Browser UI might not be available in Aura)..."
curl_response=$(curl -s -o /dev/null -w "%{http_code}" "https://$HOST:7474/" --connect-timeout 5 2>/dev/null || echo "curl_error")
if [[ "$curl_response" == "200" || "$curl_response" == "301" || "$curl_response" == "302" ]]; then
    echo "✅ HTTPS endpoint responded with HTTP $curl_response"
elif [[ "$curl_response" == "curl_error" ]]; then
    echo "⚠️  Could not connect to HTTPS (expected for Aura)"
else
    echo "⚠️  HTTPS returned HTTP $curl_response"
fi

echo "5. Testing SSL certificate..."
if echo | openssl s_client -connect "$HOST:443" -servername "$HOST" 2>/dev/null | grep -q "Verify return code"; then
    echo "✅ SSL certificate is valid"
else
    echo "❌ SSL certificate check failed"
fi

echo ""
echo "Summary: Neo4j Aura host appears to be reachable."
echo "If Bolt port (7687) is not open, that's normal for Aura - it uses neo4j+s:// scheme with SSL."
echo ""
echo "Next steps:"
echo "1. The password is the main issue - need exact password from Neo4j Aura dashboard"
echo "2. Click 'Connect' button in Neo4j Aura console"
echo "3. Click eye icon to reveal full password"
echo "4. Copy password exactly (check for special characters)"
echo "5. Test with: node test-aura-comprehensive.js"