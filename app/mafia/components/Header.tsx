import React, { HTMLAttributes } from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";

// Define the props expected by the Header component, extending standard HTML attributes for <header>
interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="container" {...props}>
      <ColorSchemeSwitcher className="contrast" />
    </header>
  );
};

export default Header;
