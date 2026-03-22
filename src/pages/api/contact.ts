import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const formData = await request.formData();

  // Honeypot
  if (formData.get('website')) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const firstName = formData.get('firstName') as string | null;
  const lastName = formData.get('lastName') as string | null;
  const email = formData.get('email') as string | null;
  const message = formData.get('message') as string | null;

  if (!firstName || !lastName || !email || !message) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing fields' }),
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: 'Website Contact <no-reply@ccladvisory.com>',
      to: 'mikkoharju@ccladvisors.com',
      replyTo: email,
      subject: `New contact form submission from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}
      `.trim(),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
};
