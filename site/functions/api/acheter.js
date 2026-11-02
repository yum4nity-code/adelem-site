// Cloudflare Pages : /api/acheter → même code que sur Vercel (site/api/acheter.mjs).
import { GET, POST } from '../../api/acheter.mjs';
import { avecEnv } from '../_env.js';
export const onRequestGet = avecEnv(GET);
export const onRequestPost = avecEnv(POST);
