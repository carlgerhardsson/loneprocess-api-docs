# Löneprocess Digital Checklista API - Documentation

**Welcome to the Löneprocess API staging environment!**

This is the public documentation for external teams integrating with the Löneprocess Digital Checklista API.

---

## 🚀 Quick Start

### 1. Get Your Access Token

Contact your API administrator to receive your Firebase custom token:
- **Email:** carl.gerhardsson@cgi.com
- **Response time:** Within 24 hours

### 2. Set Up Authentication

```javascript
// Exchange custom token for ID token
import { signInWithCustomToken } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const customToken = 'YOUR_CUSTOM_TOKEN_HERE';

const userCredential = await signInWithCustomToken(auth, customToken);
const idToken = await userCredential.user.getIdToken();

// Use ID token in API requests
fetch('http://localhost:8000/api/v1/loneperiods', {
  headers: {
    'Authorization': `Bearer ${idToken}`
  }
});
```

### 3. Test Your Connection

```bash
curl -H "Authorization: Bearer YOUR_ID_TOKEN" \
     http://localhost:8000/api/v1/loneperiods
```

---

## 📚 Documentation

- **[Integration Guide](INTEGRATION_GUIDE.md)** - Complete integration walkthrough
- **[Firebase Setup](FIREBASE_SETUP.md)** - Authentication setup
- **[Test Data](TEST_DATA.md)** - Available test data
- **[Code Examples](examples/)** - JavaScript, TypeScript, cURL examples

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:8000` (staging)

**Swagger Documentation:** http://localhost:8000/docs

### Main Endpoints:

- `GET /api/v1/loneperiods` - List salary periods
- `GET /api/v1/activities` - List activities
- `GET /api/v1/la/employees` - List employees
- `GET /api/v1/la/fellistor/{period_id}` - Get error list

---

## 🔒 Security

- ✅ **Read-only access** - External teams cannot modify data
- ✅ **Test data only** - No production or sensitive data
- ✅ **Token-based auth** - Firebase Authentication
- ✅ **Rate limited** - 100 requests/minute
- ✅ **HTTPS enforced** - All traffic encrypted

---

## 💬 Support

**Need help?**

- **Email:** carl.gerhardsson@cgi.com
- **Response time:** Within 24 hours
- **Issues:** [Report here](https://github.com/carlgerhardsson/loneprocess-api-docs/issues)

---

## 📋 Available Test Data

- **100 employees** with Swedish names and org codes
- **12 salary periods** (Jan-Dec 2025)
- **50 activities** with different processes
- **120 errors** in error lists (various severities)
- **240 assignments** (activities linked to periods)

**See:** [TEST_DATA.md](TEST_DATA.md) for details

---

## 🔄 API Status

**Current Version:** 3.0.0-staging

**Status:** ✅ Active

**Last Updated:** 2026-03-10

---

**Happy coding! 🚀**