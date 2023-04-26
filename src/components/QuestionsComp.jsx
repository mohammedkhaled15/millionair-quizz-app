import { useEffect, useState } from "react"

const QuestionsComp = ({ data, setTimefinish, questionNumber, setQuestionNumber }) => {

  const [question, setQuestion] = useState()

  useEffect(() => {
    setQuestion(questionNumber - 1)
  }, [setQuestion, questionNumber])

  return (
    <div className="main h-full flex flex-col items-center justify-around ">
      <div className="quest  w-[80%] bg-[linear-gradient(#100241,black)]  border-2 border-solid border-white text-center p-4 rounded-xl">{question.question}</div>
      <div className="w-full flex justify-center flex-wrap gap-2">
        {
          question.answers.map(answer => {
            return (
              <div key={answer.text} className={`answer`}>{answer.text}</div>
            )
          })
        }
      </div>
    </div>
  )
}

export default QuestionsComp