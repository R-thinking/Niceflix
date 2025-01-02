import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { playerStore } from "../stores";
import { useRef, useState } from "react";

const Frame = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled(motion.div)`
  width: 50vw;
  height: 95vh;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
`;

const Player = styled(motion.div)`
  background-color: red;
  width: 100%;
  flex: 2;
  position: relative;
`;

const Button = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseButton = styled(Button)`
  background-color: #2a2a2a;
  font-weight: 600;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const DescriptionLayer = styled.div`
  background-color: #1500ff;
  width: 100%;
  flex: 1;
`;

const PreviewPlayer = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [containerKey, setContainerKey] = useState(0);
  const previewPlayerData = playerStore((state) => state.data);
  const setVisibility = playerStore((state) => state.setVisibility);
  const position = playerStore((state) => state.position);

  const hideVisibility = () => setVisibility(false);

  const closePlayer = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    setContainerKey((prev) => prev + 1);
  };

  const resetAnimation = () => {
    hideVisibility();
    setContainerKey(0);
  };

  return (
    <AnimatePresence onExitComplete={resetAnimation}>
      {containerKey === 0 && (
        <Frame
          key={containerKey}
          onClick={closePlayer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <Container
            ref={containerRef}
            initial={{
              scale: 0,
              x: position.left,
              y: position.top,
            }}
            animate={{
              scale: 1,
              x: "50%",
              y: "2.5%",
            }}
            exit={{ scale: 0, x: position.left, y: position.top }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            <Player>
              <CloseButton onClick={closePlayer}>X</CloseButton>
            </Player>
            <DescriptionLayer></DescriptionLayer>
          </Container>
        </Frame>
      )}
    </AnimatePresence>
  );
};

export default PreviewPlayer;
