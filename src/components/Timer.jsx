import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const Timer = () => {
  const { setTimefinish, questionNumber, pause } = useContext(AppContext);
  const [timer, setTimer] = useState(8);

  useEffect(() => {
    if (timer === 0) return setTimefinish(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (pause) clearInterval(interval)
    return () => clearInterval(interval);
  }, [timer, setTimefinish, pause]);


  useEffect(() => {
    setTimer(8);
  }, [questionNumber]);

  return (
    <div className="absolute bottom-2 left-28 flex h-20 w-20 items-center justify-center rounded-[50%] border-2 border-solid border-white text-3xl font-bold">
      {timer}
    </div>
  );
};

export default Timer;
