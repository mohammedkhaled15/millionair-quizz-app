import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useTransition } from "react";
import useSound from "use-sound";
import play from "../assets/sounds/play.mp3";
import correct from "../assets/sounds/correct.mp3";
import wrong from "../assets/sounds/wrong.mp3";
import { useTranslation } from "react-i18next";

const QuestionsComp = () => {
  const {
    data,
    setTimefinish,
    questionNumber,
    setQuestionNumber,
    setEarned,
    money,
    setActiveStage,
  } = useContext(AppContext);

  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classes, setClasses] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(money.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, money, setEarned]);

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    setClasses("selected");
    delay(3000, () =>
      setClasses(
        answer.correct ? "animate-correct answer" : "animate-wrong answer"
      )
    );
    delay(5000, () => {
      if (answer.correct) {
        correctAnswer();
        delay(1000, () => {
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
              <div
                key={answer.text}
                className={`${selectedAnswer === answer ? classes : "answer"}`}
                onClick={() => handleClick(answer)}
              >
                {t(`answers_${questionNumber}_${index + 1}`)}
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default QuestionsComp;
