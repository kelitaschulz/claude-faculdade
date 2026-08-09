import React from 'react';
import { AbsoluteFill, Series, interpolate, useCurrentFrame } from 'remotion';
import { ClipView } from './Clip';
import { CLIPS, TOTAL_FRAMES, clipFrames } from './clips';

const FADE_IN = 10;
const FADE_OUT = 14;

/** escurece o comeco e o fim para o video abrir e fechar limpo */
const Fades: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, FADE_IN, TOTAL_FRAMES - FADE_OUT, TOTAL_FRAMES - 1],
    [1, 0, 0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return <AbsoluteFill style={{ backgroundColor: '#000', opacity, pointerEvents: 'none' }} />;
};

export const MelhoresMomentos: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <Series>
        {CLIPS.map((clip) => {
          const durationInFrames = clipFrames(clip);
          return (
            <Series.Sequence key={clip.id} durationInFrames={durationInFrames}>
              <ClipView clip={clip} durationInFrames={durationInFrames} />
            </Series.Sequence>
          );
        })}
      </Series>
      <Fades />
    </AbsoluteFill>
  );
};
