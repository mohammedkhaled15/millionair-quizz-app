import { AppContext } from "../App";
import { useContext } from "react";

const PrizesWrapper = () => {
  const { money, activeStage } = useContext(AppContext);

  return (
    <div className="flex w-1/4 items-center justify-center">
      <ul className="w-full list-none p-10">
        {money.map((item) => {
          return (
            <li
              key={item.id}
              className={`${
                activeStage === item.id - 1 ? "active" : ""
              } flex items-center rounded-lg p-1 transition-all duration-[9000]`}
            >
              <span className="w-1/3 text-lg font-thin">{item.id}</span>
              <span className="text-xl font-extralight">$ {item.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrizesWrapper;
