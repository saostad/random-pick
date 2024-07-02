import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("Mafia.About");
  return (
    <aside>
      <p>
        {t("developedBy")}{" "}
        <a href="https://www.linkedin.com/in/saeidostad/">
          {t("developerName")}
        </a>
      </p>
      <p>{t("copyRight")}</p>
    </aside>
  );
};

export default About;
