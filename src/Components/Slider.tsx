import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IMovie } from "../api/movie";
import { useCallback, useEffect, useRef, useState } from "react";
import ThumbnailPlayer from "./ThumbnailPlayer";
import { globalStore, sliderStore } from "../stores";
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
  /* overflow: hidden; */
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
  height: ${(props) => `${props.$itemHeight}px`};
  position: relative;
`;

const PreviousSlideButton = styled.div<{ $bottom: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20px;
  bottom: ${(props) => `${props.$bottom}px`};
  z-index: 1;
`;

const NextSlideButton = styled.div<{ $bottom: number }>`
  position: absolute;
  right: 20px;
  bottom: ${(props) => `${props.$bottom}px`};
  z-index: 1;
`;

interface ISliderProps {
  items: IMovie[];
  sliderID: string;
  videoType: TVideo;
}

type IDirection = "PREVIOUS" | "NEXT";

const Slider = ({ sliderID, items, videoType }: ISliderProps) => {
  const nextSlideButtonRef = useRef<null | HTMLDivElement>(null);
  const previousSlideButtonRef = useRef<null | HTMLDivElement>(null);
  const setSlidesInfo = sliderStore((state) => state.setSlidesInfo);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [rowIndex, setRowIndex] = useState(0);

  const [direction, setDirection] = useState<IDirection>("NEXT");
  const offset = globalStore((state) => state.offset);
  const totalMovies = items.length;
  const maxSlideIndex = Math.ceil(totalMovies / offset) - 1;
  const itemGap = globalStore((state) => state.itemGap);
  const slideWidth = globalStore((state) => state.getSlideWidth());
  const itemWidth = globalStore((state) => state.getItemWidth());
  const movingWidth = globalStore((state) => state.getMovingWidth());
  const itemHeight = globalStore((state) => state.getItemHeight());

  const movingSlideButtonWidth = 16;
  const buttonIconViewbox = 1.6;
  const movingSlideButtonHeight = buttonIconViewbox * movingSlideButtonWidth;

  useEffect(() => {
    setSlidesInfo(sliderID, { slideIndex: slideIndex });
  }, [slideIndex]);

  const [isRowBeingChanged, SetIsRowBeingChanged] = useState(false);

  const showNextSlides = () => {
    if (isMoving) return;
    setIsMoving(true);

    setSlideIndex((prev) => {
      if (prev === maxSlideIndex) {
        SetIsRowBeingChanged(true);
        setRowIndex((prevIndex) => prevIndex + 1);
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const showPrevSlides = () => {
    if (isMoving) return;
    setIsMoving(true);

    setSlideIndex((prev) => {
      if (prev === 0) {
        SetIsRowBeingChanged(true);
        setRowIndex((prevIndex) => prevIndex + 1);
        return maxSlideIndex;
      } else {
        return prev - 1;
      }
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

  const onClickItem = () => {
    if (nextSlideButtonRef.current instanceof HTMLDivElement) {
      nextSlideButtonRef.current.style.zIndex = "-1";
    }
    if (previousSlideButtonRef.current instanceof HTMLDivElement) {
      previousSlideButtonRef.current.style.zIndex = "-1";
    }
  };

  const onMouseLeaveFromItem = () => {
    if (nextSlideButtonRef.current instanceof HTMLDivElement) {
      nextSlideButtonRef.current.style.zIndex = "1";
    }
    if (previousSlideButtonRef.current instanceof HTMLDivElement) {
      previousSlideButtonRef.current.style.zIndex = "1";
    }
  };

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
            transition={{
              duration: isRowBeingChanged ? 1.5 : 1,
              type: "tween",
            }}
            onAnimationComplete={() => {
              setIsMoving(false);
              SetIsRowBeingChanged(false);
            }}
          >
            {items.map((item, itemIndex) => (
              <Item
                onClick={onClickItem}
                onMouseLeave={onMouseLeaveFromItem}
                $itemHeight={itemHeight}
                initial={{
                  x: direction === "NEXT" ? slideWidth : -slideWidth,
                }}
                animate={{ x: 0 }}
                exit={{
                  x: direction === "NEXT" ? -slideWidth : slideWidth,
                }}
                transition={{ duration: 1, type: "tween" }}
                key={itemIndex}
              >
                <ThumbnailPlayer
                  sliderID={sliderID}
                  videoType={videoType}
                  item={item}
                  itemIndex={itemIndex}
                  isFirstOneOfSlide={itemIndex % offset === 0}
                  methodProps={{ showNextSlides, showPrevSlides }}
                />
              </Item>
            ))}
          </Slide>
        </AnimatePresence>
        <PreviousSlideButton
          ref={previousSlideButtonRef}
          onClick={showPrevSlides}
          onMouseOver={() => setDirection("PREVIOUS")}
          $bottom={(itemHeight - movingSlideButtonHeight) / 2}
        >
          <PreviousSlideIcon $iconWidth={`${movingSlideButtonWidth}px`} />
        </PreviousSlideButton>
        <NextSlideButton
          ref={nextSlideButtonRef}
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
