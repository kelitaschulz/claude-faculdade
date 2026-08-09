import React from 'react';
import { Composition } from 'remotion';
import { MelhoresMomentos } from './MelhoresMomentos';
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from './clips';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MelhoresMomentos"
      component={MelhoresMomentos}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
