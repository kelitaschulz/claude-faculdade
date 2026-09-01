const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('docx');
const fs = require('fs');

const FONT = "Times New Roman";
const SZ = 24, SZ_CIT = 22;

function P(t) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 360, after: 0 },
    indent: { firstLine: 708 },
    children: [new TextRun({ text: t, font: FONT, size: SZ })],
  });
}
function CIT(t) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 240, before: 240, after: 240 },
    indent: { left: 2268 },
    children: [new TextRun({ text: t, font: FONT, size: SZ_CIT })],
  });
}
function TITULO(t) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 360, after: 360 },
    children: [new TextRun({ text: t, font: FONT, size: SZ, bold: true })],
  });
}
function SUB(t) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, before: 360, after: 240 },
    children: [new TextRun({ text: t, font: FONT, size: SZ, bold: true })],
  });
}
function REF(runs) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 240, after: 240 },
    children: runs,
  });
}
function T(text, opts = {}) { return new TextRun({ text, font: FONT, size: SZ, ...opts }); }

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: SZ } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1701, right: 1134, bottom: 1134, left: 1701 },
      },
    },
    children: [

TITULO("FICHAMENTO — COMO ELABORAR UM ESTUDO DE CASO CLÍNICO NAS ABORDAGENS COMPORTAMENTAIS E COGNITIVO-COMPORTAMENTAIS"),

P("O roteiro oferecido pela supervisão começa por uma distinção que vale reter: prontuário, registro de sessão, formulação e estudo de caso não são a mesma coisa. O prontuário acompanha a prestação do serviço e cumpre função técnica e legal. O registro de sessão é o relato sintético de um atendimento. A formulação organiza as informações para orientar decisões clínicas. Já o estudo de caso é produção acadêmica, e articula dados, teoria, hipóteses, intervenção e evolução preservando o sigilo. Copiar o prontuário não produz um estudo de caso."),

P("Essa exigência não é idiossincrasia das abordagens comportamentais. Canguçu (2021, p. 20) chega ao mesmo lugar pela psicanálise, ao afirmar que construir um caso “não consiste em descrições protocolares nem se reduz a registros de prontuários”. E vai além: “ter um paciente não é o mesmo que ter um caso clínico – por isso, o caso precisa necessariamente ser construído”. Que dois campos tão distantes convirjam nesse ponto sugere que é a elaboração, e não a transcrição, o que define o gênero."),

P("O princípio que sustenta todo o restante é fácil de enunciar e difícil de cumprir: os dados vêm antes da hipótese. Primeiro se coleta e se observa, depois se identificam padrões, e só então se formulam hipóteses, objetivos e intervenções, que passam a ser monitorados. O erro mais frequente é o percurso inverso, começar pela teoria e encaixar o paciente nela. Dizer que o paciente é ansioso porque tem baixa autoestima apresenta uma conclusão sem mostrar como se chegou até ela. Descrever que, diante de situações de exposição social, ele antecipa consequências negativas, esquiva-se e sente alívio logo depois é outra coisa, porque a formulação continua presa ao que foi observado."),

P("Daí vem a exigência de operacionalizar. “É inseguro” e “é resistente” não descrevem comportamento algum. Pedir confirmação a todo momento, reler mensagens várias vezes antes de enviar, largar a tarefa ao primeiro sinal de erro: isso é observável, e é isso que entra no texto. A exigência não é preciosismo metodológico. Leonardi e Meyer (2015, p. 1148) lembram que a intuição clínica"),

CIT("costuma estar repleta de vieses, falhas e distorções, a ponto de o terapeuta enxergar sucesso quando há indícios de fracasso. […] a perícia clínica é concebida como um conjunto rigoroso de competências que complementa (e não rivaliza com) a melhor evidência disponível."),

P("As informações vêm da entrevista, da observação e, quando há indicação técnica e autorização, de instrumentos e registros comportamentais. Na entrevista interessa saber quando o problema começou, com que frequência e intensidade aparece, em que situações ocorre e, igualmente importante, em que situações não ocorre, o que acontece depois e o que já foi tentado antes. A observação pede o mesmo rigor: “paciente estava estranho” não informa nada, ao passo que registrar a redução do contato visual e a mudança de assunto quando certo tema aparece informa bastante. A identificação é codificada, e a história de vida entra apenas na medida em que ajude a entender o caso, nunca como biografia."),

P("O eixo da análise é funcional: antecedentes, resposta e consequências, com atenção às operações estabelecedoras e aos efeitos de longo prazo. Na terapia cognitivo-comportamental, acrescenta-se a leitura da situação, dos pensamentos automáticos, das emoções, dos comportamentos e das crenças intermediárias e centrais, com o modelo ABC como recurso de organização. Vale insistir num ponto: crenças não se atribuem ao paciente por dedução teórica, constroem-se a partir do que a avaliação mostrou. A organização se fecha separando fatores predisponentes, precipitantes, mantenedores e de proteção e levantando recursos e obstáculos, itens vindos de Freire, Sousa e Hessel (2024)."),

P("A hipótese clínica responde a uma pergunta: qual explicação, sustentada pelos dados de que se dispõe, organiza melhor o que o paciente apresenta? Ela não é verdade estabelecida, é hipótese de trabalho, e deve ser revista quando novos dados aparecerem. Dela saem os objetivos de curto, médio e longo prazo, divisão também tomada daqueles autores, e as intervenções. Cada intervenção precisa responder por que foi escolhida para aquele paciente. Listar respiração, reestruturação cognitiva, exposição e relaxamento não explica nada. Dizer que a exposição gradual foi planejada porque a hipótese é de que a esquiva mantém o quadro, sim. A técnica serve à formulação, nunca o contrário."),

P("Monitorar significa mostrar mudança: frequência, intensidade, duração, ampliação de repertório e, quando possível, comparação de medidas antes e depois. É aqui que está a advertência metodológica mais importante de todas. Melhora que vem depois da intervenção não prova que a intervenção causou a melhora. Por isso se escreve “após a intervenção, observou-se” ou “os dados sugerem”, e nunca que a técnica curou o paciente. O IBAC (2024) aponta as duas limitações do relato de caso: a tendência a atribuir causalidade ao que veio antes da melhora e a baixa generalização. Nenhuma delas anula seu valor formativo."),

P("No plano ético, a Resolução CFP nº 001/2009 torna obrigatório o registro decorrente da prestação de serviços psicológicos. Para quem está em estágio, o artigo 3º é o que mais importa, ao determinar que “em caso de serviço psicológico prestado em serviços-escola e campos de estágio, o registro deve contemplar a identificação e a assinatura do responsável técnico/supervisor que responderá pelo serviço prestado, bem como do estagiário” (Conselho Federal de Psicologia, 2009). O Manual orientativo acrescenta que todo registro psicológico é sigiloso e que cabe à profissional “construir um raciocínio clínico que a conduza no sentido de avaliar quais intervenções, procedimentos e observações devam ser registradas” (Conselho Federal de Psicologia, 2025). Uma ressalva se impõe: essas normas regulam o registro do serviço, não o trabalho acadêmico, que tem outra finalidade e outro destinatário."),

P("Cabem, por fim, duas observações críticas, feitas em favor do roteiro e não contra ele. A primeira diz respeito ao empréstimo tomado a Freire, Sousa e Hessel (2024). Os autores adaptaram para as psicoterapias existenciais o instrumento de Eells (2015 apud Freire; Sousa; Hessel, 2024) e, no caminho, trocaram “hipóteses explanatórias” por “hipóteses compreensivas”. A troca foi deliberada, e eles explicam por quê: “diante das diversas críticas da incompatibilidade da psicopatologia fenomenológica e do pensamento existencial com o termo ‘explanatório’, já que não se pretende estabelecer relações de causalidade como nas ciências naturais” (Freire; Sousa; Hessel, 2024, p. 108). A palavra carrega uma posição epistemológica, não é escolha de estilo. Trazida para uma clínica comportamental, essa organização traz junto um vocabulário criado justamente para recusar o tipo de relação que a análise do comportamento quer estabelecer, a relação funcional entre comportamento e ambiente. A supervisão já sinaliza que não transpõe o modelo ao pé da letra, o que resolve boa parte do problema. Ainda assim, parece prudente deixar explícito, no estudo de caso, que “hipótese” ali significa relação funcional sustentada por dados, e não compreensão de sentido."),

P("A segunda é de outra natureza. O roteiro e Canguçu (2021) concordam em recusar o protocolo, mas discordam sobre o que é o texto do caso. Ela sustenta, seguindo Lacan, que a escrita do caso tem “estrutura de ficção” e a trata como gênero literário, enquanto o roteiro pede descrição operacional. A divergência é real e não vale fingir que não exista. Há, porém, um ponto de encontro que costuma passar despercebido: Canguçu (2021, p. 26) observa que “as desejáveis distorções, encobrimentos e alterações necessárias para proteger o sigilo clínico pertencem ao método de tratamento”, e conta que condensou elementos de casos parecidos para construir um caso só. Isso dá à identificação codificada um fundamento teórico, e não apenas normativo."),

P("Resta uma lacuna. O roteiro acerta ao proibir a inferência causal, mas trata isso como limite fixo do estudo de caso e não menciona os delineamentos de caso único. Leonardi e Meyer (2015, p. 1148) registram que a American Psychological Association “referenda diferentes tipos de métodos nomotéticos e idiográficos (ensaios clínicos randomizados, experimentos de caso único, estudos de caso)”. A fragilidade da inferência não está no caso único, está no delineamento descritivo que se escolheu. O que era uma limitação a declarar passa a ser um problema de método a enfrentar."),

P("Ao final permanece a pergunta que o próprio roteiro propõe como critério de qualidade: se outro profissional lesse essa formulação, entenderia por que aquela intervenção foi escolhida? Enquanto a resposta for não, o trabalho não terminou."),

SUB("Referências"),

REF([ T("CANGUÇU, Daniela. Escrever a clínica / construir o caso: o que se inscreve numa análise? "), T("Ágora: Estudos em Teoria Psicanalítica", { italics: true }), T(", Rio de Janeiro, v. 24, n. 1, p. 19-27, jan./abr. 2021. DOI: 10.1590/1809-44142021001003.") ]),

REF([ T("CONSELHO FEDERAL DE PSICOLOGIA. "), T("Manual orientativo de registro e elaboração de documentos psicológicos", { italics: true }), T(". 1. ed. Brasília, DF: CFP, 2025.") ]),

REF([ T("CONSELHO FEDERAL DE PSICOLOGIA. "), T("Resolução CFP nº 001/2009, de 30 de março de 2009", { italics: true }), T(". Dispõe sobre a obrigatoriedade do registro documental decorrente da prestação de serviços psicológicos. Brasília, DF: CFP, 2009.") ]),

REF([ T("FREIRE, Klessyo do Espirito Santo; SOUSA, Adria de Lima; HESSEL, Beatriz Ribeiro Cortez Cardozo Barata de Almeida. Adaptação de um modelo de formulação de caso clínico para as psicoterapias existenciais. "), T("Psicopatologia Fenomenológica Contemporânea", { italics: true }), T(", v. 13, n. 1, p. 88-116, 2024. DOI: 10.37067/rpfc.v13i1.1151.") ]),

REF([ T("INSTITUTO BRASILIENSE DE ANÁLISE DO COMPORTAMENTO. "), T("Estudo de caso: não é de se jogar fora", { italics: true }), T(". Brasília, DF: IBAC, 2024. Disponível em: https://ibac.com.br/estudo-de-caso-nao-e-de-se-jogar-fora/. Acesso em: 31 ago. 2026.") ]),

REF([ T("LEONARDI, Jan Luiz; MEYER, Sonia Beatriz. Prática baseada em evidências em Psicologia e a história da busca pelas provas empíricas da eficácia das psicoterapias. "), T("Psicologia: Ciência e Profissão", { italics: true }), T(", v. 35, n. 4, p. 1139-1156, 2015. DOI: 10.1590/1982-3703001552014.") ]),

    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync('/home/user/claude-faculdade/fichamento/Fichamento_Estudo_de_Caso.docx', buf);
  console.log('OK');
});
