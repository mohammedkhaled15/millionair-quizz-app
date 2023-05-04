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

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next"
        }
      },
      ar: {
        translation: {
          "Welcome to React": "مرحبًا بكم ي ريأكت"
        }
      },
    },
    fallbackLng: "en",
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'sessionStorage', 'path', 'subdomain'],
    }
  });

export const AppContext = createContext();

function App() {
  const [username, setUsername] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [timefinish, setTimefinish] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");
  const money = useMemo(() => moneyData, []);

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        activeStage,
        setActiveStage,
        timefinish,
        setTimefinish,
        data,
        money,
        questionNumber,
        setQuestionNumber,
        earned,
        setEarned,
        setStartGame
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
