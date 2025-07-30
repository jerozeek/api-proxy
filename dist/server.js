"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cngn_typescript_library_1 = require("cngn-typescript-library");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ quiet: true });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
const apiKey = process.env.ENVIRONMENT === 'production' ? process.env.LIVE_API_KEY : process.env.TEST_API_KEY;
const encryptionKey = process.env.ENVIRONMENT === 'production' ? process.env.LIVE_ENCRYPTION_KEY : process.env.TEST_ENCRYPTION_KEY;
const privateKey = process.env.PRIVATE_KEY;
const cNGNManager1 = new cngn_typescript_library_1.cNGNManager({ apiKey, encryptionKey, privateKey });
app.get('/balance', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cNGNManager1.getBalance();
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// === START SERVER ===
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
