import { useRef, useEffect } from 'react'
import Countdown from 'react-countdown'
import { useAppDispatch } from '../../features/store'
import { getOrder } from '../../features/ordersSlices/getOrder'

const Timer = props => {
  //variables
  const getOrderAbort = useRef()

  const dispatch = useAppDispatch()

  //handlers
  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setTimeout(() => {
        const getOrderPromise = dispatch(getOrder({ id: props.orderId }))
        getOrderAbort.current = getOrderPromise.abort
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

  //useEffects
  useEffect(() => {
    return () => getOrderAbort.current && getOrderAbort.current()
  }, [])

  return <Countdown date={props.time} renderer={countdownRenderer} />
}

export default Timer
