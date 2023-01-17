import { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaUserCircle, FaCubes, FaMoneyCheckAlt, FaHeart, FaBoxes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../features/store'
import { getUserReset, addLike, removeLike, getUser } from '../features/userSlices/getUser'
import { getLoggedUserReset, removeLike as removeLike2, getLoggedUser } from '../features/userSlices/getLoggedUser'
import CredentialsModal from '../components/profileScreen/CredentialsModal'
import DeleteModal from '../components/profileScreen/DeleteModal'
import OrderedSetup from '../components/setup/OrderedSetup'
import Setup from '../components/setup/Setup'
import DeleteSetupModal from '../components/setup/DeleteSetupModal'
import Loading from '../components/alerts/Loading'
import Error from '../components/alerts/Error'

const ProfileScreen = () => {
  //variables
  const getLoggedUserAbort = useRef()

  const { userInfo } = useAppSelector(state => state.manageAccount)
  const { loading, user, setups, error, errorMessage } = useAppSelector(state => state.getUser)
  const {
    loading: loading2,
    orders,
    likedSetups,
    error: error2,
    errorMessage: errorMessage2,
  } = useAppSelector(state => state.getLoggedUser)
  const { like, unlike } = useAppSelector(state => state.manageLikedSetups)
  const dispatch = useAppDispatch()

  const [credentialsModalIsOpen, setCredentialsModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [deleteSetupModalIsOpen, setDeleteSetupModalIsOpen] = useState(false)
  const [setupId, setSetupId] = useState('')

  const params = useParams()

  //useEffects
  useEffect(() => {
    const getUserPromise = dispatch(getUser({ id: params.id }))
    return () => getUserPromise.abort()
  }, [params.id, dispatch])

  useEffect(() => {
    if (userInfo?.id === params.id) {
      const getLoggedUserPromise = dispatch(getLoggedUser())
      getLoggedUserAbort.current = getLoggedUserPromise.abort
    }
    return () => getLoggedUserAbort.current && getLoggedUserAbort.current()
  }, [params.id, userInfo, dispatch])

  useEffect(() => {
    return () => {
      dispatch(getUserReset())
      dispatch(getLoggedUserReset())
    }
  }, [dispatch])

  useEffect(() => {
    if (like) dispatch(addLike(like))
    else if (unlike) {
      dispatch(removeLike(unlike))
      dispatch(removeLike2(unlike))
    }
  }, [like, unlike, dispatch])

  return (
    <main className="flex-1">
      <div className="content">
        <div className="flex flex-col mx-2 mt-4 mb-[14px] pb-[14px] md:items-center border-b relative">
          <h2 className="flex gap-2 mb-[3px] text-xl font-bold truncate items-center">
            <FaUserCircle className="flex-none" />
            <span className="truncate">{userInfo?.id === params.id ? userInfo.nick : user ? user : '-'}</span>
          </h2>

          {userInfo?.id === params.id && (
            <>
              <div className="mb-2 font-light truncate">{userInfo.email}</div>

              <div className="flex gap-3">
                <button
                  disabled={loading2}
                  type="button"
                  onClick={() => setCredentialsModalIsOpen(true)}
                  className="flex items-center justify-center px-2 py-1 text-sm transition border-2 rounded-xl active:scale-95 hover:bg-white/10"
                >
                  <span>Zmień email/hasło</span>
                </button>
                <CredentialsModal isOpen={credentialsModalIsOpen} setIsOpen={setCredentialsModalIsOpen} />

                <button
                  disabled={loading2}
                  type="button"
                  onClick={() => setDeleteModalIsOpen(true)}
                  className="flex items-center justify-center px-2 py-1 text-sm transition border-2 rounded-xl active:scale-95 hover:bg-white/10"
                >
                  <span>Usuń konto</span>
                </button>
                <DeleteModal isOpen={deleteModalIsOpen} setIsOpen={setDeleteModalIsOpen} />
              </div>
            </>
          )}

          <Error
            isOpen={error && errorMessage !== '' ? true : false}
            message={errorMessage}
            customStyle="w-full max-w-[478px] mt-3"
          />
          <Error
            isOpen={userInfo && error2 && errorMessage2 !== '' ? true : false}
            message={errorMessage2}
            customStyle="w-full max-w-[478px] mt-3"
          />

          <Loading
            isOpen={loading || loading2}
            customStyle="top-[3px] right-[1px]"
            customLoadingStyle="w-[24px] h-[24px] border-white/20 border-t-white"
          />
        </div>

        <div className="grid mx-2 mb-20 md:gap-9 md:mb-6 md:grid-cols-2 lg:grid-cols-3">
          {userInfo?.id === params.id && (
            <>
              <div className="pb-[14px] mb-[14px] border-b md:pb-0 md:mb-0 md:border-none">
                <h3 className="flex items-center gap-[6px] text-lg font-semibold mb-2">
                  <FaMoneyCheckAlt />
                  <span>Moje zamówienia:</span>
                </h3>

                {orders.length ? (
                  <div className="grid grid-cols-1 gap-5 max-w-[479.5px] max-h-[650px] rounded-xl internal-scroll">
                    {orders.map(orderedSetup => (
                      <OrderedSetup key={orderedSetup._id} orderedSetup={orderedSetup} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-[6px] mt-6 mb-3 max-w-[479.5px]">
                    <span>Brak</span>
                    <FaCubes />
                  </div>
                )}
              </div>

              <div className="pb-[14px] mb-[14px] border-b md:pb-0 md:mb-0 md:border-none">
                <h3 className="flex items-center gap-[6px] text-lg font-semibold mb-2">
                  <FaHeart />
                  <span>Moje ulubione:</span>
                </h3>

                {likedSetups.length ? (
                  <div className="grid grid-cols-1 gap-5 max-w-[479.5px] max-h-[650px] rounded-xl internal-scroll">
                    {likedSetups.map(setup => (
                      <Setup key={setup._id} setup={setup} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-[6px] mt-6 mb-3 max-w-[479.5px]">
                    <span>Brak</span>
                    <FaCubes />
                  </div>
                )}
              </div>
            </>
          )}

          <div className={`md:col-span-2 ${userInfo?.id === params.id ? 'lg:col-span-1' : 'lg:col-span-full'}`}>
            <h3 className="flex items-center gap-[6px] text-lg font-semibold mb-2">
              <FaBoxes />
              <span>{userInfo?.id === params.id ? 'Moje zestawy:' : 'Zestawy użytkownika:'}</span>
            </h3>

            {setups.length ? (
              <div
                className={`grid md:grid-cols-2 ${
                  userInfo?.id === params.id
                    ? 'lg:grid-cols-1 max-w-[479.5px] md:max-w-full max-h-[650px] internal-scroll'
                    : 'lg:grid-cols-3'
                } gap-5 rounded-xl`}
              >
                {setups.map(setup => (
                  <Setup
                    key={setup._id}
                    setup={setup}
                    setButton="delete"
                    buttonClickHandler={() => {
                      setDeleteSetupModalIsOpen(true)
                      setSetupId(setup._id)
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-[6px] mt-6 mb-3">
                <span>Brak</span>
                <FaCubes />
              </div>
            )}

            {userInfo?.id === params.id && (
              <DeleteSetupModal
                isOpen={deleteSetupModalIsOpen}
                setIsOpen={setDeleteSetupModalIsOpen}
                setupId={setupId}
                setSetupId={setSetupId}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfileScreen
