import { useContext, useState } from "react";
import { AppContext } from "../App";
import { privateRequest } from "../requests/axios";

const Register = ({ setShowRegister }) => {

  const { setUser, user } = useContext(AppContext);
  const [error, setError] = useState("")

  const handleChange = (e) => {
    // console.log(e)
    setUser(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await privateRequest.post("/register", { username: user.username, password: user.password })
      setError(`You Successfully registered as ${user.username}`)
      setUser({ username: "", password: "" })
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }


  return (
    <div className="m-auto flex flex-col gap-4 w-full h-screen">
      <form className="m-auto flex flex-col gap-4 self-center">
        <h1 className={`${!error.response ? "text-[#29e029]" : "text-[red]"} text-2xl font-semibold`}>{error?.response?.data?.msg || error}</h1>
        <input
          name="username"
          value={user?.username}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Enter Your Username"
          className="rounded-xl border-0 border-b-2 border-solid border-[mediumblue] p-6 text-2xl font-semibold text-[mediumblue] outline-none"
        />
        <input
          name="password"
          value={user?.password}
          onChange={(e) => handleChange(e)}
          type="password"
          placeholder="Enter Your Password"
          className="rounded-xl border-0 border-b-2 border-solid border-[mediumblue] p-6 text-2xl font-semibold text-[mediumblue] outline-none"
        />
        <h4 className="text-sm text-blue-600 cursor-pointer" onClick={() => setShowRegister(false)}>Already have account?</h4>
        <button
          className="rounded-xl bg-[#02274d] p-6 text-xl  font-medium active:bg-[#0a1a2b]"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </button>
      </form>

    </div>
  )
}

export default Register