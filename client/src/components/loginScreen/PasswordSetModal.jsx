import { useRef, useCallback, useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Transition, Dialog } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { successReset, errorReset, resetPassword } from '../../features/authSlices/resetPassword'
import { resetPasswordErrors } from '../../validations/authValidation'
import Loading from '../alerts/Loading'
import Success from '../alerts/Success'
import Error from '../alerts/Error'

const PasswordSetModal = props => {
  //variables
  const resetPasswordAbort = useRef()

  const { loading, success, successMessage, error, errorMessage } = useAppSelector(state => state.resetPassword)
  const dispatch = useAppDispatch()

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { setPassword: '', setRepassword: '' },
  })

  //handlers
  const closeHandler = useCallback(() => {
    props.setIsOpen(false)
    reset()
    setTimeout(() => {
      if (resetPasswordAbort.current) {
        resetPasswordAbort.current()
        dispatch(successReset())
        dispatch(errorReset())
      }
    }, 200)
  }, [props, reset, dispatch])

  const submitHandler = data => {
    if (props.token) {
      const resetPasswordPromise = dispatch(
        resetPassword({ password: data.setPassword, repassword: data.setRepassword, token: props.token })
      )
      resetPasswordAbort.current = resetPasswordPromise.abort
    }
  }

  //useEffects
  useEffect(() => {
    success && setTimeout(() => closeHandler(), 3000)
  }, [success, closeHandler])

  useEffect(() => {
    return () => {
      if (resetPasswordAbort.current) {
        resetPasswordAbort.current()
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
                  {/*modal header*/}
                  <div className="flex items-center justify-between w-full gap-4 text-xl font-semibold text-pclab-600">
                    <h2 className="relative">
                      Ustaw hasło
                      <Loading isOpen={loading} customStyle="top-[3px] -right-[38px]" />
                    </h2>
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="text-2xl transition active:scale-95 hover:text-pclab-600/70"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/*modal body*/}
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-pclab-600">
                    <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />
                    <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />

                    <div>
                      <label htmlFor="setPassword" className="text-sm">
                        Podaj nowe hasło:
                      </label>
                      <input
                        {...register('setPassword', resetPasswordErrors.setPassword)}
                        type="password"
                        id="setPassword"
                        placeholder="Nowe hasło"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.setPassword && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.setPassword?.type === 'required' ? true : false}
                          message={resetPasswordErrors.setPassword.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.setPassword?.type === 'minLength' ? true : false}
                          message={resetPasswordErrors.setPassword.minLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.setPassword?.type === 'maxLength' ? true : false}
                          message={resetPasswordErrors.setPassword.maxLength.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="setNewPassword" className="text-sm">
                        Powtórz nowe hasło:
                      </label>
                      <input
                        {...register('setRepassword', {
                          ...resetPasswordErrors.setRepassword,
                          validate: value => value === watch('setPassword'),
                        })}
                        type="password"
                        id="setRepassword"
                        placeholder="Powtórz nowe hasło"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.setRepassword && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.setRepassword?.type === 'required' ? true : false}
                          message={resetPasswordErrors.setRepassword.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.setPassword?.type === 'validate' ? true : false}
                          message={'Hasła nie są takie same.'}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/*modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    <button
                      disabled={loading}
                      type="submit"
                      className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
                    >
                      Zapisz
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

export default PasswordSetModal
