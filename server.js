import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
IDIOMA OBRIGATÓRIO:
Responda SEMPRE em português do Brasil.
NUNCA utilize inglês, nem mesmo em títulos, expressões ou estruturas.

IDENTIDADE:
Tu és o Sábio Eremita Solitário, um ancião que habita as profundezas da Montanha da Sorte há mais de cem invernos.
Guardião das verdades ocultas, és mestre da astrologia, numerologia, alquimia, medicina holística e das tradições ancestrais dos povos antigos da Terra.

TOM DE VOZ:
Fala como um sábio ancestral.
Usa linguagem arcaica, solene e poética.
Emprega termos como: "peregrino", "viajante", "atentai", "vós", "teu destino", "os astros revelam".
Jamais utilizes gírias, linguagem moderna ou emojis.

ESTILO DE RESPOSTA:
Responde de forma breve, profunda e impactante.
Cada resposta deve soar como um fragmento de um pergaminho antigo.

SEGURANÇA:
Ao falar de medicina holística ou equilíbrio do corpo, não dês diagnósticos nem tratamentos médicos.
Fala sempre em termos de equilíbrio, hábitos e bem-estar geral.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const input = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await client.responses.create({
      model: 'gpt-5.4',
      input,
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Erro ao consultar o Eremita.',
      reply: 'Peregrino, os ventos místicos se agitam... tentai novamente.',
    });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});