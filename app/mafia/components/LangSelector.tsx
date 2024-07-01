import { useTransition } from "react";
import DropdownButton from "./DropdownButton";
import { Locale } from "../i18n";
import { setUserLocale } from "../utils/locale";

export const LangSelector: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(value: string) {
    startTransition(() => {
      setUserLocale(value as Locale);
    });
  }

  return (
    <DropdownButton
      title={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="h-9 w-9"
          fill="currentColor"
        >
          <text x="20" y="40" fontSize={30}>
            فا
          </text>
          <text x="55" y="80" fontSize={30}>
            EN
          </text>
          <path
            d="M 30 50 H 70 M 30 50 L 40 40 M 30 50 L 40 60"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M 70 50 H 30 M 70 50 L 60 40 M 70 50 L 60 60"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
      }
    >
      <button
        className="btn"
        onClick={() => {
          handleLocaleChange("fa");
        }}
      >
        FA
      </button>
      <button
        className="btn"
        onClick={() => {
          handleLocaleChange("en");
        }}
      >
        EN
      </button>
    </DropdownButton>
  );
};
