# 📁 Stackframe - Recommended Folder Structure

## Complete Project Structure

```
stackframe/
├── 📂 .github/
│   └── 📂 workflows/                # (Coming Next: GitHub Actions for Deployment)
│       └── terraform.yml            # The "Action" that deploys your infra
│
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 api/
│   │   │   ├── 📂 generate/         # POST: Trigger Kestra flow
│   │   │   │   └── route.ts         # ✅ Updated to call Kestra API
│   │   │   ├── 📂 webhooks/         # (Coming Soon: Listen for Git Action success)
│   │   │   │   └── route.ts
│   │   │   ├── 📂 feedback/         # (Optional: Submit RLHF feedback)
│   │   │   │   └── route.ts
│   │   ├── 📂 dashboard/            # The Main Demo App
│   │   │   └── page.tsx             # ✅ "Mission Control" UI
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # ✅ "Apple Style" Landing Page
│   │   └── globals.css
│   │
│   ├── 📂 components/
│   │   ├── 📂 landing/              # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── MagicInput.tsx
│   │   │   └── BentoGrid.tsx
│   │   ├── 📂 dashboard/            # Dashboard components
│   │   │   ├── ArchitectureView.tsx
│   │   │   ├── CostCard.tsx
│   │   │   └── Terminal.tsx
│   │
│   ├── 📂 lib/                      # Shared Logic
│   │   ├── 📂 integrations/
│   │   │   ├── kestra.ts
│   │   │   ├── oumi.ts
│   │   │   └── github.ts
│   │   └── 📂 utils/
│   │       └── pricing.ts
│
├── 📂 kestra/                       # ✅ The Brain (Orchestrator)
│   ├── docker-compose.yml           # ✅ Runs Kestra + Oumi together
│   ├── 📂 flows/                    # (Optional: Store local copies of flows)
│   │   ├── stackframe-architect.yaml # The Flow definition we pasted into UI
│   │   └── governance.yaml
│
├── 📂 oumi/                         # ✅ The Intelligence (AI Engine)
│   ├── main.py                      # ✅ FastAPI app (The "Mock" Oumi)
│   ├── Dockerfile                   # ✅ Python Docker config
│   ├── requirements.txt             # ✅ Dependencies
│   └── 📂 data/                     # (Optional: Training data for RLHF)
│       └── terraform-instruct.jsonl
│
├── 📂 terraform/                    # (Coming Next: The Output)
│   ├── main.tf                      # The file Oumi will eventually write to
│   └── backend.tf
│
├── .coderabbit.yaml                 # ✅ Security Auditor Config
├── .env.local                       # Environment variables
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Key Directories Explained
