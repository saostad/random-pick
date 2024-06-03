import React, { useState, ReactElement } from "react";

interface DropdownButtonProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Cloning children to add onClick handler to close the dropdown
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === "button") {
      return React.cloneElement(child as ReactElement<any>, {
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (child.props.onClick) {
            child.props.onClick(e);
          }
          setIsOpen(false); // Close the dropdown when a child button is clicked
        },
      });
    }
    return child;
  });

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-info btn-outline"
        onClick={handleToggle}
      >
        {title}
      </div>
      {isOpen && (
        <ul className="p-2 my-1 shadow menu dropdown-content z-[100] bg-base-200 rounded-box">
          {clonedChildren}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
