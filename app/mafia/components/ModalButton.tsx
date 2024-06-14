import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { useModal } from "../contexts/ModalContext";

// Define the props expected by the ModalButton component, extending standard button attributes
interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  modalId: string; // Identifier for the modal this button should open
  animate?: boolean; // Flag to control the animation
}

const ModalButton: React.FC<ModalButtonProps> = ({
  children,
  modalId,
  animate,
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
      className="btn btn-ghost btn-outline btn-primary min-w-24 relative"
      onClick={onClick}
      {...props}
    >
      {animate && (
        <span className="absolute top-1 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      )}
      <span className="grid gap-2 grid-flow-col auto-cols-max relative">
        {children}
      </span>
    </button>
  );
};

export default ModalButton;
