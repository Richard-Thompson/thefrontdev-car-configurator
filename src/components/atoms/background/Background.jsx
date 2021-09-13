import React, { useRef } from 'react';

export const Background = ({ children }) => {
  const background = useRef(null);

  return (
    <color ref={background} attach="background" args={['black']}>
      {children({ background })}
    </color>
  );
};
