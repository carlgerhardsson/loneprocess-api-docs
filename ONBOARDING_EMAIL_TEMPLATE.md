# Onboarding Email Template

**Use this template when sending access credentials to Frontend Team X**

---

```
Subject: 🔥 Löneprocess API Staging Access - Welcome!

Hi [Team Name],

Welcome to the Löneprocess API staging environment!

🔑 YOUR ACCESS TOKEN:
[INSERT CUSTOM TOKEN FROM generate_team_token.py]

📚 DOCUMENTATION:
https://github.com/carlgerhardsson/loneprocess-api-docs

🌐 API BASE URL:
http://localhost:8000 (staging - local development)

🛠️ QUICK START:

1. Install Firebase SDK:
   npm install firebase

2. Initialize and authenticate:
   import { initializeApp } from 'firebase/app';
   import { getAuth, signInWithCustomToken } from 'firebase/auth';
   
   const auth = getAuth(initializeApp({
     apiKey: "[SEND SEPARATELY]",
     authDomain: "loneprocess-api-staging.firebaseapp.com",
     projectId: "loneprocess-api-staging"
   }));
   
   await signInWithCustomToken(auth, YOUR_CUSTOM_TOKEN);

3. Make API calls:
   const idToken = await auth.currentUser.getIdToken();
   
   fetch('http://localhost:8000/api/v1/loneperiods', {
     headers: { 'Authorization': `Bearer ${idToken}` }
   });

4. Check Swagger docs:
   http://localhost:8000/docs

⚠️ IMPORTANT:
- Custom token exchange required (see docs)
- ID tokens expire after 1 hour (auto-refresh available)
- Read-only access enforced
- Test data only - no production data
- Rate limit: 100 requests/minute

📋 AVAILABLE TEST DATA:
- 100 employees with Swedish names
- 12 salary periods (Jan-Dec 2025)
- 50 activities across all processes
- 120 error records

See TEST_DATA.md for details:
https://github.com/carlgerhardsson/loneprocess-api-docs/blob/main/TEST_DATA.md

📡 CODE EXAMPLES:
- JavaScript: https://github.com/carlgerhardsson/loneprocess-api-docs/blob/main/examples/javascript-example.js
- TypeScript: https://github.com/carlgerhardsson/loneprocess-api-docs/blob/main/examples/typescript-example.ts
- cURL: https://github.com/carlgerhardsson/loneprocess-api-docs/blob/main/examples/curl-examples.sh

📞 SUPPORT:
Email: carl.gerhardsson@cgi.com
Response time: Within 24 hours
Issues: https://github.com/carlgerhardsson/loneprocess-api-docs/issues

🔒 SECURITY:
- Store tokens securely (never commit to Git)
- Use environment variables
- Tokens are team-specific - don't share
- Report any security concerns immediately

Happy coding! 🚀

Best regards,
Carl Gerhardsson
Löneprocess API Team

---

P.S. Complete integration guide:
https://github.com/carlgerhardsson/loneprocess-api-docs/blob/main/INTEGRATION_GUIDE.md
```

---

## Checklist Before Sending:

- [ ] Custom token generated via `generate_team_token.py`
- [ ] Token copied to email
- [ ] Firebase API key sent separately (secure channel)
- [ ] Documentation links verified
- [ ] Support email correct
- [ ] Budget alert set to $0
- [ ] Firestore rules deployed
