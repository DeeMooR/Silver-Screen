import styled from 'styled-components';

export const StyledImage = styled.div<{ image: string }>`
    width: 14%;
    height: 0px;
    padding-bottom: 22%;
    background: url(${props => props.image}) no-repeat center;
    background-size: cover;
    border-radius: 10px;
`;

export const StyledTrailer = styled.div<{ video: string, play: string }>`
    position: relative;  
    width: 100%;
    height: 0px;
    padding-bottom: 56.25%;
    background: url(${props => props.video}) center center / cover no-repeat;
    filter: brightness(0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;
    &:hover {
        filter: brightness(1);
        transition: all 0.3s ease 0s;
    }
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background: url(${props => props.play}) center center / cover no-repeat;
    }
`;