import React, { useRef } from 'react';

export const Background = ({ children }) => {
  const background = useRef(null);

  return (
    <color ref={background} attach="background" args={['#161616']}>
      {children({ background })}
    </color>
  );
};
