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
│   │   │   ├── 📂 generate/         # (Planned: POST endpoint to trigger Kestra flow)
│   │   │   │   └── route.ts
│   │   │   ├── 📂 deploy/           # (Planned: Deployment endpoints)
│   │   │   ├── 📂 feedback/         # (Planned: Submit RLHF feedback)
│   │   │   │   └── route.ts
│   │   │   ├── 📂 pr/               # (Planned: PR management)
│   │   │   ├── 📂 preview/          # (Planned: Preview endpoints)
│   │   │   └── 📂 webhooks/         # (Coming Soon: Listen for Git Action success)
│   │   │       └── route.ts
│   │   ├── 📂 (root)/
│   │   │   └── 📂 dashboard/        # The Main Demo App
│   │   │       └── page.tsx         # ✅ "Mission Control" UI
│   │   ├── layout.tsx               # ✅
│   │   ├── page.tsx                 # ✅ Landing Page
│   │   └── globals.css              # ✅
│   │
│   ├── 📂 components/
│   │   ├── architect-form.tsx       # ✅
│   │   ├── footer.tsx               # ✅
│   │   ├── navbar.tsx               # ✅
│   │   ├── 📂 ui/                   # ✅ shadcn/ui components
│   │   │   ├── alert.tsx
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── textarea.tsx
│   │   ├── 📂 landing/              # (Planned: Landing page components)
│   │   │   ├── Hero.tsx
│   │   │   ├── MagicInput.tsx
│   │   │   └── BentoGrid.tsx
│   │   └── 📂 dashboard/            # (Planned: Dashboard components)
│   │       ├── ArchitectureView.tsx
│   │       ├── CostCard.tsx
│   │       └── Terminal.tsx
│   │
│   ├── 📂 lib/                      # Shared Logic
│   │   ├── utils.ts                 # ✅
│   │   ├── 📂 integrations/         # (Planned: API integrations)
│   │   │   ├── kestra.ts
│   │   │   ├── oumi.ts
│   │   │   └── github.ts
│   │   └── 📂 utils/                # (Planned: Utility modules)
│   │       └── pricing.ts
│
├── 📂 kestra/
│   ├── docker-compose.yml           # ✅
│   └── 📂 flows/                    # (Planned: Kestra workflow definitions)
│       ├── stackframe-architect.yaml
│       └── governance.yaml
│
├── 📂 oumi/
│   ├── main.py                      # ✅
│   ├── Dockerfile                   # ✅
│   ├── requirements.txt             # ✅
│   └── 📂 data/                     # (Planned: Training data)
│       └── terraform-instruct.jsonl
│
├── 📂 terraform/                    # (Planned: Infrastructure as Code)
│   ├── main.tf
│   └── backend.tf
│
├── .coderabbit.yaml                 # (Planned: CodeRabbit config)
├── .env.local                       # (Gitignored)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
