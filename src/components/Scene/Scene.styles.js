import styled from 'styled-components';
import { Canvas as Can } from '@react-three/fiber';
import {
    LOADING_BAR_ANIMATION_FADE_OUT_LENGTH,
    AMOUNT_OF_TIME_LOADING_SCREEN_TRANSITION,
} from '../../constants';

export const Canvas = styled(Can)`
    min-width: 100vw;
    min-height: 100vh;
`;

export const CinematicHalfScreen = styled.div`
    ${({ top, endOfAnimation, startOfAnimation }) => `
        position: fixed;
        z-index: 11;
        top: ${top ? 0 : 'unset'};
        bottom: ${top ? 'unset' : 0};
        left: 0;
        right: 0;
        height: 50vh;
        background-color: #080808;
        ${startOfAnimation ? `
        animation: ${top ? 'animateTop' : 'animateBottom'} ${AMOUNT_OF_TIME_LOADING_SCREEN_TRANSITION}ms linear;
        animation-fill-mode: forwards;
        ` : ''
        }

        @keyframes animateTop {
            0% { top: 0 }
            10% { top: - 10% }
            30% { top -20% }
            70% { top: -30% }
            80% { top: -40% }
            90% { top: -44%% }
            100% { top: -45% }
        }

        // @keyframes endAnimateTop {
        //     0% { top: -95% }
        //     99% { top: -99% }
        //     100% { 
        //         top: -100%;
                
        //     }
        // }
        @keyframes animateBottom {
            0% { bottom: 0 }
            10% { bottom: - 10% }
            30% { bottom -20% }
            70% { bottom: -30% }
            80% { bottom: -40% }
            90% { bottom: -44%% }
            100% { bottom: -45% }
        }

        // @keyframes endAnimateBottom {
        //     0% { bottom: -95% }
        //     99% { bottom: -99% }
        //     100% { 
        //         top: -100%;
        //      }
        // }
    `}
`;

export const LoadingScreen = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 11;
    font-size: 40px;
`;

export const LoadingBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 13;       
    width: 80px;
    height: 80px;
    
    & div {
        position: absolute;
        border: 4px solid #38F614;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    & div.fade-out {
        background-color: red;
        opacity: 0;
        animation: fadeOpacity ${LOADING_BAR_ANIMATION_FADE_OUT_LENGTH}ms cubic-bezier(0, 0.2, 0.8, 1);
    }
    & > div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes fadeOpacity {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 14;       
    background-color: transparent;
    padding: 10px 20px 10px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(22, 96.5, 7.8, 1.0);
    border-radius: 10px;
    border: 2px solid rgba(22, 96.5, 7.8, 0.9);
    opacity: ${({ fadeOut }) => `${fadeOut ? 0 : 1}`};
    transition: opacity 200ms ease-in-out;
`;