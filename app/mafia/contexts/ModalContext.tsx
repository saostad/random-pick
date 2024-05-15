import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import getScrollBarWidth from "../utils/getScrollBarWidth";

// Defining the context type for managing multiple modals
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

// Custom hook for easy context consumption
const useModal = () => useContext(ModalContext);

// Interface for ModalProvider component props
interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  // Handle to open a modal by its ID
  const handleOpen = useCallback((modalId: string) => {
    setModals((prev) => ({ ...prev, [modalId]: true }));
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  }, []);

  // Handle to close a modal by its ID
  const handleClose = useCallback((modalId: string) => {
    setModals((prev) => ({ ...prev, [modalId]: false }));
    (document.getElementById(modalId) as HTMLDialogElement)?.close();
  }, []);

  // Effect to manage keyboard interactions, specifically the Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        Object.keys(modals).forEach((modalId) => {
          if (modals[modalId]) {
            handleClose(modalId);
          }
        });
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, modals]);

  return (
    <ModalContext.Provider value={{ modals, handleOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
