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

> ⚠️ Research & Advocacy Initiative  
> H2Chain is a student-led project demonstrating blockchain technology for green hydrogen market trust. Not a live trading platform.

---

## 🎯 What is H2Chain?

H2Chain makes green hydrogen credits verifiable, traceable, and fraud-resistant. We certify renewable production, issue credits, enable peer-to-peer transfers, and retire used credits to prevent double counting — all on an immutable ledger with auditable history.

Key Benefits:
- 🔐 Transparency: End-to-end, tamper-proof lifecycle of each credit
- 💼 Market Confidence: Cryptographic proof prevents fraud
- ⚖️ Policy Alignment: Supports net-zero reporting & compliance
- 💰 Investment-Ready: Credibility that attracts climate capital

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Firebase project
- Web3 wallet (MetaMask)

### Installation

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

### Environment Variables

# .env
MONGODB_URI
FIREBASE_CONFIG={"apiKey": "...", "authDomain": "..."}
ETHEREUM_RPC_URL=
PRIVATE_KEY=0x...
GROQ_API_KEY=gsk_...

---

## 🔄 How It Works

### Credit Lifecycle

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

1. Verify: Auditor validates renewable source & production batch
2. Issue: Smart contract mints credits (1 credit ≈ 1 kg H₂)
3. Trade: Holder transfers credits P2P (escrowed by contract)
4. Retire: Consumer permanently burns credits on use
5. Audit: Complete provenance tracking on-chain

---

## 🏗 Architecture

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

---

## 💻 Tech Stack
