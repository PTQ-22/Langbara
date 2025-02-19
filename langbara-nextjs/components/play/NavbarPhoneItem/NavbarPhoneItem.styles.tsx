import styled from "styled-components";
interface Props{
    isSelected: boolean;
}

export const Wrapper = styled.div<Props>`
    display: flex;
    gap: 20px;
    width: 100%;
    padding: 7px 10px 7px 10px;
    border-radius: 4px;
    background-color: ${ ({isSelected}) => isSelected ? "rgba(217,217,217, 0.16)" : "transparent"};
`

export const Icon = styled.img`
    width: 28px;
    height: auto;
    opacity: 0.8;
`

export const Link = styled.h2`
    font-size: 18pt;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    color: rgba(255,255,255,0.8);
    @media screen and (max-width: 480px){
        font-size: 16pt;
    }
`