import styled from "styled-components";
import { PlayMode } from "../../data/constants";

interface Props {
  selectedMode?: number;
}

export const MainMenuSectionWrapper = styled.div<Props>`

  opacity: ${({ selectedMode }) => selectedMode === PlayMode.DAILY ? 0.5 : 1};

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  .swiper{
    width: 100%;
  }
  .swiper-pagination-bullet{
    background-color: #D9D9D9;
    color:#D9D9D9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 1;
  }
  .swiper-pagination-bullet-active{
    background-color: #A5B729;
    color:#A5B729;
  }
`;
