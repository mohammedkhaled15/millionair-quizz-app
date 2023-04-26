import Container from "./components/Container";
import PrizesWrapper from "./components/PrizesWrapper";
import { useState } from "react"
import { data } from "./data"
import { createContext } from "react";
import { money } from "./data"


export const AppContext = createContext()

function App() {

  const [activeStage, setActiveStage] = useState(6)
  const [timefinish, setTimefinish] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  return (
    <AppContext.Provider
      value={{ activeStage, setActiveStage, timefinish, setTimefinish, data, money, questionNumber, setQuestionNumber }}>
      <div className="flex h-screen bg-[#020230] text-white">
        <Container />
        <PrizesWrapper activeStage={activeStage} setActiveStage={setActiveStage} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
