import { useEffect, useState, useTransition } from "react";
import { langs, Locale } from "@/app/i18n/i18n";
import { setUserLocale, getUserLocale } from "@/app/i18n/locale";
import GlowingButton from "./GlowingButton";
import { useModal } from "../contexts/ModalContext";
import { useGameContext } from "../contexts/GameContext";
import { useTranslations } from "next-intl";

const Landing: React.FC = () => {
  const t = useTranslations("Mafia");
  const { handleClose } = useModal();
  const { updateGameState } = useGameContext();
  const [isPending, startTransition] = useTransition();
  const [currentLang, setCurrentLang] = useState<Locale>("en"); // Set default language

  useEffect(() => {
    (async () => {
      setCurrentLang((await getUserLocale()) as Locale);
    })();
  }, []);

  function handleLocaleChange(value: Locale) {
    startTransition(() => {
      setUserLocale(value);
      setCurrentLang(value);
    });
  }
  return (
    <div>
      <h2 className="font-bold my-4">Select Language</h2>
      {langs.map((lang) => (
        <div key={lang.code} className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">{lang.name}</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              onChange={() => handleLocaleChange(lang.code as Locale)}
              checked={currentLang === lang.code}
            />
          </label>
        </div>
      ))}
      <GlowingButton
        className="my-4"
        onClick={() => {
          handleClose("Landing");
          updateGameState({ hasLandingShown: true });
        }}
      >
        {t("continue")}
      </GlowingButton>
    </div>
  );
};

export default Landing;
