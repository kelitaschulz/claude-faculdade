const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageOrientation,
} = require('docx');
const fs = require('fs');

const FONT = 'Arial';
const LINE = 360;          // espacamento 1,5 (240 = simples)
const INDENT = 709;        // recuo de primeira linha: 1,25 cm
const CM = 567;

const corpo = (texto, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: LINE, after: 0 },
  indent: { firstLine: opts.semRecuo ? 0 : INDENT },
  children: [new TextRun({ text: texto, font: FONT, size: 24 })],
});

const titulo = (texto) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: LINE, before: 140, after: 0 },
  children: [new TextRun({ text: texto, font: FONT, size: 24, bold: true })],
});

const tituloPrincipal = (texto) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { line: LINE, after: 140 },
  children: [new TextRun({ text: texto, font: FONT, size: 24, bold: true })],
});

const cabecalho = (texto) => new Paragraph({
  alignment: AlignmentType.RIGHT,
  spacing: { line: LINE, after: 0 },
  children: [new TextRun({ text: texto, font: FONT, size: 24 })],
});

const ref = (texto) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: LINE, after: 0 },
  children: [new TextRun({ text: texto, font: FONT, size: 24 })],
});

const filhos = [
  cabecalho('Disciplina: Ética'),
  cabecalho('Aluna: [seu nome completo]'),

  tituloPrincipal('A infância como mercado: uma leitura ética de Criança, a Alma do Negócio'),

  corpo(
    'RENNER, Estela (dir.). Criança, a alma do negócio. São Paulo: Maria Farinha Filmes, 2008. ' +
    '1 vídeo (49 min).',
    { semRecuo: true }
  ),

  titulo('1. Introdução'),
  corpo(
    'Entrei em Criança, a Alma do Negócio esperando um filme sobre propaganda e saí pensando no que a ' +
    'gente faz com quem ainda não sabe se defender. O documentário de Estela Renner é de 2008, e a ' +
    'distância entre a televisão que ele retrata e o celular que as crianças usam hoje é enorme. Mesmo ' +
    'assim o argumento continua de pé: a publicidade infantil é difícil de justificar eticamente porque ' +
    'depende de uma coisa só, que é a criança não perceber que está sendo convencida.'
  ),

  titulo('2. O que o filme mostra'),
  corpo(
    'Logo no início, entre 1 e 3 minutos, aparece o dado que organiza o filme: cerca de 80% das decisões de ' +
    'compra de uma casa passam pela criança (RENNER, 2008). Isso não descreve gosto infantil, descreve ' +
    'função: a criança virou canal de venda para o orçamento da família.'
  ),
  corpo(
    'O trecho mais forte está entre 5 e 8 minutos, quando fica claro que a publicidade não vende o produto, ' +
    'vende pertencimento. A promessa não é o brinquedo, é ser aceito por causa dele. Bauman (2008) descreve ' +
    'esse movimento ao mostrar uma sociedade em que as pessoas viram mercadoria e se validam pelo que ' +
    'exibem.'
  ),
  corpo(
    'O filme então acumula prova. Dos 13 aos 16 minutos aparecem crianças cercadas de brinquedos que nem ' +
    'conseguem usar. Entre 18 e 20 minutos, com a psicóloga Julia Marques, a discussão vai para a pressão ' +
    'do grupo: o consumo decide quem entra e quem fica de fora, e o resultado é uma padronização de festas ' +
    'e roupas que sufoca o que diferencia uma criança da outra.'
  ),

  titulo('3. Os pais também estão no alvo'),
  corpo(
    'Entre 21 e 23 minutos o documentário olha para os pais e fala em culpa e falta de tempo, com o presente ' +
    'ocupando o lugar da presença (RENNER, 2008). Concordo com o diagnóstico, mas o filme para cedo: ' +
    'descreve o comportamento dos pais sem perguntar o que o produziu.'
  ),
  corpo(
    'Quem cede não está sendo permissivo por preguiça, está comprimido por uma jornada que não deixa espaço ' +
    'para muito mais. Um adulto que sai cedo, volta à noite e ainda leva serviço para o fim de semana não ' +
    'tem como disputar atenção com uma tela ligada o dia inteiro. Comprar vira a forma disponível de dizer ' +
    'que se importa. Chamar isso de fracasso individual é ignorar que a mesma lógica que vende para a ' +
    'criança é a que consome o tempo do pai.'
  ),
  corpo(
    'Por isso me parece equivocado tratar a família como linha de defesa principal. Ela é o elo mais fraco ' +
    'da corrente, e é por isso que o mercado mira nela. Dizer que basta os pais dizerem não converte um ' +
    'problema estrutural em falha de caráter, e esse deslocamento pesa sobre quem tem menos tempo e menos ' +
    'dinheiro. Acompanhar é dever, mas exigir que a família resolva sozinha é passar ao mais fraco a ' +
    'responsabilidade do mais forte.'
  ),

  titulo('4. Da televisão para a tela do celular'),
  corpo(
    'É aqui que o filme mostra a idade. Em 2008 o comercial tinha moldura: começava, terminava e ocupava um ' +
    'bloco separado, coisa que dava para ensinar uma criança a reconhecer. Essa borda sumiu, e hoje a ' +
    'publicidade não interrompe o conteúdo, ela é o conteúdo.'
  ),
  corpo(
    'Mudou também de onde ela vem. Não é mais a campanha de uma grande marca em horário nobre, é um vídeo no ' +
    'YouTube ou no TikTok feito por alguém que a criança acompanha todo dia. Luccas Neto é o caso mais ' +
    'evidente no Brasil, com plateia de milhões de crianças e produtos licenciados próprios. O pai que ' +
    'enfrenta o pedido do filho não negocia com um anunciante, e sim com alguém em quem a criança confia, e ' +
    'que ela vê mais vezes por semana do que vê o próprio pai acordado.'
  ),
  corpo(
    'Os jogos seguem outro caminho. Robux, V-Bucks e diamantes afastam o preço do valor. Caixa de recompensa ' +
    'repete a lógica de prêmio aleatório das máquinas de apostas, passe de temporada fabrica pressa e skin ' +
    'transforma pertencer em compra. É a mesma pressão de grupo dos 18 minutos do filme, agora num sistema ' +
    'de pagamento aberto a qualquer hora.'
  ),

  titulo('5. Saúde e desafios éticos'),
  corpo(
    'Dos 36 aos 38 minutos o filme entra na saúde e o argumento vira dado. A ligação entre publicidade de ' +
    'ultraprocessado, sedentarismo e obesidade infantil tira o assunto do terreno da escolha individual: ' +
    'não foi a criança que escolheu mal, foi uma estratégia de marketing produzindo um problema de saúde ' +
    'pública.'
  ),
  corpo(
    'No plano ético, o problema mais básico é o consentimento. Qualquer relação de consumo ética supõe ' +
    'alguém informado, capaz de avaliar e recusar, e criança não é isso. Vem depois a instrumentalização: ' +
    'se a pessoa deve ser tratada sempre também como fim e nunca apenas como meio (KANT, 2009), aqueles 80% ' +
    'da abertura dizem tudo. Mais grave, porém, é que essa publicidade só rende enquanto passa ' +
    'despercebida. Uma prática que depende da ignorância de quem a recebe não sobreviveria se seus métodos ' +
    'fossem ditos em voz alta, e é por isso que o filme incomoda sem acusar ninguém. Some a isso a coleta ' +
    'de dados, que Zuboff (2021) descreve como base de um capitalismo que lucra prevendo comportamento, e a ' +
    'responsabilidade repartida entre anunciante, agência, plataforma e influenciador. Jonas (2006) serve ' +
    'aqui: para ele o dever cresce com a fragilidade de quem é afetado e o poder de quem age.'
  ),

  titulo('6. A regulamentação é suficiente?'),
  corpo(
    'O trecho entre 40 e 44 minutos é o mais político do filme, e mira o CONAR (RENNER, 2008). A ' +
    'crítica é certeira, porque se trata de autorregulação, o próprio setor publicitário julgando o setor ' +
    'publicitário, e a sanção mais dura é recomendar que o anúncio saia do ar, normalmente depois de a ' +
    'campanha já ter dado o retorno.'
  ),
  corpo(
    'Na minha opinião a regulação não é suficiente, ainda que o país tenha avançado desde 2008. Hoje existem ' +
    'o artigo 227 da Constituição (BRASIL, 1988), o artigo 37, §2º, do Código de Defesa do Consumidor ' +
    '(BRASIL, 1990), a Resolução nº 163 do CONANDA (2014), que considera abusiva a publicidade dirigida ao ' +
    'público infantil, a Lei Geral de Proteção de Dados (BRASIL, 2018) e a Lei nº 15.211/2025, o ECA ' +
    'Digital (BRASIL, 2025). No papel é bastante. Na prática a fiscalização é reativa e depende de ' +
    'denúncia, as empresas são globais enquanto a lei é nacional, e verificação de idade segue sendo a ' +
    'criança digitando outro ano de nascimento. As normas ainda descrevem publicidade em termos de jingle, ' +
    'personagem e desenho animado, categorias de televisão que não alcançam um vídeo de influenciador nem a ' +
    'loja interna de um jogo. O próprio filme já comparava o Brasil com países que legislaram de forma mais ' +
    'rígida, e a comparação continua constrangendo.'
  ),

  titulo('7. Responsabilidades e considerações finais'),
  corpo(
    'A responsabilidade maior é das marcas, porque a campanha só existe se elas quiserem, e isso inclui o ' +
    'briefing e a escolha do influenciador. As plataformas perderam o direito de se dizer neutras quando ' +
    'passaram a recomendar conteúdo, já que recomendar é editar. Delas seria razoável exigir que não usem ' +
    'perfis de menores para publicidade e desliguem por padrão os mecanismos de engajamento compulsivo. ' +
    'Para quem trabalha com comunicação, competência técnica não é neutra: saber despertar desejo ' +
    'é poder, e poder pede critério. À escola cabe a educação midiática, única resposta que forma autonomia ' +
    'em vez de proibir.'
  ),
  corpo(
    'O maior mérito do filme foi dar nome ao que estava acontecendo: a infância virando mercado. De 2008 ' +
    'para cá mudou o meio, não a estrutura. A propaganda de televisão era visível e acabava, a digital não ' +
    'é visível e não acaba. A pergunta que ficou comigo continua sem resposta boa: até onde é aceitável ' +
    'usar as melhores técnicas de persuasão já inventadas contra alguém que não sabe que está sendo ' +
    'persuadido, e ainda cobrar a conta de pais que mal têm tempo de chegar em casa acordados?'
  ),

  titulo('Referências'),
  ref('BAUMAN, Zygmunt. Vida para consumo: a transformação das pessoas em mercadoria. Rio de Janeiro: Zahar, 2008.'),
  ref('BRASIL. Constituição da República Federativa do Brasil de 1988. Brasília, 1988.'),
  ref('BRASIL. Lei nº 8.078, de 11 de setembro de 1990. Código de Defesa do Consumidor. Brasília, 1990.'),
  ref('BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados. Brasília, 2018.'),
  ref('BRASIL. Lei nº 15.211, de 17 de setembro de 2025. ECA Digital. Brasília, 2025.'),
  ref('CONANDA. Resolução nº 163, de 13 de março de 2014. Brasília, 2014.'),
  ref('JONAS, Hans. O princípio responsabilidade. Rio de Janeiro: Contraponto, 2006.'),
  ref('KANT, Immanuel. Fundamentação da metafísica dos costumes. São Paulo: Barcarolla, 2009.'),
  ref('RENNER, Estela (dir.). Criança, a alma do negócio. São Paulo: Maria Farinha Filmes, 2008. 1 vídeo (49 min).'),
  ref('ZUBOFF, Shoshana. A era do capitalismo de vigilância. Rio de Janeiro: Intrínseca, 2021.'),
];

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 24 },
        paragraph: { spacing: { line: LINE } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { orientation: PageOrientation.PORTRAIT },
        margin: { top: 3 * CM, bottom: 2 * CM, left: 3 * CM, right: 2 * CM },
      },
    },
    children: filhos,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('kelita_resenha_criança.docx', buffer);
  console.log('OK: kelita_resenha_criança.docx');
});
