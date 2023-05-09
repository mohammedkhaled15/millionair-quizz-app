import QuestionsComp from "./QuestionsComp";
import Timer from "./Timer";
import { useContext } from "react";
import { AppContext } from "../App";
import Start from "./Start";

const Container = () => {
  const { earned, timefinish, user } = useContext(AppContext);

  return (
    <div className="flex w-3/4 flex-col bg-hero-image bg-center">
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
          <QuestionsComp />
        </>
      )}
    </div>
  );
};

export default Container;
