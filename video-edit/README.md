# Pé Descalço — edição dos melhores momentos (Remotion)

Edição em Remotion que recorta os melhores trechos do vídeo bruto da loja e
os coloca em sequência, prontos para receber uma música por cima.

O vídeo final sai **sem áudio**, justamente para a trilha ser encaixada depois
sem competir com o som ambiente do celular.

## Resultado

- `out/melhores-momentos.mp4` — 1080x1920, 30 fps, ~22 s, 11 cortes
- Sem faixa de áudio

## Como os cortes foram escolhidos

Cada quadro do material bruto foi medido em três eixos:

- **nitidez** (variância do Laplaciano) — descarta quadros borrados
- **movimento** (diferença média entre quadros consecutivos) — descarta as
  viradas bruscas de câmera
- **brilho e contraste** — descarta trechos estourados ou escuros

Em cima disso, cada cena da loja virou uma janela candidata e, dentro dela, o
sub-trecho com a melhor combinação de nitidez alta e tremor baixo foi o
escolhido. Os trechos da vitrine vista de fora ficaram de fora da edição: o
reflexo da rua no vidro polui a imagem.

A lista final está em [`src/clips.ts`](src/clips.ts), com o segundo de início,
a duração e a descrição de cada momento.

## Estrutura

| Arquivo | Papel |
| --- | --- |
| `src/clips.ts` | lista dos cortes, dimensões e fps |
| `src/Clip.tsx` | um corte: trecho do vídeo + zoom lento + realce de cor |
| `src/MelhoresMomentos.tsx` | sequência dos cortes + fade de abertura e fecho |
| `src/Root.tsx` | registro da composição |
| `scripts/prepare-source.mjs` | estabiliza e amplia o material bruto |

## Rodando do zero

O material bruto e o arquivo intermediário não vão para o repositório. Para
reconstruir a edição:

```bash
npm install

# estabiliza a câmera na mão, sobe para 1080x1944 e recupera a nitidez
node scripts/prepare-source.mjs /caminho/do/video-original.MP4

# preview interativo
npm start

# render final
npm run build
```

`prepare-source.mjs` precisa de um `ffmpeg` compilado com `libvidstab`. Se o
binário não estiver no `PATH`, aponte com `FFMPEG_PATH=/caminho/do/ffmpeg`.

## Ajustando a edição

Todos os cortes são dados, não código. Para trocar um momento, mudar a ordem ou
alongar uma cena, edite o array `CLIPS` em `src/clips.ts` — a duração total da
composição é recalculada sozinha a partir dele.
