import styled from "styled-components";
interface Props{
    isSelected: boolean;
}

export const Wrapper = styled.div<Props>`
    display: flex;
    padding: 7px 7px 7px 7px;
    border-radius: 4px;
    background-color: ${ ({isSelected}) => isSelected ? "rgba(217,217,217, 0.16)" : "transparent"};
`

export const Icon = styled.img`
    width: 28px;
    height: auto;
    opacity: 0.8;
`