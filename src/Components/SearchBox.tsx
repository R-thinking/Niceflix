import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import SearchIcon from "../asets/SearchIcon";

const Box = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled(motion.div)`
  z-index: 1;
  cursor: pointer;
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -230px;
  background-color: rgba(40, 40, 40, 1);
  height: 40px;
  padding: 0 40px;
  font-size: 16px;
  width: 250px;
  border: 2px solid rgb(124, 124, 124);
  border-radius: 3px;
  color: #ffffff;
  font-weight: 100;
`;

const SearchBox = () => {
  const [isClicked, setClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputAnimation = useAnimation();
  const openSearch = () => {
    setClicked(true);
    /* useAnimation
    inputAnimation.start({
      scaleX: 1,
    }); */
    inputRef.current?.focus();
  };
  const closeSearch = () => {
    setClicked(false);
    /* useAnimation
    inputAnimation.start({
      scaleX: 0,
    }); */
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box>
      <Wrapper
        onClick={openSearch}
        initial={{ x: 0 }}
        animate={{ x: isClicked ? -220 : 0 }}
        transition={{ ease: "linear" }}
      >
        <SearchIcon iconwidth="20px" />
      </Wrapper>
      <Input
        ref={inputRef}
        onBlur={closeSearch}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isClicked ? 1 : 0 }}
        /* useAnimation
         initial={{ scaleX: 0 }}
        animate={inputAnimation} 
        */
        transition={{ ease: "linear" }}
        placeholder="Titles, people, genres"
      />
    </Box>
  );
};

export default SearchBox;
