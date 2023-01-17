import { useRef, useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Transition, Dialog } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { successReset, errorReset, updateAccount } from '../../features/authSlices/manageAccount'
import { updateAccountErrors } from '../../validations/authValidation'
import Loading from '../alerts/Loading'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const CredentialsModal = props => {
  //variables
  const updateAccountAbort = useRef()

  const { loading, success, successMessage, userInfo, error, errorMessage } = useAppSelector(state => state.manageAccount)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { profileEmail: userInfo.email, profileNick: userInfo.nick, profilePassword: '', profileNewpassword: '' },
  })

  //handlers
  const submitHandler = data => {
    const updateAccountPromise = dispatch(
      updateAccount({
        email: data.profileEmail,
        nick: data.profileNick,
        password: data.profilePassword,
        newpassword: data.profileNewpassword,
      })
    )
    updateAccountAbort.current = updateAccountPromise.abort
  }

  const closeHandler = () => {
    props.setIsOpen(false)
    setTimeout(() => {
      reset()
      if (updateAccountAbort.current) {
        updateAccountAbort.current()
        updateAccountAbort.current = undefined
        dispatch(successReset())
        dispatch(errorReset())
      }
    }, 200)
  }

  //useEffects
  useEffect(() => {
    return () => {
      if (updateAccountAbort.current) {
        updateAccountAbort.current()
        updateAccountAbort.current = undefined
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
                  {/*modal header*/}
                  <div className="flex items-center justify-between w-full gap-4 text-xl font-semibold text-pclab-600">
                    <h2 className="relative">
                      Zmiana adresu email lub hasła
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

                  {/*modal body*/}
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-pclab-600">
                    <Error
                      isOpen={error && errorMessage !== '' ? true : false}
                      message={errorMessage}
                      customStyle="text-left"
                    />
                    <Success
                      isOpen={success && successMessage !== '' ? true : false}
                      message={successMessage}
                      customStyle="text-left"
                    />

                    <div>
                      <label htmlFor="profileEmail" className="text-sm">
                        Podaj adres email*:
                      </label>
                      <input
                        {...register('profileEmail', updateAccountErrors.profileEmail)}
                        type="text"
                        id="profileEmail"
                        placeholder="Adres email*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.profileEmail && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.profileEmail?.type === 'required' ? true : false}
                          message={updateAccountErrors.profileEmail.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.profileEmail?.type === 'maxLength' ? true : false}
                          message={updateAccountErrors.profileEmail.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.profileEmail?.type === 'pattern' ? true : false}
                          message={updateAccountErrors.profileEmail.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profileNick" className="text-sm">
                        Podaj nick*:
                      </label>
                      <input
                        {...register('profileNick', updateAccountErrors.profileNick)}
                        type="text"
                        id="profileNick"
                        placeholder="Nick*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.profileNick && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.profileNick?.type === 'required' ? true : false}
                          message={updateAccountErrors.profileNick.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.profileNick?.type === 'maxLength' ? true : false}
                          message={updateAccountErrors.profileNick.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.profileNick?.type === 'pattern' ? true : false}
                          message={updateAccountErrors.profileNick.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profilePassword" className="text-sm">
                        Podaj aktualne hasło*:
                      </label>
                      <input
                        {...register('profilePassword', updateAccountErrors.profilePassword)}
                        type="password"
                        id="profilePassword"
                        placeholder="Aktualne hasło*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.profilePassword && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.profilePassword?.type === 'required' ? true : false}
                          message={updateAccountErrors.profilePassword.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.profilePassword?.type === 'minLength' ? true : false}
                          message={updateAccountErrors.profilePassword.minLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.profilePassword?.type === 'maxLength' ? true : false}
                          message={updateAccountErrors.profilePassword.maxLength.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profileNewpassword" className="text-sm">
                        Podaj nowe hasło:
                      </label>
                      <input
                        {...register('profileNewpassword', updateAccountErrors.profileNewpassword)}
                        type="password"
                        id="profileNewpassword"
                        placeholder="Nowe hasło"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.profileNewpassword && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.profileNewpassword?.type === 'minLength' ? true : false}
                          message={updateAccountErrors.profileNewpassword.minLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.profileNewpassword?.type === 'maxLength' ? true : false}
                          message={updateAccountErrors.profileNewpassword.maxLength.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/*modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    {!success && (
                      <button
                        disabled={loading}
                        type="submit"
                        className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
                      >
                        Zapisz
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="px-[14px] py-2 bg-pclab-400 rounded-xl transition active:scale-95 hover:bg-pclab-400/70"
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

export default CredentialsModal
