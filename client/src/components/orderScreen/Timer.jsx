import { useState } from 'react'
import Countdown from 'react-countdown'

const Timer = props => {
  //const [time] = useState(Date.now() + 15 * 60 * 1000)
  const [time] = useState(Date.now() + 3000)

  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setTimeout(() => {
        console.log(`Fetch order ${props.orderId}`)
      }, 2000)

      return <div className="text-xl font-medium">Czas na opłacenie zamówienia minął!</div>
    } else
      return (
        <div className="flex items-baseline">
          <div className="text-2xl font-medium w-[31px] text-right">{('0' + minutes).slice(-2)}</div>
          <div className="text-2xl font-medium">:</div>
          <div className="text-2xl font-medium w-[31px] mr-[1px]">{('0' + seconds).slice(-2)}</div>
          <div className="text-lg">min.</div>
        </div>
      )
  }

  return <Countdown date={props.time ? props.time : time} renderer={countdownRenderer} />
}

export default Timer
