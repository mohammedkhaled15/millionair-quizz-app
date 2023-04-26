import Container from "./components/Container";
import PrizesWrapper from "./components/PrizesWrapper";
import { useMemo, useState } from "react"
import { data } from "./data"
import { createContext } from "react";
import { moneyData } from "./data"


export const AppContext = createContext()

function App() {

  const [activeStage, setActiveStage] = useState(0)
  const [timefinish, setTimefinish] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [earned, setEarned] = useState("$ 0")
  const money = useMemo(() => moneyData, [])

  return (
    <AppContext.Provider
      value={{ activeStage, setActiveStage, timefinish, setTimefinish, data, money, questionNumber, setQuestionNumber, earned, setEarned }}>
      <div className="flex h-screen bg-[#020230] text-white">
        <Container />
        <PrizesWrapper />
      </div>
    </AppContext.Provider>
  );
}

export default App;
