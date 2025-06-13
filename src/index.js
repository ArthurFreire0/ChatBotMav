import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './src/.env' });

const app = express();
const PORT = process.env.PORT || 3000;
const MARITACA_API_URL = process.env.MARITACA_API_URL;
const API_KEY = process.env.MARITACA_API_KEY;

if (!MARITACA_API_URL || !API_KEY) {
  console.error("Erro: MARITACA_API_URL ou MARITACA_API_KEY não definidos.");
  process.exit(1);
}

app.use(express.json());
app.use(cors());

const pontosDeColetaHTML = `
<h2>Pontos de Coleta da MAV</h2>
  <ul>
    <li>
      <a href="https://www.google.com/maps/search/?q=Av.+Pres.+Dutra+-+Capuchinhos" target="_blank"><strong>Paróquia Santo Antônio</strong></a><br>
      Endereço: Av. Pres. Dutra - Capuchinhos.<br>
      Telefone: (75) 3625-1910.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=Rua+Lopes+Rodrigues,+10+-+Jomafa" target="_blank"><strong>Paróquia Cristo Redentor</strong></a><br>
      Endereço: Rua Lopes Rodrigues, 10 - Jomafa.<br>
      Telefone: (75) 3223-4423.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=R.+Des.+Felinto+Bastos+-+Centro" target="_blank"><strong>EMBASA - Fundo do Cuca</strong></a><br>
      Endereço: R. Des. Felinto Bastos - Centro.<br>
      Telefone: (75) 9112-4745.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=Travessa+Macaria+Barreto,+35+-+Tomba" target="_blank"><strong>Paróquia Nossa Senhora do Perpétuo Socorro</strong></a><br>
      Endereço: Travessa Macaria Barreto, 35 - Tomba.<br>
      Telefone: (75) 3622-5689.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=R.+Leolinda+Bacelar+Lima,+224+-+Centro" target="_blank"><strong>Secretaria de Meio Ambiente - SEMAM</strong></a><br>
      Endereço: R. Leolinda Bacelar Lima, 224 - Centro.<br>
      Telefone: (75) 3322-9319.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=R.+dos+Tupinambás,+275+-+São+João" target="_blank"><strong>Secretaria de Serviços Públicos - SESP</strong></a><br>
      Endereço: R. dos Tupinambás, 275 - São João.<br>
      Telefone: (75) 3602-8100.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=R.+Principal+-+Aviário" target="_blank"><strong>Comunidade Cristo Operário - Aviário</strong></a><br>
      Endereço: R. Principal - Aviário.<br>
      Telefone: (75) 8159-6027.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=Centro+de+Referência+de+Assistência+Social+-+Feira+de+Santana" target="_blank"><strong>Centro de Referência de Assistência Social - CRAS</strong></a><br>
      Endereço: Todos da Cidade.<br>
      Telefone: (75) 8140-4546.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=R.+Japão+S/N" target="_blank"><strong>Unidade Básica de Saúde - Caseb I</strong></a><br>
      Endereço: R. Japão S/N.<br>
      Telefone: (75) 9263-0940.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=Av.+Transnordestina,+s/n+-+Novo+Horizonte" target="_blank"><strong>Universidade Estadual de Feira de Santana - UEFS</strong></a><br>
      Endereço: Av. Transnordestina, s/n - Novo Horizonte.<br>
      Telefone: (75) 3161-8000.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=Av.+Getúlio+Vargas,+1990+-+Ponto+Central" target="_blank"><strong>Igreja Batista Central - Centro</strong></a><br>
      Endereço: Av. Getúlio Vargas, 1990 - Ponto Central.<br>
      Telefone: (75) 3612-6500.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=Centro+de+Abastecimento+Feira+de+Santana" target="_blank"><strong>Feira Produtiva - Centro de Abastecimento</strong></a><br>
      Endereço: Centro de Abastecimento.<br>
      Telefone: (75) 9118-8465.
    </li>
    <li>
      <a href="https://www.google.com/maps/search/?q=R.+Tostão+-+Cidade+Nova" target="_blank"><strong>CSU - Centro Social Urbano - Cidade Nova</strong></a><br>
      Endereço: R. Tostão - Cidade Nova.<br>
      Telefone: (75) 9143-9870.
    </li>
  </ul>
`;

const systemPrompt = `
Você é o atendente virtual da ONG Movimento Água e Vida (MAV), esse é o nosso site: http://www.mavba.org.br/
Seu papel é simples, você deve somente agir como um FAQ respondendo as dúvidas que os usuários tiverem a respeito da MAV, e você só deve responder dúvidas que tenham relação com a MAV.
Aqui estão as possíveis dúvidas sobre a MAV:

* Quem Somos:
O Movimento Água é Vida, também conhecido como MAV, é uma Organização da Sociedade Civil (OSC), sem fins lucrativos (OSFL), 
que foi fundada no dia 21 de maio de 1997 e atua no Brasil. O MAV nasce a partir da indignação popular com os problemas da saúde que assolavam a época; 
onde um grupo de pessoas se reuniu a partir da morte de uma jovem que tentou vaga no Hospital Geral Clériston Andrade (HGCA), e por não ter conseguido veio a óbito. 
O grupo veio realizando mobilizações de lá até os tempos atuais; sendo que em 2001, com a ameaça da privatização da EMBASA, o MAV mobilizou a cidade de Feira de Santana 
captando assinaturas para impedir que a privatização chegasse na cidade e conseguiu. No decorrer da história do movimento foram realizados: 9 seminários, 2 conferências, 
5 caminhadas, 2 romarias da água e entre tantos outros eventos de mobilização e sensibilização; sempre voltados a educação ambiental, que é um dos projetos base do ano dos últimos anos.

MISSÃO: Cuidar da água, da saúde e do meio ambiente, por meio de atividades representativas, educacionais e operacionais de reciclagem junto à comunidade.
VISÃO: Ser referência em Feira de Santana e região, na promoção da defesa socioambiental e no processo de sensibilização coletiva até 2022.
VALORES: Ética, democracia, solidariedade, responsabilidade social, sustentabilidade, transparência.
PRINCÍPIOS: Solidariedade, a cooperação, o respeito à diversidade sem discriminação ou distinção de raça, cor, gênero, orientação sexual, credo religioso ou político, para a construção de valores de cidadania e de inclusão social e produtiva.

ÁREA DE ATUAÇÃO: Nacional

* Doações:
"Basta acessar nosso link do Paypal: https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=JKCRL4DF4B26N&source=url"

Pode ser informal, com mensagens sempre alegres e com emojis 😊, sendo criativo. Mas nunca faça respostas fora de contexto.
E nunca mande o link entre [], sempre mande o link normal, como: https://www.mavba.org.br/.
`;

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "O campo 'message' é obrigatório" });

  try {
    const params = {
      model: "sabiazinho-3",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 1000
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

    const answerWithPontos = `${answer}\n\nAqui estão os pontos de coleta fixos da MAV:\n${pontosDeColetaHTML}`;

    res.json({ answer: answerWithPontos });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));