const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } = require('docx');
const fs = require('fs');

const FONT = "Times New Roman";
const SZ = 24;        // 12pt
const SZ_CIT = 22;    // 11pt para citação longa

// parágrafo de corpo: justificado, 1,5, recuo 1ª linha 1,25cm (708 dxa)
function P(runs) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 360, after: 0 },
    indent: { firstLine: 708 },
    children: runs,
  });
}
function T(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SZ, ...opts });
}
// citação longa: recuo 4cm (2268 dxa), espaço simples, fonte menor, sem aspas
function CIT(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 240, before: 240, after: 240 },
    indent: { left: 2268 },
    children: [new TextRun({ text, font: FONT, size: SZ_CIT })],
  });
}
function TITULO(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 360, after: 360 },
    children: [new TextRun({ text, font: FONT, size: SZ, bold: true })],
  });
}
function SUB(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, before: 360, after: 240 },
    children: [new TextRun({ text, font: FONT, size: SZ, bold: true })],
  });
}
// referência: alinhada à esquerda, espaço simples, espaço entre entradas
function REF(runs) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 240, after: 240 },
    children: runs,
  });
}

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: SZ } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },              // A4
        margin: { top: 1701, right: 1134, bottom: 1134, left: 1701 }, // 3/2/2/3 cm
      },
    },
    children: [

TITULO("FICHAMENTO — A CONSTRUÇÃO DO ESTUDO DE CASO CLÍNICO NAS ABORDAGENS COMPORTAMENTAIS E COGNITIVO-COMPORTAMENTAIS"),

SUB("Referência da obra fichada"),

REF([
  T("MANUAL para construção de estudo de caso clínico na clínica-escola: abordagens comportamentais e cognitivo-comportamentais. [S. l.: s. n.], 2026. Material didático não publicado."),
]),

SUB("Fichamento"),

P([ T("O manual define o estudo de caso clínico como construção técnico-científica, recusando sua redução ao registro administrativo do atendimento. A distinção proposta é operativa: o prontuário é o registro técnico que acompanha a prestação do serviço; o registro de sessão, o relato sintético de um atendimento; a formulação, a organização das informações que orienta as decisões clínicas; e o estudo de caso, a produção acadêmica que articula dados, teoria, hipóteses, intervenção e evolução, preservando o sigilo. Daí as advertências de que “prontuário não é estudo de caso” e de que o estudo “não é simplesmente copiar o prontuário” (Manual…, 2026). A recusa não é exclusiva das abordagens comportamentais. Canguçu (2021, p. 20), desde a psicanálise, observa que construir um caso “não consiste em descrições protocolares nem se reduz a registros de prontuários”, acrescentando que “ter um paciente não é o mesmo que ter um caso clínico – por isso, o caso precisa necessariamente ser construído”. A convergência entre campos epistemologicamente distantes sugere que a exigência de elaboração, e não de transcrição, é constitutiva do gênero.") ]),

P([ T("O princípio que organiza o manual é a precedência do dado sobre a hipótese: a sequência parte da coleta e da observação, passa pela identificação de padrões e chega às hipóteses, aos objetivos, à intervenção e ao monitoramento. O erro combatido é o percurso inverso, abrir o texto com uma explicação teórica e nela encaixar o paciente. O manual contrapõe a afirmação “o paciente é ansioso porque possui baixa autoestima”, que “apresenta uma conclusão sem demonstrar como ela foi construída”, à descrição das situações de exposição social em que o paciente relata antecipação de consequências negativas, esquiva e redução imediata do desconforto (Manual…, 2026). Decorre daí a exigência de operacionalização: “é inseguro” ou “é resistente” devem converter-se em comportamentos observáveis, como solicitar confirmação frequente ou abandonar tarefas diante da possibilidade de erro. A exigência tem respaldo empírico, pois Leonardi e Meyer (2015, p. 1148) registram que a intuição clínica") ]),

CIT("costuma estar repleta de vieses, falhas e distorções, a ponto de o terapeuta enxergar sucesso quando há indícios de fracasso. […] a perícia clínica é concebida como um conjunto rigoroso de competências que complementa (e não rivaliza com) a melhor evidência disponível."),

P([ T("As fontes previstas são a entrevista clínica, a observação e, quando tecnicamente indicado e autorizado, instrumentos e registros comportamentais. A entrevista deve investigar motivo da procura, queixa, início, frequência, intensidade e duração do problema, situações em que ocorre e em que não ocorre, consequências, tentativas anteriores de solução e fatores de risco e proteção. A observação deve ser descrita tecnicamente: em lugar de “paciente estava estranho”, registram-se a redução do contato visual, a diminuição do volume da voz e a mudança de assunto diante de determinado tema. A identificação deve ser codificada, e a história de vida entra apenas na medida em que contribua para a compreensão do caso, jamais como biografia.") ]),

P([ T("A análise organiza-se em torno da análise funcional, no modelo antecedentes–resposta–consequências, ampliado pelas operações estabelecedoras e pelos efeitos futuros. Conduzido o caso pela terapia cognitivo-comportamental, acrescenta-se a conceitualização de situação, pensamentos automáticos, emoções, comportamentos, consequências e crenças intermediárias e centrais, podendo-se recorrer ao modelo ABC. O manual insiste em que tais crenças “não devem ser simplesmente atribuídas ao paciente”, mas construídas a partir da avaliação (Manual…, 2026). A organização completa-se com a distinção entre fatores predisponentes, precipitantes, mantenedores e de proteção e com o levantamento de recursos e obstáculos, itens assumidos de Freire, Sousa e Hessel (2024), cujo modelo prevê, na hipótese compreensiva, precipitantes, origem, recursos, obstáculos e hipótese central.") ]),

P([ T("A hipótese clínica deve responder qual explicação, sustentada pelos dados disponíveis, melhor organiza o funcionamento apresentado, sem se apresentar como verdade absoluta. Dela derivam os objetivos de curto, médio e longo prazo — organização também tomada de Freire, Sousa e Hessel (2024) — e as intervenções, cada qual devendo responder por que é indicada para aquele paciente. O manual opõe a listagem de técnicas, como em “foram utilizadas técnicas de respiração, reestruturação cognitiva, exposição e relaxamento”, à justificativa que vincula a exposição gradual à hipótese de que a esquiva mantém o quadro (Manual…, 2026). A técnica subordina-se à formulação, e não o contrário.") ]),

P([ T("O monitoramento exige evidências de mudança — frequência, intensidade, duração, ampliação de repertório — e, quando possível, comparação de medidas antes e depois. Aqui se situa a advertência metodológica mais importante do manual: a sucessão temporal entre intervenção e melhora não autoriza inferência causal, razão pela qual se recomendam expressões como “após a intervenção, observou-se” ou “os dados sugerem”, vetando-se “a técnica curou o paciente”. A ressalva coincide com o IBAC (2024), que aponta como limitações do relato de caso a tendência a atribuir causalidade à intervenção que precede a melhora e a baixa generalização, sem que isso anule seu valor didático e heurístico.") ]),

P([ T("No plano ético e documental, a Resolução CFP nº 001/2009 torna obrigatório o registro decorrente da prestação de serviços psicológicos e determina, em seu artigo 3º, que “em caso de serviço psicológico prestado em serviços-escola e campos de estágio, o registro deve contemplar a identificação e a assinatura do responsável técnico/supervisor que responderá pelo serviço prestado, bem como do estagiário” (Conselho Federal de Psicologia, 2009). O Manual orientativo do CFP acrescenta que todo registro psicológico é material de natureza sigilosa, com restrição de acesso a terceiros, cabendo à profissional “construir um raciocínio clínico que a conduza no sentido de avaliar quais intervenções, procedimentos e observações devam ser registradas” (Conselho Federal de Psicologia, 2025). Note-se que tais normas regem o registro do serviço, não a produção acadêmica: o estudo de caso as pressupõe, mas delas se distingue quanto à finalidade e ao destinatário.") ]),

P([ T("Algumas reservas, contudo, merecem registro. A primeira diz respeito à transposição do modelo de Freire, Sousa e Hessel (2024). Os autores adaptaram às psicoterapias existenciais o instrumento de Eells (2015 apud Freire; Sousa; Hessel, 2024) e, ao fazê-lo, substituíram deliberadamente “hipóteses explanatórias” por “hipóteses compreensivas”, “diante das diversas críticas da incompatibilidade da psicopatologia fenomenológica e do pensamento existencial com o termo ‘explanatório’, já que não se pretende estabelecer relações de causalidade como nas ciências naturais” (Freire; Sousa; Hessel, 2024, p. 108). A escolha vocabular é, pois, decisão epistemológica situada, não detalhe de redação. Ao importar a organização do instrumento para uma clínica comportamental, o manual herda um vocabulário construído para recusar justamente o tipo de relação — funcional, entre comportamento e ambiente — que a análise do comportamento pretende estabelecer. A ressalva de que o modelo não é transposto literalmente atenua o problema, mas convém explicitar, no estudo de caso, que “hipótese” designa ali uma relação funcional sustentada por dados, e não uma compreensão de sentido.") ]),

P([ T("A segunda reserva é de outra ordem. Se o manual e Canguçu (2021) convergem ao recusar o protocolo, divergem quanto ao estatuto do texto: a autora sustenta, na trilha de Lacan, que a escrita do caso possui “estrutura de ficção” e a concebe como gênero literário, ao passo que o manual exige descrição operacional e observável. A tensão é real e não deve ser dissolvida, mas há entre ambos um ponto de contato pouco explorado. Canguçu (2021, p. 26) lembra que “as desejáveis distorções, encobrimentos e alterações necessárias para proteger o sigilo clínico pertencem ao método de tratamento”, chegando a relatar que condensou elementos de casos semelhantes na construção de um caso único — o que oferece fundamento teórico, e não apenas normativo, à identificação codificada que o manual prescreve. Registre-se, por fim, uma lacuna: ao advertir contra a inferência causal, o manual não menciona os delineamentos de caso único, embora Leonardi e Meyer (2015, p. 1148) registrem que a American Psychological Association “referenda diferentes tipos de métodos nomotéticos e idiográficos (ensaios clínicos randomizados, experimentos de caso único, estudos de caso)”. Indicar essa possibilidade permitiria compreender que a fragilidade inferencial não é atributo do caso único em si, mas do delineamento descritivo adotado, convertendo uma limitação a declarar em um problema de método a enfrentar.") ]),

P([ T("Resta, como critério de autoavaliação, a pergunta com que o manual encerra a discussão sobre a qualidade da formulação: se outro profissional qualificado lesse o texto, compreenderia por que determinada intervenção foi escolhida? Enquanto a resposta for negativa, a formulação ainda não está pronta.") ]),

SUB("Referências"),

REF([ T("CANGUÇU, Daniela. Escrever a clínica / construir o caso: o que se inscreve numa análise? "), T("Ágora: Estudos em Teoria Psicanalítica", { italics: true }), T(", Rio de Janeiro, v. 24, n. 1, p. 19-27, jan./abr. 2021. DOI: 10.1590/1809-44142021001003.") ]),

REF([ T("CONSELHO FEDERAL DE PSICOLOGIA. "), T("Manual orientativo de registro e elaboração de documentos psicológicos", { italics: true }), T(". 1. ed. Brasília, DF: CFP, 2025.") ]),

REF([ T("CONSELHO FEDERAL DE PSICOLOGIA. "), T("Resolução CFP nº 001/2009, de 30 de março de 2009", { italics: true }), T(". Dispõe sobre a obrigatoriedade do registro documental decorrente da prestação de serviços psicológicos. Brasília, DF: CFP, 2009.") ]),

REF([ T("FREIRE, Klessyo do Espirito Santo; SOUSA, Adria de Lima; HESSEL, Beatriz Ribeiro Cortez Cardozo Barata de Almeida. Adaptação de um modelo de formulação de caso clínico para as psicoterapias existenciais. "), T("Psicopatologia Fenomenológica Contemporânea", { italics: true }), T(", v. 13, n. 1, p. 88-116, 2024. DOI: 10.37067/rpfc.v13i1.1151.") ]),

REF([ T("INSTITUTO BRASILIENSE DE ANÁLISE DO COMPORTAMENTO. "), T("Estudo de caso: não é de se jogar fora", { italics: true }), T(". Brasília, DF: IBAC, 2024. Disponível em: https://ibac.com.br/estudo-de-caso-nao-e-de-se-jogar-fora/. Acesso em: 31 ago. 2026.") ]),

REF([ T("LEONARDI, Jan Luiz; MEYER, Sonia Beatriz. Prática baseada em evidências em Psicologia e a história da busca pelas provas empíricas da eficácia das psicoterapias. "), T("Psicologia: Ciência e Profissão", { italics: true }), T(", v. 35, n. 4, p. 1139-1156, 2015. DOI: 10.1590/1982-3703001552014.") ]),

REF([ T("MANUAL para construção de estudo de caso clínico na clínica-escola: abordagens comportamentais e cognitivo-comportamentais. [S. l.: s. n.], 2026. Material didático não publicado.") ]),

    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync('/home/user/claude-faculdade/fichamento/Fichamento_Estudo_de_Caso.docx', buf);
  console.log('OK');
});
