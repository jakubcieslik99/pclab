import { useRef, useEffect, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import Moment from 'moment'
import { useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { errorReset, getOrderReset, updateOrderData, getOrder } from '../../features/ordersSlices/getOrder'
import { successReset, errorReset as errorReset2, updateOrder } from '../../features/ordersSlices/saveOrder'
import { updateOrderErrors } from '../../validations/ordersValidation'
import Loading from '../alerts/Loading'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const EditOrderModal = props => {
  // variables
  const getOrderAbort = useRef()
  const updateOrderAbort = useRef()

  const { loading, order, error, errorMessage } = useAppSelector(state => state.getOrder)
  const {
    loading: loading2,
    success,
    successMessage,
    orderSaved,
    error: error2,
    errorMessage: errorMessage2,
  } = useAppSelector(state => state.saveOrder)
  const dispatch = useAppDispatch()

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { orderStatus: 'unpaid', orderTracking: '' } })

  // handlers
  const submitHandler = data => {
    const updateOrderPromise = dispatch(
      updateOrder({ id: order._id, status: data.orderStatus, tracking: data.orderTracking }),
    )
    updateOrderAbort.current = updateOrderPromise.abort
  }

  const closeHandler = () => {
    props.setIsOpen(false)
    setTimeout(() => {
      props.setEditElement(null)
      reset()
      if (getOrderAbort.current) {
        getOrderAbort.current()
        getOrderAbort.current = undefined
        dispatch(errorReset())
        dispatch(getOrderReset())
      }
      if (updateOrderAbort.current) {
        updateOrderAbort.current()
        updateOrderAbort.current = undefined
        dispatch(successReset())
        dispatch(errorReset2())
      }
    }, 200)
  }

  // useEffects
  useEffect(() => {
    order && setValue('orderStatus', order.status)
    order?.selectedCarrier.tracking && setValue('orderTracking', order.selectedCarrier.tracking)
  }, [order, setValue])

  useEffect(() => {
    orderSaved && dispatch(updateOrderData(orderSaved))
  }, [orderSaved, dispatch])

  useEffect(() => {
    if (props.editElement) {
      const getOrderPromise = dispatch(getOrder({ id: props.editElement }))
      getOrderAbort.current = getOrderPromise.abort
    }
    return () => {
      if (getOrderAbort.current) {
        getOrderAbort.current()
        getOrderAbort.current = undefined
        dispatch(errorReset())
        dispatch(getOrderReset())
      }
      if (updateOrderAbort.current) {
        updateOrderAbort.current()
        updateOrderAbort.current = undefined
        dispatch(successReset())
        dispatch(errorReset2())
      }
    }
  }, [props.editElement, dispatch])

  return (
    <Transition as={Fragment} appear show={props.isOpen}>
      <Dialog as="div" onClose={closeHandler} className="relative z-20">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full px-4 py-6 md:pt-16 md:pb-32">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="grid items-center w-full max-w-md">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col w-full col-start-1 row-start-1 px-5 py-4 overflow-hidden bg-gray-200 rounded-lg shadow-md"
                >
                  {/* modal header*/}
                  <div className="text-xl font-semibold text-gray-800">
                    <div className="relative flex items-center justify-between w-full gap-4">
                      <h2 className="flex flex-col">Zarządzaj zamówieniem</h2>

                      <button
                        type="button"
                        onClick={closeHandler}
                        className="text-2xl transition active:scale-95 hover:text-gray-800/70"
                      >
                        <FaTimes />
                      </button>

                      <Loading
                        isOpen={loading || loading2}
                        customStyle="-bottom-[31px] right-[1px]"
                        customLoadingStyle="w-[22px] h-[22px] border-gray-800/20 border-t-gray-800"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-normal">{props.editElement}</span>
                      <span className={`text-sm font-normal text-gray-400 ${!order && 'opacity-0'}`}>
                        {Moment(order?.createdAt).format('DD.MM.YYYY, HH:mm') || '-'}
                      </span>
                    </div>
                  </div>

                  {/* modal body*/}
                  {order && (
                    <div className="flex flex-col w-full gap-[10px] mt-[14px] mb-4 overflow-y-auto text-gray-800">
                      <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />
                      <Error isOpen={error2 && errorMessage2 !== '' ? true : false} message={errorMessage2} />
                      <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />

                      <div className="flex flex-col gap-[5px]">
                        <div>
                          <h3 className="text-lg font-semibold">Adres dostawy:</h3>
                          <div>
                            <div>{order.shippingDetails.email}</div>
                            <div className="mb-[2px]">+48 {order.shippingDetails.phone}</div>

                            <div>
                              {order.shippingDetails.firstname} {order.shippingDetails.lastname}
                            </div>
                            <div>
                              {order.shippingDetails.address}
                              {order.shippingDetails.addressTwo && ` ${order.shippingDetails.addressTwo}`}
                            </div>
                            <div>
                              {order.shippingDetails.postal} {order.shippingDetails.city}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold">Metoda dostawy:</h3>
                          <div>{order.selectedCarrier.name}</div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold">Status zamówienia:</h3>
                          <div className="flex flex-col max-w-[168px]">
                            {order.status === 'unpaid' ? (
                              <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-red-700 bg-red-300 border-2 border-red-600 rounded-xl leading-[1.12rem]">
                                Nieopłacono
                              </div>
                            ) : order.status === 'paying' ? (
                              <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-orange-700 bg-orange-300 border-2 border-orange-600 rounded-xl leading-[1.12rem]">
                                W trakcie płatności
                              </div>
                            ) : order.status === 'canceled' ? (
                              <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-red-700 bg-red-300 border-2 border-red-600 rounded-xl leading-[1.12rem]">
                                Anulowano
                              </div>
                            ) : order.status === 'awaiting' ? (
                              <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-yellow-700 bg-yellow-200 border-2 border-yellow-700 rounded-xl leading-[1.12rem]">
                                Oczekuje na wysyłkę
                              </div>
                            ) : order.status === 'sent' ? (
                              <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-green-700 bg-green-300 border-2 border-green-600 rounded-xl leading-[1.12rem]">
                                Wysłano
                              </div>
                            ) : (
                              order.status === 'returned' && (
                                <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-blue-700 bg-blue-300 border-2 border-blue-600 rounded-xl leading-[1.12rem]">
                                  Zwrócono
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="orderStatus" className="text-sm mb-[2px]">
                          Ustaw status zamówienia*:
                        </label>
                        <select
                          {...register('orderStatus', updateOrderErrors.orderStatus)}
                          id="orderStatus"
                          className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                        >
                          <option value="unpaid" disabled hidden>
                            Nieopłacono
                          </option>
                          <option value="paying" disabled hidden>
                            W trakcie płatności
                          </option>
                          <option value="canceled" disabled hidden>
                            Anulowano
                          </option>
                          <option value="awaiting" className="text-gray-800">
                            Oczekuje na wysyłkę
                          </option>
                          <option value="sent" className="text-gray-800">
                            Wysłano
                          </option>
                          <option value="returned" className="text-gray-800">
                            Zwrócono
                          </option>
                        </select>

                        <div className={`relative ${errors.orderStatus && 'h-[29px] mt-[5px]'}`}>
                          <Error
                            isOpen={errors.orderStatus?.type === 'pattern' ? true : false}
                            message={updateOrderErrors.orderStatus.pattern.message}
                            customStyle="absolute w-full"
                          />
                        </div>
                      </div>

                      {(watch('orderStatus') === 'awaiting' || watch('orderStatus') === 'sent') && (
                        <div>
                          <label htmlFor="orderTracking" className="text-sm">
                            Podaj numer śledzenia przesyłki*:
                          </label>
                          <input
                            {...register('orderTracking', {
                              ...updateOrderErrors.orderTracking,
                              validate: value => {
                                if (watch('orderStatus') === 'awaiting' || watch('orderStatus') === 'sent')
                                  return value.length > 0
                              },
                            })}
                            type="text"
                            id="orderTracking"
                            placeholder="Numer śledzenia przesyłki*"
                            className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                          />

                          <div className={`relative ${errors.orderTracking && 'h-[29px] mt-[5px]'}`}>
                            <Error
                              isOpen={errors.orderTracking?.type === 'maxLength' ? true : false}
                              message={updateOrderErrors.orderTracking.maxLength.message}
                              customStyle="absolute w-full"
                            />
                            <Error
                              isOpen={errors.orderTracking?.type === 'validate' ? true : false}
                              message={'Pole wymagane.'}
                              customStyle="absolute w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    {!success && (
                      <button
                        disabled={loading || loading2 || !order}
                        type="submit"
                        className="px-[14px] py-2 bg-green-800 rounded-xl transition active:scale-95 hover:bg-green-800/80"
                      >
                        Zapisz
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="px-[14px] py-2 bg-gray-700 rounded-xl transition active:scale-95 hover:bg-gray-700/90"
                    >
                      {!success ? 'Anuluj' : 'Zamknij'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditOrderModal
