import QuestionsComp from "./QuestionsComp"
import Timer from "./Timer"
import { useContext } from "react"
import { AppContext } from "../App"

const Container = () => {

  const { earned, timefinish } = useContext(AppContext)

  return (
    <div className="w-3/4 bg-hero-image bg-center flex flex-col">
      <div className="h-1/2 relative">
        <Timer />
      </div>
      {
        timefinish ?
          <h1 className="relative top-0 bottom-0 right-0 left-0 m-auto">You Earned: {earned}</h1> :
          <QuestionsComp />
      }

    </div>
  )
}

export default Container