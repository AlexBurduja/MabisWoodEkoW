import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const imagePath = path.join(process.cwd(), 'public', 'logoMabisCercPngg.png');
    const imageBuffer = fs.readFileSync(imagePath);

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
