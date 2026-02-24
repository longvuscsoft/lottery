# ARCHITECTURE.md
## System Architecture & Scaling

### Overview
User
→ Cloudflare CDN & WAF
→ Nginx
→ Laravel API
→ Redis (Primary)
→ MySQL/Postgres (Backup)

### Principles
- Cache-first
- Redis serves 99% traffic
- Database never serves user requests
- Background crawler only

### Scaling Phases
Phase 1: Single VPS
Phase 2: Cloudflare cache + DB split
Phase 3: Load balancer + multi app servers
