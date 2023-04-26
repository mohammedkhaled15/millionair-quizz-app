import { useEffect, useState, useContext } from "react"
import { AppContext } from "../App"

const QuestionsComp = () => {

  const { data, setTimefinish, questionNumber, setQuestionNumber, setEarned, money, setActiveStage } = useContext(AppContext)

  const [question, setQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [classes, setClasses] = useState("answer")

  useEffect(() => {
    setQuestion(data[questionNumber - 1])
  }, [data, questionNumber])

  const delay = (duration, callback) => {
    setTimeout(() => { callback() }, duration)
  }

  useEffect(() => {
    questionNumber > 1 && setEarned(money.find(m => m.id === questionNumber - 1).amount)
  }, [questionNumber, money, setEarned])

  const handleClick = (answer) => {
    setSelectedAnswer(answer)
    setClasses("selected")
    delay(3000, () => setClasses(answer.correct ? "animate-correct answer" : "animate-wrong answer"))
    delay(6000, () => {
      if (answer.correct) {
        setQuestionNumber(prev => prev + 1)
        setSelectedAnswer(null)
        setActiveStage(prev => prev + 1)
      } else {
        setTimefinish(true)
      }
    })
  }

  return (
    <div className="main h-full flex flex-col items-center justify-around ">
      <div className="quest  w-[80%] bg-[linear-gradient(#100241,black)]  border-2 border-solid border-white text-center p-4 rounded-xl">{question?.question}</div>
      <div className="w-full flex justify-center flex-wrap gap-2">
        {
          question?.answers.map(answer => {
            return (
              <div key={answer.text} className={`${selectedAnswer === answer ? classes : "answer"}`} onClick={() => handleClick(answer)}>{answer.text}</div>
            )
          })
        }
      </div>
    </div>
  )
}

export default QuestionsComp