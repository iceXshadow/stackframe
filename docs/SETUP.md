# Stackframe - Setup & Testing Guide

Complete guide to run and test your application after security improvements.

## Prerequisites

- **Docker Desktop** (for running Kestra, PostgreSQL, Oumi Engine)
- **Node.js 18+** (for Next.js frontend)
- **Python 3.8+** (if running Oumi separately)
- **Git** (for version control)

## Quick Start

### 1. Setup Environment Variables

Create the `.env` file for Docker services:

```bash
# Navigate to kestra directory
cd kestra

# Copy example environment file
cp .env.example .env
```

**Edit `kestra/.env` with your secure credentials:**

```bash
# PostgreSQL Database
POSTGRES_USER=kestra
POSTGRES_PASSWORD=your_secure_db_password_123
POSTGRES_DB=kestra

# Kestra Authentication
KESTRA_BASIC_AUTH_USERNAME=admin@kestra.io
KESTRA_BASIC_AUTH_PASSWORD=your_secure_kestra_password_456

# Oumi Engine API Key
OUMI_API_KEY=your_secure_api_key_789
```

**Generate secure passwords:**

```powershell
# PowerShell - Generate random secure strings
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### 2. Start Backend Services (Docker)

```bash
# From the kestra directory
cd kestra

# Start all services (Kestra, PostgreSQL, Docker Proxy, Oumi Engine)
docker-compose up -d

# Check if all services are running
docker-compose ps

# View logs
docker-compose logs -f
```

**Expected services:**

- ✅ `docker-socket-proxy` - Docker API proxy (security layer)
- ✅ `postgres` - PostgreSQL database
- ✅ `kestra` - Workflow orchestration (http://localhost:8080)
- ✅ `oumi-engine` - AI infrastructure generator (http://localhost:8000)

**Verify services:**

```bash
# Check Kestra health (should redirect to login)
curl http://localhost:8080

# Check Oumi health (no auth required)
curl http://localhost:8000/health
```

### 3. Start Frontend (Next.js)

Open a **new terminal** in the project root:

```bash
# Navigate to project root
cd E:\Projects\hackathon-wemakedevs\stackframe

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Frontend will be available at:** http://localhost:3000

### 4. Access Applications

| Service              | URL                        | Credentials                                          |
| -------------------- | -------------------------- | ---------------------------------------------------- |
| **Next.js Frontend** | http://localhost:3000      | N/A                                                  |
| **Kestra UI**        | http://localhost:8080      | Username: `admin@kestra.io`<br>Password: From `.env` |
| **Oumi Engine API**  | http://localhost:8000      | API Key: From `.env` (X-API-Key header)              |
| **Oumi Docs**        | http://localhost:8000/docs | API Key required                                     |

---

## Testing Your Application

### Test 1: Oumi Engine API (Direct)

**Health Check (No auth):**

```powershell
curl http://localhost:8000/health
```

**Expected:**

```json
{ "status": "healthy", "service": "oumi-engine" }
```

**Generate Infrastructure (With auth):**

```powershell
# Replace YOUR_API_KEY with value from kestra/.env
$apiKey = "your_secure_api_key_789"

curl -X POST http://localhost:8000/generate `
  -H "Content-Type: application/json" `
  -H "X-API-Key: $apiKey" `
  -d '{
    \"projectName\": \"test-project\",
    \"requirements\": \"Need a simple web app with database\",
    \"budget\": 100,
    \"cloudProvider\": \"aws\"
  }'
```

**Expected success response:**

```json
{
  "hcl": "provider \"aws\" { ... }",
  "cost": 45,
  "status": "success",
  "message": "Infrastructure code generated successfully for test-project"
}
```

**Test authentication failure:**

```powershell
# Without API key - should return 401
curl -X POST http://localhost:8000/generate `
  -H "Content-Type: application/json" `
  -d '{\"projectName\":\"test\",\"requirements\":\"test\",\"budget\":100,\"cloudProvider\":\"aws\"}'
```

**Expected:**

```json
{
  "detail": {
    "error": "Unauthorized",
    "message": "Invalid API key. Please provide a valid X-API-Key header.",
    "status_code": 401
  }
}
```

### Test 2: Kestra Workflow UI

1. **Open browser:** http://localhost:8080
2. **Login with credentials from `.env`:**
   - Username: `admin@kestra.io`
   - Password: Your password from `.env`
3. **Verify dashboard loads**

### Test 3: Next.js Frontend

1. **Open browser:** http://localhost:3000
2. **Test the UI:**
   - Fill out the infrastructure form
   - Submit a request
   - Verify it calls the Oumi API
   - Check the generated Terraform code

### Test 4: Validate Input Errors

**Invalid project name (special characters):**

```powershell
$apiKey = "your_secure_api_key_789"

curl -X POST http://localhost:8000/generate `
  -H "Content-Type: application/json" `
  -H "X-API-Key: $apiKey" `
  -d '{
    \"projectName\": \"my@project!\",
    \"requirements\": \"test requirements here\",
    \"budget\": 100,
    \"cloudProvider\": \"aws\"
  }'
```

**Expected:**

```json
{
  "detail": {
    "error": "ValidationError",
    "message": "projectName must contain only alphanumeric characters, dashes, and underscores",
    "status_code": 400
  }
}
```

**Invalid cloud provider:**

```powershell
curl -X POST http://localhost:8000/generate `
  -H "Content-Type: application/json" `
  -H "X-API-Key: $apiKey" `
  -d '{
    \"projectName\": \"test\",
    \"requirements\": \"test requirements\",
    \"budget\": 100,
    \"cloudProvider\": \"digitalocean\"
  }'
```

**Budget too low:**

```powershell
curl -X POST http://localhost:8000/generate `
  -H "Content-Type: application/json" `
  -H "X-API-Key: $apiKey" `
  -d '{
    \"projectName\": \"test\",
    \"requirements\": \"test requirements\",
    \"budget\": 5,
    \"cloudProvider\": \"aws\"
  }'
```

---

## Troubleshooting

### Issue: Docker services won't start

**Check Docker is running:**

```powershell
docker ps
```

**Check .env file exists:**

```powershell
cd kestra
cat .env  # Linux/Mac
type .env  # Windows
```

**View service logs:**

```powershell
docker-compose logs postgres
docker-compose logs kestra
docker-compose logs oumi-engine
docker-compose logs docker-socket-proxy
```

**Restart services:**

```powershell
docker-compose down
docker-compose up -d
```

### Issue: Port already in use

```powershell
# Check what's using the port
netstat -ano | findstr :8080  # Kestra
netstat -ano | findstr :8000  # Oumi
netstat -ano | findstr :3000  # Next.js

# Kill the process or change the port in docker-compose.yml
```

### Issue: Cannot connect to Oumi from frontend

**Check Oumi is running:**

```powershell
curl http://localhost:8000/health
```

**Check API key in frontend code:**

- Frontend needs to pass the same API key to Oumi
- API key should be in environment variables, not hardcoded

### Issue: Kestra won't load

**Check database connection:**

```powershell
docker-compose logs postgres
docker-compose logs kestra
```

**Verify environment variables:**

```powershell
docker-compose exec kestra env | grep POSTGRES
```

**Reset database (WARNING: destroys data):**

```powershell
docker-compose down -v
docker-compose up -d
```

### Issue: Authentication fails

**Verify credentials match between services:**

- Check `kestra/.env` file
- Ensure no extra spaces or quotes
- Username format: `admin@kestra.io` (with @ symbol)

---

## Development Workflow

### Daily Development

1. **Start backend once:**

   ```powershell
   cd kestra
   docker-compose up -d
   ```

2. **Start frontend in watch mode:**

   ```powershell
   cd ..
   npm run dev
   ```

3. **Make changes to code**
   - Frontend hot-reloads automatically
   - Backend: rebuild container if you change Python code
     ```powershell
     docker-compose up -d --build oumi-engine
     ```

### View Logs

```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f oumi-engine
docker-compose logs -f kestra
docker-compose logs -f postgres

# Frontend logs are in the terminal where you ran `npm run dev`
```

### Stop Services

```powershell
# Stop but keep data
docker-compose stop

# Stop and remove containers (keeps volumes/data)
docker-compose down

# Stop and remove everything including data
docker-compose down -v

# Stop Next.js: Ctrl+C in the terminal
```

---

## Production Deployment Checklist

Before deploying to production:

- [ ] **Change all default passwords** in `.env`
- [ ] **Generate strong API keys** (32+ random characters)
- [ ] **Configure OAuth2/OIDC** instead of basic auth
- [ ] **Use Docker secrets** instead of environment variables
- [ ] **Enable HTTPS/TLS** via reverse proxy
- [ ] **Implement rate limiting**
- [ ] **Set up monitoring and alerting**
- [ ] **Configure backups** for PostgreSQL
- [ ] **Review security settings** in docker-compose.yml
- [ ] **Remove or secure** health check endpoints
- [ ] **Test disaster recovery procedures**
- [ ] **Audit all logs** for sensitive data exposure

---

## Environment Variables Reference

### Backend (kestra/.env)

```bash
# Required
POSTGRES_USER=kestra
POSTGRES_PASSWORD=<strong-password>
POSTGRES_DB=kestra
KESTRA_BASIC_AUTH_USERNAME=admin@kestra.io
KESTRA_BASIC_AUTH_PASSWORD=<strong-password>
OUMI_API_KEY=<secure-api-key>
```

### Frontend (.env.local - if needed)

```bash
# Optional - if frontend needs to call Oumi directly
NEXT_PUBLIC_OUMI_API_URL=http://localhost:8000
OUMI_API_KEY=<same-key-as-backend>
```

---

## Useful Commands

```powershell
# Docker Management
docker-compose ps                    # List running services
docker-compose logs -f              # Tail all logs
docker-compose exec kestra bash     # Shell into Kestra container
docker-compose restart oumi-engine  # Restart a service
docker-compose up -d --build        # Rebuild and restart all

# Next.js
npm run dev                         # Development server
npm run build                       # Production build
npm run start                       # Start production server
npm run lint                        # Check for issues

# Check running processes
netstat -ano | findstr :8080        # Check Kestra port
netstat -ano | findstr :8000        # Check Oumi port
netstat -ano | findstr :3000        # Check Next.js port

# Database
docker-compose exec postgres psql -U kestra  # Connect to PostgreSQL
```

---

## Next Steps

1. **Customize infrastructure generation** in `oumi/main.py`
2. **Add more validation rules** for better security
3. **Implement OAuth2** for production authentication
4. **Add monitoring** (Prometheus, Grafana)
5. **Set up CI/CD pipeline** for automated testing
6. **Add unit tests** for API endpoints
7. **Configure HTTPS** with Let's Encrypt

---

## Support

- **Kestra Docs:** https://kestra.io/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Next.js Docs:** https://nextjs.org/docs
- **Docker Compose:** https://docs.docker.com/compose

For security issues, review:

- [kestra/README.md](kestra/README.md)
- [oumi/README.md](oumi/README.md)
