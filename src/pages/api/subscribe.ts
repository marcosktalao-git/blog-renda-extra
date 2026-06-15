// src/pages/api/subscribe.ts
// Endpoint serverless Vercel — recebe email e envia para MailerLite
export const prerender = false;

import type { APIRoute } from 'astro';

const MAILERLITE_API_KEY = import.meta.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = '190300245810218475';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = body.email?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        groups: [MAILERLITE_GROUP_ID],
      }),
    });

    if (!response.ok && response.status !== 409) {
      return new Response(JSON.stringify({ error: 'Erro ao cadastrar' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
