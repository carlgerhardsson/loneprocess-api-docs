# Firebase Setup Guide

How to set up Firebase authentication for the Löneprocess API.

---

## 📦 Installation

### JavaScript/TypeScript

```bash
npm install firebase
```

### Python (Server-side)

```bash
pip install firebase-admin
```

---

## 🔧 Configuration

### Firebase Config

You'll receive these from your API administrator:

```javascript
const firebaseConfig = {
  apiKey: "Contact admin for API key",
  authDomain: "loneprocess-api-staging.firebaseapp.com",
  projectId: "loneprocess-api-staging",
  storageBucket: "loneprocess-api-staging.appspot.com"
};
```

---

## 🔑 Custom Token Authentication

### JavaScript Example

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Your custom token from API admin
const customToken = 'YOUR_CUSTOM_TOKEN_HERE';

async function authenticate() {
  try {
    const userCredential = await signInWithCustomToken(auth, customToken);
    const idToken = await userCredential.user.getIdToken();
    
    console.log('✅ ID Token:', idToken);
    return idToken;
  } catch (error) {
    console.error('❌ Error:', error.code, error.message);
  }
}
```

---

## 🔄 Token Lifecycle

### Token Flow

```
1. Admin generates custom token → [Custom Token]
2. Client exchanges custom token → [ID Token] (expires in 1h)
3. Client uses ID token in API calls → [API Access]
4. Token expires → [Refresh Token]
5. Get new ID token → [API Access]
```

### Auto-Refresh

```javascript
auth.onIdTokenChanged(async (user) => {
  if (user) {
    const idToken = await user.getIdToken();
    console.log('🔄 Token refreshed:', idToken);
    // Update your API client
  } else {
    console.log('❌ User signed out');
  }
});
```

---

## 🛡️ Security Best Practices

### ✅ DO:
- Store custom tokens securely (environment variables)
- Implement token refresh logic
- Use HTTPS only
- Handle token expiration gracefully
- Log authentication errors

### ❌ DON'T:
- Commit tokens to Git
- Share tokens between teams
- Use tokens in client-side code publicly
- Ignore token expiration

---

## ⚡ Quick Test

```bash
# Test with curl (after getting ID token)
curl -H "Authorization: Bearer YOUR_ID_TOKEN" \
     http://localhost:8000/api/v1/loneperiods
```

---

## 🐛 Troubleshooting

### Error: "INVALID_CUSTOM_TOKEN"
**Solution:** Token expired or malformed. Request new token from admin.

### Error: "TOKEN_EXPIRED"
**Solution:** ID token expired (1h lifetime). Use refresh token or re-authenticate.

### Error: "PERMISSION_DENIED"
**Solution:** Token lacks required claims. Verify `team: 'frontend-team-x'` claim.

---

## 📞 Support

If you encounter authentication issues:

1. Check token is not expired
2. Verify Firebase config is correct
3. Contact: carl.gerhardsson@cgi.com

---

**Next:** [Integration Guide →](INTEGRATION_GUIDE.md)