"use client";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import Main from "./components/Main";

export default function Mafia() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen container mx-auto">
        <header className="flex-none">
          <Header />
        </header>
        <main className="flex-1">
          <Main />
        </main>
        <footer className="flex-none">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}
