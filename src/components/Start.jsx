import { useContext } from "react";
import { AppContext } from "../App";

const Start = () => {
  const { setStartGame, setUsername, username } = useContext(AppContext);

  const handleClick = () => {
    username && setStartGame(true)
  }

  return (
    <form className="m-auto flex flex-col gap-4 self-center">
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Enter Your Username"
        className="rounded-xl border-0 border-b-2 border-solid border-[mediumblue] p-6 text-2xl font-semibold text-[mediumblue] outline-none"
      />
      <button
        className="rounded-xl bg-[#02274d] p-6 text-xl  font-medium active:bg-[#0a1a2b]"
        onClick={handleClick}
      >
        Start Game
      </button>
    </form>
  );
};

export default Start;
