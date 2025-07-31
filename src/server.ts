import express from 'express';
import cors from 'cors';
import {cNGNManager} from 'cngn-typescript-library';
import {config} from "dotenv";
import os from 'os';

config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const apiKey = process.env.ENVIRONMENT === 'production' ? process.env.LIVE_API_KEY! : process.env.TEST_API_KEY!;
const encryptionKey = process.env.ENVIRONMENT === 'production' ? process.env.LIVE_ENCRYPTION_KEY! : process.env.TEST_ENCRYPTION_KEY!
const privateKey = process.env.PRIVATE_KEY!

const cNGNManager1 = new cNGNManager({ apiKey, encryptionKey, privateKey })

// Function to get server IP address
function getServerIP(): string {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const int of interfaces[name]!) {
            if (int.family === 'IPv4' && !int.internal) {
                return int.address;
            }
        }
    }
    return 'localhost';
}

async function directCall() {
    try {
        return await cNGNManager1.getBalance();
    }
    catch (error: any) {
        console.error('Error in directCall:', error.message);
        throw new Error('Failed to fetch balance');
    }
}

directCall();

app.listen(PORT, () => {
    const serverIP = getServerIP();
    console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
    console.log(`🌐 Server IP address: ${serverIP}`);
    console.log(`🔗 External access: http://${serverIP}:${PORT}`);
});