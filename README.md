# BlackRoad Email

Beautiful transactional and marketing email automation for the BlackRoad ecosystem.

## Live Endpoints

- **Dashboard**: https://blackroad-email.amundsonalexa.workers.dev
- **Health**: https://blackroad-email.amundsonalexa.workers.dev/health
- **Templates**: https://blackroad-email.amundsonalexa.workers.dev/templates

## Features

- **9 Beautiful Templates** with Golden Ratio design
- **Transactional Emails**: Welcome, password reset, verification, billing, deployments
- **Marketing Emails**: Product updates, weekly digests
- **SendGrid Integration** with tracking
- **Template Preview** endpoint
- **Email Logs & Analytics**

## Templates

### Transactional (7)
| Template | Description |
|----------|-------------|
| `welcome` | New user welcome email |
| `passwordReset` | Password reset request |
| `emailVerification` | Email verification |
| `invoicePaid` | Payment confirmation |
| `usageAlert` | Usage threshold alert |
| `deploymentSuccess` | Successful deployment |
| `deploymentFailed` | Failed deployment |

### Marketing (2)
| Template | Description |
|----------|-------------|
| `productUpdate` | New features announcement |
| `weeklyDigest` | Weekly activity digest |

## API Reference

### Send Email
```bash
curl -X POST https://blackroad-email.amundsonalexa.workers.dev/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "template": "welcome",
    "data": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }'
```

### List Templates
```bash
curl https://blackroad-email.amundsonalexa.workers.dev/templates
```

### Preview Template
```bash
curl https://blackroad-email.amundsonalexa.workers.dev/templates/welcome/preview
```

### Email Logs
```bash
curl https://blackroad-email.amundsonalexa.workers.dev/logs
```

### Statistics
```bash
curl https://blackroad-email.amundsonalexa.workers.dev/stats
```

## Template Data

Each template requires specific data fields:

### welcome
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### passwordReset
```json
{
  "name": "John Doe",
  "resetUrl": "https://...",
  "expiresIn": "1 hour"
}
```

### invoicePaid
```json
{
  "name": "John Doe",
  "invoiceId": "INV-001",
  "amount": "$99.00",
  "date": "Feb 15, 2026",
  "downloadUrl": "https://..."
}
```

### usageAlert
```json
{
  "name": "John Doe",
  "metric": "API Calls",
  "current": "9,500",
  "limit": "10,000",
  "percentage": 95
}
```

### deploymentSuccess
```json
{
  "name": "John Doe",
  "service": "blackroad-api",
  "version": "v2.1.0",
  "environment": "Production",
  "url": "https://..."
}
```

## Design System

Templates use BlackRoad brand colors:
- Hot Pink: `#FF1D6C`
- Amber: `#F5A623`
- Electric Blue: `#2979FF`
- Violet: `#9C27B0`

Golden Ratio spacing: `8px, 13px, 21px, 34px, 55px`

## Configuration

Set SendGrid API key:
```bash
wrangler secret put SENDGRID_API_KEY
```

## Development

```bash
npm install
npm run dev      # Start local dev server
npm run deploy   # Deploy to Cloudflare
```

## License

Proprietary - BlackRoad OS, Inc.
