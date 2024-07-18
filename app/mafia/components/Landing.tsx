import { useEffect, useState, useTransition } from "react";
import { langs, Locale } from "@/app/i18n/i18n";
import { setUserLocale, getUserLocale } from "@/app/i18n/locale";

const Landing: React.FC = () => {
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
    </div>
  );
};

export default Landing;
