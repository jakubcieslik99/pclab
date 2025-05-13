import { useRef, useEffect, Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Transition, Dialog } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { errorReset, userInfoReset, deleteAccount } from '../../features/authSlices/manageAccount'
import { getLoggedUserReset } from '../../features/userSlices/getLoggedUser'
import { likedSetupsReset, likeReset, unlikeReset } from '../../features/setupsSlices/manageLikedSetups'
import { setupCommentsReset } from '../../features/setupsSlices/createComment'
import Loading from '../alerts/Loading'
import Error from '../alerts/Error'

const DeleteModal = props => {
  // variables
  const deleteAccountAbort = useRef()

  const { loading, success, successMessage, error, errorMessage } = useAppSelector(state => state.manageAccount)
  const dispatch = useAppDispatch()

  const params = useParams()
  const navigate = useNavigate()

  // handlers
  const submitHandler = e => {
    e.preventDefault()
    const deleteAccountPromise = dispatch(deleteAccount({ id: params.id }))
    deleteAccountAbort.current = deleteAccountPromise.abort
  }

  const closeHandler = () => {
    if (!loading) {
      props.setIsOpen(false)
      setTimeout(() => {
        if (deleteAccountAbort.current) {
          deleteAccountAbort.current()
          deleteAccountAbort.current = undefined
          dispatch(errorReset())
        }
      }, 200)
    }
  }

  // useEffects
  useEffect(() => {
    return () => {
      if (deleteAccountAbort.current) {
        deleteAccountAbort.current()
        deleteAccountAbort.current = undefined
        dispatch(errorReset())
      }
    }
  }, [dispatch])

  useEffect(() => {
    if (success && successMessage === 'Usunięto konto z serwisu.') {
      dispatch(setupCommentsReset())

      dispatch(unlikeReset())
      dispatch(likeReset())
      dispatch(likedSetupsReset())

      dispatch(getLoggedUserReset())

      dispatch(userInfoReset())

      navigate('/login', { replace: true })
    }
  }, [success, successMessage, dispatch, navigate])

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
                  <div className="flex items-center justify-between w-full gap-4 text-xl font-semibold text-pclab-600">
                    <h2 className="relative">
                      Usuwanie konta
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
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-pclab-600 text-center">
                    <Error
                      isOpen={error && errorMessage !== '' ? true : false}
                      message={errorMessage}
                      customStyle="text-left"
                    />

                    <div>
                      Czy na pewno chcesz całkowicie <span className="font-bold">usunąć</span> swoje konto w aplikacji
                      PCLab?{' '}
                    </div>
                    <div>Zostaną usunięte Twoje wszystkie stworzone zestawy, wystawione oceny i dodane komentarze.</div>
                    <div>
                      Pamiętaj, ta operacja jest <span className="font-bold">nieodwracalna</span>!
                    </div>
                  </div>

                  {/* modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    <button
                      disabled={loading}
                      type="submit"
                      className="px-[14px] py-2 bg-pclab-400 rounded-xl transition active:scale-95 hover:bg-pclab-400/70"
                    >
                      Usuń
                    </button>
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
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

export default DeleteModal
