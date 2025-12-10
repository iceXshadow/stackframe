# 📁 Stackframe - Recommended Folder Structure

## Complete Project Structure

```
stackframe/
├── 📂 .github/
│   └── 📂 workflows/                # NEW: Replaces Cline
│       └── terraform.yml            # The "Action" that deploys your infra
│
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 api/
│   │   │   ├── 📂 generate/         # POST: Trigger Kestra flow
│   │   │   │   └── route.ts
│   │   │   ├── 📂 webhooks/         # NEW: Listen for GitHub Action success/fail
│   │   │   │   └── route.ts
│   │   │   ├── 📂 feedback/         # POST: Submit RLHF feedback (Oumi)
│   │   │   │   └── route.ts
│   │   ├── 📂 dashboard/            # The Main Demo App (After Landing)
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # The "Apple Style" Landing Page
│   │   └── globals.css
│   │
│   ├── 📂 components/
│   │   ├── 📂 landing/              # NEW: Landing page specific components
│   │   │   ├── Hero.tsx             # "Infrastructure, realized."
│   │   │   ├── MagicInput.tsx       # The Spotlight search bar
│   │   │   └── BentoGrid.tsx        # Feature showcase
│   │   ├── 📂 dashboard/            # App components
│   │   │   ├── ArchitectureView.tsx
│   │   │   ├── CostCard.tsx
│   │   │   └── Terminal.tsx         # Fake terminal showing logs
│   │
│   ├── 📂 lib/
│   │   ├── 📂 integrations/
│   │   │   ├── kestra.ts            # Kestra API client
│   │   │   ├── oumi.ts              # Oumi model inference
│   │   │   └── github.ts            # GitHub API (create PRs)
│   │   └── 📂 utils/
│   │       └── pricing.ts
│
├── 📂 kestra/                       # Kestra Workflows (The Brain)
│   ├── 📂 flows/
│   │   ├── generate-infra.yaml      # 1. Receive text -> Call Oumi -> Commit to Git
│   │   └── governance.yaml          # 2. Check Budget -> Approve/Reject
│   └── docker-compose.yml           # Run Kestra locally
│
├── 📂 oumi/                         # Oumi Engine (The Architect)
│   ├── 📂 data/
│   │   └── terraform-instruct.jsonl # Training data
│   ├── inference.py                 # Python script to generate HCL
│   └── Dockerfile
│
├── 📂 terraform/                    # Terraform Templates
│   ├── main.tf                      # The file Oumi writes to
│   └── backend.tf
│
├── .coderabbit.yaml                 # Security Auditor Config
├── .env.local
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🎯 Key Directories Explained

### **src/app/api/** - API Routes

- Each folder represents an API endpoint
- Handles communication between frontend and backend services

### **src/components/** - React Components

- `features/` - Complex, feature-specific components
- `ui/` - Simple, reusable UI building blocks
- `layout/` - Page layout components

### **src/lib/integrations/** - Sponsor Integrations

- `kestra.ts` - For Wakanda Award ($4k)
- `oumi.ts` - For Iron Intelligence Award ($3k)
- `cline.ts` - For Infinity Build Award ($5k)
- `github.ts` - For Captain Code Award ($1k)

### **kestra/** - Workflow Orchestration

- YAML files defining Kestra flows
- AI Agent decision logic

### **oumi/** - ML Training

- Training scripts for RLHF
- Feedback dataset collection

### **cline/** - CLI Automation

- Task definitions for infrastructure operations
- Deployment scripts

### **terraform/** - IaC Templates

- Reusable modules for common infrastructure patterns
- Generated templates based on requirements

## 🚀 Quick Start

1. Create the folder structure manually
2. Start with the core files: `package.json`, `.env.example`, config files
3. Build API routes one by one
4. Create components as you need them
5. Set up integrations last

## 💡 Learning Path Recommendation

**Day 1:** Core structure + API routes
**Day 2:** Kestra flows + Oumi basics
**Day 3:** Cline tasks + Frontend components
**Day 4:** Integration + Polish

Good luck building! 🎉
