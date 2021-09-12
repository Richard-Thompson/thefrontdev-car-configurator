import styled from 'styled-components';

export const Button = styled.button`
    outline: none;
    border: none;
    background-color: transparent;
    margin-bottom: 25px;

    svg {
        width: 30px;
        height: 30px;
        -webkit-filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
        filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
        path {
            fill: #f9f9f9;
        }
    }
`;
