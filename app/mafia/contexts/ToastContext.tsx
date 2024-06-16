import React, { createContext, useState, ReactNode } from "react";

// Define the ToastType type
type ToastType = "info" | "success" | "warning" | "error";

// Define the ToastLocation type
type ToastLocation =
  | "toast-top toast-start"
  | "toast-top toast-center"
  | "toast-top toast-end"
  | "toast-middle toast-start"
  | "toast-middle toast-center"
  | "toast-middle toast-end"
  | "toast-bottom toast-start"
  | "toast-bottom toast-center"
  | "toast-bottom toast-end";

// Define the Toast interface
interface Toast {
  id: number;
  message: string;
  type: ToastType;
  isAutoClose: boolean;
  autoCloseAt: number;
  location: ToastLocation;
}

type PartialToast = Required<Pick<Toast, "message">> &
  Partial<Omit<Toast, "id" | "message">>;

// Define the ToastContextValue interface
interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: PartialToast) => void;
  removeToast: (id: number) => void;
}

// Create the ToastContext
export const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

// Define the ToastProviderProps interface
interface ToastProviderProps {
  children: ReactNode;
}

// Create the ToastProvider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to add a new toast
  const addToast = ({
    message,
    type = "info",
    isAutoClose = true,
    autoCloseAt = 3000,
    location = "toast-top toast-end",
  }: PartialToast) => {
    const newToast: Toast = {
      id: Date.now(),
      message,
      type,
      isAutoClose,
      autoCloseAt,
      location,
    };
    setToasts([...toasts, newToast]);

    if (isAutoClose) {
      setTimeout(() => {
        removeToast(newToast.id);
      }, autoCloseAt);
    }
  };

  // Function to remove a toast
  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const contextValue: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Create the ToastContainer component
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = React.useContext(ToastContext);

  return (
    <>
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.location}`}>
          <div className={`alert max-w-screen-md ${getAlertClass(toast.type)}`}>
            <span className="text-sm">{toast.message}</span>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => removeToast(toast.id)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

// Function to get the appropriate alert class based on the type
const getAlertClass = (type: ToastType) => {
  switch (type) {
    case "success":
      return "alert-success";
    case "warning":
      return "alert-warning";
    case "error":
      return "alert-error";
    default:
      return "alert-info";
  }
};
