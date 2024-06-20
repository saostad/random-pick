import React, { useState, useRef, useEffect, ReactElement } from "react";

interface DropdownButtonProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="dropdown" ref={dropdownRef}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-info btn-outline"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {title}
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className="p-2 my-1 shadow menu dropdown-content z-[100] bg-base-200 rounded-box"
        >
          {clonedChildren}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
