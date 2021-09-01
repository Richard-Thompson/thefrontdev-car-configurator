import React from 'react';
import { ObjectCard } from 'components/atoms/card/Card.styles';
import { useControls } from 'context/controlsContext';

export const Card = ({ object }) => {
  const { setActiveObject, setActiveObjectName } = useControls((state) => ({
    setActiveObject: state.setActiveObject,
    setActiveObjectName: state.setActiveObjectName,
  }));

  return (
    <ObjectCard
      onClick={() => {
        setActiveObjectName(object);
        setActiveObject(true);
      }}
    >
      <p>{object}</p>
    </ObjectCard>
  );
};
