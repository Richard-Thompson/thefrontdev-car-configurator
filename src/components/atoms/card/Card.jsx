import React from 'react';
import { ObjectCard } from 'components/atoms/card/Card.styles';
import { useControls } from 'context/controlsContext';
import WheelIcon from 'assets/tyre.svg';

export const Card = ({ object }) => {
  const { setActiveObject, setActiveObjectName, activeObjectName } = useControls((state) => ({
    setActiveObject: state.setActiveObject,
    setActiveObjectName: state.setActiveObjectName,
    activeObjectName: state.activeObjectName,
  }));

  return (
    <ObjectCard
      onClick={() => {
        setActiveObjectName(object);
        setActiveObject(true);
      }}
      activeObjectName={activeObjectName}
    >
      <WheelIcon />
    </ObjectCard>
  );
};
