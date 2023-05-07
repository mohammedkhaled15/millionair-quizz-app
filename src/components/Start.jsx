import Register from "./Register"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { privateRequest } from "../requests/axios";
import Scoreboard from "./Scoreboard";
import i18next from "i18next";

const Start = () => {
  const { setStartGame, setUser, user } = useContext(AppContext);

  const [returnedMsg, setReturnedMsg] = useState("")
  const [lang, setLang] = useState("en")
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [showRegister, setShowRegister] = useState(false)


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await privateRequest.post("/login", { username: user.username, password: user.password })
      setStartGame(true)
      setUser({ username: "", password: "" })
    } catch (error) {
      console.log(error)
      setReturnedMsg(error?.response?.data?.msg)
    }
  }

  const handleUserChange = (e) => {
    setUser(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const handleChange = (e) => {
    setLang(e.target.value)
    i18next.changeLanguage(e.target.value)
  }

  return (
    <div className="m-auto flex flex-col gap-4 w-full h-screen relative">
      <button onClick={() => setShowScoreboard(true)} className={`${showScoreboard || showRegister ? "hidden" : ""} rounded-xl bg-[#02274d] p-6 text-xl  font-medium active:bg-[#0a1a2b] absolute top-10 right-10`}>Scoreboard</button>
      {
        !showScoreboard && !showRegister ?
          <form className="m-auto flex flex-col gap-4 self-center">
            <h1 className="text-[red] text-3xl font-semibold">{returnedMsg}</h1>
            <input
              name="username"
              value={user.username}
              onChange={(e) => handleUserChange(e)}
              type="text"
              placeholder="Enter Your Username"
              className="rounded-xl border-0 border-b-2 border-solid border-[mediumblue] p-6 text-2xl font-semibold text-[mediumblue] outline-none"
            />
            <input
              name="password"
              value={user.password}
              onChange={(e) => handleUserChange(e)}
              type="password"
              placeholder="Enter Your Password"
              className="rounded-xl border-0 border-b-2 border-solid border-[mediumblue] p-6 text-2xl font-semibold text-[mediumblue] outline-none"
            />
            <div className="lang flex flex-row justify-evenly">
              <label htmlFor="en" className="text-xl font-semibold">English</label>
              <input
                type="radio"
                name="lang"
                value="en"
                checked={lang === "en"}
                id="en"
                className="mx-8"
                onChange={handleChange} />
              <label htmlFor="ar" className="text-xl font-semibold">العربية</label>
              <input
                type="radio"
                name="lang"
                value="ar"
                checked={lang === "ar"}
                id="ar"
                onChange={handleChange} />
            </div>
            <h4 className="text-sm text-blue-600 cursor-pointer" onClick={() => setShowRegister(true)}>New User .. Register?</h4>
            <button
              className="rounded-xl bg-[#02274d] p-6 text-xl  font-medium active:bg-[#0a1a2b]"
              onClick={(e) => handleLogin(e)}
            >
              Start Game
            </button>
          </form> : showRegister ? <Register setShowRegister={setShowRegister} /> :
            <Scoreboard setShowScoreboard={setShowScoreboard} />
      }
    </div>
  );
};

export default Start;
