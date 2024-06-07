"use client";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import Main from "./components/Main";

export default function Mafia() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen prose container mx-auto p-4">
        <div className="flex-none">
          <Header />
        </div>
        <div className="flex-1">
          <Main />
        </div>
        <div className="flex-none">
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
