import express, { Request, Response } from 'express';
import cors from 'cors';
import { cNGNManager } from 'cngn-typescript-library';
import { config } from "dotenv";

config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const apiKey = process.env.ENVIRONMENT === 'production' ? process.env.LIVE_API_KEY! : process.env.TEST_API_KEY!;
const encryptionKey = process.env.ENVIRONMENT === 'production' ? process.env.LIVE_ENCRYPTION_KEY! : process.env.TEST_ENCRYPTION_KEY!
const privateKey = process.env.PRIVATE_KEY!

const cNGNManager1 = new cNGNManager({ apiKey, encryptionKey, privateKey })

app.get('/balance', async (req: Request, res: Response) => {
    try {
        const response = await cNGNManager1.getBalance();
        res.json(response);
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// === START SERVER ===
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
