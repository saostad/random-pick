"use client";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import Main from "./components/Main";

export default function Mafia() {
  return (
    <ThemeProvider>
      <div className="prose container mx-auto p-4">
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
