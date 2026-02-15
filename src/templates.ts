/**
 * BlackRoad Email Templates
 * Beautiful, responsive email templates with Golden Ratio design
 */

// BlackRoad brand colors
const COLORS = {
  hotPink: '#FF1D6C',
  amber: '#F5A623',
  electricBlue: '#2979FF',
  violet: '#9C27B0',
  black: '#000000',
  darkGray: '#111111',
  gray: '#888888',
  lightGray: '#333333',
  white: '#FFFFFF',
};

// Base email wrapper
function baseTemplate(content: string, preheader: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>BlackRoad</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 21px !important; }
      .content { padding: 21px !important; }
      .button { width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.black}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: ${COLORS.black};">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLORS.black};">
    <tr>
      <td align="center" style="padding: 34px 21px;">
        <table role="presentation" class="container" width="610" cellpadding="0" cellspacing="0" style="max-width: 610px;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 34px;">
              <img src="https://blackroad.io/logo.png" alt="BlackRoad" width="144" style="display: block;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="background-color: ${COLORS.darkGray}; border-radius: 13px; padding: 34px; border: 1px solid ${COLORS.lightGray};">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 34px;">
              <p style="color: ${COLORS.gray}; font-size: 13px; margin: 0;">
                BlackRoad OS, Inc. &bull; Building the future of AI infrastructure
              </p>
              <p style="color: ${COLORS.gray}; font-size: 13px; margin: 8px 0 0 0;">
                <a href="https://blackroad.io" style="color: ${COLORS.hotPink}; text-decoration: none;">Website</a> &bull;
                <a href="https://twitter.com/blackroados" style="color: ${COLORS.hotPink}; text-decoration: none;">Twitter</a> &bull;
                <a href="https://github.com/BlackRoad-OS" style="color: ${COLORS.hotPink}; text-decoration: none;">GitHub</a>
              </p>
              <p style="color: ${COLORS.gray}; font-size: 11px; margin: 21px 0 0 0;">
                <a href="{{unsubscribe_url}}" style="color: ${COLORS.gray}; text-decoration: underline;">Unsubscribe</a> &bull;
                <a href="{{preferences_url}}" style="color: ${COLORS.gray}; text-decoration: underline;">Email Preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Button component
function button(text: string, url: string, color: string = COLORS.hotPink): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 21px 0;">
    <tr>
      <td align="center" style="background: linear-gradient(135deg, ${COLORS.hotPink} 0%, ${COLORS.violet} 100%); border-radius: 8px;">
        <a href="${url}" style="display: inline-block; padding: 13px 34px; color: ${COLORS.white}; text-decoration: none; font-weight: bold; font-size: 16px;">
          ${text}
        </a>
      </td>
    </tr>
  </table>`;
}

// Divider component
function divider(): string {
  return `<hr style="border: none; border-top: 1px solid ${COLORS.lightGray}; margin: 21px 0;" />`;
}

// Email templates
export const templates = {
  // ============================================
  // TRANSACTIONAL EMAILS
  // ============================================

  welcome: (data: { name: string; email: string }) => baseTemplate(`
    <h1 style="color: ${COLORS.white}; font-size: 34px; margin: 0 0 21px 0; background: linear-gradient(135deg, ${COLORS.amber} 0%, ${COLORS.hotPink} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      Welcome to BlackRoad!
    </h1>
    <p style="color: ${COLORS.white}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name},
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Welcome to the future of AI infrastructure. Your account has been created and you're ready to start building with BlackRoad.
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Here's what you can do next:
    </p>
    <ul style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.8; margin: 0 0 21px 0; padding-left: 21px;">
      <li>Deploy your first AI agent</li>
      <li>Connect to our GraphQL API</li>
      <li>Set up webhooks for real-time events</li>
      <li>Explore the documentation</li>
    </ul>
    ${button('Get Started', 'https://dashboard.blackroad.io')}
    <p style="color: ${COLORS.gray}; font-size: 14px; margin: 21px 0 0 0;">
      Need help? Reply to this email or check out our <a href="https://docs.blackroad.io" style="color: ${COLORS.hotPink};">documentation</a>.
    </p>
  `, 'Welcome to BlackRoad - Your AI infrastructure journey begins!'),

  passwordReset: (data: { name: string; resetUrl: string; expiresIn: string }) => baseTemplate(`
    <h1 style="color: ${COLORS.white}; font-size: 28px; margin: 0 0 21px 0;">
      Reset Your Password
    </h1>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name},
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      We received a request to reset your password. Click the button below to create a new password.
    </p>
    ${button('Reset Password', data.resetUrl)}
    <p style="color: ${COLORS.gray}; font-size: 14px; margin: 21px 0 0 0;">
      This link expires in ${data.expiresIn}. If you didn't request this, you can safely ignore this email.
    </p>
    ${divider()}
    <p style="color: ${COLORS.gray}; font-size: 13px; margin: 0;">
      Can't click the button? Copy this URL:<br />
      <a href="${data.resetUrl}" style="color: ${COLORS.electricBlue}; word-break: break-all;">${data.resetUrl}</a>
    </p>
  `, 'Reset your BlackRoad password'),

  emailVerification: (data: { name: string; verifyUrl: string }) => baseTemplate(`
    <h1 style="color: ${COLORS.white}; font-size: 28px; margin: 0 0 21px 0;">
      Verify Your Email
    </h1>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name},
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Please verify your email address to complete your BlackRoad account setup.
    </p>
    ${button('Verify Email', data.verifyUrl)}
  `, 'Verify your BlackRoad email address'),

  invoicePaid: (data: { name: string; invoiceId: string; amount: string; date: string; downloadUrl: string }) => baseTemplate(`
    <h1 style="color: ${COLORS.white}; font-size: 28px; margin: 0 0 21px 0;">
      Payment Received
    </h1>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name},
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Thank you for your payment! Here are the details:
    </p>
    <table role="presentation" width="100%" style="background-color: ${COLORS.black}; border-radius: 8px; padding: 21px; margin: 21px 0;">
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Invoice #</td>
        <td style="color: ${COLORS.white}; text-align: right; padding: 8px 0;">${data.invoiceId}</td>
      </tr>
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Amount</td>
        <td style="color: ${COLORS.hotPink}; text-align: right; padding: 8px 0; font-weight: bold; font-size: 21px;">${data.amount}</td>
      </tr>
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Date</td>
        <td style="color: ${COLORS.white}; text-align: right; padding: 8px 0;">${data.date}</td>
      </tr>
    </table>
    ${button('Download Invoice', data.downloadUrl)}
  `, `Payment received - Invoice ${data.invoiceId}`),

  usageAlert: (data: { name: string; metric: string; current: string; limit: string; percentage: number }) => baseTemplate(`
    <h1 style="color: ${COLORS.amber}; font-size: 28px; margin: 0 0 21px 0;">
      ⚠️ Usage Alert
    </h1>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name},
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Your ${data.metric} usage has reached <strong style="color: ${COLORS.amber};">${data.percentage}%</strong> of your limit.
    </p>
    <table role="presentation" width="100%" style="background-color: ${COLORS.black}; border-radius: 8px; padding: 21px; margin: 21px 0;">
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Current Usage</td>
        <td style="color: ${COLORS.white}; text-align: right; padding: 8px 0;">${data.current}</td>
      </tr>
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Plan Limit</td>
        <td style="color: ${COLORS.white}; text-align: right; padding: 8px 0;">${data.limit}</td>
      </tr>
      <tr>
        <td colspan="2" style="padding-top: 13px;">
          <div style="background-color: ${COLORS.lightGray}; border-radius: 4px; height: 8px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, ${COLORS.amber} 0%, ${COLORS.hotPink} 100%); width: ${data.percentage}%; height: 100%;"></div>
          </div>
        </td>
      </tr>
    </table>
    ${button('Upgrade Plan', 'https://blackroad.io/pricing')}
  `, `Usage alert: ${data.metric} at ${data.percentage}%`),

  deploymentSuccess: (data: { name: string; service: string; version: string; environment: string; url: string }) => baseTemplate(`
    <h1 style="color: ${COLORS.white}; font-size: 28px; margin: 0 0 21px 0;">
      ✅ Deployment Successful
    </h1>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name},
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Your deployment completed successfully!
    </p>
    <table role="presentation" width="100%" style="background-color: ${COLORS.black}; border-radius: 8px; padding: 21px; margin: 21px 0;">
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Service</td>
        <td style="color: ${COLORS.white}; text-align: right; padding: 8px 0;">${data.service}</td>
      </tr>
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Version</td>
        <td style="color: ${COLORS.electricBlue}; text-align: right; padding: 8px 0;">${data.version}</td>
      </tr>
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Environment</td>
        <td style="color: ${COLORS.white}; text-align: right; padding: 8px 0;">${data.environment}</td>
      </tr>
    </table>
    ${button('View Deployment', data.url)}
  `, `Deployment successful: ${data.service} ${data.version}`),

  deploymentFailed: (data: { name: string; service: string; version: string; error: string; logsUrl: string }) => baseTemplate(`
    <h1 style="color: ${COLORS.hotPink}; font-size: 28px; margin: 0 0 21px 0;">
      ❌ Deployment Failed
    </h1>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name},
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Your deployment encountered an error.
    </p>
    <table role="presentation" width="100%" style="background-color: ${COLORS.black}; border-radius: 8px; padding: 21px; margin: 21px 0;">
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Service</td>
        <td style="color: ${COLORS.white}; text-align: right; padding: 8px 0;">${data.service}</td>
      </tr>
      <tr>
        <td style="color: ${COLORS.gray}; padding: 8px 0;">Version</td>
        <td style="color: ${COLORS.white}; text-align: right; padding: 8px 0;">${data.version}</td>
      </tr>
    </table>
    <div style="background-color: rgba(255, 29, 108, 0.1); border: 1px solid ${COLORS.hotPink}; border-radius: 8px; padding: 13px; margin: 21px 0;">
      <p style="color: ${COLORS.hotPink}; font-size: 14px; margin: 0; font-family: monospace;">
        ${data.error}
      </p>
    </div>
    ${button('View Logs', data.logsUrl)}
  `, `Deployment failed: ${data.service}`),

  // ============================================
  // MARKETING EMAILS
  // ============================================

  productUpdate: (data: { name: string; title: string; features: string[]; ctaUrl: string }) => baseTemplate(`
    <h1 style="color: ${COLORS.white}; font-size: 34px; margin: 0 0 21px 0; background: linear-gradient(135deg, ${COLORS.amber} 0%, ${COLORS.hotPink} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      ${data.title}
    </h1>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name},
    </p>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      We've been busy shipping new features for you. Here's what's new:
    </p>
    ${data.features.map(f => `
      <div style="display: flex; align-items: flex-start; margin-bottom: 13px;">
        <span style="color: ${COLORS.hotPink}; margin-right: 13px;">✦</span>
        <span style="color: ${COLORS.white}; font-size: 16px;">${f}</span>
      </div>
    `).join('')}
    ${button('Explore New Features', data.ctaUrl)}
  `, data.title),

  weeklyDigest: (data: { name: string; stats: { agents: number; deployments: number; uptime: string }; highlights: string[] }) => baseTemplate(`
    <h1 style="color: ${COLORS.white}; font-size: 28px; margin: 0 0 21px 0;">
      Your Weekly Digest
    </h1>
    <p style="color: ${COLORS.gray}; font-size: 16px; line-height: 1.6; margin: 0 0 21px 0;">
      Hi ${data.name}, here's your BlackRoad activity for the week:
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 21px 0;">
      <tr>
        <td width="33%" align="center" style="background-color: ${COLORS.black}; border-radius: 8px; padding: 21px;">
          <div style="color: ${COLORS.hotPink}; font-size: 34px; font-weight: bold;">${data.stats.agents}</div>
          <div style="color: ${COLORS.gray}; font-size: 13px; margin-top: 8px;">Active Agents</div>
        </td>
        <td width="33%" align="center" style="background-color: ${COLORS.black}; border-radius: 8px; padding: 21px;">
          <div style="color: ${COLORS.electricBlue}; font-size: 34px; font-weight: bold;">${data.stats.deployments}</div>
          <div style="color: ${COLORS.gray}; font-size: 13px; margin-top: 8px;">Deployments</div>
        </td>
        <td width="33%" align="center" style="background-color: ${COLORS.black}; border-radius: 8px; padding: 21px;">
          <div style="color: ${COLORS.amber}; font-size: 34px; font-weight: bold;">${data.stats.uptime}</div>
          <div style="color: ${COLORS.gray}; font-size: 13px; margin-top: 8px;">Uptime</div>
        </td>
      </tr>
    </table>
    ${divider()}
    <h2 style="color: ${COLORS.white}; font-size: 21px; margin: 0 0 13px 0;">Highlights</h2>
    ${data.highlights.map(h => `
      <p style="color: ${COLORS.gray}; font-size: 14px; margin: 8px 0;">• ${h}</p>
    `).join('')}
    ${button('View Full Report', 'https://dashboard.blackroad.io/analytics')}
  `, 'Your weekly BlackRoad digest'),
};

// Template names
export type TemplateName = keyof typeof templates;

// Get template list
export function getTemplateList(): { name: string; description: string; category: string }[] {
  return [
    { name: 'welcome', description: 'New user welcome email', category: 'transactional' },
    { name: 'passwordReset', description: 'Password reset request', category: 'transactional' },
    { name: 'emailVerification', description: 'Email verification', category: 'transactional' },
    { name: 'invoicePaid', description: 'Invoice payment confirmation', category: 'transactional' },
    { name: 'usageAlert', description: 'Usage threshold alert', category: 'transactional' },
    { name: 'deploymentSuccess', description: 'Successful deployment notification', category: 'transactional' },
    { name: 'deploymentFailed', description: 'Failed deployment notification', category: 'transactional' },
    { name: 'productUpdate', description: 'New features announcement', category: 'marketing' },
    { name: 'weeklyDigest', description: 'Weekly activity digest', category: 'marketing' },
  ];
}
