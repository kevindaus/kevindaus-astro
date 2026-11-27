// POST /api/contact — the contact form (src/components/ContactForm.astro).
// Validates, drops honeypot hits, checks Turnstile when TURNSTILE_SECRET is set, and sends the
// message with Resend (https://resend.com). JSON for fetch() callers; a 303 to /contact/sent/ otherwise.
//
// Environment (Cloudflare Pages → Settings → Variables and secrets; docs/deployment.md):
//   RESEND_API_KEY   (secret)   Resend API key
//   CONTACT_TO       (plain)    where enquiries are delivered
//   CONTACT_FROM     (plain)    verified sender, e.g. "Website <contact@kevinflorenzdaus.com>"
//   TURNSTILE_SECRET (secret, optional) — pair with PUBLIC_TURNSTILE_SITE_KEY at build time
import { projectTypes } from '../../src/data/contact';

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  TURNSTILE_SECRET?: string;
}
interface Ctx { request: Request; env: Env }

type Errors = Partial<Record<'name' | 'email' | 'projectType' | 'message', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

function respond(req: Request, status: number, body: { ok: boolean; errors?: Errors; error?: string }) {
  const wantsJson = (req.headers.get('accept') ?? '').includes('application/json');
  if (wantsJson) return Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
  if (body.ok) return new Response(null, { status: 303, headers: { location: '/contact/sent/' } });
  const msg = body.errors ? Object.values(body.errors).join(' ') : 'Something went wrong sending your message. Please try again, or message me on LinkedIn.';
  const esc = msg.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
  return new Response(
    `<!doctype html><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Message not sent</title>` +
    `<body style="font:16px/1.6 system-ui;max-width:40rem;margin:4rem auto;padding:0 1.25rem"><h1>Message not sent</h1><p>${esc}</p><p><a href="/contact/">Back to the form</a></p>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' } },
  );
}

async function turnstileOk(secret: string, token: string, ip: string | null) {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return Boolean(data.success);
}

async function handlePost({ request, env }: Ctx) {
  let form: FormData;
  try { form = await request.formData(); } catch { return respond(request, 400, { ok: false, error: 'bad_request' }); }

  // honeypot: pretend it worked
  if (clean(form.get('company'), 200)) return respond(request, 200, { ok: true });

  const name = oneLine(clean(form.get('name'), 200));
  const email = oneLine(clean(form.get('email'), 320));
  const projectType = clean(form.get('projectType'), 100);
  const message = clean(form.get('message'), 5000);

  const errors: Errors = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email address.';
  if (!(projectTypes as readonly string[]).includes(projectType)) errors.projectType = 'Please choose a project type.';
  if (message.length < 20) errors.message = 'Please tell me a little about the project (at least 20 characters).';
  if (Object.keys(errors).length) return respond(request, 422, { ok: false, errors });

  if (env.TURNSTILE_SECRET) {
    const ok = await turnstileOk(env.TURNSTILE_SECRET, clean(form.get('cf-turnstile-response'), 2048), request.headers.get('cf-connecting-ip'));
    if (!ok) return respond(request, 400, { ok: false, error: 'turnstile' });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error('contact: RESEND_API_KEY, CONTACT_TO or CONTACT_FROM is not set');
    return respond(request, 500, { ok: false, error: 'not_configured' });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Website enquiry: ${projectType} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}\n`,
    }),
  });
  if (!res.ok) {
    console.error('contact: Resend error', res.status, await res.text().catch(() => ''));
    return respond(request, 502, { ok: false, error: 'send_failed' });
  }
  return respond(request, 200, { ok: true });
}

export const onRequest = (ctx: Ctx) =>
  ctx.request.method === 'POST' ? handlePost(ctx) : new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
