import { useRef, useEffect, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { successReset, errorReset, deleteSetup } from '../../features/setupsSlices/deleteSetup'
import Loading from '../alerts/Loading'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const DeleteSetupModal = props => {
  // variables
  const deleteSetupAbort = useRef()

  const { loading, success, successMessage, error, errorMessage } = useAppSelector(state => state.deleteSetup)
  const dispatch = useAppDispatch()

  // handlers
  const submitHandler = e => {
    e.preventDefault()
    const deleteSetupPromise = dispatch(deleteSetup({ id: props.deleteElement._id }))
    deleteSetupAbort.current = deleteSetupPromise.abort
  }

  const closeHandler = () => {
    props.setIsOpen(false)
    setTimeout(() => {
      props.setDeleteElement(null)
      if (deleteSetupAbort.current) {
        deleteSetupAbort.current()
        deleteSetupAbort.current = undefined
        dispatch(successReset())
        dispatch(errorReset())
      }
    }, 200)
  }

  // useEffects
  useEffect(() => {
    return () => {
      if (deleteSetupAbort.current) {
        deleteSetupAbort.current()
        deleteSetupAbort.current = undefined
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
                  onSubmit={submitHandler}
                  className="flex flex-col w-full col-start-1 row-start-1 px-5 py-4 overflow-hidden bg-gray-200 rounded-lg shadow-md"
                >
                  {/* modal header*/}
                  <div className="flex items-center justify-between w-full gap-4 text-xl font-semibold text-gray-800">
                    <h2 className="relative w-[134px] sm:w-auto">
                      Usuwanie zestawu
                      <Loading
                        isOpen={loading}
                        customStyle="top-[16px] sm:top-[3px] -right-[26px]"
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

                  {/* modal body*/}
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-gray-800 text-center">
                    <div className="w-full text-left">
                      <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />
                      <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />
                    </div>

                    <div>
                      Czy na pewno chcesz całkowicie usunąć wybrany zestaw{' '}
                      <span className="font-bold">{props.deleteElement?._id} </span>
                      użytkownika <span className="font-bold">{props.deleteElement?.addedBy?.nick || 'usuniętego'}</span>?
                    </div>
                    <div>
                      Pamiętaj, ta operacja jest <span className="font-bold">nieodwracalna</span>!
                    </div>
                  </div>

                  {/* modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    {!success && (
                      <button
                        disabled={loading}
                        type="submit"
                        className="px-[14px] py-2 bg-red-800 rounded-xl transition active:scale-95 hover:bg-red-800/80"
                      >
                        Usuń
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

export default DeleteSetupModal
