#!/bin/bash
#
# Löneprocess API - cURL Examples
#
# These examples show how to interact with the API using cURL.
# Replace YOUR_ID_TOKEN with your actual Firebase ID token.

# Set your ID token here
ID_TOKEN="YOUR_ID_TOKEN_HERE"
BASE_URL="http://localhost:8000"

echo "===================================="
echo "Löneprocess API - cURL Examples"
echo "===================================="
echo ""

# Example 1: Health check (no auth required)
echo "1. Health Check"
curl -s "$BASE_URL/health" | jq
echo ""

# Example 2: Get all salary periods
echo "2. Get All Salary Periods"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/loneperiods" | jq
echo ""

# Example 3: Get specific period
echo "3. Get January 2025 Period"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/loneperiods/202501" | jq
echo ""

# Example 4: Get all activities
echo "4. Get All Activities"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/activities" | jq
echo ""

# Example 5: Get activities by process
echo "5. Get Preparation Activities"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/activities?process=forberedelse" | jq
echo ""

# Example 6: Get all employees
echo "6. Get All Employees (limit 10)"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/la/employees?limit=10" | jq
echo ""

# Example 7: Get employees by org
echo "7. Get Ekonomi Employees"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/la/employees?org_kod=1001" | jq
echo ""

# Example 8: Get error list for period
echo "8. Get Errors for January 2025"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/la/fellistor/202501" | jq
echo ""

# Example 9: Get only critical errors
echo "9. Get Critical Errors for January 2025"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/la/fellistor/202501?severity=error" | jq
echo ""

# Example 10: Get error summary
echo "10. Get Error Summary for January 2025"
curl -s -H "Authorization: Bearer $ID_TOKEN" \
     "$BASE_URL/api/v1/la/fellistor/202501/summary" | jq
echo ""

echo "===================================="
echo "Examples complete!"
echo "===================================="
