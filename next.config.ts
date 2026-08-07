import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/w30cm42007nv/**",
      },
    ],
    qualities: [25, 50, 75, 100],
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  async headers() {
    // CSP starts in report-only mode: the site has no nonce infrastructure yet,
    // and Next.js/styled-jsx rely on inline scripts/styles, so enforcing this
    // outright risks breaking hydration. Report-only lets us observe violations
    // (e.g. via a report-uri/report-to endpoint added later) before switching
    // to `Content-Security-Policy` once the policy is confirmed safe.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.ctfassets.net https://katakomunika.web.id",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    const permissionsPolicy = [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
      'payment=()',
      'usb=()',
    ].join(', ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Content-Security-Policy-Report-Only', value: csp },
          { key: 'Permissions-Policy', value: permissionsPolicy },
        ],
      },
    ];
  },
};

export default nextConfig;