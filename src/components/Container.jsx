
import QuestionsComp from "./QuestionsComp"
import Timer from "./Timer"
import { useContext } from "react"
import { AppContext } from "../App"
const Container = () => {

  const { data, setTimefinish, questionNumber, setQuestionNumber } = useContext(AppContext)

  return (
    <div className="w-3/4 bg-hero-image bg-center flex flex-col">
      <div className="h-1/2 relative">
        <Timer />
      </div>
      <QuestionsComp data={data} setTimefinish={setTimefinish} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} />
    </div>
  )
}

export default Container