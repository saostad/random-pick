import React from "react";
import { useModal } from "../contexts/ModalContext";

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  component?: React.ElementType; // React component to render inside the modal
  children?: React.ReactNode; // Directly passed children content
  modalId: string; // Identifier for the modal
}

const FlexibleModal: React.FC<ModalProps> = ({
  component: Component,
  children,
  modalId,
  ...props
}) => {
  const { handleClose } = useModal();

  return (
    <dialog id={modalId} className="modal" {...props}>
      <div className="modal-box">
        <button
          className="absolute right-4 top-3"
          onClick={() => handleClose(modalId)}
        >
          ✕
        </button>
        {Component ? <Component /> : children}
        <div className="modal-action">
          <button className="btn" onClick={() => handleClose(modalId)}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default FlexibleModal;
