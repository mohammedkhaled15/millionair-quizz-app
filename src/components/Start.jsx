import { useContext, useState } from "react";
import { AppContext } from "../App";
import { privateRequest } from "../requests/axios";

const Start = () => {
  const { setStartGame, setUsername, username } = useContext(AppContext);

  const [error, setError] = useState("")

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await privateRequest.post("/create", { username: username })
      // username && setStartGame(true)
      setStartGame(true)
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.msg)
    }
  }

  return (
    <form className="m-auto flex flex-col gap-4 self-center">
      <h1 className="text-[red] text-3xl font-semibold">{error}</h1>
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
        onClick={(e) => handleClick(e)}
      >
        Start Game
      </button>
    </form>
  );
};

export default Start;
