# Testing Guide

## 🧪 Unit Testing

### Frontend Testing

#### Installation
```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

#### Example Test File: `src/components/__tests__/PasswordStrength.test.jsx`
```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordStrength from '../PasswordStrength';

describe('PasswordStrength Component', () => {
  it('renders without crashing', () => {
    const passwords = [
      { id: 1, website: 'Gmail', username: 'user@gmail.com', password: 'Weak123!' }
    ];
    render(<PasswordStrength passwords={passwords} />);
    expect(screen.getByText(/Password Breakdown/i)).toBeInTheDocument();
  });

  it('calculates strength correctly', () => {
    const passwords = [
      { id: 1, website: 'Gmail', username: 'user@gmail.com', password: 'VeryStr0ng!@#' }
    ];
    render(<PasswordStrength passwords={passwords} />);
    expect(screen.getByText(/Very Strong/i)).toBeInTheDocument();
  });
});
```

#### Run Tests
```bash
npm run test
```

### Backend Testing

#### Installation
```bash
cd backend
npm install --save-dev jest supertest
```

#### Example Test File: `__tests__/auth.test.js`
```javascript
const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPassword123!'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
```

#### Run Tests
```bash
npm test
```

---

## 🧬 Smart Contract Testing

### Installation
```bash
cd smart-contracts
npm install
```

### Run Tests
```bash
npx hardhat test
```

### Test Output Example
```
  PasswordManager
    User Registration
      ✓ Should register a new user
      ✓ Should not allow duplicate registration
    Password Management
      ✓ Should store a password
      ✓ Should remove a password
      ✓ Should retrieve user passwords

  5 passing (1.2s)
```

---

## 🔄 Integration Testing

### Test the Complete Flow

#### Manual Testing Checklist

**1. Registration & Login**
- [ ] Navigate to `/register`
- [ ] Fill in form with valid data
- [ ] Click "Create Account"
- [ ] Verify redirect to dashboard
- [ ] Logout
- [ ] Login with same credentials
- [ ] Verify token in localStorage

**2. Password Management**
- [ ] Add password: Gmail, user@gmail.com, Test123!@#
- [ ] Verify password appears in list
- [ ] Click eye icon - verify password visible
- [ ] Click copy - verify copied to clipboard
- [ ] Delete password - verify confirmation dialog
- [ ] Confirm deletion - verify removed from list
- [ ] Add multiple passwords

**3. Website Tracker**
- [ ] Click "Websites & Apps" tab
- [ ] Verify all websites displayed as cards
- [ ] Check password count per website
- [ ] Verify portfolio statistics
- [ ] Verify usernames listed under each website

**4. Password Strength**
- [ ] Click "Password Strength" tab
- [ ] Verify strength distribution shown
- [ ] Verify individual password analysis
- [ ] Check recommendations displayed
- [ ] Verify color coding (weak/fair/strong/very strong)

**5. Performance**
- [ ] Add 10+ passwords
- [ ] Verify load time < 2 seconds
- [ ] Navigate between tabs
- [ ] Verify smooth transitions
- [ ] Check browser console for errors

**6. Security**
- [ ] Logout and try accessing `/dashboard` directly
- [ ] Verify redirect to `/login`
- [ ] Try invalid login
- [ ] Verify error message
- [ ] Check password fields are masked
- [ ] Verify token expires after 7 days

---

## 🐛 API Testing with Postman

### Setup Postman Collection

#### 1. Create Environment
1. Click "Environments"
2. Create new environment
3. Add variables:
   ```
   base_url: http://localhost:5000
   token: (auto-populated after login)
   ```

#### 2. Test Register Endpoint
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPassword123!"
}

Expected: 201 Created
Response: { token, user }
```

#### 3. Test Login Endpoint
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPassword123!"
}

Expected: 200 OK
Response: { token, user }
Note: Copy token value
```

#### 4. Test Get Passwords
```
GET /api/passwords
Authorization: Bearer {{token}}

Expected: 200 OK
Response: [ { id, website, username, password }, ... ]
```

#### 5. Test Add Password
```
POST /api/passwords
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "website": "Gmail",
  "username": "user@gmail.com",
  "password": "Test123!@#"
}

Expected: 201 Created
Response: { id, website, username, password, ... }
```

#### 6. Test Delete Password
```
DELETE /api/passwords/{{password_id}}
Authorization: Bearer {{token}}

Expected: 200 OK
Response: { message: "Password deleted" }
```

---

## 📊 Performance Testing

### Frontend Performance

#### Lighthouse Audit
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Check scores:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

#### Bundle Size
```bash
cd frontend
npm run build

# Check dist/ folder size
# Target: < 500KB gzipped
```

### Backend Performance

#### Load Testing with Artillery
```bash
npm install -g artillery

# Create load-test.yml
targets:
  http://localhost:5000
scenarios:
  - name: 'Login test'
    flow:
      - post:
          url: '/api/auth/login'
          json:
            email: 'test@example.com'
            password: 'Test123!@#'

# Run test
artillery run load-test.yml
```

Expected:
- Response time: < 100ms
- Throughput: > 100 req/s
- Error rate: < 1%

---

## 🔐 Security Testing

### OWASP Top 10 Checks

**1. Injection**
- [ ] Test SQL injection in login form
- [ ] Verify no errors leak database info

**2. Authentication**
- [ ] Test missing JWT token
- [ ] Test invalid JWT token
- [ ] Test expired token

**3. Sensitive Data Exposure**
- [ ] Check network traffic is encrypted
- [ ] Verify no passwords in logs

**4. XML External Entities (XXE)**
- [ ] Not applicable (JSON API)

**5. Broken Access Control**
- [ ] Try accessing other user's passwords
- [ ] Verify 403 Forbidden returned

**6. Security Misconfiguration**
- [ ] Check error messages aren't too verbose
- [ ] Verify security headers present

**7. XSS (Cross-Site Scripting)**
- [ ] Try `<script>alert('xss')</script>` in forms
- [ ] Verify properly escaped

**8. Insecure Deserialization**
- [ ] Not applicable

**9. Using Components with Known Vulnerabilities**
- [ ] Run `npm audit`
- [ ] Fix any vulnerabilities

**10. Insufficient Logging**
- [ ] Verify failed logins are logged
- [ ] Check audit trail available

---

## 🚀 Deployment Testing

### Before Production

#### Staging Environment Checklist
- [ ] Run all tests
- [ ] Check for console errors
- [ ] Test all features
- [ ] Verify performance
- [ ] Check security headers
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify environment variables set
- [ ] Test backup/restore process
- [ ] Verify logging working

#### Health Check Script
```bash
#!/bin/bash
# health-check.sh

echo "Checking frontend..."
curl -s http://localhost:5173 | grep -q "SecureVault" && echo "✓ Frontend OK" || echo "✗ Frontend failed"

echo "Checking backend..."
curl -s http://localhost:5000/health | grep -q "running" && echo "✓ Backend OK" || echo "✗ Backend failed"

echo "Checking database..."
# Add MongoDB check

echo "Checking blockchain..."
# Add contract check
```

---

## 📈 Monitoring & Alerts

### Setup Application Monitoring

#### Error Tracking (Sentry)
```javascript
// In frontend main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://YOUR_DSN@sentry.io/PROJECT_ID",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

#### Performance Monitoring (DataDog)
```javascript
// In frontend
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: 'YOUR_APP_ID',
  clientToken: 'YOUR_TOKEN',
  site: 'datadoghq.com',
  service: 'password-manager',
  env: 'production',
});

datadogRum.startSessionReplayRecording();
```

---

## 🧑‍💻 Continuous Integration Setup

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:5.0
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm run install-all
      
      - name: Run frontend tests
        run: npm test --prefix frontend
      
      - name: Run backend tests
        run: npm test --prefix backend
      
      - name: Run contract tests
        run: npm test --prefix smart-contracts
      
      - name: Build
        run: |
          npm run build --prefix frontend
          npm run compile --prefix smart-contracts
```

---

## ✅ Test Completion Checklist

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Security tests completed
- [ ] Performance benchmarks met
- [ ] No console errors
- [ ] No vulnerabilities (npm audit)
- [ ] Code coverage > 80%
- [ ] All features work as expected
- [ ] Database tests passed
- [ ] Contract tests passed
- [ ] Documentation complete
- [ ] Ready for deployment

---

**Happy testing! 🧪**
