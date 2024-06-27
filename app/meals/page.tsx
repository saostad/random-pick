"use client";

import { Main } from "./components/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: [
    {
      rel: "icon",
      url: "meals/favicon.ico",
    },
    {
      href: "meals/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "meals/apple-touch-icon.png",
    },
    {
      href: "meals/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "meals/favicon-32x32.png",
    },
    {
      href: "meals/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "meals/favicon-16x16.png",
    },
    {
      href: "meals/site.webmanifest",
      rel: "manifest",
      url: "meals/site.webmanifest",
    },
    {
      href: "meals/safari-pinned-tab.svg",
      rel: "mask-icon",
      // dark color
      color: "#000000",
      url: "meals/safari-pinned-tab.svg",
    },
  ],
  title: "Healthy food selection game",
  description: "A simple healthy food selection game.",
};

export default Main;
