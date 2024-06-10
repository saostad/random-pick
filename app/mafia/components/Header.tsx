import React, { HTMLAttributes } from "react";
import ColorSchemeSwitcher from "./ColorSchemeSwitcher";

// Define the props expected by the Header component, extending standard HTML attributes for <header>
interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header {...props}>
      <div className="navbar">
        <div className="self-start flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex mb-4 flex-1">
          <h1 className="m-0 mr-2 ">Mafia</h1>
          <span className="font-mono self-end text-sm">Manage you Game!</span>
        </div>
        <ColorSchemeSwitcher className="contrast flex-none" />
      </div>
    </header>
  );
};

export default Header;
