import QuestionsComp from "./QuestionsComp";
import Timer from "./Timer";
import { useContext, useEffect } from "react";
import useSound from "use-sound";
import { AppContext } from "../App";
import wrong from "../assets/sounds/wrong.mp3";
import { privateRequest } from "../requests/axios";
import Winner from "./Winner"
import wait from "../assets/sounds/wait.mp3";


const Container = () => {
  const { earned, timefinish, user, questionNumber } = useContext(AppContext);

  const [wrongAnswer] = useSound(wrong);
  const [waitSound, { stop }] = useSound(wait);


  useEffect(() => {
    const updateScore = async () => {
      if (timefinish && (earned > user.topScore)) {
        await privateRequest.post("/update", { username: user.username, score: earned })
      }
    }
    updateScore()
  }, [earned, timefinish, user.topScore, user.username])

  useEffect(() => {
    timefinish ? wrongAnswer() : null
  }, [timefinish, wrongAnswer])

  return (
    <div className="flex w-3/4 flex-col bg-hero-image bg-center">
      {
        questionNumber === 16 ? <Winner waitSound={waitSound} stopWaiting={stop} /> :
          <>
            {<h1><b>Player Name: </b>{user?.username?.toUpperCase()}</h1>}
            {timefinish ? (
              <h1 className="relative bottom-0 left-0 right-0 top-0 m-auto text-2xl font-semibold">
                You Earned: $ {earned}
              </h1>
            ) : (
              <>
                <div className="relative h-1/2">
                  <Timer />
                </div>
                <QuestionsComp waitSound={waitSound} stopWaiting={stop} />
              </>
            )}
          </>
      }

    </div>
  );
};

export default Container;
