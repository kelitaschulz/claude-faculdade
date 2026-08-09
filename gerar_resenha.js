const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageOrientation,
} = require('docx');
const fs = require('fs');

const FONT = 'Arial';
const LINE = 360;          // corpo do texto: espacamento 1,5
const SIMPLES = 240;       // cabecalho e referencias: espacamento simples (ABNT)
const INDENT = 709;        // recuo de primeira linha: 1,25 cm
const CM = 567;

// --- corpo do texto: justificado, recuo de 1,25 cm, entrelinhas 1,5 ---
const corpo = (texto, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: LINE, after: 0 },
  indent: { firstLine: opts.semRecuo ? 0 : INDENT },
  children: [new TextRun({ text: texto, font: FONT, size: 24 })],
});

// --- cabecalho institucional: esquerda, simples ---
const inst = (texto) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: SIMPLES, after: 0 },
  children: [new TextRun({ text: texto, font: FONT, size: 24 })],
});

// --- identificacao do aluno: direita, simples ---
const aluno = (texto) => new Paragraph({
  alignment: AlignmentType.RIGHT,
  spacing: { line: SIMPLES, after: 0 },
  children: [new TextRun({ text: texto, font: FONT, size: 24 })],
});

// --- titulo centralizado em caixa alta e negrito ---
const tituloCentral = (texto, opts = {}) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { line: LINE, before: opts.before || 0, after: opts.after || 0 },
  children: [new TextRun({ text: texto, font: FONT, size: 24, bold: true })],
});

// --- referencias ABNT: esquerda, simples, uma linha em branco entre elas ---
const ref = (texto) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: SIMPLES, after: 240 },
  children: [new TextRun({ text: texto, font: FONT, size: 24 })],
});

const vazio = (pontos) => new Paragraph({
  spacing: { line: SIMPLES, after: 0 },
  children: [new TextRun({ text: '', font: FONT, size: pontos || 24 })],
});

const filhos = [
  // ---------- CABECALHO INSTITUCIONAL ----------
  inst('[Nome da Universidade]'),
  inst('[Faculdade ou Centro]'),
  inst('[Departamento ou Curso]'),
  inst('Disciplina: Ética'),
  inst('Professor(a): [nome do(a) professor(a)]'),

  vazio(),

  // ---------- IDENTIFICACAO ----------
  aluno('[Seu nome completo]'),

  vazio(),

  // ---------- TITULO ----------
  tituloCentral('RESENHA CRÍTICA', { after: 240 }),

  // ---------- DADOS BIBLIOGRAFICOS DA OBRA RESENHADA ----------
  corpo(
    'RENNER, Estela. Criança, a alma do negócio. São Paulo: Maria Farinha Filmes, 2008. ' +
    '1 vídeo (49 min), son., color. Disponível em: https://www.youtube.com/watch?v=ur9lIf4RaZ4. ' +
    'Acesso em: 9 ago. 2026.',
    { semRecuo: true }
  ),

  vazio(),

  // ---------- P1: SOBRE A AUTORA ----------
  corpo(
    'Estela Renner é diretora e roteirista, cofundadora da Maria Farinha Filmes, produtora paulistana ' +
    'especializada em documentários de impacto social. Passou sete anos nos Estados Unidos, onde concluiu ' +
    'mestrado em Motion Pictures e trabalhou escrevendo e dirigindo séries de televisão, e ao voltar ao ' +
    'Brasil passou a dedicar sua obra a causas sociais e ambientais. Sua filmografia se concentra na ' +
    'infância: além de Criança, a Alma do Negócio, de 2008, ela assina Muito Além do Peso, de 2012, sobre ' +
    'obesidade infantil, e O Começo da Vida, de 2016, sobre os primeiros anos de desenvolvimento humano. ' +
    'Também dirigiu a série Aruanas. Seus dois primeiros documentários foram vistos por mais de dois ' +
    'milhões de pessoas e alimentaram o debate público sobre a regulação da publicidade dirigida a crianças.'
  ),

  // ---------- P2 e P3: RESUMO ----------
  corpo(
    'O documentário resenhado tem 49 minutos e dispensa narração, alternando depoimentos de crianças, ' +
    'entrevistas com especialistas e falas de profissionais de marketing. Logo no início, entre 1 e 3 ' +
    'minutos, aparece o dado que organiza a obra: cerca de 80% das decisões de compra de uma casa passam ' +
    'pela criança. Isso não descreve gosto infantil, descreve função, porque a criança é tratada como canal ' +
    'de venda para o orçamento da família. Entre 5 e 8 minutos o filme mostra que a publicidade não vende o ' +
    'produto, vende pertencimento, já que a promessa não é o brinquedo e sim ser aceito por causa dele. ' +
    'Bauman (2008) descreve esse movimento ao mostrar uma sociedade em que as pessoas viram mercadoria e se ' +
    'validam pelo que exibem.'
  ),
  corpo(
    'A partir daí a obra acumula evidência. Dos 13 aos 16 minutos aparecem crianças cercadas de brinquedos ' +
    'que nem conseguem usar. Entre 18 e 20 minutos, com a psicóloga Julia Marques, a discussão vai para a ' +
    'pressão do grupo, mostrando que o consumo decide quem entra e quem fica de fora e produz uma ' +
    'padronização de festas e roupas. Entre 21 e 23 minutos o filme trata dos pais, da culpa e da falta de ' +
    'tempo, com o presente ocupando o lugar da presença. Dos 36 aos 38 minutos entra a saúde, ligando ' +
    'publicidade de ultraprocessado, sedentarismo e obesidade infantil. O trecho entre 40 e 44 minutos é o ' +
    'mais político da obra e dirige sua crítica ao CONAR.'
  ),

  // ---------- P4 a P7: POSICIONAMENTO ----------
  corpo(
    'O ponto mais forte do filme é formal: ele não precisa argumentar, basta mostrar. As falas dos ' +
    'profissionais de marketing são mais desconfortáveis do que qualquer cena com criança, porque não há ' +
    'vilania ali, há competência técnica descrevendo com naturalidade a exploração de uma vulnerabilidade. ' +
    'Meu principal reparo, porém, está no tratamento dado às famílias. A obra descreve o comportamento dos ' +
    'pais sem perguntar o que o produziu. Quem cede não está sendo permissivo por preguiça, está comprimido ' +
    'por uma jornada de trabalho que não deixa espaço para muito mais, e comprar vira a forma disponível de ' +
    'dizer que se importa. Chamar isso de fracasso individual é ignorar que a mesma lógica econômica que ' +
    'vende para a criança é a que consome o tempo do pai.'
  ),
  corpo(
    'O segundo reparo é de época, e não é culpa da direção. Em 2008 o comercial ainda tinha moldura, porque ' +
    'começava, terminava e ocupava um bloco separado, coisa que dava para ensinar uma criança a reconhecer. ' +
    'Essa borda sumiu. Hoje a publicidade não interrompe o conteúdo, ela é o conteúdo, e mudou também de ' +
    'onde vem: não é mais a campanha de uma grande marca em horário nobre, é um vídeo no YouTube ou no ' +
    'TikTok feito por alguém que a criança acompanha todo dia. Luccas Neto é o caso mais evidente no ' +
    'Brasil, com plateia de milhões de crianças e produtos licenciados próprios. Os jogos operam por outro ' +
    'mecanismo, com moedas virtuais que afastam o preço do valor e caixas de recompensa que repetem a ' +
    'lógica de prêmio aleatório das máquinas de apostas.'
  ),
  corpo(
    'No plano ético, o problema mais básico é o consentimento, porque qualquer relação de consumo ' +
    'defensável supõe alguém informado, capaz de avaliar e recusar, e criança não é isso. Vem depois a ' +
    'instrumentalização: se a pessoa deve ser tratada sempre também como fim e nunca apenas como meio ' +
    '(KANT, 2009), aqueles 80% da abertura dizem tudo. A crítica ao CONAR também segue de pé e hoje tem ' +
    'respaldo empírico, pois Matos et al. (2023) analisaram as denúncias de publicidade de alimentos ' +
    'dirigida a crianças enviadas ao órgão entre 2010 e 2020 e encontraram apenas 98 casos, com tendência ' +
    'de queda, o que indica que a autorregulação não protege quem deveria proteger. Some a isso a coleta de ' +
    'dados, que Zuboff (2021) descreve como base de um capitalismo que lucra prevendo comportamento, e a ' +
    'responsabilidade repartida entre anunciante, agência, plataforma e influenciador. Jonas (2006) serve ' +
    'aqui: o dever cresce com a fragilidade de quem é afetado e o poder de quem age.'
  ),
  corpo(
    'Quanto à legislação, avalio que ainda não é suficiente, embora o país tenha avançado desde 2008. Hoje ' +
    'existem o artigo 227 da Constituição (BRASIL, 1988), o artigo 37, §2º, do Código de Defesa do ' +
    'Consumidor (BRASIL, 1990), a Resolução nº 163 do CONANDA (2014), que considera abusiva a publicidade ' +
    'dirigida ao público infantil, a Lei Geral de Proteção de Dados (BRASIL, 2018) e o Estatuto Digital da ' +
    'Criança e do Adolescente (BRASIL, 2025), em vigor desde março de 2026. No papel é bastante. Na prática ' +
    'a fiscalização é reativa e depende de denúncia, as empresas são globais enquanto a lei é nacional, e a ' +
    'verificação de idade segue sendo a criança digitando outro ano de nascimento. Cabe às marcas a ' +
    'responsabilidade primária, às plataformas o fim da alegação de neutralidade, aos profissionais de ' +
    'comunicação o critério sobre o que aceitam produzir, e à escola a educação midiática.'
  ),

  // ---------- P8: CONSIDERACOES FINAIS E RECOMENDACAO ----------
  corpo(
    'O maior mérito da obra foi ter nomeado um processo que já estava em curso: a transformação da infância ' +
    'em mercado consumidor. De 2008 para cá mudou o meio, não a estrutura, porque a propaganda de televisão ' +
    'era visível e acabava, ' +
    'enquanto a digital não é visível e não acaba. A linguagem é acessível e o filme não exige repertório ' +
    'prévio, o que amplia bastante seu alcance. A obra interessa diretamente a quem estuda ou trabalha com ' +
    'comunicação, publicidade e marketing, mas rende também na educação básica, na saúde e no direito da ' +
    'infância, além de valer a conversa dentro de casa. Faço uma ressalva quanto ao uso, não quanto à ' +
    'qualidade: por ser de 2008, ela precisa ser vista como documento de época e acompanhada de material ' +
    'sobre influenciadores digitais e economia de jogos. Isso não diminui o filme, apenas confirma que ele ' +
    'chegou cedo a um problema que só piorou.'
  ),

  // ---------- REFERENCIAS ----------
  tituloCentral('REFERÊNCIAS', { before: 280, after: 240 }),

  ref('BAUMAN, Zygmunt. Vida para consumo: a transformação das pessoas em mercadoria. Rio de Janeiro: Zahar, 2008.'),
  ref('BRASIL. [Constituição (1988)]. Constituição da República Federativa do Brasil de 1988. Brasília, DF: Presidência da República, 1988. Disponível em: https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm. Acesso em: 9 ago. 2026.'),
  ref('BRASIL. Lei nº 8.078, de 11 de setembro de 1990. Dispõe sobre a proteção do consumidor e dá outras providências. Brasília, DF: Presidência da República, 1990. Disponível em: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm. Acesso em: 9 ago. 2026.'),
  ref('BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD). Brasília, DF: Presidência da República, 2018. Disponível em: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm. Acesso em: 9 ago. 2026.'),
  ref('BRASIL. Lei nº 15.211, de 17 de setembro de 2025. Institui o Estatuto Digital da Criança e do Adolescente. Brasília, DF: Presidência da República, 2025. Disponível em: https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15211.htm. Acesso em: 9 ago. 2026.'),
  ref('CONANDA. Resolução nº 163, de 13 de março de 2014. Dispõe sobre a abusividade do direcionamento de publicidade e de comunicação mercadológica à criança e ao adolescente. Brasília, DF: Conselho Nacional dos Direitos da Criança e do Adolescente, 2014. Disponível em: https://www.gov.br/mdh/pt-br/acesso-a-informacao/participacao-social/conselho-nacional-dos-direitos-da-crianca-e-do-adolescente-conanda/resolucoes/resolucao-163-_publicidade-infantil.pdf. Acesso em: 9 ago. 2026.'),
  ref('JONAS, Hans. O princípio responsabilidade: ensaio de uma ética para a civilização tecnológica. Rio de Janeiro: Contraponto, 2006.'),
  ref('KANT, Immanuel. Fundamentação da metafísica dos costumes. São Paulo: Barcarolla, 2009.'),
  ref('MATOS, J. P.; GONDO, M.; MOTA, L. S. E.; HORTA, P. M. Publicidade de alimentos direcionada à criança e ao adolescente no Brasil: análise longitudinal de denúncias no CONAR. Ciência & Saúde Coletiva, v. 28, n. 7, p. 1959-1970, 2023. DOI: https://doi.org/10.1590/1413-81232023287.14752022. Acesso em: 9 ago. 2026.'),
  ref('RENNER, Estela. Criança, a alma do negócio. São Paulo: Maria Farinha Filmes, 2008. 1 vídeo (49 min), son., color. Disponível em: https://www.youtube.com/watch?v=ur9lIf4RaZ4. Acesso em: 9 ago. 2026.'),
  ref('ZUBOFF, Shoshana. A era do capitalismo de vigilância: a luta por um futuro humano na nova fronteira do poder. Rio de Janeiro: Intrínseca, 2021.'),
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
