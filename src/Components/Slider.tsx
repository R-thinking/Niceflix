import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IMovie } from "../api/movie";
import { useCallback, useEffect, useState } from "react";
import ThumbnailPlayer from "./ThumbnailPlayer";
import { gloabalStore } from "../stores";
import PreviousSlideIcon from "../asets/PreviousSlideIcon";
import NextSlideIcon from "../asets/NextSlideIcon";

const Wrapper = styled.div<{ $itemHeight: number }>`
  height: ${(props) => `${props.$itemHeight}px`};
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const SlideWrapper = styled.div<{ $slideWidth: number }>`
  position: relative;
  width: ${(props) => `${props.$slideWidth}px`};
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

interface SldieProps {
  $numberOfSlides: number;
  $itemWidth: number;
  $itemGap: number;
  $slideWidth: number;
}

const Slide = styled(motion.div)<SldieProps>`
  display: grid;
  gap: ${(props) => `${props.$itemGap}px`};
  width: ${(props) => `${props.$numberOfSlides * props.$slideWidth}px`};
  height: 100%;
  grid-template-columns: ${(props) =>
    `repeat(auto-fit, minmax(${props.$itemWidth}px, ${props.$itemWidth}px))`};
  position: absolute;
  left: 0;
`;

const Item = styled(motion.div)<{ $itemHeight: number }>`
  background-color: rgb(95, 95, 95);
  height: ${(props) => `${props.$itemHeight}px`};
`;

const PreviousSlideButton = styled.div<{ $bottom: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20px;
  bottom: ${(props) => `${props.$bottom}px`};
`;

const NextSlideButton = styled.div<{ $bottom: number }>`
  position: absolute;
  right: 20px;
  bottom: 50px;
`;

interface ISliderProps {
  items: IMovie[];
}

type IDirection = "PREVIOUS" | "NEXT";

const Slider = ({ items }: ISliderProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [rowIndex, setRowIndex] = useState(0);
  const [direction, setDirection] = useState<IDirection>("NEXT");

  const offset = gloabalStore((state) => state.offset);
  const totalMovies = items.length;
  const maxSlideIndex = Math.ceil(totalMovies / offset) - 1;
  const itemGap = gloabalStore((state) => state.itemGap);
  const slideWidth = gloabalStore((state) => state.getSlideWidth());
  const itemWidth = gloabalStore((state) => state.getItemWidth());
  const movingWidth = gloabalStore((state) => state.getMovingWidth());
  const itemHeight = gloabalStore((state) => state.getItemHeight());

  const movingSlideButtonWidth = 16;
  const buttonIconViewbox = 1.6;
  const movingSlideButtonHeight = buttonIconViewbox * movingSlideButtonWidth;

  const showNextSlides = () => {
    if (isMoving) return;
    setIsMoving(true);

    setSlideIndex((prev) => {
      if (prev === maxSlideIndex) {
        setRowIndex((prevIndex) => prevIndex + 1);
        return 0;
      } else return prev + 1;
    });
  };

  const showPrevSlides = () => {
    if (isMoving) return;
    setIsMoving(true);

    setSlideIndex((prev) => {
      if (prev === 0) {
        setRowIndex((prevIndex) => prevIndex + 1);
        return maxSlideIndex;
      } else return prev - 1;
    });
  };

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize, handleResize]);

  return (
    <Wrapper $itemHeight={itemHeight}>
      <SlideWrapper $slideWidth={slideWidth}>
        <AnimatePresence initial={false}>
          <Slide
            $numberOfSlides={maxSlideIndex + 1}
            $itemWidth={itemWidth}
            $itemGap={itemGap}
            $slideWidth={slideWidth}
            key={rowIndex}
            initial={{
              x:
                direction === "NEXT"
                  ? `${-(slideIndex - 1) * movingWidth}px`
                  : `${-(slideIndex + 1) * movingWidth}px`,
            }}
            animate={{
              x: `${-slideIndex * movingWidth}px`,
            }}
            transition={{ duration: 1, type: "tween" }}
            onAnimationComplete={() => {
              setIsMoving(false);
            }}
          >
            {items.map((item, itemIndex) => (
              <Item
                $itemHeight={itemHeight}
                initial={{ x: direction === "NEXT" ? slideWidth : -slideWidth }}
                animate={{ x: 0 }}
                exit={{ x: direction === "NEXT" ? -slideWidth : slideWidth }}
                transition={{ type: "tween", duration: 1 }}
                key={itemIndex}
              >
                {<ThumbnailPlayer item={item} />}
              </Item>
            ))}
          </Slide>
        </AnimatePresence>
        <PreviousSlideButton
          onClick={showPrevSlides}
          onMouseOver={() => setDirection("PREVIOUS")}
          $bottom={(itemHeight - movingSlideButtonHeight) / 2}
        >
          <PreviousSlideIcon $iconWidth={`${movingSlideButtonWidth}px`} />
        </PreviousSlideButton>
        <NextSlideButton
          onClick={showNextSlides}
          onMouseOver={() => setDirection("NEXT")}
          $bottom={(itemHeight - movingSlideButtonHeight) / 2}
        >
          <NextSlideIcon $iconWidth={`${movingSlideButtonWidth}px`} />
        </NextSlideButton>
      </SlideWrapper>
    </Wrapper>
  );
};
export default Slider;
