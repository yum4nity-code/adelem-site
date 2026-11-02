// Cloudflare Pages : /api/stripe-webhook → même code que sur Vercel (site/api/stripe-webhook.mjs).
import { POST } from '../../api/stripe-webhook.mjs';
import { avecEnv } from '../_env.js';
export const onRequestPost = avecEnv(POST);
