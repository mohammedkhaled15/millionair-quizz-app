import QuestionsComp from "./QuestionsComp";
import Timer from "./Timer";
import { useContext, useEffect } from "react";
import useSound from "use-sound";
import { AppContext } from "../App";
import wrong from "../assets/sounds/wrong.mp3";


const Container = () => {
  const { earned, timefinish, user } = useContext(AppContext);

  const [wrongAnswer] = useSound(wrong);


  useEffect(() => {
    timefinish ? wrongAnswer() : null
  }, [timefinish, wrongAnswer])

  return (
    <div className="flex w-3/4 flex-col bg-hero-image bg-center">
      {<h1>{user.username}</h1>}
      {timefinish ? (
        <h1 className="relative bottom-0 left-0 right-0 top-0 m-auto text-2xl font-semibold">
          You Earned: $ {earned}
        </h1>
      ) : (
        <>
          <div className="relative h-1/2">
            <Timer />
          </div>
          <QuestionsComp />
        </>
      )}
    </div>
  );
};

export default Container;
