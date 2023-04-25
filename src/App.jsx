import { useState } from "react";

const money = [
  { id: 1, amount: 100 },
  { id: 2, amount: 200 },
  { id: 3, amount: 300 },
  { id: 4, amount: 400 },
  { id: 5, amount: 500 },
  { id: 6, amount: 1000 },
  { id: 7, amount: 2000 },
  { id: 8, amount: 4000 },
  { id: 9, amount: 16000 },
  { id: 10, amount: 32000 },
  { id: 11, amount: 64000 },
  { id: 12, amount: 125000 },
  { id: 13, amount: 250000 },
  { id: 14, amount: 500000 },
  { id: 15, amount: 1000000 },
].reverse()
function App() {
  const [activeQuestion, setActiveQuestion] = useState(6)
  return (
    <div className="flex h-screen bg-[#020230] text-white">
      <div className="w-3/4 bg-hero-image bg-center">main</div>
      <div className="w-1/4 flex items-center justify-center">
        <ul className="list-none w-full p-10">
          {
            money.map(item => {
              return (
                <li key={item.id} className={`${activeQuestion === item.id ? "active" : ""} flex items-center p-1 rounded-lg`}>
                  <span className="text-lg font-thin w-1/3">{item.id}</span>
                  <span className="text-xl font-extralight">$ {item.amount}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
