/**
 * Prepara o material bruto para a edicao do Remotion.
 *
 *   node scripts/prepare-source.mjs <caminho-do-video-original>
 *
 * Faz duas passadas de ffmpeg:
 *   1. vidstabdetect  -> mede o tremor da camera quadro a quadro
 *   2. vidstabtransform + scale + unsharp -> estabiliza, sobe para 1080x1944
 *      e devolve a nitidez perdida no upscale
 *
 * O resultado vai para public/source.mp4, que e o arquivo lido pela
 * composicao MelhoresMomentos.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2];

if (!input) {
  console.error('uso: node scripts/prepare-source.mjs <caminho-do-video-original>');
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`arquivo nao encontrado: ${input}`);
  process.exit(1);
}

const ffmpeg = process.env.FFMPEG_PATH ?? 'ffmpeg';
const transforms = resolve(root, 'out/transforms.trf');
const output = resolve(root, 'public/source.mp4');

mkdirSync(resolve(root, 'out'), { recursive: true });
mkdirSync(resolve(root, 'public'), { recursive: true });

const run = (args) => {
  const result = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`ffmpeg falhou com codigo ${result.status}`);
    process.exit(result.status ?? 1);
  }
};

console.log('1/2 analisando o tremor da camera...');
run([
  '-v', 'warning', '-stats', '-y',
  '-i', input,
  '-vf', `vidstabdetect=shakiness=8:accuracy=15:result=${transforms}`,
  '-an', '-f', 'null', '-',
]);

console.log('2/2 estabilizando, ampliando e aplicando nitidez...');
run([
  '-v', 'warning', '-stats', '-y',
  '-i', input,
  '-vf', [
    `vidstabtransform=input=${transforms}:smoothing=30:optzoom=1:zoom=1:interpol=bicubic`,
    'scale=1080:1944:flags=lanczos',
    'unsharp=5:5:0.55:3:3:0.25',
  ].join(','),
  '-c:v', 'libx264', '-crf', '15', '-preset', 'medium', '-pix_fmt', 'yuv420p',
  '-an', output,
]);

console.log(`pronto: ${output}`);
