import { Request, Response, Router} from 'express';
import { Url } from '../models/Url';

const router = Router();
const BASE_URL = "http://localhost:3000";

// Health check route
router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the URL Shortener API');
});

router.post('/shorten', async (req: Request, res: Response) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    try {
        let exitsting = await Url.findOne({originalUrl});
        if(exitsting){
            return res.status(200).json({ originalUrl: exitsting.originalUrl, shortUrl: exitsting.shortUrl });
        }
        const { nanoid } = await import('nanoid');
        const shortId = nanoid(8);
        const shortUrl = `${BASE_URL}/${shortId}`;
        const newUrl = new Url({ originalUrl, shortUrl });
        await newUrl.save();
        res.status(201).json({ originalUrl, shortUrl });
        
    } catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:shortId', async (req: Request, res: Response) => {
    const { shortId } = req.params;
    const shortUrl = `${BASE_URL}/${shortId}`;

    try {
        const urlEntry = await Url.findOne({ shortUrl });
        if (urlEntry) {
            urlEntry.clicks += 1;
            await urlEntry.save();
            return res.redirect(urlEntry.originalUrl);
        } else {
            return res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        console.error('Error redirecting to original URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;