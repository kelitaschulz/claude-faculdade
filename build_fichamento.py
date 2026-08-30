#!/usr/bin/env python3
"""Gera o Fichamento_Kelita_Schulz.pdf a partir das citacoes do Capitulo 4
de CHAUI, Marilena. Convite a Filosofia (paginas 429 a 435).

O layout reproduz o PDF-modelo "Fichamento - Livre de Ansiedade":
A4 paisagem, faixa institucional Campo Real no topo de cada pagina,
bloco de identificacao, titulo centralizado e tabela de tres colunas.
"""
import base64
import html
import pathlib

BASE = pathlib.Path(__file__).parent
HEADER_PNG = BASE / "assets" / "campo_real_header.png"
OUT_HTML = BASE / "Fichamento_Kelita_Schulz.html"
OUT_PDF = BASE / "Fichamento_Kelita_Schulz.pdf"

IDENTIFICACAO = [
    ("Acadêmico(a):", "Kélita Schulz"),
    ("Matéria:", "Publicidade Responsável"),
    ("Professor(a):", "Vanessa Lobato"),
    ("Livro:", "Convite à Filosofia"),
    ("Autora:", "Marilena Chauí"),
    ("Referência:", "CHAUÍ, Marilena. Convite à Filosofia. São Paulo: Ática, 2000."),
]

TITULO = "FICHAMENTO CAPÍTULO 4: A EXISTÊNCIA ÉTICA"

# (pagina, citacao literal, comentario)
LINHAS = [
    (
        "429",
        "“Sentimos piedade. Sentimos indignação diante de tamanha injustiça [...] "
        "Sentimos responsabilidade. Movidos pela solidariedade, participamos de campanhas "
        "contra a fome. Nossos sentimentos e nossas ações exprimem nosso senso moral.”",
        "Chauí abre o capítulo sem apresentar nenhuma definição, ela parte de situações que "
        "qualquer pessoa já viveu. Achei essa escolha significativa, porque mostra que o senso "
        "moral não é algo que aprendemos numa aula de ética: ele já está funcionando quando "
        "sentimos piedade ou indignação diante da fome alheia. A autora trata o sentimento como "
        "manifestação moral legítima, e não como reação irracional que atrapalha o julgamento. "
        "Isso desloca o ponto de partida do capítulo, já que antes de qualquer raciocínio sobre "
        "o que é certo existe uma reação afetiva nos orientando.",
    ),
    (
        "429",
        "“Sentimos cólera diante do cinismo dos mentirosos, dos que usam outras pessoas como "
        "instrumento para seus interesses e para conseguir vantagens às custas da boa-fé de "
        "outros. Todos esses sentimentos manifestam nosso senso moral.”",
        "Dentro da lista de situações que provocam nossa cólera, esta é a que mais me interessou. "
        "Chauí coloca lado a lado o mentiroso e aquele que usa o outro como instrumento, tratando "
        "os dois como formas de um mesmo problema. Pensando na comunicação, fica difícil não "
        "relacionar isso com peças construídas sobre informação incompleta, em que o público "
        "deixa de ser destinatário de uma mensagem e vira meio para atingir uma meta. A expressão "
        "“às custas da boa-fé de outros” descreve bem esse mecanismo, porque a confiança de quem "
        "recebe a mensagem é justamente o recurso que está sendo explorado.",
    ),
    (
        "430",
        "“Situações como essas [...] surgem sempre em nossas vidas. Nossas dúvidas quanto à "
        "decisão a tomar não manifestam apenas nosso senso moral, mas também põem à prova nossa "
        "consciência moral, pois exigem que decidamos o que fazer [...]”",
        "Aqui aparece a diferença entre sentir e decidir. O senso moral reage sozinho, mas a "
        "consciência moral só entra em cena quando a situação não tem saída óbvia e alguém "
        "precisa escolher. Reparei que a autora construiu os exemplos anteriores exatamente sem "
        "solução limpa, todos eles colocam valores legítimos em choque entre si. O que sustenta a "
        "consciência moral, então, não é acertar a resposta, e sim conseguir dar razões pela "
        "escolha feita e continuar respondendo por ela depois.",
    ),
    (
        "431",
        "“O senso e a consciência moral dizem respeito a valores, sentimentos, intenções, "
        "decisões e ações referidos ao bem e ao mal e ao desejo de felicidade. Dizem respeito às "
        "relações que mantemos com os outros e, portanto, nascem e existem como parte de nossa "
        "vida intersubjetiva.”",
        "Depois de tantos exemplos, a autora enfim organiza o que vinha construindo. Considero "
        "importante o final da frase, quando ela afirma que a moral nasce da nossa vida "
        "intersubjetiva. A ética, nesse sentido, não é um assunto que a pessoa resolve "
        "sozinha consigo mesma, ela existe porque convivemos. Se a moral fosse puramente "
        "individual, bastaria a coerência interna de cada um e o restante do capítulo perderia o "
        "sentido, já que não haveria por que discutir consequências para os outros.",
    ),
    (
        "431",
        "“Juízos de fato são aqueles que dizem o que as coisas são, como são e por que são. [...] "
        "Juízos de valor avaliam coisas, pessoas, ações, experiências, acontecimentos, "
        "sentimentos, estados de espírito, intenções e decisões como bons ou maus, desejáveis ou "
        "indesejáveis.”",
        "A distinção parece simples numa primeira leitura, mas sustenta boa parte do capítulo. "
        "Constatar e avaliar são operações diferentes, e o problema começa quando uma se disfarça "
        "da outra. Isso me fez pensar em quanto da linguagem publicitária opera nessa fronteira, "
        "apresentando como característica do produto aquilo que é, na verdade, um julgamento de "
        "valor embutido. Quando uma avaliação chega ao público com aparência de fato constatado, o "
        "interlocutor perde a chance de discordar, porque nem percebe que havia ali alguma coisa "
        "para ser discutida.",
    ),
    (
        "431",
        "“Os juízos éticos de valor são também normativos, isto é, enunciam normas que determinam "
        "o dever ser de nossos sentimentos, nossos atos, nossos comportamentos. São juízos que "
        "enunciam obrigações e avaliam intenções e ações segundo o critério do correto e do "
        "incorreto.”",
        "O que a autora acrescenta neste ponto é que o juízo ético não para na avaliação, ele "
        "prescreve. Não diz apenas que alguma coisa é boa, diz que devemos buscá-la. Esse caráter "
        "obrigatório ajuda a entender por que discussões morais costumam ser bem mais tensas que "
        "discussões factuais: quando alguém discorda de um juízo ético, não está corrigindo uma "
        "informação, está recusando uma obrigação que estava sendo atribuída a ele.",
    ),
    (
        "432",
        "“Freqüentemente, não notamos a origem cultural dos valores éticos, do senso moral e da "
        "consciência moral, porque somos educados (cultivados) para eles e neles, como se fossem "
        "naturais ou fáticos, existentes em si e por si mesmos. [...] A naturalização da "
        "existência moral esconde, portanto, o mais importante da ética: o fato de ela ser criação "
        "histórico-cultural.”",
        "Este é o ponto do capítulo que mais me fez parar. Chauí afirma que as sociedades "
        "naturalizam seus valores para conservá-los, e o efeito disso é que passamos a viver a "
        "moral como se fosse paisagem, não construção. O incômodo está justamente aí: se os "
        "valores são criação histórico-cultural, eles podem ser revistos, e a naturalização serve "
        "para impedir que essa revisão aconteça. Vale registrar que a autora não está dizendo que "
        "os valores sejam arbitrários ou dispensáveis, e sim que eles têm origem e história, coisa "
        "que costumamos esquecer.",
    ),
    (
        "432",
        "“Fundamentalmente, a violência é percebida como exercício da força física e da coação "
        "psíquica para obrigar alguém a fazer alguma coisa contrária a si, contrária aos seus "
        "interesses e desejos, contrária ao seu corpo e à sua consciência, causando-lhe danos "
        "profundos e irreparáveis, como a morte, a loucura, a auto-agressão ou a agressão aos "
        "outros.”",
        "Chamou minha atenção que a definição apresentada não se limite à agressão física. A "
        "coação psíquica aparece no mesmo nível, e o critério que unifica as duas é obrigar alguém "
        "a agir contra si mesmo, contra seus próprios interesses, desejos e consciência. Com esse "
        "critério, a violência deixa de ser identificada pelo tipo de ato praticado e passa a ser "
        "identificada pelo que ela faz com a vontade da pessoa. É uma definição bem mais ampla e, "
        "por isso mesmo, bem mais exigente do que a que costumamos usar no dia a dia.",
    ),
    (
        "433",
        "“A violência é a violação da integridade física e psíquica, da dignidade humana de "
        "alguém. Eis por que o assassinato, a tortura, a injustiça, a mentira, o estupro, a "
        "calúnia, a má-fé, o roubo são considerados violência, imoralidade e crime.”",
        "Ao reunir assassinato, tortura, mentira e calúnia numa mesma lista, a autora produz um "
        "efeito que pode causar estranheza na primeira leitura. Mentir e matar evidentemente não "
        "têm a mesma gravidade, e ela não afirma que tenham. O que a lista mostra é que esses atos "
        "compartilham a mesma natureza, todos violam a integridade de alguém. A mentira entra aí "
        "porque atinge a dimensão psíquica da pessoa, interferindo naquilo que ela consegue saber "
        "e, por consequência, naquilo que ela consegue decidir.",
    ),
    (
        "433",
        "“[...] nossa cultura e sociedade nos definem como sujeitos do conhecimento e da ação, "
        "localizando a violência em tudo aquilo que reduz um sujeito à condição de objeto. Do "
        "ponto de vista ético, somos pessoas e não podemos ser tratados como coisas. Os valores "
        "éticos se oferecem, portanto, como expressão e garantia de nossa condição de sujeitos, "
        "proibindo moralmente o que nos transforme em coisa usada e manipulada por outros.”",
        "Se eu tivesse que escolher o trecho central do capítulo, seria este. A norma ética não "
        "existe para limitar a liberdade das pessoas, existe para impedir que alguém seja "
        "rebaixado à condição de coisa. "
        "Pensando na disciplina, é o critério mais concreto que encontrei até aqui para avaliar "
        "uma peça publicitária: a pergunta não é se ela vende, é se ela trata quem está do outro "
        "lado como alguém capaz de decidir ou como um comportamento a ser produzido. A expressão "
        "“coisa usada e manipulada por outros” é dura, mas descreve com precisão certos usos da "
        "comunicação.",
    ),
    (
        "433",
        "“Para que haja conduta ética é preciso que exista o agente consciente, isto é, aquele que "
        "conhece a diferença entre bem e mal, certo e errado, permitido e proibido, virtude e "
        "vício. [...] Consciência e responsabilidade são condições indispensáveis da vida ética. "
        "[...] A vontade é esse poder deliberativo e decisório do agente moral. Para que exerça tal "
        "poder sobre o sujeito moral, a vontade deve ser livre, isto é, não pode estar submetida à "
        "vontade de um outro nem pode estar submetida aos instintos e às paixões [...]”",
        "Chauí está delimitando quem pode ser cobrado eticamente. Não basta praticar a ação, é "
        "preciso reconhecer o que está em jogo nela e ter tido condições reais de escolher outra "
        "coisa. O detalhe que considero mais exigente vem no fim, quando ela diz que a vontade "
        "precisa não estar submetida à vontade de outro. Levando isso para o campo profissional, "
        "cumprir ordem não isenta ninguém, e a responsabilidade continua com quem executa mesmo "
        "quando a decisão veio de cima.",
    ),
    (
        "434",
        "“ser livre, isto é, ser capaz de oferecer-se como causa interna de seus sentimentos, "
        "atitudes e ações, por não estar submetido a poderes externos que o forcem e o constranjam "
        "a sentir, a querer e a fazer alguma coisa. A liberdade não é tanto o poder para escolher "
        "entre vários possíveis, mas o poder para autodeterminar-se, dando a si mesmo as regras de "
        "conduta.”",
        "A definição de liberdade oferecida aqui contraria o senso comum. Estamos acostumados a "
        "pensar liberdade como quantidade de opções disponíveis, e a autora desloca isso para a "
        "capacidade de dar a si mesmo as regras de conduta. Por esse critério, alguém pode ter "
        "muitas alternativas diante de si e ainda assim não ser livre, caso as escolha empurrado "
        "por pressões que nunca examinou. O contrário também vale: uma pessoa com poucas opções "
        "pode agir com liberdade se responde por elas a partir de si mesma.",
    ),
    (
        "434",
        "“Passivo é aquele que se deixa governar e arrastar por seus impulsos, inclinações e "
        "paixões, pelas circunstâncias, pela boa ou má sorte, pela opinião alheia, pelo medo dos "
        "outros, pela vontade de um outro, não exercendo sua própria consciência, vontade, "
        "liberdade e responsabilidade.”",
        "Poucas passagens do capítulo são tão diretas quanto esta. Chauí lista com bastante "
        "precisão as coisas que governam alguém por fora: impulsos, circunstâncias, sorte, opinião "
        "alheia, medo, vontade de outra pessoa. Transportando para o campo profissional, o passivo "
        "seria quem executa uma demanda sem nunca perguntar a que ela serve, e é uma posição "
        "confortável exatamente porque dispensa a pessoa de responder pelo resultado. O ativo, na "
        "descrição da autora, não é quem recusa tudo, é quem discute o sentido daquilo que faz "
        "antes de fazer.",
    ),
    (
        "435",
        "“Costuma-se dizer que os fins justificam os meios, de modo que, para alcançar um fim "
        "legítimo, todos os meios disponíveis são válidos. No caso da ética, porém, essa afirmação "
        "deixa de ser óbvia. [...] A resposta ética é: não. Por quê? Porque esses meios "
        "desrespeitam a consciência e a liberdade da pessoa moral, que agiria por coação externa e "
        "não por reconhecimento interior e verdadeiro do fim ético. [...] fins éticos exigem meios "
        "éticos.”",
        "O capítulo termina desmontando uma frase que a gente repete sem pensar muito. A autora "
        "não nega que existam fins legítimos, ela mostra que o meio escolhido também é uma ação e "
        "também precisa passar pelo crivo ético. O argumento que ela usa amarra o capítulo "
        "inteiro: medo e mentira até funcionam, mas obtêm o resultado por coação, atropelando a "
        "consciência de quem deveria aderir por convicção. Aplicado à comunicação, isso põe em "
        "xeque a ideia de que uma boa causa autoriza qualquer estratégia, porque conseguir a "
        "adesão de alguém sem que ele tenha condições de avaliar o que está aceitando já é, pelo "
        "critério da autora, uma forma de violência.",
    ),
]

CSS = """
@page {
  size: A4 landscape;
  margin: 56pt 58pt 42pt 56pt;
}

/* Faixa institucional Campo Real, repetida no topo de todas as paginas.
   Em position:fixed o WeasyPrint ancora no inicio da area de conteudo,
   por isso o deslocamento negativo equivalente as margens da pagina. */
.faixa {
  position: fixed;
  top: -56pt;
  left: -56pt;
  width: 841.89pt;
  height: 48pt;
  background-image: url('data:image/png;base64,__HEADER__');
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 100% 100%;
}

* { box-sizing: border-box; }

body {
  font-family: "Liberation Sans", Arial, Helvetica, sans-serif;
  font-size: 10pt;
  line-height: 1.55;
  color: #000000;
  margin: 0;
}

.instituicao {
  text-align: center;
  font-size: 11pt;
  line-height: 1.35;
  margin: 0 0 16pt 0;
}
.instituicao .curso { font-weight: bold; }

.identificacao {
  font-size: 11pt;
  line-height: 1.45;
  margin: 0 0 14pt 0;
}
.identificacao div { margin: 0; }
.identificacao b { font-weight: bold; }

h1.titulo {
  text-align: center;
  font-size: 12pt;
  font-weight: bold;
  margin: 0 0 12pt 0;
  line-height: 1.35;
}

table.fichamento {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

table.fichamento th,
table.fichamento td {
  border: 1pt solid #000000;
  padding: 6pt 7pt;
  vertical-align: middle;
}

table.fichamento thead th {
  font-size: 11pt;
  font-weight: bold;
  text-align: center;
  padding: 7pt 7pt;
}

table.fichamento tbody tr { break-inside: avoid; page-break-inside: avoid; }

th.pagina,    td.pagina     { width: 8.6%;  text-align: center; }
th.citacao,   td.citacao    { width: 41.0%; }
th.comentario,td.comentario { width: 50.4%; }

td.citacao, td.comentario { text-align: justify; }
"""


def build_html() -> str:
    header_b64 = base64.b64encode(HEADER_PNG.read_bytes()).decode("ascii")
    css = CSS.replace("__HEADER__", header_b64)

    ident = "\n".join(
        f"      <div><b>{html.escape(rot)}</b> {html.escape(val)}</div>"
        for rot, val in IDENTIFICACAO
    )

    linhas = []
    for pagina, citacao, comentario in LINHAS:
        linhas.append(
            "      <tr>\n"
            f'        <td class="pagina">{html.escape(pagina)}</td>\n'
            f'        <td class="citacao">{html.escape(citacao)}</td>\n'
            f'        <td class="comentario">{html.escape(comentario)}</td>\n'
            "      </tr>"
        )
    corpo = "\n".join(linhas)

    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Fichamento Capítulo 4: A existência ética</title>
<style>{css}</style>
</head>
<body>

  <div class="faixa"></div>

  <div class="instituicao">
    CENTRO UNIVERSITÁRIO CAMPO REAL
  </div>

  <div class="identificacao">
{ident}
  </div>

  <h1 class="titulo">{html.escape(TITULO)}</h1>

  <table class="fichamento">
    <thead>
      <tr>
        <th class="pagina">PÁGINA</th>
        <th class="citacao">CITAÇÃO</th>
        <th class="comentario">COMENTÁRIOS, IDEIAS E ASSOCIAÇÕES SOBRE O TEXTO</th>
      </tr>
    </thead>
    <tbody>
{corpo}
    </tbody>
  </table>

</body>
</html>
"""


def main() -> None:
    doc = build_html()
    OUT_HTML.write_text(doc, encoding="utf-8")
    from weasyprint import HTML

    HTML(string=doc, base_url=str(BASE)).write_pdf(OUT_PDF)
    print(f"gerado: {OUT_HTML.name} e {OUT_PDF.name}")


if __name__ == "__main__":
    main()
