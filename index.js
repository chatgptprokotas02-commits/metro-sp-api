import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { obterStatus } from "./getLinesStatus.js";

const app = express();

// middlewares
app.use(cors());
app.set("trust proxy", 1);

// rate limit (15 min / 60 req por IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
});
app.use(limiter);

// rota de teste (pra saber se está online)
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// rota principal (status das linhas)
app.get("/", async (req, res) => {
  try {
    const status = await obterStatus();
    res.status(200).json(status);
  } catch (err) {
    console.error("Erro ao obter status:", err);
    res.status(500).json({
      mensagem: "Erro ao contatar a API do metrô",
      codigo: "ESUBWAYAPI",
    });
  }
});

// porta do Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API do metrô escutando na porta ${PORT}`);
});
