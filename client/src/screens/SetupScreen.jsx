import { useRef, useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Moment from 'moment'
import { FaHeart, FaRegHeart, FaCashRegister } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../features/store'
import { addLike, removeLike, addComment, getSetup } from '../features/setupsSlices/getSetup'
import { likeReset, unlikeReset, likeSetup, unlikeSetup } from '../features/setupsSlices/manageLikedSetups'
import { errorReset, setupCommentsReset, createComment } from '../features/setupsSlices/createComment'
import Component from '../components/component/Component'
import Comment from '../components/setupScreen/Comment'
import Loading from '../components/alerts/Loading'
import Error from '../components/alerts/Error'

const SetupScreen = () => {
  //variables
  const likeSetupAbort = useRef()
  const unlikeSetupAbort = useRef()

  const { userInfo } = useAppSelector(state => state.manageAccount)
  const { loading, likedSetups, like, unlike } = useAppSelector(state => state.manageLikedSetups)
  const { loading: loading2, setup, error, errorMessage } = useAppSelector(state => state.getSetup)
  const {
    loading: loading3,
    setupComments,
    error: error2,
    errorMessage: errorMessage2,
  } = useAppSelector(state => state.createComment)
  const dispatch = useAppDispatch()

  const [comment, setComment] = useState('')

  const { pathname } = useLocation()
  const params = useParams()

  //handlers
  const renderSetupCreatedAtHandler = () => {
    return Moment(setup?.createdAt).format('DD.MM.YYYY, HH:mm')
  }
  const renderSetupLikedHandler = () => {
    return userInfo && likedSetups.includes(setup?._id) ? true : false
  }
  const likeHandler = () => {
    if (userInfo && !likedSetups.includes(setup?._id)) {
      const likeSetupPromise = dispatch(likeSetup({ id: setup?._id }))
      likeSetupAbort.current = likeSetupPromise.abort
    }
  }
  const unlikeHandler = () => {
    if (userInfo && likedSetups.includes(setup?._id)) {
      const unlikeSetupPromise = dispatch(unlikeSetup({ id: setup?._id }))
      unlikeSetupAbort.current = unlikeSetupPromise.abort
    }
  }
  const renderSetupPriceHandler = () => {
    let setupPrice = setup?.case.price
    setupPrice += setup?.cpu?.price || 0
    setupPrice += setup?.mobo?.price || 0
    setupPrice += setup?.ram?.price || 0
    setupPrice += setup?.gpu?.price || 0
    setupPrice += setup?.psu?.price || 0
    setupPrice += setup?.driveOne?.price || 0
    setupPrice += setup?.driveTwo?.price || 0
    setupPrice += setup?.driveThree?.price || 0
    return (setupPrice / 100).toFixed(2)
  }

  const submitHandler = e => {
    e.preventDefault()
    comment && dispatch(createComment({ id: setup._id, comment }))
  }

  //useEffect
  useEffect(() => {
    const getSetupPromise = dispatch(getSetup({ id: params.id }))
    return () => {
      likeSetupAbort.current && likeSetupAbort.current()
      unlikeSetupAbort.current && unlikeSetupAbort.current()
      getSetupPromise.abort()
    }
  }, [params.id, dispatch])

  useEffect(() => {
    if (like) dispatch(addLike(like))
    else if (unlike) dispatch(removeLike(unlike))
    return () => {
      like && dispatch(likeReset())
      unlike && dispatch(unlikeReset())
    }
  }, [like, unlike, dispatch])

  useEffect(() => {
    if (setupComments) {
      setComment('')
      dispatch(addComment(setupComments))
    }
    return () => {
      error2 && dispatch(errorReset())
      setupComments && dispatch(setupCommentsReset())
    }
  }, [error2, setupComments, dispatch])

  return (
    <main className="flex-1">
      <div className="content">
        <div className="flex flex-col mx-2 mt-4 mb-2 sm:flex-row sm:items-center sm:justify-center">
          <h2 className="text-xl font-bold sm:mr-2">ZESTAW O NUMERZE</h2>
          <h2 className="sm:mt-[1px] relative">
            <span>#</span>
            <span className="italic">{params.id || '-'}</span>

            <Loading
              isOpen={loading2}
              customStyle="-top-[1px] right-[0px] sm:-right-[31px]"
              customLoadingStyle="w-[24px] h-[24px] border-white/20 border-t-white"
            />
          </h2>
        </div>

        <Error
          isOpen={error && errorMessage !== '' ? true : false}
          message={errorMessage}
          customStyle="w-full max-w-[455px] mb-3 mx-auto"
        />

        {setup && (
          <>
            <div className="flex flex-col mx-2 mb-2 sm:flex-row sm:items-center sm:justify-center">
              <div className="text-gray-400 truncate">
                <span className="mr-2 font-semibold">Autor:</span>
                <Link to={`/profile/${setup.addedBy._id}`} className="underline">
                  {setup.addedBy.nick}
                </Link>
              </div>

              <div className="hidden mx-2 text-gray-400 sm:block">|</div>

              <div className="text-gray-400 truncate">
                <span className="mr-[6px] font-semibold">Dodano:</span>
                <span className="italic mx-[2px]">{renderSetupCreatedAtHandler()}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mx-2 mb-4 sm:justify-center">
              <span className="text-lg">{setup.likes}</span>
              {renderSetupLikedHandler() ? (
                <button disabled={loading} type="button" onClick={() => unlikeHandler()}>
                  <FaHeart className="text-2xl text-red-500" />
                </button>
              ) : (
                <button disabled={loading} type="button" onClick={() => likeHandler()}>
                  <FaRegHeart className="text-2xl text-red-500" />
                </button>
              )}
            </div>

            {/*<div className="flex flex-col items-center gap-4 mx-2 mb-4 md:mb-6">*/}
            <div className="grid gap-4 mx-2 mb-4 sm:grid-cols-2 lg:grid-cols-3">
              {setup.case && <Component component={setup.case} />}
              {setup.cpu && <Component component={setup.cpu} />}
              {setup.mobo && <Component component={setup.mobo} />}
              {setup.ram && <Component component={setup.ram} />}
              {setup.gpu && <Component component={setup.gpu} />}
              {setup.psu && <Component component={setup.psu} />}
              {setup.driveOne && <Component component={setup.driveOne} />}
              {setup.driveTwo && <Component component={setup.driveTwo} />}
              {setup.driveThree && <Component component={setup.driveThree} />}
            </div>

            <div className="mx-2 mb-6">
              <h2 className="mb-[2px] text-xl font-bold">Opis:</h2>

              <div className="font-light">{setup.description || 'Brak opisu.'}</div>
            </div>

            <div className="mx-2 mb-6">
              <h2 className="mb-[2px] text-xl font-bold">Podsumowanie:</h2>

              <div className="flex items-center gap-3">
                <div>
                  <div className="text-xs">Cena</div>
                  <div className="font-semibold">
                    <span className="mr-1 text-lg">{renderSetupPriceHandler()}</span>
                    <span className="font-light">zł</span>
                  </div>
                </div>
                <div>
                  <Link
                    to={`/placeorder/${setup._id}`}
                    className="px-3 pt-[5px] pb-1 font-semibold text-pclab-600 bg-white rounded-xl transition active:scale-95 hover:bg-white/70"
                  >
                    Kup teraz <FaCashRegister className="inline-flex ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mx-2 mb-20 md:mb-6">
              <h2 className="mb-[5px] text-xl font-bold flex items-center relative">
                Komentarze:
                <Loading
                  isOpen={loading3}
                  customStyle="left-[138px]"
                  customLoadingStyle="w-[24px] h-[24px] border-white/20 border-t-white"
                />
              </h2>

              <div className="flex flex-col gap-[10px] mb-4">
                {setup.comments.length
                  ? setup.comments.map(comment => <Comment key={comment._id} comment={comment} />)
                  : 'Brak komentarzy.'}
              </div>

              <Error
                isOpen={error2 && errorMessage2 !== '' ? true : false}
                message={errorMessage2}
                customStyle="w-full max-w-xl mb-2"
              />

              <form
                onSubmit={submitHandler}
                className="relative border rounded-xl border-white/[0.25] bg-white/[0.05] py-1 px-2 max-w-xl"
              >
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows="3"
                  id="setupComment"
                  name="comment"
                  placeholder="Dodaj komentarz..."
                  className="w-full bg-transparent resize-none outline-0 mt-[2px]"
                />

                <div className={`flex items-center mb-[3px] gap-2 ${!userInfo ? 'justify-between' : 'justify-end'}`}>
                  {!userInfo && (
                    <div className="text-xs text-white/70">
                      Musisz się{' '}
                      <Link to="/login" state={{ from: pathname }} className="underline">
                        zalogować
                      </Link>
                      , aby dodać komentarz.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!userInfo || loading2 || loading3 || !comment}
                    className="justify-self-end px-[12px] py-[6px] bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80 disabled:scale-100 disabled:bg-pclab-500/70 disabled:text-white/70"
                  >
                    Dodaj
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default SetupScreen
