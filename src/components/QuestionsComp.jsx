import { useEffect, useState, useContext, useRef } from "react";
import { AppContext } from "../App";
import useSound from "use-sound";
import play from "../assets/sounds/play.mp3";
import correct from "../assets/sounds/correct.mp3";
import wrong from "../assets/sounds/wrong.mp3";
import wait from "../assets/sounds/wait.mp3";
import { useTranslation } from "react-i18next";
import { privateRequest } from "../requests/axios";

const QuestionsComp = () => {
  const {
    data,
    setTimefinish,
    timefinish,
    questionNumber,
    setQuestionNumber,
    setEarned,
    money,
    setActiveStage,
    setPause,
    user,
    earned
  } = useContext(AppContext);

  //initiating states
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classes, setClasses] = useState("answer");
  const [answerSelected, setAnswerSelected] = useState(false);
  const [highestEarned, setHighestEarned] = useState(0)

  //sounds
  const [letsPlay] = useSound(play, { interrupt: true });
  const [correctAnswer] = useSound(correct, { interrupt: true });
  const [wrongAnswer] = useSound(wrong);
  const [waitSound] = useSound(wait);

  //activating starting sound
  useEffect(() => {
    letsPlay();
  }, [letsPlay])

  // activating waiting sound
  useEffect(() => {
    delay(3000, () => waitSound())
    setInterval(() => waitSound(), 160000)
  }, [waitSound]);

  //change question according to changes in question number
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  //custom function to use with sound files
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  // update earned money with each correct answer
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(money.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, money, setEarned]);

  //handling choosing an answer
  const handleClick = async (answer) => {
    setAnswerSelected(true)
    setSelectedAnswer(answer);
    setPause(true)
    setClasses("selected");
    delay(3000, () =>
      setClasses(
        answer.correct ? "animate-correct answer" : "animate-wrong answer"
      )
    );
    if (!answer.correct && earned > user.topScore) await privateRequest.post("/update", { username: user.username, score: earned })
    delay(5000, () => {
      if (answer.correct) {
        correctAnswer();
        setPause(false)
        delay(1000, () => {
          setAnswerSelected(false)
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
          setActiveStage((prev) => prev + 1);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimefinish(true);
        });
      }
    });
  };

  const { t } = useTranslation()

  return (
    <div className="main flex h-full flex-col items-center justify-around ">
      <div className="quest  w-[80%] rounded-xl  border-2 border-solid border-white bg-[linear-gradient(#100241,black)] p-4 text-center">
        {t(`question_${questionNumber}`)}
      </div>
      <div className="flex w-full flex-wrap justify-center gap-2">
        {
          question?.answers.map((answer, index) => {
            return (
              <button
                key={answer.text}
                className={`${selectedAnswer === answer ? classes : "answer"}`}
                onClick={() => handleClick(answer)}
                disabled={answerSelected}
              >
                {t(`answers_${questionNumber}_${index + 1}`)}
              </button>
            )
          })
        }
      </div>
    </div>
  );
};

export default QuestionsComp;
