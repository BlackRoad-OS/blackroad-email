/**
 * BlackRoad Email Automation
 * Transactional & Marketing emails with beautiful templates
 */

import { templates, getTemplateList, type TemplateName } from './templates';

interface Env {
  SENDGRID_API_KEY?: string;
  FROM_EMAIL: string;
  FROM_NAME: string;
  ENVIRONMENT: string;
}

// Email log storage (in-memory for demo)
const emailLogs: EmailLog[] = [];

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  template: string;
  status: 'sent' | 'failed' | 'queued';
  sentAt: string;
  messageId?: string;
  error?: string;
  opened?: boolean;
  clicked?: boolean;
}

interface SendEmailRequest {
  to: string | string[];
  template: TemplateName;
  data: Record<string, unknown>;
  subject?: string;
  replyTo?: string;
  tags?: string[];
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
};

// Response helpers
function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message, status }, status);
}

// Generate email ID
function generateEmailId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return 'email_' + Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Send email via SendGrid
async function sendViaSendGrid(
  env: Env,
  to: string[],
  subject: string,
  html: string,
  replyTo?: string,
  tags?: string[]
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!env.SENDGRID_API_KEY) {
    // Demo mode - log but don't actually send
    return { success: true, messageId: 'demo_' + generateEmailId() };
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: to.map(email => ({ email })) }],
        from: { email: env.FROM_EMAIL, name: env.FROM_NAME },
        reply_to: replyTo ? { email: replyTo } : undefined,
        subject,
        content: [{ type: 'text/html', value: html }],
        categories: tags,
        tracking_settings: {
          click_tracking: { enable: true },
          open_tracking: { enable: true },
        },
      }),
    });

    if (response.ok) {
      const messageId = response.headers.get('X-Message-Id') || generateEmailId();
      return { success: true, messageId };
    } else {
      const error = await response.text();
      return { success: false, error };
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get subject line for template
function getSubjectForTemplate(template: TemplateName, data: Record<string, unknown>): string {
  const subjects: Record<TemplateName, string | ((d: Record<string, unknown>) => string)> = {
    welcome: 'Welcome to BlackRoad!',
    passwordReset: 'Reset Your Password',
    emailVerification: 'Verify Your Email',
    invoicePaid: (d) => `Payment Received - Invoice ${d.invoiceId}`,
    usageAlert: (d) => `Usage Alert: ${d.metric} at ${d.percentage}%`,
    deploymentSuccess: (d) => `Deployment Successful: ${d.service}`,
    deploymentFailed: (d) => `Deployment Failed: ${d.service}`,
    productUpdate: (d) => d.title as string || 'New Features Available',
    weeklyDigest: 'Your Weekly BlackRoad Digest',
  };

  const subject = subjects[template];
  return typeof subject === 'function' ? subject(data) : subject;
}

// Landing page HTML
const landingPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlackRoad Email</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      color: #fff;
      min-height: 100vh;
      padding: 34px;
    }
    .container { max-width: 987px; margin: 0 auto; }
    h1 {
      font-size: 55px;
      background: linear-gradient(135deg, #F5A623 0%, #FF1D6C 38.2%, #9C27B0 61.8%, #2979FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 21px;
    }
    .subtitle { font-size: 21px; color: #888; margin-bottom: 34px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 21px; margin-bottom: 34px; }
    .stat {
      background: #111;
      border: 1px solid #333;
      border-radius: 13px;
      padding: 21px;
      text-align: center;
    }
    .stat-value { font-size: 34px; font-weight: bold; color: #FF1D6C; }
    .stat-label { font-size: 13px; color: #888; margin-top: 8px; }
    .section { margin-bottom: 34px; }
    .section-title { font-size: 21px; color: #F5A623; margin-bottom: 13px; }
    .template-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; }
    .template {
      background: #111;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 13px;
    }
    .template-name { font-weight: bold; color: #2979FF; margin-bottom: 4px; }
    .template-desc { font-size: 13px; color: #888; }
    .template-cat {
      display: inline-block;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      margin-top: 8px;
    }
    .template-cat.transactional { background: #FF1D6C33; color: #FF1D6C; }
    .template-cat.marketing { background: #2979FF33; color: #2979FF; }
    .endpoint {
      background: #111;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 13px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 13px;
    }
    .method {
      background: #2979FF;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      min-width: 50px;
      text-align: center;
    }
    .method.post { background: #FF1D6C; }
    .path { font-family: monospace; color: #F5A623; }
    pre {
      background: #111;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 13px;
      overflow-x: auto;
      font-size: 13px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>BlackRoad Email</h1>
    <p class="subtitle">Beautiful transactional & marketing emails</p>

    <div class="stats">
      <div class="stat">
        <div class="stat-value">9</div>
        <div class="stat-label">Email Templates</div>
      </div>
      <div class="stat">
        <div class="stat-value">7</div>
        <div class="stat-label">Transactional</div>
      </div>
      <div class="stat">
        <div class="stat-value">2</div>
        <div class="stat-label">Marketing</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">API Endpoints</div>
      <div class="endpoint"><span class="method post">POST</span><span class="path">/send</span> Send email</div>
      <div class="endpoint"><span class="method">GET</span><span class="path">/templates</span> List templates</div>
      <div class="endpoint"><span class="method">GET</span><span class="path">/templates/:name/preview</span> Preview template</div>
      <div class="endpoint"><span class="method">GET</span><span class="path">/logs</span> Email logs</div>
      <div class="endpoint"><span class="method">GET</span><span class="path">/stats</span> Delivery stats</div>
    </div>

    <div class="section">
      <div class="section-title">Templates</div>
      <div class="template-grid">
        ${getTemplateList().map(t => `
          <div class="template">
            <div class="template-name">${t.name}</div>
            <div class="template-desc">${t.description}</div>
            <span class="template-cat ${t.category}">${t.category}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Example Request</div>
      <pre>
POST /send
{
  "to": "user@example.com",
  "template": "welcome",
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}</pre>
    </div>
  </div>
</body>
</html>`;

// Handlers
async function handleSendEmail(request: Request, env: Env): Promise<Response> {
  const body = await request.json() as SendEmailRequest;

  // Validate
  if (!body.to) {
    return errorResponse('Recipient email is required');
  }
  if (!body.template || !(body.template in templates)) {
    return errorResponse(`Invalid template. Available: ${Object.keys(templates).join(', ')}`);
  }

  const recipients = Array.isArray(body.to) ? body.to : [body.to];
  const templateFn = templates[body.template];
  const html = templateFn(body.data as never);
  const subject = body.subject || getSubjectForTemplate(body.template, body.data);

  const result = await sendViaSendGrid(env, recipients, subject, html, body.replyTo, body.tags);

  // Log email
  const log: EmailLog = {
    id: generateEmailId(),
    to: recipients.join(', '),
    subject,
    template: body.template,
    status: result.success ? 'sent' : 'failed',
    sentAt: new Date().toISOString(),
    messageId: result.messageId,
    error: result.error,
  };
  emailLogs.push(log);

  if (result.success) {
    return jsonResponse({
      success: true,
      message: 'Email sent successfully',
      emailId: log.id,
      messageId: result.messageId,
      recipients: recipients.length,
    });
  } else {
    return jsonResponse({
      success: false,
      error: result.error,
      emailId: log.id,
    }, 500);
  }
}

function handleListTemplates(): Response {
  return jsonResponse({
    templates: getTemplateList(),
    count: getTemplateList().length,
  });
}

function handlePreviewTemplate(templateName: string, request: Request): Response {
  if (!(templateName in templates)) {
    return errorResponse('Template not found', 404);
  }

  // Sample data for preview
  const sampleData: Record<TemplateName, Record<string, unknown>> = {
    welcome: { name: 'John Doe', email: 'john@example.com' },
    passwordReset: { name: 'John Doe', resetUrl: 'https://blackroad.io/reset/abc123', expiresIn: '1 hour' },
    emailVerification: { name: 'John Doe', verifyUrl: 'https://blackroad.io/verify/abc123' },
    invoicePaid: { name: 'John Doe', invoiceId: 'INV-001', amount: '$99.00', date: 'Feb 15, 2026', downloadUrl: 'https://blackroad.io/invoice/001' },
    usageAlert: { name: 'John Doe', metric: 'API Calls', current: '9,500', limit: '10,000', percentage: 95 },
    deploymentSuccess: { name: 'John Doe', service: 'blackroad-api', version: 'v2.1.0', environment: 'Production', url: 'https://dashboard.blackroad.io/deployments/123' },
    deploymentFailed: { name: 'John Doe', service: 'blackroad-api', version: 'v2.1.0', error: 'Build failed: npm install returned exit code 1', logsUrl: 'https://dashboard.blackroad.io/logs/123' },
    productUpdate: { name: 'John Doe', title: 'New Features This Week', features: ['GraphQL API Gateway', 'Webhook Event System', 'Email Automation'], ctaUrl: 'https://blackroad.io/changelog' },
    weeklyDigest: { name: 'John Doe', stats: { agents: 42, deployments: 17, uptime: '99.9%' }, highlights: ['Deployed new GraphQL gateway', 'Added 106 webhook event types', 'Reached 1,000 active agents'] },
  };

  const templateFn = templates[templateName as TemplateName];
  const html = templateFn(sampleData[templateName as TemplateName] as never);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

function handleGetLogs(): Response {
  return jsonResponse({
    logs: emailLogs.slice(-100).reverse(),
    count: emailLogs.length,
  });
}

function handleGetStats(): Response {
  const sent = emailLogs.filter(l => l.status === 'sent').length;
  const failed = emailLogs.filter(l => l.status === 'failed').length;
  const templateCounts = emailLogs.reduce((acc, l) => {
    acc[l.template] = (acc[l.template] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return jsonResponse({
    total: emailLogs.length,
    sent,
    failed,
    successRate: emailLogs.length > 0 ? ((sent / emailLogs.length) * 100).toFixed(1) + '%' : '0%',
    byTemplate: templateCounts,
  });
}

function handleHealthCheck(): Response {
  return jsonResponse({
    status: 'healthy',
    service: 'blackroad-email',
    version: '1.0.0',
    templates: getTemplateList().length,
    timestamp: new Date().toISOString(),
  });
}

// Main fetch handler
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Routes
    if (path === '/' && method === 'GET') {
      return new Response(landingPageHTML, { headers: { 'Content-Type': 'text/html' } });
    }

    if (path === '/health' && method === 'GET') {
      return handleHealthCheck();
    }

    if (path === '/send' && method === 'POST') {
      return handleSendEmail(request, env);
    }

    if (path === '/templates' && method === 'GET') {
      return handleListTemplates();
    }

    // Template preview
    const previewMatch = path.match(/^\/templates\/([^/]+)\/preview$/);
    if (previewMatch && method === 'GET') {
      return handlePreviewTemplate(previewMatch[1], request);
    }

    if (path === '/logs' && method === 'GET') {
      return handleGetLogs();
    }

    if (path === '/stats' && method === 'GET') {
      return handleGetStats();
    }

    return errorResponse('Not found', 404);
  },
};
