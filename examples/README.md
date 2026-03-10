# Code Examples

Example implementations for integrating with the Löneprocess API.

---

## 📚 Available Examples

### 1. JavaScript (Vanilla)
- **File:** [javascript-example.js](javascript-example.js)
- **Description:** Complete example using Fetch API
- **Best for:** Node.js, React, Vue, Angular

### 2. TypeScript
- **File:** [typescript-example.ts](typescript-example.ts)
- **Description:** Type-safe implementation with interfaces
- **Best for:** TypeScript projects, large codebases

### 3. cURL (Bash)
- **File:** [curl-examples.sh](curl-examples.sh)
- **Description:** Shell script with all API endpoints
- **Best for:** Testing, debugging, quick prototyping

---

## 🚀 Quick Start

### JavaScript/TypeScript:

```bash
# Install dependencies
npm install firebase

# Set environment variables
export FIREBASE_API_KEY="your-api-key"
export FIREBASE_CUSTOM_TOKEN="your-custom-token"

# Run example
node javascript-example.js
# or
ts-node typescript-example.ts
```

### cURL:

```bash
# Make executable
chmod +x curl-examples.sh

# Set your ID token
export ID_TOKEN="your-id-token"

# Run examples
./curl-examples.sh
```

---

## 📝 What Each Example Demonstrates

All examples show:
1. Firebase authentication
2. Getting ID token
3. Making authenticated API requests
4. Error handling
5. Working with different endpoints:
   - Salary periods
   - Activities
   - Employees
   - Error lists

---

## 💡 Tips

- **Never commit tokens** - Use environment variables
- **Handle token expiration** - Implement refresh logic
- **Error handling** - Always wrap API calls in try-catch
- **Rate limiting** - Respect 100 req/min limit

---

**Need help?** Contact: carl.gerhardsson@cgi.com
