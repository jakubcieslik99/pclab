import { useRef, useCallback, useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Transition, Dialog } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { successReset, errorReset, sendPasswordReset } from '../../features/authSlices/sendPasswordReset'
import { sendPasswordResetErrors } from '../../validations/authValidation'
import Loading from '../alerts/Loading'
import Success from '../alerts/Success'
import Error from '../alerts/Error'

const PasswordResetModal = props => {
  // variables
  const sendPasswordResetAbort = useRef()

  const { loading, success, successMessage, error, errorMessage } = useAppSelector(state => state.sendPasswordReset)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { resetEmail: '' } })

  // handlers
  const closeHandler = useCallback(() => {
    props.setIsOpen(false)
    setTimeout(() => {
      reset()
      if (sendPasswordResetAbort.current) {
        sendPasswordResetAbort.current()
        sendPasswordResetAbort.current = undefined
        dispatch(successReset())
        dispatch(errorReset())
      }
    }, 200)
  }, [props, reset, dispatch])

  const submitHandler = data => {
    const sendPasswordResetPromise = dispatch(sendPasswordReset({ email: data.resetEmail }))
    sendPasswordResetAbort.current = sendPasswordResetPromise.abort
  }

  // useEffects
  useEffect(() => {
    success && setTimeout(() => closeHandler(), 3000)
  }, [success, closeHandler])

  useEffect(() => {
    return () => {
      if (sendPasswordResetAbort.current) {
        sendPasswordResetAbort.current()
        sendPasswordResetAbort.current = undefined
        dispatch(successReset())
        dispatch(errorReset())
      }
    }
  }, [dispatch])

  return (
    <Transition as={Fragment} show={props.isOpen}>
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
                  <div className="flex items-center justify-between w-full gap-4 text-xl font-semibold text-pclab-600">
                    <h2 className="relative">
                      Zresetuj hasło
                      <Loading
                        isOpen={loading}
                        customStyle="top-[3px] -right-[30px]"
                        customLoadingStyle="w-[23px] h-[23px] border-pclab-600/20 border-t-pclab-600"
                      />
                    </h2>
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="text-2xl transition active:scale-95 hover:text-pclab-600/70"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* modal body*/}
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-pclab-600">
                    <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />
                    <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />

                    <div>
                      <label htmlFor="resetEmail" className="text-sm">
                        <div className="leading-[1.33] mb-[2px]">Podaj adres email powiązany z Twoim kontem w serwisie:</div>
                      </label>
                      <input
                        {...register('resetEmail', sendPasswordResetErrors.resetEmail)}
                        type="text"
                        id="resetEmail"
                        placeholder="Adres email"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.resetEmail && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.resetEmail?.type === 'required' ? true : false}
                          message={sendPasswordResetErrors.resetEmail.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.resetEmail?.type === 'maxLength' ? true : false}
                          message={sendPasswordResetErrors.resetEmail.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.resetEmail?.type === 'pattern' ? true : false}
                          message={sendPasswordResetErrors.resetEmail.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div className="text-center leading-[1.33] mb-[2px]">
                      Na podany adres email zostanie wysłany link do zresetowania hasła.
                    </div>
                  </div>

                  {/* modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    <button
                      disabled={loading}
                      type="submit"
                      className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
                    >
                      Wyślij
                    </button>
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="px-[14px] py-2 bg-pclab-400 rounded-xl transition active:scale-95 hover:bg-pclab-400/70"
                    >
                      Anuluj
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

export default PasswordResetModal
