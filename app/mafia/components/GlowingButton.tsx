import React from "react";

interface GlowingButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  onClick,
  disabled = false,
  children,
  className = "",
}) => {
  return (
    <button
      className={`
      btn btn-outline
      relative overflow-hidden
      shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]
      animate-pulse
      ${className}
    `}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white to-transparent
          opacity-30
        "
        style={{
          animation: "shine 2s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes shine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </button>
  );
};

export default GlowingButton;
