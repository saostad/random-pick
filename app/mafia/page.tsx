import Mafia from "./Mafia";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: [
    {
      rel: "icon",
      url: "mafia/favicon.ico",
    },
    {
      href: "mafia/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "mafia/apple-touch-icon.png",
    },
    {
      href: "mafia/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "mafia/favicon-32x32.png",
    },
    {
      href: "mafia/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "mafia/favicon-16x16.png",
    },
    {
      href: "mafia/site.webmanifest",
      rel: "manifest",
      url: "mafia/site.webmanifest",
    },
    {
      href: "mafia/safari-pinned-tab.svg",
      rel: "mask-icon",
      color: "#000000",
      url: "mafia/safari-pinned-tab.svg",
    },
  ],
  title: "Mafia Night Online",
  description:
    "New to Mafia games? Join us at Mafia Night and dive into a game of trust and treachery. Learn the ropes of social deduction and enjoy a fun, engaging game night with friends.",
};

export default Mafia;
