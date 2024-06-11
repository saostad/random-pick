import React, { HTMLAttributes } from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";

// Define the props expected by the Header component, extending standard HTML attributes for <header>
interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div {...props} className="navbar mt-4">
      <div className="flex mb-4 flex-1">
        <h1 className="btn btn-ghost mr-2 text-4xl font-bold px-2 pt-2">
          Mafia
        </h1>
        <span className="font-mono self-end max-sm:text-xs">
          Manage you Game!
        </span>
      </div>
      <ColorSchemeSwitcher className="contrast flex-none p-4" />
    </div>
  );
};

export default Header;
