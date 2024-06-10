import React, { HTMLAttributes } from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";

// Define the props expected by the Header component, extending standard HTML attributes for <header>
interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header
      className="container"
      style={{ display: "flex", justifyContent: "space-between" }}
      {...props}
    >
      <div className="flex mb-4">
        <h1 className="m-0 mr-2 ">Mafia</h1>
        <span className="self-end font-mono">Manage your Game!</span>
      </div>
      <ColorSchemeSwitcher className="contrast" />
    </header>
  );
};

export default Header;
