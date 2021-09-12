import styled from 'styled-components';

export const ObjectCard = styled.div`
    padding: 1px 6px;
    pointer-events: ${(props) => (props.activeObjectName ? 'none' : '')};

    svg {
        width: 30px;
        height: 30px;
        margin-bottom: 15px;
        -webkit-filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
        filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
        path {
            opacity: ${(props) => (props.activeObjectName ? '0.5' : '1.0')};
        }
    }
`;
