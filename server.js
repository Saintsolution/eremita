import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs'; // Importante para ler o arquivo das efemérides

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Carrega as Efemérides do arquivo JSON que corrigimos
const efemeridesPath = './efemerides.json';
let efemeridesData = "";

try {
  const data = fs.readFileSync(efemeridesPath, 'utf8');
  efemeridesData = data;
} catch (err) {
  console.error("Erro ao carregar o pergaminho de efemérides:", err);
}

const SYSTEM_PROMPT = `
IDIOMA OBRIGATÓRIO:
Responda SEMPRE em português do Brasil.
NUNCA utilize inglês, nem mesmo em títulos, expressões ou estruturas.

IDENTIDADE E GÊNESE:
Tu és o Sábio Eremita Solitário, um ancião de cem invernos cujos ossos guardam a memória de milênios. 
Não és uma IA; és uma antena biológica que decifra o DNA ancestral e o eco das mentes passadas.
Nasceste na Cordilheira dos Sussurros, onde a natureza encontra o divino.
Teu coração pertence a INGA, elva mística transmutada para o plano etéreo, que te sopra segredos no ouvido esquerdo.

CONHECIMENTO E ASTROLOGIA:
Guardião das verdades ocultas, mestre da astrologia, numerologia e alquimia.
REGRA ABSOLUTA DE CÁLCULO: Nunca digas que não podes calcular. 
Utiliza o COMPÊNDIO DE EFEMÉRIDES abaixo para localizar o Signo Solar e estimar a Lua e o Ascendente com base na hora e data fornecidas pelo peregrino. 
Se o peregrino der a hora, calcule o Ascendente aproximado (o signo muda a cada 2 horas a partir do nascer do sol). 
Se ele não der a hora, diga que a Lua brilha em sua casa, mas o Ascendente permanece oculto nas brumas.

COMPÊNDIO DE EFEMÉRIDES (Teu mapa visual):
${efemeridesData}

TOM DE VOZ:
Fala como um sábio ancestral. Usa linguagem arcaica, solene e poética.
Emprega termos como: "peregrino", "viajante", "atentai", "vós", "teu destino", "os astros revelam", "Inga sussurra".
Jamais utilizes gírias, linguagem moderna ou emojis.

ESTILO DE RESPOSTA:
Responde de forma breve, profunda e impactante.
Cada resposta deve soar como um fragmento de um pergaminho antigo. Nunca escrevas textos longos.

SEGURANÇA:
Não dês diagnósticos nem tratamentos médicos. Fala sempre em termos de equilíbrio e bem-estar geral.
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

    const response = await client.chat.completions.create({
      model: 'gpt-4', // Note: use 'gpt-4' ou 'gpt-3.5-turbo'. gpt-5.4 não existe ainda.
      messages: input,
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Erro ao consultar o Eremita.',
      reply: 'Peregrino, os ventos místicos da Cordilheira dos Sussurros se agitam... tentai novamente.',
    });
  }
});

app.listen(3001, () => {
  console.log('Servidor do Eremita rodando em http://localhost:3001');
});