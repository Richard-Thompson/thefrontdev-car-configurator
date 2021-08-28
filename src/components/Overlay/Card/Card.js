import React from 'react';
import { ObjectCard } from './Card.styles';
import { useControls } from '../../../Context/controlsContext';

export const Card = ({ object }) => {
    const { activeObject, setActiveObject, setActiveObjectName, activeObjectName } = useControls(state => ({
        setActiveObject: state.setActiveObject,
        activeObject: state.activeObject,
        setActiveObjectName: state.setActiveObjectName,
        activeObjectName: state.activeObjectName
    }));

    return (
        <ObjectCard onClick={() => {
            setActiveObjectName(object)
            setActiveObject(true)
        }}>
            <p>{object}</p>
        </ObjectCard>
    )
}