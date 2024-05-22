import React, { HTMLAttributes } from "react";

// Define the props expected by the Footer component, extending standard HTML attributes for <footer>
interface FooterProps extends HTMLAttributes<HTMLElement> {}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="footer footer-center text-base-content">
      <aside>
        <span>
          Developed by{" "}
          <a href="https://www.linkedin.com/in/saeidostad/">Saeid Ostad</a>
        </span>
        <span>Copyright © 2024 - All right reserved.</span>
      </aside>
    </footer>
  );
};

export default Footer;
