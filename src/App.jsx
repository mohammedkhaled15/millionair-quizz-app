import Container from "./components/Container";
import PrizesWrapper from "./components/PrizesWrapper";
import { useMemo, useState } from "react";
import { data } from "./data";
import { createContext } from "react";
import { moneyData } from "./data";
import Start from "./components/Start";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'path', 'subdomain'],
      caches: ["cookie"]
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    }
  });

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [startGame, setStartGame] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [timefinish, setTimefinish] = useState(false);
  const [pause, setPause] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(2);
  const [earned, setEarned] = useState("$ 0");
  const money = useMemo(() => moneyData, []);

  return (
    <AppContext.Provider
      value={{
        user, setUser,
        activeStage, setActiveStage,
        timefinish, setTimefinish,
        data,
        money,
        questionNumber, setQuestionNumber,
        earned, setEarned,
        setStartGame,
        pause, setPause
      }}
    >
      <div className="flex h-screen bg-[#020230] text-white">
        {startGame ? (
          <>
            <Container />
            <PrizesWrapper />
          </>
        ) : (
          <Start />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
