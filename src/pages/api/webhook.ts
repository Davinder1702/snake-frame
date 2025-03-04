import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Return a new frame state
    return res.status(200).json({
      frame: {
        version: 'vNext',
        image: 'https://snake-frame15.vercel.app/favicon.png',
        buttons: [
          {
            label: 'Start Game'
          }
        ],
        post_url: 'https://snake-frame15.vercel.app/api/webhook'
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error processing frame action' });
  }
} 