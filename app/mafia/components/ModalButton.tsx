import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { useModal } from "../contexts/ModalContext";

// Define the props expected by the ModalButton component, extending standard button attributes
interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  modalId: string; // Identifier for the modal this button should open
}

const ModalButton: React.FC<ModalButtonProps> = ({
  children,
  modalId,
  ...props
}) => {
  const { handleOpen } = useModal();

  // When the button is clicked, open the modal with the given modalId
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handleOpen(modalId);
  };

  return (
    <button
      className="btn btn-ghost btn-outline btn-primary min-w-36 mb-2"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ModalButton;
