import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { FaCashRegister } from 'react-icons/fa'
import Loading from '../alerts/Loading'
import Error from '../alerts/Error'

const PaymentForm = props => {
  //variables
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentErrorMessage, setPaymentErrorMessage] = useState(null)

  const stripe = useStripe()
  const elements = useElements()

  //handlers
  const submitHandler = async e => {
    e.preventDefault()

    if (!stripe || !elements) return

    setPaymentLoading(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_APP_URL}/order/${props.orderId}`,
      },
    })
    setPaymentLoading(false)

    if (error?.type !== 'validation_error') setPaymentErrorMessage(error.message)
    else if (error) console.log('Validation error')
    else console.log('Payment successful')
  }

  return (
    <form
      onSubmit={submitHandler}
      className="px-3 py-[12px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[284px] lg:w-[384px]"
    >
      <PaymentElement />
      <div className="relative">
        <button
          disabled={!stripe}
          type="submit"
          className="flex justify-center items-center gap-2 px-3 mt-4 py-[6px] text-lg font-semibold border-2 rounded-xl transition active:scale-95 hover:bg-white/10"
        >
          <FaCashRegister />
          Zapłać
        </button>

        <Loading
          isOpen={paymentLoading}
          customStyle="bottom-[7px] left-[124px]"
          customLoadingStyle="w-[30px] h-[30px] border-white/20 border-t-white"
        />
      </div>

      <div className="mt-[5px]">
        <Error isOpen={paymentErrorMessage ? true : false} message={paymentErrorMessage} />
      </div>
    </form>
  )
}

export default PaymentForm
