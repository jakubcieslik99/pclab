import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { BiCaretLeftCircle } from 'react-icons/bi'
import { FaEnvelope, FaPhoneAlt, FaTruck } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../features/store'
import { errorReset, getOrderReset, getOrder } from '../features/ordersSlices/getOrder'
import Component from '../components/component/Component'
import Timer from '../components/orderScreen/Timer'
import PaymentForm from '../components/orderScreen/PaymentForm'
import stripeOptions from '../components/orderScreen/stripeOptions'
import Loading from '../components/alerts/Loading'
import Error from '../components/alerts/Error'

const OrderScreen = props => {
  // variables
  const { loading, order, paymentKey, error, errorMessage } = useAppSelector(state => state.getOrder)
  const dispatch = useAppDispatch()

  const [componentsIsOpen, setComponentsIsOpen] = useState(false)

  const params = useParams()

  // useEffects
  useEffect(() => {
    const getOrderPromise = dispatch(getOrder({ id: params.id }))
    return () => {
      getOrderPromise.abort()
      dispatch(errorReset())
      dispatch(getOrderReset())
    }
  }, [params.id, dispatch])

  return (
    <main className="flex-1">
      <div className="content">
        <div className="mx-2 my-4">
          <h2 className="relative text-xl font-bold">
            ZAMÓWIENIE
            <Loading
              isOpen={loading}
              customStyle="top-[2px] left-[136px]"
              customLoadingStyle="w-[24px] h-[24px] border-white/20 border-t-white"
            />
          </h2>

          <h4 className="text-sm font-light">{params.id || '-'}</h4>

          <Error
            isOpen={error && errorMessage !== '' ? true : false}
            message={errorMessage}
            customStyle="w-full max-w-[455px] mt-2"
          />
        </div>

        {order && (
          <>
            <div className="mx-2 mb-6">
              <h2 className="mb-[6px] text-xl font-bold">Komponenty:</h2>

              <button
                onClick={() => setComponentsIsOpen(!componentsIsOpen)}
                className="px-3 py-2 bg-[#412851] rounded-xl border border-[#725e7d] flex items-center gap-1"
              >
                <span>Pokaż</span>
                <BiCaretLeftCircle
                  className={`w-5 h-5 transition-transform ${!componentsIsOpen ? 'rotate-0' : '-rotate-90'}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-components ${
                  !componentsIsOpen ? 'max-h-0 opacity-0' : 'max-h-[1896px] opacity-1'
                }`}
              >
                <div className="grid gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-3">
                  {order.orderedComponents.map(component => (
                    <Component key={component.componentId} component={component} order />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col mx-2 mb-6 gap-7 sm:flex-row">
              <div>
                <h2 className="mb-[5px] text-xl font-bold">Dostawa:</h2>

                <div className="px-3 pb-[9px] pt-[10px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[320px] lg:w-[455px]">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="flex-none" />
                    <p className="truncate">{order.shippingDetails.email}</p>
                  </div>
                  <p className="flex items-center gap-2 mb-2 truncate">
                    <FaPhoneAlt /> {order.shippingDetails.phone}
                  </p>

                  <p className="truncate">
                    {order.shippingDetails.firstname} {order.shippingDetails.lastname}
                  </p>
                  <p className="truncate">
                    {order.shippingDetails.address} {order.shippingDetails.addressTwo || ''}
                  </p>
                  <p className="mb-[10px] truncate">
                    {order.shippingDetails.postal} {order.shippingDetails.city}
                  </p>

                  <div className="flex items-center gap-2">
                    <FaTruck className="flex-none" />
                    <p className="text-lg font-bold truncate">{order.selectedCarrier.name}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-[5px] text-xl font-bold">Podsumowanie:</h2>

                <div className="px-3 pb-[9px] pt-[10px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[200px] lg:w-[230px]">
                  <div className="text-xs text-white/80">Cena zestawu</div>
                  <div className="font-semibold text-white/80">
                    <span className="mr-1 text-lg">{(order.componentsPrice / 100).toFixed(2)}</span>
                    <span className="font-light">zł</span>
                  </div>

                  <div className="text-xs text-white/80">Cena dostawy</div>
                  <div className="font-semibold text-white/80">
                    <span className="mr-1 text-lg">{(order.selectedCarrier.price / 100).toFixed(2)}</span>
                    <span className="font-light">zł</span>
                  </div>

                  <div className="text-sm">Suma</div>
                  <div className="font-semibold">
                    <span className="mr-1 text-xl">{(order.totalPrice / 100).toFixed(2)}</span>
                    <span className="font-light">zł</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 mx-2 mb-20 md:mb-6 sm:flex-row">
              <div>
                <h2 className="mb-[5px] text-xl font-bold">Status zamówienia:</h2>

                <div className="px-3 pt-[9px] pb-[11px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[284px] lg:w-[384px]">
                  {paymentKey !== 'finalized' && paymentKey !== 'processing' && (
                    <div className="mb-2">
                      <div className="mb-1 text-sm">Czas na opłacenie zamówienia:</div>
                      <Timer orderId={order._id} time={order.paymentTime} />
                    </div>
                  )}

                  <div className="flex flex-col items-start">
                    <div className="mb-1 text-sm">Status zamówienia:</div>
                    {order.status === 'unpaid' ? (
                      <div className="px-3 pt-1 pb-[3px] text-sm font-semibold text-red-700 bg-red-300 border-2 border-red-600 rounded-xl leading-[1.12rem]">
                        Nieopłacono
                      </div>
                    ) : order.status === 'paying' ? (
                      <div className="px-3 pt-1 pb-[3px] text-sm font-semibold text-orange-700 bg-orange-300 border-2 border-orange-600 rounded-xl leading-[1.12rem]">
                        Przetwarzanie płatności
                      </div>
                    ) : order.status === 'canceled' ? (
                      <div className="px-3 pt-1 pb-[3px] text-sm font-semibold text-red-700 bg-red-300 border-2 border-red-600 rounded-xl leading-[1.12rem]">
                        Anulowano
                      </div>
                    ) : order.status === 'awaiting' ? (
                      <div className="px-3 pt-1 pb-[3px] text-sm font-semibold text-yellow-700 bg-yellow-200 border-2 border-yellow-700 rounded-xl leading-[1.12rem]">
                        Oczekuje na wysyłkę
                      </div>
                    ) : order.status === 'sent' ? (
                      <div className="px-3 pt-1 pb-[3px] text-sm font-semibold text-green-700 bg-green-300 border-2 border-green-600 rounded-xl leading-[1.12rem]">
                        Wysłano
                      </div>
                    ) : (
                      order.status === 'returned' && (
                        <div className="px-3 pt-1 pb-[3px] text-sm font-semibold text-blue-700 bg-blue-300 border-2 border-blue-600 rounded-xl leading-[1.12rem]">
                          Zwrócono
                        </div>
                      )
                    )}

                    {order.selectedCarrier.tracking && (
                      <div className="mt-[6px]">
                        <div className="mb-[2px] text-sm">Numer śledzenia {order.selectedCarrier.name}:</div>
                        <div className="text-sm font-semibold break-all">{order.selectedCarrier.tracking}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-[5px] text-xl font-bold">
                  {paymentKey && paymentKey !== 'finalized' ? 'Płatność:' : 'Pomoc:'}
                </h2>

                {paymentKey && paymentKey !== 'finalized' ? (
                  <Elements stripe={props.stripePromise} options={{ ...stripeOptions, clientSecret: paymentKey }}>
                    <PaymentForm orderId={order._id} />
                  </Elements>
                ) : (
                  <div className="px-3 pb-[9px] pt-[10px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[284px] lg:w-[384px]">
                    W przypadku chęci dokonania <span className="font-semibold">zwrotu</span> lub{' '}
                    <span className="font-semibold">reklamacji</span> prosimy o kontakt na adres email:{' '}
                    <a href="mailto:contact@jakubcieslik.com" className="font-semibold">
                      contact@jakubcieslik.com
                    </a>
                    .
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default OrderScreen
