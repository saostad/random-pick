import React from "react";
import { useModal } from "../contexts/ModalContext";
import { useTranslations } from "next-intl";

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  component?: React.ElementType; // React component to render inside the modal
  children?: React.ReactNode; // Directly passed children content
  modalId: string; // Identifier for the modal
  title?: string; // Title for the modal header
}

const FlexibleModal: React.FC<ModalProps> = ({
  component: Component,
  children,
  modalId,
  title,
  ...props
}) => {
  const { handleClose } = useModal();
  const t = useTranslations("Mafia.Common");

  return (
    <dialog id={modalId} className="modal" {...props}>
      <div className="modal-box">
        <div className="flex justify-between items-top mb-4">
          {title ? (
            <p className="font-bold text-lg mt-0">{title}</p>
          ) : (
            <div></div> // Spacer to keep the alignment
          )}
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => handleClose(modalId)}
            >
              ✕
            </button>
          </form>
        </div>
        {Component ? <Component /> : children}
        <div className="modal-action">
          <button className="btn" onClick={() => handleClose(modalId)}>
            {t("close")}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default FlexibleModal;
