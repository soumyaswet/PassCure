# Architecture & System Design

## System Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        MetaMask["🦊 MetaMask Extension"]
        ReactApp["⚛️ React Application"]
        TailwindCSS["🎨 Tailwind CSS"]
    end
    
    subgraph API["API Layer"]
        Express["🚀 Express Server"]
        AuthRoute["🔐 Auth Routes"]
        PasswordRoute["🔑 Password Routes"]
        Middleware["🛡️ Middleware"]
    end
    
    subgraph Logic["Business Logic"]
        AuthController["User Auth"]
        PasswordController["Password Management"]
        EncryptionService["Encryption Service"]
    end
    
    subgraph Storage["Data Storage"]
        MongoDB["📊 MongoDB"]
        Blockchain["⛓️ Ethereum Blockchain"]
        LocalStorage["💾 Browser Storage"]
    end
    
    MetaMask -->|Web3 Calls| Blockchain
    ReactApp -->|HTTP Requests| Express
    ReactApp -->|UI Styling| TailwindCSS
    ReactApp -->|User Session| LocalStorage
    
    Express -->|Routes| AuthRoute
    Express -->|Routes| PasswordRoute
    AuthRoute -->|Middleware| Middleware
    PasswordRoute -->|Middleware| Middleware
    
    Middleware -->|Business Logic| AuthController
    Middleware -->|Business Logic| PasswordController
    
    AuthController -->|User Data| MongoDB
    PasswordController -->|Password Data| MongoDB
    PasswordController -->|Encryption| EncryptionService
    EncryptionService -->|Hash Storage| Blockchain
    
    style Client fill:#e1f5ff
    style API fill:#f3e5f5
    style Logic fill:#e8f5e9
    style Storage fill:#fff3e0
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Browser as Browser/React
    participant API as Backend API
    participant DB as MongoDB
    participant BC as Blockchain
    
    User->>Browser: Enter Email & Password
    Browser->>API: POST /api/auth/login
    API->>DB: Query User
    DB-->>API: User Found
    API->>API: Verify Password Hash
    API->>API: Generate JWT Token
    API-->>Browser: Return Token
    Browser->>Browser: Store Token (localStorage)
    Browser-->>User: Redirect to Dashboard
    
    User->>Browser: Save New Password
    Browser->>API: POST /api/passwords
    API->>API: Validate Request (JWT)
    API->>API: Encrypt Password
    API->>DB: Store Encrypted Password
    DB-->>API: Confirmation
    API->>BC: Store Password Hash
    BC-->>API: Transaction Hash
    API-->>Browser: Success Response
    Browser-->>User: Password Saved
```

## Component Architecture

```mermaid
graph LR
    App["App.jsx"]
    
    App -->|Route: /login| LoginPage["LoginPage.jsx"]
    App -->|Route: /register| RegisterPage["RegisterPage.jsx"]
    App -->|Route: /dashboard| Dashboard["Dashboard.jsx"]
    
    Dashboard --> Navigation["Navigation.jsx"]
    Dashboard --> Tabs["Tabs Interface"]
    
    Tabs -->|Passwords Tab| PasswordList["PasswordList.jsx"]
    Tabs -->|Websites Tab| WebsiteTracker["WebsiteTracker.jsx"]
    Tabs -->|Strength Tab| PasswordStrength["PasswordStrength.jsx"]
    
    PasswordList --> AddForm["Password Form"]
    PasswordList --> PasswordCards["Password Cards"]
    
    WebsiteTracker --> WebsiteCards["Website Cards"]
    WebsiteTracker --> Statistics["Statistics"]
    
    PasswordStrength --> StrengthAnalysis["Strength Analysis"]
    PasswordStrength --> DistributionChart["Distribution Chart"]
    
    style App fill:#bbdefb
    style LoginPage fill:#c8e6c9
    style Dashboard fill:#fff9c4
    style Navigation fill:#ffe0b2
    style Tabs fill:#f8bbd0
```

## Database Schema

```mermaid
erDiagram
    USER ||--o{ PASSWORD : stores
    USER ||--o{ SESSION : has
    
    USER {
        ObjectId _id
        String name
        String email
        String password
        String walletAddress
        DateTime createdAt
        DateTime lastLogin
    }
    
    PASSWORD {
        ObjectId _id
        ObjectId userId
        String website
        String username
        String password
        String encryptedPassword
        String blockchainHash
        DateTime createdAt
        DateTime updatedAt
    }
    
    SESSION {
        ObjectId _id
        ObjectId userId
        String token
        DateTime expiresAt
        DateTime createdAt
    }
```

## Smart Contract Flow

```mermaid
graph TD
    User["User Wallet"]
    RegisterFunc["registerUser()"]
    StoreFunc["storePassword()"]
    VerifyFunc["passwordExists()"]
    RemoveFunc["removePassword()"]
    
    User -->|Connect Wallet| RegisterFunc
    RegisterFunc -->|Create User Entry| Contract["PasswordManager Contract"]
    User -->|Save Password| StoreFunc
    StoreFunc -->|Hash Password| Contract
    Contract -->|Store Hash| UserMapping["User Password Mapping"]
    
    User -->|Verify Password| VerifyFunc
    VerifyFunc -->|Check Mapping| UserMapping
    UserMapping -->|Return Status| User
    
    User -->|Delete Password| RemoveFunc
    RemoveFunc -->|Mark Inactive| UserMapping
```

## API Authentication Flow

```mermaid
sequenceDiagram
    Client->>API: POST /api/auth/login
    API->>Database: Find User by Email
    Database-->>API: User Document
    API->>API: Verify Password (bcrypt)
    API->>API: Generate JWT Token
    API-->>Client: Return Token & User Data
    
    Client->>Client: Store Token (localStorage)
    Client->>API: GET /api/passwords
    Client->>API: Add "Authorization: Bearer TOKEN"
    API->>API: Verify JWT Token
    API->>API: Extract userId from Token
    API->>Database: Query Passwords for User
    Database-->>API: User Passwords
    API-->>Client: Return Passwords
```

## Security Architecture

```mermaid
graph TB
    subgraph FrontEnd["Frontend Security"]
        HTTPS["HTTPS Connection"]
        JWT["JWT Token Storage"]
        CORS["CORS Policy"]
    end
    
    subgraph BackEnd["Backend Security"]
        Helmet["Helmet.js Headers"]
        ValidMW["Input Validation"]
        AuthMW["Authentication Middleware"]
        RateLimit["Rate Limiting"]
    end
    
    subgraph Database["Data Security"]
        HashPass["Password Hashing bcryptjs"]
        Encrypt["Field Encryption"]
        MongoDB["Secure MongoDB"]
    end
    
    subgraph Blockchain["Blockchain Security"]
        SmartContract["Smart Contract Auditing"]
        Immutable["Immutable Records"]
        Web3Auth["Web3 Authentication"]
    end
    
    HTTPS -->|Encrypted Transport| Helmet
    JWT -->|Token Validation| AuthMW
    CORS -->|Request Filtering| ValidMW
    AuthMW -->|User Verification| HashPass
    ValidMW -->|Sanitized Input| Encrypt
    Encrypt -->|Secure Storage| MongoDB
    Web3Auth -->|Blockchain Verification| SmartContract
    SmartContract -->|Verified Hashes| Immutable
```

## Deployment Architecture

```mermaid
graph LR
    subgraph Local["Local Development"]
        LocalFront["React Dev Server<br/>:5173"]
        LocalBack["Express Server<br/>:5000"]
        LocalMongo["MongoDB Local<br/>:27017"]
    end
    
    subgraph Production["Production"]
        Vercel["Vercel<br/>Frontend Hosting"]
        Railway["Railway<br/>Backend Hosting"]
        Atlas["MongoDB Atlas<br/>Cloud Database"]
        Ethereum["Ethereum Network<br/>Mainnet/Testnet"]
    end
    
    LocalFront -->|npm run build| Vercel
    LocalBack -->|git push| Railway
    LocalMongo -->|migrate data| Atlas
    Railway -->|Deploy Contract| Ethereum
    
    style LocalFront fill:#c8e6c9
    style LocalBack fill:#c8e6c9
    style LocalMongo fill:#c8e6c9
    style Vercel fill:#bbdefb
    style Railway fill:#bbdefb
    style Atlas fill:#bbdefb
    style Ethereum fill:#f8bbd0
```

## Password Strength Algorithm

```mermaid
graph TD
    Input["Password Input"]
    Length["Length Check<br/>8/12/16 chars"]
    Lower["Has Lowercase<br/>a-z"]
    Upper["Has Uppercase<br/>A-Z"]
    Digits["Has Digits<br/>0-9"]
    Special["Has Special Chars<br/>!@#$%^&*"]
    
    Input --> Length
    Input --> Lower
    Input --> Upper
    Input --> Digits
    Input --> Special
    
    Length -->|Score| Calculate["Calculate Score"]
    Lower -->|Score| Calculate
    Upper -->|Score| Calculate
    Digits -->|Score| Calculate
    Special -->|Score +2| Calculate
    
    Calculate -->|0-2| Weak["🔴 Weak"]
    Calculate -->|3-4| Fair["🟡 Fair"]
    Calculate -->|5-6| Strong["🟢 Strong"]
    Calculate -->|7-8| VeryStrong["🟢 Very Strong"]
```

## File Upload & Encryption Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Encryption
    participant Backend
    participant Blockchain
    
    User->>Frontend: Enter Password
    Frontend->>Encryption: Encrypt Password
    Encryption->>Encryption: Generate Hash
    Encryption-->>Frontend: Encrypted Data + Hash
    Frontend->>Backend: Send Encrypted Password
    Backend->>Backend: Store in MongoDB
    Backend->>Blockchain: Store Hash Only
    Blockchain-->>Backend: Transaction Confirmation
    Backend-->>Frontend: Success
    Frontend-->>User: Password Saved ✓
```

---

## Key Architectural Decisions

### 1. **Frontend Architecture**
- **React** for component-based UI
- **Vite** for fast development builds
- **Tailwind CSS** for utility-first styling
- **React Router** for SPA navigation

### 2. **Backend Architecture**
- **Express** for lightweight REST API
- **MongoDB** for flexible schema
- **JWT** for stateless authentication
- **Middleware** for cross-cutting concerns

### 3. **Security Architecture**
- **Encryption** on both client and server
- **Hashing** for password storage
- **HTTPS** for secure communication
- **Blockchain** for immutable records

### 4. **Scalability Considerations**
- Stateless API design
- Database indexing on userId
- Caching layer ready (Redis)
- Microservice-ready structure

---

For more details, see [README.md](README.md) and [SETUP_GUIDE.md](SETUP_GUIDE.md)
