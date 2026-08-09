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
  spacing: { line: LINE, before: 200, after: 0 },
  children: [new TextRun({ text: texto, font: FONT, size: 24, bold: true })],
});

const tituloPrincipal = (texto) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { line: LINE, after: 200 },
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
    'CRIANÇA, a alma do negócio. Dir. Estela Renner. Maria Farinha Filmes, 2008, aprox. 50 min.',
    { semRecuo: true }
  ),

  titulo('1. Introdução'),
  corpo(
    'Lançado em 2008, Criança, a Alma do Negócio discutia a televisão aberta, mas produziu algo mais ' +
    'durável: um método para enxergar a publicidade infantil. O cenário técnico envelheceu; o problema ' +
    'cresceu. Sustento que sua crítica se radicalizou no ambiente digital — a publicidade dirigida a ' +
    'crianças é eticamente insustentável porque depende exatamente do que sua destinatária ainda não tem: ' +
    'a capacidade de reconhecer que está sendo persuadida. A internet não corrigiu essa assimetria; ' +
    'tornou-a invisível, contínua e personalizada.'
  ),

  titulo('2. As críticas centrais do documentário'),
  corpo(
    'A escolha formal do filme é também sua tese: em vez de acumular especialistas, ele põe a câmera diante ' +
    'de crianças e as deixa falar. Meninos e meninas de classes diferentes recitam jingles inteiros e ' +
    'descrevem produtos com precisão que não demonstram diante de conteúdo escolar algum. Daí a crítica ' +
    'cognitiva: a criança pequena não distingue programa de comercial e, quando distingue, não apreende a ' +
    'intenção persuasiva — não se defende do que não identifica como ataque.'
  ),
  corpo(
    'A crítica estratégica mostra a criança em três papéis: consumidora atual, consumidora futura, pela ' +
    'fidelização precoce à marca, e agente de pressão sobre o orçamento familiar — o que o mercado chama de ' +
    '"fator amolação". A consequencial elenca obesidade, adultização precoce e conflito doméstico. Mais ' +
    'desconfortáveis são as falas dos profissionais de marketing: não há vilania, há competência técnica ' +
    'descrevendo com naturalidade a exploração de uma vulnerabilidade — racionalidade instrumental sem ' +
    'atrito moral.'
  ),
  corpo(
    'O filme tem limites: é mais forte no diagnóstico que na proposta e trata a família de modo ' +
    'indiferenciado, sem examinar as condições materiais que tornam a mediação parental muito mais difícil ' +
    'para umas do que para outras. Ainda assim, para acusar, basta-lhe mostrar.'
  ),

  titulo('3. O que a internet mudou'),
  corpo(
    'A televisão oferecia uma moldura: o comercial tinha começo, fim e bloco próprio, o que tornava possível ' +
    'ensinar a criança a reconhecê-lo. No digital ela desapareceu, porque a publicidade deixou de ' +
    'interromper o conteúdo para se tornar o conteúdo. Outros três deslocamentos importam. Da audiência ao ' +
    'dado: a criança virou fonte de informação comportamental que alimenta perfis. Da massa à ' +
    'personalização: a mensagem se ajusta às fragilidades de uma criança específica. E a ubiquidade — o TIC ' +
    'Kids Online Brasil aponta que quase todas as crianças e adolescentes brasileiros estão conectados, ' +
    'sobretudo pelo celular, aparelho pessoal fora da supervisão que a televisão da sala permitia. Não há ' +
    'mais intervalo comercial porque não há intervalo.'
  ),

  titulo('4. Influenciadores, jogos e aplicativos'),
  corpo(
    'Os influenciadores são a mutação mais eficaz do modelo: a publicidade migrou da interrupção para o ' +
    'vínculo afetivo. A criança não vê um anunciante, vê alguém que percebe como amigo e em quem confia. ' +
    'Vídeos de unboxing são anúncios de meia hora que ela escolhe assistir, repetidamente. Quando o ' +
    'influenciador é ele mesmo uma criança, ela deixa de ser apenas alvo e vira instrumento de venda para ' +
    'outras crianças.'
  ),
  corpo(
    'Os jogos operam por outro mecanismo. Moedas virtuais como Robux, V-Bucks ou diamantes dissociam preço ' +
    'de valor, tornando o gasto abstrato para quem mal domina a noção de dinheiro. Caixas de recompensa ' +
    'funcionam por reforço intermitente variável, a arquitetura psicológica das máquinas de apostas. Passes ' +
    'de temporada fabricam escassez; skins convertem pertencimento em compra. Aplicativos completam o ' +
    'quadro com reprodução automática, rolagem infinita e sequências de dias, desenhados para maximizar o ' +
    'tempo de tela — a matéria-prima vendida ao anunciante.'
  ),

  titulo('5. Os desafios éticos'),
  corpo(
    'O primeiro é o consentimento: toda relação de consumo eticamente defensável pressupõe um agente ' +
    'informado e capaz de decidir, e a criança não é esse agente. A publicidade infantil não é uma relação ' +
    'de consumo mal protegida — é uma relação à qual falta o próprio pressuposto ético. O segundo é a ' +
    'instrumentalização: na formulação kantiana, a pessoa deve ser tratada sempre também como fim, nunca ' +
    'apenas como meio, e o marketing infantil converte a criança em canal de acesso ao orçamento familiar.'
  ),
  corpo(
    'O terceiro, e o mais decisivo, é a opacidade: essa publicidade só funciona enquanto não é percebida ' +
    'como tal. Uma prática cuja eficácia depende do desconhecimento de quem a recebe não sobrevive à ' +
    'divulgação dos próprios métodos — por isso o documentário incomoda apenas exibindo o que existe. O ' +
    'quarto é a vigilância: perfilar uma criança é modelar quem ainda está se constituindo como sujeito. O ' +
    'quinto é a diluição da responsabilidade entre anunciante, agência, plataforma e influenciador. Vale ' +
    'Hans Jonas: quanto maior a vulnerabilidade do afetado e o poder de quem age, mais extenso é o dever — ' +
    'não menos, como a fragmentação sugere.'
  ),

  titulo('6. A regulamentação é suficiente?'),
  corpo(
    'Na minha avaliação, a regulação brasileira é razoável no papel e insuficiente na prática. O arcabouço ' +
    'não é pequeno: o artigo 227 da Constituição estabelece a proteção integral; o Código de Defesa do ' +
    'Consumidor, no artigo 37, §2º, considera abusiva a publicidade que se aproveita da deficiência de ' +
    'julgamento e experiência da criança; a Resolução nº 163/2014 do CONANDA declara abusiva a publicidade ' +
    'dirigida ao público infantil; a LGPD restringe o tratamento de dados de crianças; e a Lei nº ' +
    '15.211/2025, o "ECA Digital", passou a exigir das plataformas verificação de idade e vinculação das ' +
    'contas de menores às dos responsáveis.'
  ),
  corpo(
    'A distância está entre norma e efeito. A fiscalização é reativa e depende de denúncia, chegando depois ' +
    'de a campanha cumprir seu objetivo. O CONAR é autorregulação: o setor julga a si mesmo, com sanção ' +
    'máxima de recomendação de sustação. As plataformas são globais e a jurisdição é nacional; a ' +
    'verificação de idade segue autodeclarada. E há falha de desenho: nossas normas descrevem publicidade ' +
    'com categorias televisivas — jingle, personagem, desenho animado — que se encaixam mal no vídeo de um ' +
    'influenciador ou na loja interna de um jogo. Enquanto o negócio for a monetização da atenção, cada ' +
    'regra corrigirá um sintoma e a causa seguirá intacta. Suécia e Noruega proíbem publicidade dirigida a ' +
    'menores há décadas: proibir é possível.'
  ),

  titulo('7. Responsabilidades e considerações finais'),
  corpo(
    'A responsabilidade primária é das marcas, porque a decisão de existir a campanha é delas — o que inclui ' +
    'responder pela cadeia inteira, do briefing à escolha do influenciador. As plataformas deixaram de ser ' +
    'neutras quando passaram a recomendar conteúdo: quem ordena, edita, e quem edita responde. Delas se ' +
    'exige não perfilar menores para fins publicitários, desativar por padrão o engajamento compulsivo e ' +
    'abrir-se a auditoria independente. Aos profissionais da comunicação cabe o núcleo ético: saber ' +
    'construir desejo é poder, e poder exige critério — o direito de recusa precisa ser parte legítima do ' +
    'ofício, não insubordinação.'
  ),
  corpo(
    'As famílias têm o dever de mediação, mas é preciso recusar a transferência integral do problema para ' +
    'os pais. "Cabe aos pais dizer não" é o argumento preferido do setor porque individualiza um problema ' +
    'estrutural e penaliza mais as famílias com menos tempo e recursos — as que o documentário mostra mais ' +
    'frágeis. A mediação parental é necessária e insuficiente. À escola cabe a educação midiática, única ' +
    'resposta que constrói autonomia em vez de apenas restringir.'
  ),
  corpo(
    'O maior mérito do documentário foi nomear a operação em curso: a conversão da infância em mercado. ' +
    'Mudou o meio — a publicidade televisiva era visível e finita, a digital é invisível e contínua —, não ' +
    'a estrutura. A pergunta ética do filme segue sem resposta: até que ponto é legítimo mobilizar as ' +
    'técnicas de persuasão mais sofisticadas já criadas contra alguém que não sabe que está sendo ' +
    'persuadido? Uma sociedade que responde "depende dos pais" já respondeu — e respondeu mal.'
  ),

  titulo('Referências'),
  ref('BRASIL. Código de Defesa do Consumidor. Lei nº 8.078/1990. Brasília, 1990.'),
  ref('BRASIL. Lei Geral de Proteção de Dados. Lei nº 13.709/2018. Brasília, 2018.'),
  ref('BRASIL. ECA Digital. Lei nº 15.211/2025. Brasília, 2025.'),
  ref('CONANDA. Resolução nº 163, de 13 de março de 2014. Brasília, 2014.'),
  ref('CRIANÇA, a alma do negócio. Dir. Estela Renner. São Paulo: Maria Farinha, 2008.'),
  ref('JONAS, Hans. O princípio responsabilidade. Rio de Janeiro: Contraponto, 2006.'),
  ref('KANT, I. Fundamentação da metafísica dos costumes. São Paulo: Barcarolla, 2009.'),
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
