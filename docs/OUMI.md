# Oumi Engine - Infrastructure Code Generator

FastAPI service that generates infrastructure-as-code based on project requirements.

## Security Features

### 1. Authentication

- API key authentication required for all `/generate` endpoints
- API key passed via `X-API-Key` header
- Configurable via `OUMI_API_KEY` environment variable

### 2. Error Handling

- Comprehensive try/except blocks for all operations
- Consistent JSON error response schema
- Proper HTTP status codes:
  - `400` - Validation errors (bad input)
  - `401` - Authentication failures
  - `500` - Internal server errors
- Detailed logging for debugging and monitoring

### 3. Input Validation

- Pydantic models with field constraints
- Project name: 1-100 characters, alphanumeric/dash/underscore only
- Requirements: 10-5000 characters
- Budget: $0-$1,000,000
- Cloud provider: must be `aws`, `azure`, or `gcp`

## Setup

### Local Development

1. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Set environment variables:**

   ```bash
   # Linux/Mac
   export OUMI_API_KEY="your-secure-api-key-here"

   # Windows PowerShell
   $env:OUMI_API_KEY="your-secure-api-key-here"
   ```

3. **Run the server:**

   ```bash
   python main.py
   ```

   Or with uvicorn directly:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

4. **Access the API:**
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs
   - Health: http://localhost:8000/health

### Docker Deployment

The service is configured in the main docker-compose.yml:

```bash
# From the kestra directory
docker-compose up oumi-engine
```

Set the API key via environment variable in docker-compose or .env file:

```yaml
environment:
  OUMI_API_KEY: ${OUMI_API_KEY}
```

## API Usage

### Health Check (No Auth Required)

```bash
curl http://localhost:8000/health
```

**Response:**

```json
{
  "status": "healthy",
  "service": "oumi-engine"
}
```

### Generate Infrastructure Code

**Request:**

```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{
    "projectName": "my-web-app",
    "requirements": "Need a scalable web application with database and caching",
    "budget": 500,
    "cloudProvider": "aws"
  }'
```

**Success Response (200):**

```json
{
  "hcl": "provider \"aws\" { ... }",
  "cost": 45,
  "status": "success",
  "message": "Infrastructure code generated successfully for my-web-app"
}
```

**Validation Error (400):**

```json
{
  "error": "ValidationError",
  "message": "Budget must be at least $10 to generate infrastructure",
  "status_code": 400,
  "details": {
    "projectName": "my-web-app",
    "cloudProvider": "aws"
  }
}
```

**Authentication Error (401):**

```json
{
  "error": "Unauthorized",
  "message": "Invalid API key. Please provide a valid X-API-Key header.",
  "status_code": 401
}
```

**Server Error (500):**

```json
{
  "error": "InternalServerError",
  "message": "An unexpected error occurred while generating infrastructure code. Please try again later.",
  "status_code": 500,
  "details": {
    "projectName": "my-web-app",
    "error_type": "ConnectionError"
  }
}
```

## Request Validation Rules

| Field           | Type    | Constraints                                    |
| --------------- | ------- | ---------------------------------------------- |
| `projectName`   | string  | 1-100 chars, alphanumeric/dash/underscore only |
| `requirements`  | string  | 10-5000 chars                                  |
| `budget`        | integer | 0-1,000,000 (minimum $10 for generation)       |
| `cloudProvider` | string  | Must be: `aws`, `azure`, or `gcp`              |

## Production Deployment

### Security Hardening

1. **API Key Management:**

   ```bash
   # Generate a secure API key
   openssl rand -hex 32

   # Store in secrets manager (AWS, Azure, GCP, Vault)
   # Never commit API keys to version control
   ```

2. **Use Environment Variables:**

   ```bash
   # Set in production environment
   OUMI_API_KEY=<secure-key-from-secrets-manager>
   ```

3. **Enhanced Authentication (Recommended):**

   - Implement JWT tokens with expiration
   - Add role-based access control (RBAC)
   - Use OAuth2/OIDC for user authentication
   - Implement rate limiting per API key
   - Store hashed API keys in database

4. **Additional Security Measures:**

   - Enable HTTPS/TLS (terminate at reverse proxy)
   - Implement request rate limiting
   - Add CORS policies
   - Enable audit logging
   - Implement request size limits
   - Add input sanitization for code injection
   - Regular security scanning and updates

5. **Monitoring & Logging:**

   ```python
   # Configure production logging
   import logging
   logging.basicConfig(
       level=logging.INFO,
       format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
       handlers=[
           logging.FileHandler('oumi.log'),
           logging.StreamHandler()
       ]
   )
   ```

6. **Docker Security:**
   - Run as non-root user
   - Use minimal base images
   - Scan for vulnerabilities
   - Implement resource limits

## Testing

### Test Authentication

```bash
# Should fail (no API key)
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"projectName": "test", "requirements": "test requirements", "budget": 100, "cloudProvider": "aws"}'

# Should succeed (with API key)
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-key-change-in-production" \
  -d '{"projectName": "test", "requirements": "test requirements here", "budget": 100, "cloudProvider": "aws"}'
```

### Test Validation

```bash
# Invalid project name (special characters)
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-key-change-in-production" \
  -d '{"projectName": "my@project!", "requirements": "test requirements", "budget": 100, "cloudProvider": "aws"}'

# Invalid cloud provider
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-key-change-in-production" \
  -d '{"projectName": "test", "requirements": "test requirements", "budget": 100, "cloudProvider": "digitalocean"}'

# Budget too low
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-key-change-in-production" \
  -d '{"projectName": "test", "requirements": "test requirements", "budget": 5, "cloudProvider": "aws"}'
```

## Development

### Enable Debug Logging

```python
# In main.py
logging.basicConfig(level=logging.DEBUG)
```

### Auto-reload on Changes

```bash
uvicorn main:app --reload
```

### Interactive API Documentation

Visit http://localhost:8000/docs for Swagger UI with interactive API testing.

## Error Handling Flow

```
Request → Authentication Check → Input Validation → Business Logic
                ↓                      ↓                    ↓
              401 Error            400 Error          Success / 500 Error
```

All errors follow the consistent `ErrorResponse` schema with:

- `error`: Error type/category
- `message`: Human-readable error description
- `status_code`: HTTP status code
- `details`: Additional context (optional)
