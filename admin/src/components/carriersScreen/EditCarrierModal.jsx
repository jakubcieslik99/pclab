import { useRef, useEffect, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { successReset, errorReset, createCarrier, updateCarrier } from '../../features/carriersSlices/saveCarrier'
import { saveCarrierErrors } from '../../validations/carriersValidation'
import Loading from '../alerts/Loading'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const EditCarrierModal = props => {
  // variables
  const createCarrierAbort = useRef()
  const updateCarrierAbort = useRef()

  const { loading, success, successMessage, carrierSaved, error, errorMessage } = useAppSelector(state => state.saveCarrier)
  const dispatch = useAppDispatch()

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { carrierName: '', carrierPrice: '' } })

  // handlers
  const submitHandler = data => {
    if (!props.editElement) {
      const createCarrierPromise = dispatch(
        createCarrier({ name: data.carrierName, price: parseInt(data.carrierPrice * 100) }),
      )
      createCarrierAbort.current = createCarrierPromise.abort
    } else {
      const updateCarrierPromise = dispatch(
        updateCarrier({ id: props.editElement._id, name: data.carrierName, price: parseInt(data.carrierPrice * 100) }),
      )
      updateCarrierAbort.current = updateCarrierPromise.abort
    }
  }

  const closeHandler = () => {
    props.setIsOpen(false)
    setTimeout(() => {
      props.setEditElement(null)
      reset()
      if (createCarrierAbort.current || updateCarrierAbort.current) {
        if (createCarrierAbort.current) {
          createCarrierAbort.current()
          createCarrierAbort.current = undefined
        }
        if (updateCarrierAbort.current) {
          updateCarrierAbort.current()
          updateCarrierAbort.current = undefined
        }
        dispatch(successReset())
        dispatch(errorReset())
      }
    }, 200)
  }

  // useEffects
  useEffect(() => {
    if (props.editElement && props.isOpen) {
      setValue('carrierName', props.editElement.name)
      setValue('carrierPrice', (props.editElement.price / 100).toFixed(2))
    }
  }, [props, setValue])

  useEffect(() => {
    carrierSaved && props.setEditElement(carrierSaved)
  }, [carrierSaved, props])

  useEffect(() => {
    return () => {
      if (createCarrierAbort.current || updateCarrierAbort.current) {
        if (createCarrierAbort.current) {
          createCarrierAbort.current()
          createCarrierAbort.current = undefined
        }
        if (updateCarrierAbort.current) {
          updateCarrierAbort.current()
          updateCarrierAbort.current = undefined
        }
        dispatch(successReset())
        dispatch(errorReset())
      }
    }
  }, [dispatch])

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
                    <div className="flex items-center justify-between w-full gap-4">
                      <h2 className="relative flex flex-col">
                        {props.editElement ? 'Edytuj przewoźnika' : 'Dodaj przewoźnika'}
                        <Loading
                          isOpen={loading}
                          customStyle="top-[3px] -right-[26px]"
                          customLoadingStyle="w-[22px] h-[22px] border-gray-800/20 border-t-gray-800"
                        />
                      </h2>

                      <button
                        type="button"
                        onClick={closeHandler}
                        className="text-2xl transition active:scale-95 hover:text-gray-800/70"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    {props.editElement && (
                      <div className="text-sm italic font-normal text-gray-700">{props.editElement._id}</div>
                    )}
                  </div>

                  {/* modal body*/}
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-gray-800">
                    <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />
                    <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />

                    <div>
                      <label htmlFor="carrierName" className="text-sm">
                        Podaj nazwę przewoźnika*:
                      </label>
                      <input
                        {...register('carrierName', saveCarrierErrors.carrierName)}
                        type="text"
                        id="carrierName"
                        placeholder="Nazwa przewoźnika*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.carrierName && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.carrierName?.type === 'required' ? true : false}
                          message={saveCarrierErrors.carrierName.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.carrierName?.type === 'maxLength' ? true : false}
                          message={saveCarrierErrors.carrierName.maxLength.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="carrierPrice" className="text-sm">
                        Podaj cenę dostawy*:
                      </label>
                      <input
                        {...register('carrierPrice', saveCarrierErrors.carrierPrice)}
                        type="text"
                        id="carrierPrice"
                        placeholder="00.00 zł*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.carrierPrice && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.carrierPrice?.type === 'required' ? true : false}
                          message={saveCarrierErrors.carrierPrice.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.carrierPrice?.type === 'maxLength' ? true : false}
                          message={saveCarrierErrors.carrierPrice.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.carrierPrice?.type === 'pattern' ? true : false}
                          message={saveCarrierErrors.carrierPrice.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    {!success && (
                      <button
                        disabled={loading}
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

export default EditCarrierModal
