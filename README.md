# 🌱 H2Chain — Blockchain-based Green Hydrogen Credit System

<p align="center">
  <img src="docs/banner.png" alt="H2Chain – Blockchain-based Green Hydrogen Credit System" width="100%" />
</p>

<p align="center">
  <strong>Revolutionizing green hydrogen certification through blockchain transparency and verifiable credits</strong>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Category-ClimateTech-2ea44f?style=for-the-badge" alt="ClimateTech"></a>
  <a href="#"><img src="https://img.shields.io/badge/Blockchain-DLT-blue?style=for-the-badge" alt="DLT"></a>
  <a href="#"><img src="https://img.shields.io/badge/Smart%20Contracts-Solidity-363636?style=for-the-badge" alt="Solidity"></a>
  <a href="#"><img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/Backend-Node%2FExpress-339933?style=for-the-badge" alt="Node"></a>
  <a href="#"><img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge" alt="MongoDB"></a>
  <a href="#"><img src="https://img.shields.io/badge/Auth-Firebase-orange?style=for-the-badge" alt="Firebase"></a>
  <a href="#"><img src="https://img.shields.io/badge/AI-Groq-6B4FD3?style=for-the-badge" alt="Groq"></a>
</p>

---

> ⚠️ **Research & Advocacy Initiative**  
> H2Chain is a student-led project demonstrating blockchain technology for green hydrogen market trust. Not a live trading platform.

---

## 🎯 What is H2Chain?

H2Chain makes green hydrogen credits **verifiable, traceable, and fraud-resistant**. We certify renewable production, issue credits, enable peer-to-peer transfers, and retire used credits to prevent double counting — all on an **immutable ledger** with **auditable** history.

**Key Benefits:**
- 🔐 **Transparency:** End-to-end, tamper-proof lifecycle of each credit
- 💼 **Market Confidence:** Cryptographic proof prevents fraud
- ⚖️ **Policy Alignment:** Supports net-zero reporting & compliance
- 💰 **Investment-Ready:** Credibility that attracts climate capital

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Firebase project
- Web3 wallet (MetaMask)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/h2chain.git
cd h2chain

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Start development
npm run dev
```

### Environment Variables

```bash
# .env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/h2chain
FIREBASE_CONFIG={"apiKey": "...", "authDomain": "..."}
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/PROJECT_ID
PRIVATE_KEY=0x...
GROQ_API_KEY=gsk_...
```

---

## 🔄 How It Works

### Credit Lifecycle

```mermaid
sequenceDiagram
    participant P as Producer
    participant A as Auditor
    participant SC as Smart Contract
    participant B as Buyer

    P->>A: Submit production evidence
    A->>SC: Attest batch (cryptographic signature)
    SC->>P: Mint credits (1 credit ≈ 1 kg H₂)
    P->>B: Transfer credits
    B->>SC: Retire credits on consumption
    Note over SC: Immutable audit trail
```

1. **Verify:** Auditor validates renewable source & production batch
2. **Issue:** Smart contract mints credits (1 credit ≈ 1 kg H₂)
3. **Trade:** Holder transfers credits P2P (escrowed by contract)
4. **Retire:** Consumer permanently burns credits on use
5. **Audit:** Complete provenance tracking on-chain

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend"
        UI[React Dashboard]
        WALLET[Web3 Integration]
    end
    
    subgraph "Backend"
        API[Express REST API]
        AUTH[Firebase Auth]
        AI[HydroAgent AI]
    end
    
    subgraph "Data"
        DB[(MongoDB)]
        STORAGE[Cloud Storage]
    end
    
    subgraph "Blockchain"
        SC[Smart Contracts]
        DLT[Ethereum/Polygon]
    end
    
    UI --> API
    WALLET --> SC
    API --> DB
    API --> AUTH
    API --> AI
    SC --> DLT
```

---

## 🖼️ Screenshots

### Landing Page
![Landing Page](docs/home.png)

### ChatBot Page
![Chat Bot](docs/chatbot.png)

### Dashboard
![Dashboard](docs/dashboard.png)

### Admin
![Admin](docs/admin.png)

---

## 💻 Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18 + TypeScript + Tailwind CSS |
| **Backend** | Node.js + Express + MongoDB |
| **Blockchain** | Solidity + Hardhat + OpenZeppelin |
| **Authentication** | Firebase Auth |
| **AI** | Groq LLM for batch analysis |

---

## ⛓️ Smart Contracts

### Core Contracts

```solidity
// HydrogenCreditRegistry.sol
contract HydrogenCreditRegistry is ERC721, AccessControl {
    struct Credit {
        uint256 batchId;
        uint256 quantity;
        bool retired;
        string retirementReason;
    }
    
    event CreditMinted(uint256 indexed tokenId, address indexed producer, uint256 quantity);
    event CreditRetired(uint256 indexed tokenId, string reason);
    
    function mintCredit(address producer, uint256 quantity, uint256 batchId) 
        external onlyAuditor returns (uint256);
    
    function retireCredit(uint256 tokenId, string memory reason) 
        external onlyOwner(tokenId);
}
```

---

## 📁 Project Structure

```
h2chain/
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/            # Route pages
│   │   ├── hooks/            # Custom hooks
│   │   └── utils/            # Helper functions
│   └── package.json
├── backend/                   # Express API
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── middleware/       # Express middleware
│   │   └── routes/           # API routes
│   └── package.json
├── contracts/                 # Smart contracts
│   ├── contracts/            # Solidity files
│   ├── scripts/              # Deployment scripts
│   └── test/                 # Contract tests
├── docs/                     # Documentation
└── docker-compose.yml        # Docker setup
```


---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

**Contribution Types:**
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation
- 🧪 Testing
- 🎨 UI/UX improvements

---

## 📈 Roadmap

### Current Phase: Foundation ✅
- [x] Core smart contracts
- [x] Basic UI/UX
- [x] Authentication system
- [x] Database integration

### Next Phase: Enhancement 🚧
- [ ] Credit marketplace
- [ ] Mobile application
- [ ] Advanced analytics
- [ ] Multi-chain support

### Future: Ecosystem 🔮
- [ ] Cross-chain bridges
- [ ] DeFi integrations
- [ ] Enterprise APIs
- [ ] Regulatory compliance tools

---

## 🛡️ Security

- **Smart Contract Audits:** OpenZeppelin security standards
- **Data Integrity:** SHA-256 hashing + digital signatures
- **Access Control:** Role-based permissions (RBAC)
- **Privacy:** DID-based identity management
- **Monitoring:** Real-time fraud detection

---


## 🙏 Credits

**Core Team:**
- [Harsh Gosaliya] - Project Lead & Blockchain Developer
- [Swayam Mamtora] - Full-stack Developer
- [Aman Panchal] - Smart Contract Auditor

**Special Thanks:**
- OpenZeppelin for security libraries
- Ethereum Foundation for development tools
- Climate tech community for guidance

---

<p align="center">
  <strong>Made with 💚 for a sustainable future</strong>
</p>

<p align="center">
  If you find H2Chain valuable, please ⭐ star this repository and share with the climate tech community!
</p>
