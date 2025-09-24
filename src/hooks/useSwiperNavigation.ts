"use client";
import { useRef, useState } from "react";

export const useSwiperNavigation = () => {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  const handleBeforeInit = (swiper: any) => {
    if (
      prevRef.current &&
      nextRef.current &&
      swiper.params.navigation !== undefined &&
      typeof swiper.params.navigation !== "boolean"
    ) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiper = (swiper: any) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return {
    swiperRef,
    prevRef,
    nextRef,
    isBeginning,
    isEnd,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    handleBeforeInit,
    handleSlideChange,
    handleSwiper,
  };
};
