export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export type Clip = {
  /** identificador do momento */
  id: string;
  /** descricao do que aparece na cena */
  descricao: string;
  /** segundo de inicio no video original */
  start: number;
  /** duracao do corte em segundos */
  dur: number;
  /** direcao do zoom lento aplicado por cima do corte */
  zoom: 'in' | 'out';
  /**
   * Intensidade do zoom, quando a cena precisa fugir do padrao. Use 0 para
   * preservar o enquadramento original em cenas com elemento colado na borda.
   */
  zoomAmount?: number;
};

/**
 * Os melhores momentos, escolhidos combinando o conteudo de cada cena com as
 * metricas de nitidez e de tremor medidas quadro a quadro no material bruto.
 * Trechos com reflexo forte no vidro da vitrine e com movimento brusco de
 * camera ficaram de fora.
 */
export const CLIPS: Clip[] = [
  {
    id: 'fachada-baloes',
    descricao: 'Fachada com o arco de baloes laranja, branco e verde',
    start: 0.15,
    dur: 2.4,
    zoom: 'in',
  },
  {
    id: 'entrada',
    descricao: 'Entrada pela porta de vidro com o tapete da loja',
    start: 8.5,
    dur: 1.6,
    zoom: 'out',
  },
  {
    id: 'tapete-corredor',
    descricao: 'Tapete com a marca abrindo para o corredor de chinelos',
    start: 28.4,
    dur: 2.2,
    zoom: 'in',
  },
  {
    id: 'corredor-bancos',
    descricao: 'Corredor interno com os puffs laranja e o banco de prova',
    start: 32.2,
    dur: 1.8,
    zoom: 'out',
  },
  {
    id: 'arco-laranja',
    descricao: 'Parede em arco laranja com a grade de chinelos coloridos',
    start: 35.2,
    dur: 2.2,
    zoom: 'in',
  },
  {
    id: 'sofa-neon',
    descricao: 'Sofa curvo de fibra laranja com o letreiro neon ao fundo',
    start: 43.7,
    dur: 2.0,
    zoom: 'out',
  },
  {
    id: 'balcao-flores',
    descricao: 'Balcao verde com arranjo de flores e colunas ripadas laranja',
    start: 50.87,
    dur: 1.8,
    zoom: 'in',
  },
  {
    id: 'araras',
    descricao: 'Araras centrais lotadas de chinelos coloridos',
    start: 54.93,
    dur: 2.0,
    zoom: 'out',
  },
  {
    id: 'closeup-chinelos',
    descricao: 'Close nas prateleiras de chinelos com as etiquetas de preco',
    start: 62.43,
    dur: 2.2,
    zoom: 'in',
  },
  {
    id: 'personalizacao',
    descricao: 'Balcao de personalizacao com os pins e a sandalia customizada',
    start: 72.63,
    dur: 2.0,
    zoom: 'out',
  },
  {
    id: 'neon-final',
    descricao: 'Letreiro neon Pe Descalco Chinelaria por cima do balcao',
    // unico trecho em que o letreiro aparece inteiro dentro do quadro; na
    // varredura dos 77s ele encosta na borda direita e fica cortado.
    // O zoom e menor que o padrao para o logo nao tocar o topo do quadro.
    start: 68.9,
    dur: 1.8,
    zoom: 'in',
    zoomAmount: 0.03,
  },
];

export const clipFrames = (clip: Clip) => Math.round(clip.dur * FPS);

export const TOTAL_FRAMES = CLIPS.reduce((total, clip) => total + clipFrames(clip), 0);
