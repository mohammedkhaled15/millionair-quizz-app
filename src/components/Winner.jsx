import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useContext, useEffect } from 'react';
import { AppContext } from '../App';
import winnerSound from "../assets/sounds/winner.mp3"
import useSound from 'use-sound';

const Winner = ({ stopWaiting }) => {

  const { questionNumber } = useContext(AppContext)
  const [playWinner] = useSound(winnerSound)


  useEffect(() => {
    if (questionNumber === 16) {
      playWinner()
      stopWaiting()
    }
  }, [questionNumber, playWinner, stopWaiting])
  return (
    <div className='flex flex-col h-screen justify-center self-center items-center'>
      <EmojiEventsIcon style={{ color: "yellow", fontSize: "180px" }} className='winner animate-pulse duration-500 ease-in-out' />
      <h1 className=' font-extrabold text-8xl winner animate-pulse duration-500 ease-in-out'>WINNER</h1>
      <h1 className=' font-extrabold text-8xl winner animate-pulse duration-500 ease-in-out'>$1,000,000</h1>
    </div>
  )
}

export default Winner