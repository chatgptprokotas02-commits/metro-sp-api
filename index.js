import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { obterStatus } from "./getLinesStatus.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.set("trust proxy", 1); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

app.get("/", async (req, res) => {
  try {
    const status = await obterStatus();
    res.json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno" });
  }
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
