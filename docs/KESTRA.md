# Kestra Docker Compose Setup

## Security Configuration

This docker-compose setup implements multiple security best practices:

### 1. Docker Socket Security

- Uses `docker-socket-proxy` to provide limited, secure access to Docker API
- Prevents direct host Docker socket exposure
- **Never expose `/var/run/docker.sock` directly in production**

### 2. Authentication

- Basic authentication enabled by default
- Bound to localhost (`127.0.0.1:8080`) for local development
- **Production requires OAuth2/OIDC configuration**

### 3. Credentials Management

- All sensitive credentials externalized via environment variables
- No hardcoded passwords in docker-compose.yml
- **Never commit `.env` file to version control**

## Setup Instructions

### Local Development

1. **Copy the example environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and set your credentials:**

   ```bash
   # Update with your own secure passwords
   POSTGRES_USER=kestra
   POSTGRES_PASSWORD=your_secure_password_here
   POSTGRES_DB=kestra
   KESTRA_BASIC_AUTH_USERNAME=admin@kestra.io
   KESTRA_BASIC_AUTH_PASSWORD=your_secure_password_here
   ```

3. **Start the services:**

   ```bash
   docker-compose up -d
   ```

4. **Access Kestra UI:**

   - URL: http://localhost:8080
   - Username: (value from `KESTRA_BASIC_AUTH_USERNAME`)
   - Password: (value from `KESTRA_BASIC_AUTH_PASSWORD`)

5. **View logs:**

   ```bash
   docker-compose logs -f kestra
   ```

6. **Stop services:**
   ```bash
   docker-compose down
   ```

### Production Deployment

For production environments, implement these additional security measures:

1. **Use Docker Secrets** instead of environment variables:

   ```yaml
   secrets:
     postgres_user:
       external: true
     postgres_password:
       external: true

   services:
     postgres:
       secrets:
         - postgres_user
         - postgres_password
       environment:
         POSTGRES_USER_FILE: /run/secrets/postgres_user
         POSTGRES_PASSWORD_FILE: /run/secrets/postgres_password
   ```

2. **Configure OAuth2/OIDC Authentication:**

   - Replace basic auth with enterprise identity providers (Google, GitHub, Azure AD, Okta, etc.)
   - Example configuration available in the comments of docker-compose.yml

3. **Use External Secrets Manager:**

   - HashiCorp Vault
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Secret Manager

4. **Network Security:**

   - Do NOT bind to `0.0.0.0` or expose port 8080 externally
   - Use reverse proxy (nginx, Traefik, Caddy) with TLS
   - Implement firewall rules and network policies
   - Use VPN or bastion hosts for access

5. **Additional Hardening:**
   - Enable TLS for all database connections
   - Use non-root users in containers
   - Implement resource limits (CPU, memory)
   - Regular security updates and vulnerability scanning
   - Enable audit logging
   - Implement backup and disaster recovery

## Environment Variables Reference

| Variable                     | Description                  | Default           |
| ---------------------------- | ---------------------------- | ----------------- |
| `POSTGRES_USER`              | PostgreSQL database username | `kestra`          |
| `POSTGRES_PASSWORD`          | PostgreSQL database password | (required)        |
| `POSTGRES_DB`                | PostgreSQL database name     | `kestra`          |
| `KESTRA_BASIC_AUTH_USERNAME` | Kestra admin username        | `admin@kestra.io` |
| `KESTRA_BASIC_AUTH_PASSWORD` | Kestra admin password        | (required)        |

## Troubleshooting

### Cannot connect to Kestra UI

- Verify services are running: `docker-compose ps`
- Check logs: `docker-compose logs kestra`
- Ensure credentials in `.env` match what you're using to login

### Database connection errors

- Verify PostgreSQL is healthy: `docker-compose logs postgres`
- Ensure environment variables are loaded correctly
- Check that `POSTGRES_*` variables match between services

### Docker socket permission denied

- Verify docker-socket-proxy is running: `docker-compose ps docker-socket-proxy`
- Check proxy logs: `docker-compose logs docker-socket-proxy`

## Security Checklist

- [ ] `.env` file created and not committed to version control
- [ ] Strong, unique passwords set for all credentials
- [ ] Services bound to localhost for local development
- [ ] Basic authentication enabled
- [ ] Docker socket proxied (not directly mounted)
- [ ] For production: OAuth2/OIDC configured
- [ ] For production: Using Docker secrets or secrets manager
- [ ] For production: TLS enabled via reverse proxy
- [ ] For production: Network policies and firewall rules in place
- [ ] Regular security updates scheduled
