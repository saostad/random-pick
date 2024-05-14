import React from "react";
import { useModal } from "../contexts/ModalContext";

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  component?: React.ElementType; // Type for a React component to render inside the modal
  children?: React.ReactNode; // For directly passed children content
  modalId: string; // Identifier for the modal
}

const FlexibleModal: React.FC<ModalProps> = ({
  component: Component,
  children,
  modalId,
  ...props
}) => {
  const { modals, handleClose } = useModal();

  const handleClickOverlay = (event: React.MouseEvent<HTMLDialogElement>) => {
    // Check if the click is on the overlay
    if (event.target === event.currentTarget) {
      handleClose(modalId); // Close the modal using its identifier
    }
  };

  // Determine if the specific modal is open
  const isOpen = modals[modalId] || false;

  return (
    <dialog onClick={handleClickOverlay} open={isOpen} {...props}>
      <article>
        <header>
          <button
            aria-label="Close"
            rel="prev"
            onClick={() => handleClose(modalId)}
          ></button>
        </header>
        {Component ? <Component /> : children}
        <footer>
          <button onClick={() => handleClose(modalId)}>Close</button>
        </footer>
      </article>
    </dialog>
  );
};

export default FlexibleModal;
