import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const Timer = () => {
  const { setTimefinish, questionNumber } = useContext(AppContext);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimefinish(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimefinish]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return (
    <div className="absolute bottom-2 left-28 flex h-20 w-20 items-center justify-center rounded-[50%] border-2 border-solid border-white text-3xl font-bold">
      {timer}
    </div>
  );
};

export default Timer;
