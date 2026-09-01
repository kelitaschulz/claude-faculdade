const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('docx');
const fs = require('fs');
const FONT = "Times New Roman", SZ = 24;

const P = t => new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { line: 360, after: 0 },
  indent: { firstLine: 708 }, children: [new TextRun({ text: t, font: FONT, size: SZ })] });
const TITULO = t => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 360, after: 360 },
  children: [new TextRun({ text: t, font: FONT, size: SZ, bold: true })] });
const SUB = t => new Paragraph({ alignment: AlignmentType.LEFT, spacing: { line: 360, before: 360, after: 240 },
  children: [new TextRun({ text: t, font: FONT, size: SZ, bold: true })] });
const REF = runs => new Paragraph({ alignment: AlignmentType.LEFT, spacing: { line: 240, after: 240 }, children: runs });
const T = (text, o = {}) => new TextRun({ text, font: FONT, size: SZ, ...o });

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: SZ } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 },
      margin: { top: 1701, right: 1134, bottom: 1134, left: 1701 } } },
    children: [

TITULO("FICHAMENTO — O ESTUDO DE CASO CLÍNICO NA TERAPIA COGNITIVO-COMPORTAMENTAL: O QUE É E COMO SE CONSTRÓI"),

P("O estudo de caso é a investigação detalhada de um caso único, seja uma pessoa, um grupo ou uma situação, construída a partir de observação clínica, entrevistas, questionários, testes e registros como o prontuário (IBAC, 2024). Seu valor na formação não está no volume de informação reunida, mas em tornar visível o percurso do raciocínio clínico. Dito de outro modo: um estudo de caso está bem feito quando outro psicólogo, ao lê-lo, consegue entender por que aquelas hipóteses foram levantadas e por que aquelas intervenções foram escolhidas. É essa exigência que explica cada uma das etapas descritas a seguir."),

P("Se é o raciocínio que precisa ficar visível, copiar o prontuário não produz um estudo de caso, porque o prontuário registra o que aconteceu, e não por que se concluiu o que se concluiu. Canguçu (2021, p. 20) afirma que construir um caso “não consiste em descrições protocolares nem se reduz a registros de prontuários”, e condensa a diferença numa frase: “ter um paciente não é o mesmo que ter um caso clínico – por isso, o caso precisa necessariamente ser construído”. Escrever o caso é um segundo trabalho, distinto de atender."),

P("O que torna esse raciocínio reconstruível é uma formulação explícita, isto é, o processo de desenvolver hipóteses e planos terapêuticos sobre as causas, os precipitantes e os mecanismos que mantêm os problemas do paciente (Freire; Sousa; Hessel, 2024). Na terapia cognitivo-comportamental a tarefa se chama conceitualização cognitiva e funciona, segundo Beck (1997 apud Neufeld; Cavenage, 2010, p. 7), como “um mapa que orienta o trabalho a ser realizado com o cliente”. Sem mapa, ninguém refaz o percurso. Neufeld e Cavenage (2010, p. 9) são diretas quanto ao custo de dispensá-lo: “sem a compreensão cognitiva do cliente, todo o tratamento se resumirá à aplicação de várias técnicas cognitivas e comportamentais, que não resultarão em um trabalho eficaz”."),

P("A construção segue etapas. Neufeld e Cavenage (2010) propõem seis, voltadas a terapeutas iniciantes: psicoeducação sobre o modelo cognitivo, antes de qualquer conceitualização; levantamento de situações, pensamentos automáticos, emoções, reações fisiológicas e comportamentos do cotidiano; registro desses dados no diagrama de conceitualização; identificação do significado dos pensamentos automáticos; identificação das crenças centrais, das intermediárias e das estratégias compensatórias; e sedimentação da natureza cíclica do sistema de crenças, com o traçado de metas. O modelo de Freire, Sousa e Hessel (2024), vindo de outra tradição, percorre a mesma lógica em sete itens, da identificação e da história clínica à lista de problemas, à hipótese compreensiva — precipitantes, origem, recursos, obstáculos e hipótese central — e aos objetivos de curto, médio e longo prazo. Em ambos o caminho é idêntico: dados primeiro, padrões depois, hipótese em seguida, plano por último."),

P("Nada disso protege sozinho contra a formulação inventada, e daí três salvaguardas. A colaboração: Neufeld e Cavenage (2010, p. 24) advertem que “não se deve apresentar o cliente para ele mesmo, como se o terapeuta soubesse tudo a seu respeito”, e recomendam que o próprio cliente preencha o diagrama em sessão. A supervisão, condição para adquirir a habilidade antes da prática efetiva. E a desconfiança da intuição, que segundo Leonardi e Meyer (2015, p. 1148) “costuma estar repleta de vieses, falhas e distorções, a ponto de o terapeuta enxergar sucesso quando há indícios de fracasso”."),

P("Reconstruir um raciocínio exige que os dados existam por escrito. A Resolução CFP nº 001/2009 fixa o conteúdo mínimo do registro: identificação, avaliação da demanda e definição dos objetivos, evolução do trabalho e procedimentos adotados, encaminhamento ou encerramento. Para o estágio, o artigo 3º exige que conste “a identificação e a assinatura do responsável técnico/supervisor que responderá pelo serviço prestado, bem como do estagiário” (Conselho Federal de Psicologia, 2009), e o Manual orientativo acrescenta que todo registro é sigiloso (Conselho Federal de Psicologia, 2025). Essas normas regem o serviço, não o trabalho acadêmico, ainda que este dependa daquele."),

P("Resta perguntar até onde esse raciocínio autoriza conclusões, e a resposta é modesta. O IBAC (2024) adverte que a melhora observada depois de uma intervenção não permite concluir que a intervenção a produziu, e que um caso isolado não sustenta afirmações de eficácia para outros pacientes. A crítica mais incômoda vem de dentro da própria terapia cognitivo-comportamental: Bieling e Kuyken (2003 apud Neufeld; Cavenage, 2010, p. 16) concluem que a confiabilidade da conceitualização “pode ser obtida através dos aspectos descritivos do mesmo, mas não com os aspectos inferenciais”, ou seja, descrever o funcionamento é replicável, inferir crenças a partir dele não é. Pesa ainda que Persons et al. (2006 apud Neufeld; Cavenage, 2010) não encontraram diferença de desfecho entre pacientes tratados com e sem ênfase em conceitualização, e que as próprias autoras admitem que “a escassez de pesquisas na área traz dúvidas sobre o valor positivo da conceitualização de caso em TCC” (Neufeld; Cavenage, 2010, p. 30)."),

P("Isso não desqualifica o instrumento, mas define seu estatuto: a formulação vale como organizador do raciocínio, não como prova. E a fragilidade inferencial não está no caso único em si, já que Leonardi e Meyer (2015, p. 1148) registram que a American Psychological Association “referenda diferentes tipos de métodos nomotéticos e idiográficos (ensaios clínicos randomizados, experimentos de caso único, estudos de caso)”, mas no delineamento descritivo que se escolhe. Fecha-se assim o percurso iniciado no começo: se o estudo de caso vale pelo que torna reconstruível, seus critérios de qualidade são os que Rangé (2004 apud Neufeld; Cavenage, 2010, p. 29) enumera — ter utilidade, ser simples, ser teoricamente coerente, explicar comportamentos passados, dar sentido aos presentes e permitir prever os futuros. Um caso que não cumpre isso pode estar bem escrito, mas não ensina nada a quem o lê."),

SUB("Referências"),

REF([ T("CANGUÇU, Daniela. Escrever a clínica / construir o caso: o que se inscreve numa análise? "), T("Ágora: Estudos em Teoria Psicanalítica", { italics: true }), T(", Rio de Janeiro, v. 24, n. 1, p. 19-27, jan./abr. 2021. DOI: 10.1590/1809-44142021001003.") ]),
REF([ T("CONSELHO FEDERAL DE PSICOLOGIA. "), T("Manual orientativo de registro e elaboração de documentos psicológicos", { italics: true }), T(". 1. ed. Brasília, DF: CFP, 2025.") ]),
REF([ T("CONSELHO FEDERAL DE PSICOLOGIA. "), T("Resolução CFP nº 001/2009, de 30 de março de 2009", { italics: true }), T(". Dispõe sobre a obrigatoriedade do registro documental decorrente da prestação de serviços psicológicos. Brasília, DF: CFP, 2009.") ]),
REF([ T("FREIRE, Klessyo do Espirito Santo; SOUSA, Adria de Lima; HESSEL, Beatriz Ribeiro Cortez Cardozo Barata de Almeida. Adaptação de um modelo de formulação de caso clínico para as psicoterapias existenciais. "), T("Psicopatologia Fenomenológica Contemporânea", { italics: true }), T(", v. 13, n. 1, p. 88-116, 2024. DOI: 10.37067/rpfc.v13i1.1151.") ]),
REF([ T("INSTITUTO BRASILIENSE DE ANÁLISE DO COMPORTAMENTO. "), T("Estudo de caso: não é de se jogar fora", { italics: true }), T(". Brasília, DF: IBAC, 2024. Disponível em: https://ibac.com.br/estudo-de-caso-nao-e-de-se-jogar-fora/. Acesso em: 1 set. 2026.") ]),
REF([ T("LEONARDI, Jan Luiz; MEYER, Sonia Beatriz. Prática baseada em evidências em Psicologia e a história da busca pelas provas empíricas da eficácia das psicoterapias. "), T("Psicologia: Ciência e Profissão", { italics: true }), T(", v. 35, n. 4, p. 1139-1156, 2015. DOI: 10.1590/1982-3703001552014.") ]),
REF([ T("NEUFELD, Carmem Beatriz; CAVENAGE, Carla Cristina. Conceitualização cognitiva de caso: uma proposta de sistematização a partir da prática clínica e da formação de terapeutas cognitivo-comportamentais. "), T("Revista Brasileira de Terapias Cognitivas", { italics: true }), T(", v. 6, n. 2, p. 3-35, 2010. DOI: 10.5935/1808-5687.20100014.") ]),

    ],
  }],
});

Packer.toBuffer(doc).then(b => { fs.writeFileSync('/home/user/claude-faculdade/fichamento/Fichamento_Estudo_de_Caso.docx', b); console.log('OK'); });
