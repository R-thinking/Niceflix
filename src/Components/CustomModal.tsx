import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { TModalID, userStore } from "../stores/userStore";
import { is24HoursOrMore } from "../utilities/time";

// Set the app element for accessibility
Modal.setAppElement("#root");

// Styled components for the App
const ModalBox = styled.div`
  text-align: center;
  /* padding: 50px; */
`;

const OpenModalButton = styled.button`
  background-color: #e50914; /* Netflix red */
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f40612; /* Hover red */
  }
`;

// Modal styling
const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.559); /* Semi-transparent dark background */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #141414;
  padding: 30px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  color: white;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: rgb(214, 214, 214);
`;

const CloseButton = styled.button`
  background-color: rgb(49, 49, 49);
  color: white;
  font-size: 16px;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  text-align: right;
  position: relative;
`;

const DontOpenAgain = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  gap: 5px;
`;

const CheckDontOpenAgain = styled.input``;
const Description = styled.span``;

const CloseModalButton = styled.button`
  background-color: #e50914;
  color: white;
  padding: 8px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: #f40612;
  }
`;

const ModalBody = styled.div`
  padding: 10px 0;
  color: rgb(214, 214, 214);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CustomModal: React.FC<{
  content: { title: string; body: string[] };
  modalID?: TModalID;
  options?: {
    dontOpenAgain?: {
      visible: boolean;
    };
  };
}> = ({ content, modalID, options }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickOut = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    closeModal();
  };

  const dontOpenAgainCheckboxRef = useRef(null);
  const dontOpenAgainModalIds = userStore(
    (state) => state.dontOpenAgainModalIds
  );
  const addDontOpenModal = userStore((state) => state.addDontOpenModal);
  const deleteDontOpenModal = userStore((state) => state.deleteDontOpenModal);
  const onCheckDontOpenAgain = () => {
    if (modalID) {
      addDontOpenModal(modalID);
    }
  };
  const [isDontOpenModal, setIsDontOpenModal] = useState(true);

  useEffect(() => {
    if (modalID && typeof dontOpenAgainModalIds[modalID] === "string") {
      if (is24HoursOrMore(new Date(dontOpenAgainModalIds[modalID] as string))) {
        deleteDontOpenModal(modalID);
      }
    }
    if (modalID)
      setIsDontOpenModal(
        modalID ? Object.keys(dontOpenAgainModalIds).includes(modalID) : false
      );
  }, [modalID && dontOpenAgainModalIds[modalID]]);

  return (
    <ModalBox>
      <Modal
        isOpen={isModalOpen && !(modalID && isDontOpenModal)}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <ModalOverlay onClick={onClickOut}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{content.title}</ModalTitle>
              {/* <CloseButton onClick={closeModal}>X</CloseButton> */}
            </ModalHeader>
            <ModalBody>
              {content.body.map((phrase, index) => (
                <p key={index}>{phrase}</p>
              ))}
            </ModalBody>
            <ModalFooter>
              {options?.dontOpenAgain?.visible ? (
                <DontOpenAgain>
                  <CheckDontOpenAgain
                    ref={dontOpenAgainCheckboxRef}
                    type="checkbox"
                    onClick={onCheckDontOpenAgain}
                  />
                  <Description>오늘 보지 않기</Description>
                </DontOpenAgain>
              ) : null}
              <CloseModalButton onClick={closeModal}>Close</CloseModalButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </ModalBox>
  );
};

export default CustomModal;
