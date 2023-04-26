import { AppContext } from "../App"
import { useContext } from "react"

const PrizesWrapper = () => {

  const { money, activeStage } = useContext(AppContext)

  return (
    <div className="w-1/4 flex items-center justify-center">
      <ul className="list-none w-full p-10">
        {
          money.map(item => {
            return (
              <li key={item.id} className={`${activeStage === item.id - 1 ? "active" : ""} transition-all duration-[9000] flex items-center p-1 rounded-lg`}>
                <span className="text-lg font-thin w-1/3">{item.id}</span>
                <span className="text-xl font-extralight">$ {item.amount}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default PrizesWrapper