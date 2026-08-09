import React from 'react';
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { FPS, type Clip } from './clips';

const ZOOM_RANGE = 0.04;

export const ClipView: React.FC<{ clip: Clip; durationInFrames: number }> = ({
  clip,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // zoom lento por cima do corte, alternando de cena para cena para o video
  // nao ficar com a mesma sensacao de movimento o tempo todo
  const amount = clip.zoomAmount ?? ZOOM_RANGE;
  const scale = clip.zoom === 'in' ? 1 + amount * progress : 1 + amount * (1 - progress);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={staticFile('source.mp4')}
          startFrom={Math.round(clip.start * FPS)}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // realce leve de cor para o material de celular ganhar contraste
            filter: 'saturate(1.1) contrast(1.05) brightness(1.02)',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
