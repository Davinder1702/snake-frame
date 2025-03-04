import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { untrustedData } = req.body;
    
    // Handle the button click
    if (untrustedData?.buttonIndex === 1) {
      return res.status(200).json({
        frame: {
          version: '2',
          image: 'https://snake-frame57.vercel.app/favicon.png',
          buttons: [
            {
              label: 'Playing...',
              action: 'post'
            }
          ],
          post_url: 'https://snake-frame57.vercel.app/api/webhook',
          redirect: 'https://snake-frame57.vercel.app'  // Redirect to your game
        }
      });
    }

    // Initial frame state
    return res.status(200).json({
      frame: {
        version: '2',
        image: 'https://snake-frame57.vercel.app/favicon.png',
        buttons: [
          {
            label: 'Start Game',
            action: 'post'
          }
        ],
        post_url: 'https://snake-frame57.vercel.app/api/webhook'
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error processing frame action' });
  }
} 