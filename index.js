import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
// Certifique-se de que o arquivo getLinesStatus.js está na mesma pasta
import { obterStatus } from "./getLinesStatus.js"; 

const app = express();

// IMPORTANTE: O Render injeta a porta automaticamente na variável process.env.PORT
// Se você não usar isso, o deploy falha com erro ou timeout.
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.set("trust proxy", 1); // Necessário para o rateLimit funcionar no Render
app.use(express.json());

// --- Rate Limit ---
// (15 minutos / 60 requisições por IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 60, 
  message: { error: "Muitas requisições criadas a partir deste IP, tente novamente mais tarde." }
});

app.use(limiter);

// --- Rotas ---

// 1. Rota de Health Check
// O Render usa isso para saber se seu app travou ou não.
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, timestamp: new Date() });
});

// 2. Rota Principal
app.get("/", async (req, res) => {
  try {
    console.log("Recebendo requisição na raiz...");
    const status = await obterStatus();
    res.status(200).json(status);
  } catch (err) {
    console.error("Erro ao obter status:", err);
    // Retorna erro formatado em JSON para não quebrar quem consome a API
    res.status(500).json({ 
        error: "Erro interno ao buscar dados.", 
        details: err.message 
    });
  }
});

// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando e escutando na porta ${PORT}`);
});
