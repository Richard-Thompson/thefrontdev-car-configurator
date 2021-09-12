import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    align-items: flex-start;
    top: 0;
    left: 0;
    z-index: 20;
    padding: 20px;
    height: auto;
`;

export const Left = styled.aside`
    position: relative;
    display: flex;
    flex-direction: column;
    bottom: 0;
    max-width: 100%;
    margin-right: auto;
`;

export const Colour = styled.div`
    background-color: ${(props) => props.hex};
    border-radius: 50%;
    height: 30px;
    width: 30px;
    border: 1px solid grey;
    margin: 1px 6px 15px;
`;

export const FrontView = styled.div`
    height: 30px;
    width: 30px;
    margin: 1px 6px 15px;
`;
