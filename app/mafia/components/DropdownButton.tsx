import React, { useRef, ReactElement } from "react";

interface DropdownButtonProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ title, children }) => {
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const handleCloseDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.open = false;
    }
  };

  // Cloning children to add onClick handler to close the dropdown
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === "button") {
      return React.cloneElement(child as ReactElement<any>, {
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (child.props.onClick) {
            child.props.onClick(e);
          }
          handleCloseDropdown();
        },
      });
    }
    return child;
  });

  return (
    <details className="dropdown" ref={dropdownRef}>
      <summary className="btn p4 btn-outline min-w-24">{title}</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box">
        {clonedChildren}
      </ul>
    </details>
  );
};

export default DropdownButton;
