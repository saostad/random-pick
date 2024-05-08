import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import getScrollBarWidth from "../utils/getScrollBarWidth";

// Defining the context type to manage multiple modals
interface ModalContextType {
  modals: Record<string, boolean>; // Tracks open state of multiple modals
  handleOpen: (modalId: string) => void;
  handleClose: (modalId: string) => void;
}

// Creating the context with default values
const ModalContext = createContext<ModalContextType>({
  modals: {},
  handleOpen: () => {},
  handleClose: () => {},
});
const useModal = () => useContext(ModalContext);

// Interface for the props of ModalProvider
interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const isSSR = typeof window === "undefined";
  const htmlTag = !isSSR ? document.querySelector("html") : null;
  const [modals, setModals] = useState<Record<string, boolean>>({});
  const modalAnimationDuration = 400;

  // Handle opening a modal
  const handleOpen = (modalId: string) => {
    setModals((prev) => ({ ...prev, [modalId]: true }));
    if (htmlTag) {
      htmlTag.classList.add("modal-is-open", "modal-is-opening");
      setTimeout(() => {
        htmlTag.classList.remove("modal-is-opening");
      }, modalAnimationDuration);
    }
  };

  // Handle closing a modal
  const handleClose = useCallback(
    (modalId: string) => {
      if (htmlTag) {
        htmlTag.classList.add("modal-is-closing");
        setTimeout(() => {
          setModals((prev) => ({ ...prev, [modalId]: false }));
          htmlTag.classList.remove("modal-is-open", "modal-is-closing");
        }, modalAnimationDuration);
      }
    },
    [htmlTag]
  );

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      Object.keys(modals).forEach((modalId) => {
        if (modals[modalId]) {
          handleClose(modalId);
        }
      });
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, modals]);

  // Set scrollbar width on mount
  useEffect(() => {
    if (htmlTag) {
      const scrollBarWidth = getScrollBarWidth();
      htmlTag.style.setProperty(
        "--pico-scrollbar-width",
        `${scrollBarWidth}px`
      );
      return () => {
        htmlTag.style.removeProperty("--pico-scrollbar-width");
      };
    }
  }, [htmlTag]);

  return (
    <ModalContext.Provider
      value={{
        modals,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
