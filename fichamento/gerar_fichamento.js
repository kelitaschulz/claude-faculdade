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

P("O estudo de caso consiste na investigação detalhada de um caso único, seja uma pessoa, um grupo ou uma situação, e pode recorrer à observação clínica, a entrevistas, a questionários, a testes psicológicos e a registros como o prontuário (IBAC, 2024). Seu valor didático, segundo a mesma fonte, está em permitir que se compreenda quais aspectos do caso foram observados pelo profissional, como conduziram à análise e à interpretação e qual foi o processo de tomada de decisão para definir objetivos e intervenções. É essa exigência de explicitação do raciocínio que organiza as etapas descritas a seguir."),

P("Decorre daí que a transcrição do prontuário não constitui um estudo de caso. Canguçu (2021, p. 20) sustenta que construir um caso “não consiste em descrições protocolares nem se reduz a registros de prontuários”, e distingue as duas operações ao afirmar que “ter um paciente não é o mesmo que ter um caso clínico – por isso, o caso precisa necessariamente ser construído”. A autora trata a escrita do caso como trabalho distinto da condução do tratamento."),

P("A formulação de caso é o instrumento que torna esse raciocínio explícito. Freire, Sousa e Hessel (2024) a definem como o processo de desenvolver hipóteses e planos terapêuticos sobre as causas, os precipitantes e os mecanismos que mantêm os problemas psicológicos do paciente. Na terapia cognitivo-comportamental a tarefa recebe o nome de conceitualização cognitiva e funciona, conforme Beck (1997 apud Neufeld; Cavenage, 2010, p. 7), como “um mapa que orienta o trabalho a ser realizado com o cliente”. Neufeld e Cavenage (2010, p. 9) observam que, sem essa compreensão, “todo o tratamento se resumirá à aplicação de várias técnicas cognitivas e comportamentais, que não resultarão em um trabalho eficaz”."),

P("Neufeld e Cavenage (2010) organizam essa construção em seis etapas, dirigidas a terapeutas iniciantes: a psicoeducação sobre o modelo cognitivo, anterior a qualquer conceitualização; o levantamento de situações, pensamentos automáticos, emoções, reações fisiológicas e comportamentos do cotidiano; o registro desses dados no diagrama de conceitualização; a identificação do significado dos pensamentos automáticos; a identificação das crenças centrais, das intermediárias e das estratégias compensatórias; e a sedimentação da natureza cíclica do sistema de crenças, com o traçado de metas. O modelo de Freire, Sousa e Hessel (2024) percorre trajeto semelhante em sete itens, da identificação e da história pessoal e clínica à lista de problemas, à hipótese compreensiva, composta de precipitantes, origem, recursos, obstáculos e hipótese central, e aos objetivos de curto, médio e longo prazo. Em ambas a coleta de dados precede a hipótese, e esta precede o plano de intervenção."),

P("Os autores acrescentam condições para que a formulação não se reduza a uma construção do terapeuta. Neufeld e Cavenage (2010, p. 24) advertem que “não se deve apresentar o cliente para ele mesmo, como se o terapeuta soubesse tudo a seu respeito”, e recomendam que seja o próprio cliente a preencher o diagrama em sessão. Kuyken, Padesky e Dudley (2010 apud Neufeld; Cavenage, 2010) situam o empirismo colaborativo entre os princípios da conceitualização, já que as hipóteses de terapeuta e cliente são testadas e adaptadas conforme o retorno das intervenções. Freire, Sousa e Hessel (2024, p. 102) afirmam, de modo convergente, que o modelo “não é fixo e imutável, mas sim um guia a ser utilizado durante o processo clínico”. Leonardi e Meyer (2015, p. 1148) registram que a intuição do terapeuta “costuma estar repleta de vieses, falhas e distorções, a ponto de o terapeuta enxergar sucesso quando há indícios de fracasso”."),

P("O registro documental é a condição material dessa reconstrução. A Resolução CFP nº 001/2009 estabelece o conteúdo mínimo do registro: identificação do usuário, avaliação da demanda e definição dos objetivos, evolução das atividades e procedimentos técnico-científicos adotados, e encaminhamento ou encerramento. Em serviços-escola e campos de estágio, o artigo 3º exige que conste “a identificação e a assinatura do responsável técnico/supervisor que responderá pelo serviço prestado, bem como do estagiário” (Conselho Federal de Psicologia, 2009). O Manual orientativo acrescenta que todo registro psicológico constitui material sigiloso, com restrição de acesso a terceiros (Conselho Federal de Psicologia, 2025). Trata-se, contudo, de normas que regem o serviço, e não a produção acadêmica que dele deriva."),

P("Os limites do estudo de caso são reconhecidos pelos próprios autores que o defendem. O IBAC (2024) adverte que a melhora observada após uma intervenção não autoriza concluir que a intervenção a produziu, e que um caso isolado não sustenta afirmações de eficácia para outros pacientes. Na própria terapia cognitivo-comportamental, Bieling e Kuyken (2003 apud Neufeld; Cavenage, 2010, p. 16) concluem que a confiabilidade da conceitualização “pode ser obtida através dos aspectos descritivos do mesmo, mas não com os aspectos inferenciais”, ou seja, descrever o funcionamento é replicável, mas inferir crenças a partir dessa descrição não é. Persons et al. (2006 apud Neufeld; Cavenage, 2010) não encontraram diferença de desfecho entre pacientes tratados com e sem ênfase em conceitualização, e as próprias Neufeld e Cavenage (2010, p. 30) reconhecem que “a escassez de pesquisas na área traz dúvidas sobre o valor positivo da conceitualização de caso em TCC”."),

P("Tais restrições não retiram do estudo de caso sua função formativa, mas delimitam o que ele autoriza afirmar. Leonardi e Meyer (2015, p. 1148) registram que a American Psychological Association “referenda diferentes tipos de métodos nomotéticos e idiográficos (ensaios clínicos randomizados, experimentos de caso único, estudos de caso)”, o que indica que a limitação inferencial decorre do delineamento descritivo adotado, e não do exame de um caso único. Quanto à avaliação da formulação, Rangé (2004 apud Neufeld; Cavenage, 2010, p. 29) enumera seis critérios: ter utilidade, ser simples, ser teoricamente coerente, oferecer explicações sobre comportamentos passados, encontrar sentido nos comportamentos presentes e ter capacidade para predizer comportamentos futuros."),

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
