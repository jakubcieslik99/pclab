import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { FaCashRegister } from 'react-icons/fa'

const PaymentForm = () => {
  //variables
  const [errorMessage, setErrorMessage] = useState(null)

  const stripe = useStripe()
  const elements = useElements()

  //handlers
  const submitHandler = async e => {
    e.preventDefault()

    if (!stripe || !elements) return

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/order/21372137?success=true',
      },
    })

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log('submitHandler')
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="px-3 pb-[12px] pt-[10px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[284px] lg:w-[384px]"
    >
      <PaymentElement />
      <button
        disabled={!stripe}
        type="submit"
        className="flex justify-center items-center gap-2 px-3 mt-4 py-[6px] text-lg font-semibold border-2 rounded-xl transition active:scale-95 hover:bg-white/10"
      >
        <FaCashRegister />
        Zapłać
      </button>

      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

export default PaymentForm
