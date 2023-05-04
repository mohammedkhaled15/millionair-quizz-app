import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { privateRequest } from "../requests/axios";
import Scoreboard from "./Scoreboard";

const Start = () => {
  const { setStartGame, setUsername, username } = useContext(AppContext);

  const [error, setError] = useState("")
  const [lang, setLang] = useState("en")
  const [showScoreboard, setShowScoreboard] = useState(false)


  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await privateRequest.post("/create", { username: username })
      setStartGame(true)
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.msg)
    }
  }

  const handleChange = (e) => {
    setLang(e.target.value)
  }

  return (
    <div className="m-auto flex flex-col gap-4 w-full h-screen relative">
      <button onClick={() => setShowScoreboard(true)} className={`${showScoreboard ? "hidden" : ""} rounded-xl bg-[#02274d] p-6 text-xl  font-medium active:bg-[#0a1a2b] absolute top-10 right-10`}>Scoreboard</button>
      {
        !showScoreboard ?
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
            <div className="lang flex flex-row justify-evenly">
              <label htmlFor="en" className="text-xl font-semibold">English</label>
              <input
                type="radio"
                name="lang" value="en"
                checked={lang === "en"}
                id="en"
                className="mx-8"
                onChange={handleChange} />
              <label htmlFor="ar" className="text-xl font-semibold">Arabic</label>
              <input
                type="radio"
                name="lang"
                value="ar"
                checked={lang === "ar"}
                id="ar"
                onChange={handleChange} />
            </div>
            <button
              className="rounded-xl bg-[#02274d] p-6 text-xl  font-medium active:bg-[#0a1a2b]"
              onClick={(e) => handleClick(e)}
            >
              Start Game
            </button>
          </form> :
          <Scoreboard setShowScoreboard={setShowScoreboard} />
      }
    </div>
  );
};

export default Start;
