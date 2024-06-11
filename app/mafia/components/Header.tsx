import React, { HTMLAttributes } from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";

// Define the props expected by the Header component, extending standard HTML attributes for <header>
interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div {...props} className="navbar">
      <div className="flex mb-4 flex-1">
        <h1 className="mr-2 text-3xl font-bold">Mafia</h1>
        <span className="font-mono self-end text-sm">Manage you Game!</span>
      </div>
      <ColorSchemeSwitcher className="contrast flex-none" />
    </div>
  );
};

export default Header;
