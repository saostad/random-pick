import React, { HTMLAttributes } from "react";

// Define the props expected by the Footer component, extending standard HTML attributes for <footer>
interface FooterProps extends HTMLAttributes<HTMLElement> {}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="container" {...props}>
      <small>
        Developed by{" "}
        <a href="https://www.linkedin.com/in/saeidostad/">Saeid Ostad</a>
      </small>
    </footer>
  );
};

export default Footer;
