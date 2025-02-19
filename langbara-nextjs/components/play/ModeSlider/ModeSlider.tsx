import { MainMenuSectionWrapper } from "../../helpers/MainMenuSectionWrapper";
import React, { useState } from "react";
import {
  Mode,
  ModeTitle,
  ModeDescription,
  PaginationSpace,
  Column,
} from "./ModeSlider.styles";
import { strings } from "../../../data/strings";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { MainMenuTitle } from "../../helpers/MainMenuTitle";
import ModeSelectionProps from "../../../types/modeSelectionProps";
import { MODES_ARRAY } from "../../../data/constants";

const ModeSlider = ({ changeSelectedMode, selectedMode }: ModeSelectionProps) => {
  const [autoplay, setAutoplay] = useState(true);

  const onTouchHandler = () => {
    if (autoplay === true) {
      setAutoplay(false);
    }
  };

  return (
    <MainMenuSectionWrapper onTouchMove={onTouchHandler}>
      <MainMenuTitle>Wybierz tryb</MainMenuTitle>
      <Column>
        <Swiper
          className="swiper"
          spaceBetween={20}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ el: ".swiper-pagination" }}
          onSlideChange = {(swiper) => changeSelectedMode(swiper.realIndex)}
        >
          {MODES_ARRAY.map(
            (mode: { first: string; second: string; desc: string }) => {
              return (
                <SwiperSlide key={mode.first + " " + mode.second}>
                  <Mode>
                    <ModeTitle>
                      {mode.first + " "} <span>{mode.second}</span>
                    </ModeTitle>
                    <ModeDescription>{mode.desc}</ModeDescription>
                  </Mode>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
        <PaginationSpace className="swiper-pagination"></PaginationSpace>
      </Column>
    </MainMenuSectionWrapper>
  );
};
export default ModeSlider;
