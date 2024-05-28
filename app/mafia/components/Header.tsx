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
        <h1 className="m-0 mr-2 bg-gradient-to-r from-blue-600 via-green-500 to-red-600 text-transparent bg-clip-text">
          Mafia
        </h1>
        <span className="self-end">Manage your Game!</span>
      </div>
      <ColorSchemeSwitcher className="contrast" />
    </header>
  );
};

export default Header;
