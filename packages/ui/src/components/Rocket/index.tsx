import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as RocketSvg } from './rocket.svg';

const shakeDiff = 2;
const rocketAnimation = keyframes`
  from, to { transform: translate3d(0, 0, 0); }
  25% { transform: translate3d(${shakeDiff}px, ${shakeDiff}px, 0); }
  50% { transform: translate3d(-${shakeDiff}px, -${shakeDiff}px, 0); }
  60% { transform: translate3d(${shakeDiff}px, ${shakeDiff}px, 0); }
  80% { transform: translate3d(-${shakeDiff / 2}px, -${shakeDiff / 2}px, 0); }
  95% { transform: translate3d(${shakeDiff / 2}px, ${shakeDiff / 2}px, 0); }
`;

const wobble1 = keyframes`
  from, to { transform: translate3d(0, 0,0) scale3d(0.98,0.98,0.98); }
  25% { transform: translate3d(-3px, 0,0) scale3d(1,1,1); }
  50% { transform: translate3d(0, -1px,0) scale3d(1.02,1.02,1.02); }
  75% { transform: translate3d(3px, 0,0) scale3d(1,1,1); }
`;

const wobble2 = keyframes`
  from, to { transform: translate3d(0, 0,0) scale3d(0.98,0.98,0.98); }
  25% { transform: translate3d(2px, -1px,0) scale3d(1,1,1); }
  50% { transform: translate3d(-2px, 1px,0) scale3d(1.02,1.02,1.02); }
  75% { transform: translate3d(-2px, 1px,0) scale3d(1,1,1); }
`;

const wobble3 = keyframes`
  from, to { transform: translate3d(0, 0,0) scale3d(0.98,0.98,0.98); }
  25% { transform: translate3d(-2px, 0,0) scale3d(1,1,1); }
  50% { transform: translate3d(-1px, 1px,0) scale3d(1.02,1.02,1.02); }
  75% { transform: translate3d(2px, 2px,0) scale3d(1,1,1); }
`;

const starAnimation = keyframes`
  from, to { transform: translate3d(0, 0,0) scale3d(0.98, 0.98, 0.98); }
  25% { transform: translate3d(2px, -1px,0) scale3d(1,1,1); }
  50% { transform: translate3d(0, 1px,0) scale3d(1.3, 1.3, 1) rotate3d(0,0,1,-5deg); }
  75% { transform: translate3d(-2px, 1px,0) scale3d(1,1,1); }
`;

const StyledRocket = styled(RocketSvg)`
  position: relative;
  width: 100%;
  height: 93.39752407%;

  * {
    transform-box: fill-box;
    transform-origin: center center;
    transition-timing-function: ease;
  }

  #jupiter1,
  #planet2,
  #planet6 {
    animation: ${wobble1} 1s infinite ease;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
  }

  #jupiter2,
  #planet3 {
    animation: ${wobble2} 1.1s infinite ease;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
  }

  #jupiter3,
  #planet1,
  #planet4,
  #planet5  {
    animation: ${wobble3} 1.2s infinite ease;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
  }

  #ship {
    transform-origin: 75% 20%;
    animation: ${rocketAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  #star1,
  #star2,
  #star3,
  #star4 {
    animation: ${starAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
  }
  #star2 {
    animation-delay: -0.2s;
  }
  #star3 {
    animation-delay: -0.3s;
  }
  #star4 {
    animation-delay: -0.7s;
  }
  #planet2 {
    animation-delay: -0.2s;
  }
  #planet3 {
    animation-delay: -0.3s;
  }
  #planet4 {
    animation-delay: -0.4s;
  }
  #planet5 {
    animation-delay: -0.5s;
  }
  #planet6 {
    animation-delay: -0.6s;
  }
  #jupiter2 {
    animation-delay: -0.3s;
  }
  #jupiter3 {
    animation-delay: -0.4s;
  }
`;

export const Rocket: React.FC = () => <StyledRocket />;

export default Rocket;
