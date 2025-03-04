import { manifest } from '../manifest.ts';
import fs from 'fs';

fs.writeFileSync('public/.well-known/farcaster.json', JSON.stringify(manifest, null, 2));