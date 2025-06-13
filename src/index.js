import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const MARITACA_API_URL = "https://chat.maritaca.ai/api/chat/completions";
const MARITACA_API_URL = process.env.MARITACA_API_URL;
const API_KEY = process.env.MARITACA_API_KEY;

app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "O campo 'message' é obrigatório" });

  try {
    const params = {
      model: "sabia-3",
      messages: [{ role: "user", content: message }],
    };

    const response = await fetch(MARITACA_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Key ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();


    const answer = data.answer || data.choices?.[0]?.message?.content || "Desculpe, não consegui entender.";
    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
