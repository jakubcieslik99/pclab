import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { likeSetup, unlikeSetup } from '../../features/setupsSlices/manageLikedSetups'
import noPhoto from '../../assets/no-photo.png'

const Setup = props => {
  // variables
  const likeSetupAbort = useRef()
  const unlikeSetupAbort = useRef()

  const { userInfo } = useAppSelector(state => state.manageAccount)
  const { loading, likedSetups } = useAppSelector(state => state.manageLikedSetups)
  const dispatch = useAppDispatch()

  const setup = props.setup

  let setupPrice = props.setup?.case.price
  setupPrice += props.setup?.cpu?.price || 0
  setupPrice += props.setup?.mobo?.price || 0
  setupPrice += props.setup?.ram?.price || 0
  setupPrice += props.setup?.gpu?.price || 0
  setupPrice += props.setup?.psu?.price || 0
  setupPrice += props.setup?.driveOne?.price || 0
  setupPrice += props.setup?.driveTwo?.price || 0
  setupPrice += props.setup?.driveThree?.price || 0
  setupPrice = (setupPrice / 100).toFixed(2)

  const setupDate = Moment(props.setup?.createdAt).format('DD.MM.YYYY, HH:mm')

  const setupLiked = userInfo && likedSetups.includes(props.setup?._id) ? true : false

  const setupComponentImage = `${import.meta.env.VITE_API_URL}/static/components`

  // handlers
  const likeHandler = () => {
    if (userInfo && !likedSetups.includes(props.setup?._id)) {
      const likeSetupPromise = dispatch(likeSetup({ id: props.setup?._id }))
      likeSetupAbort.current = likeSetupPromise.abort
    }
  }

  const unlikeHandler = () => {
    if (userInfo && likedSetups.includes(props.setup?._id)) {
      const unlikeSetupPromise = dispatch(unlikeSetup({ id: props.setup?._id }))
      unlikeSetupAbort.current = unlikeSetupPromise.abort
    }
  }

  const deleteHandler = () => {
    props.buttonClickHandler()
  }

  // useEffects
  useEffect(() => {
    return () => {
      likeSetupAbort.current && likeSetupAbort.current()
      unlikeSetupAbort.current && unlikeSetupAbort.current()
    }
  }, [])

  return (
    <div className="overflow-hidden border border-white/[0.25] rounded-xl max-w-[479.5px]">
      <div className="grid grid-cols-3 bg-white/[0.25]">
        <div className="aspect-[4/3] flex justify-center items-end">
          <img
            crossOrigin="anonymous"
            src={
              setup?.case.images && setup.case.images[0]
                ? `${setupComponentImage}/${setup.case._id}/${setup.case.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-end">
          <img
            crossOrigin="anonymous"
            src={
              setup?.cpu?.images && setup.cpu.images[0]
                ? `${setupComponentImage}/${setup.cpu._id}/${setup.cpu.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-end">
          <img
            crossOrigin="anonymous"
            src={
              setup?.mobo?.images && setup.mobo.images[0]
                ? `${setupComponentImage}/${setup.mobo._id}/${setup.mobo.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-start">
          <img
            crossOrigin="anonymous"
            src={
              setup?.ram?.images && setup.ram.images[0]
                ? `${setupComponentImage}/${setup.ram._id}/${setup.ram.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-start">
          <img
            crossOrigin="anonymous"
            src={
              setup?.gpu?.images && setup.gpu.images[0]
                ? `${setupComponentImage}/${setup.gpu._id}/${setup.gpu.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-start">
          <img
            crossOrigin="anonymous"
            src={
              setup?.psu?.images && setup.psu.images[0]
                ? `${setupComponentImage}/${setup.psu._id}/${setup.psu.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[2px] p-2 text-lg bg-white/[0.09]">
        <div className="truncate">
          <span className="mr-2 font-semibold">CPU:</span>
          <span>{setup?.cpu?.title || <span className="text-sm font-light">brak</span>}</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">MBO:</span>
          <span>{setup?.mobo?.title || <span className="text-sm font-light">brak</span>}</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">RAM:</span>
          <span>{setup?.ram?.title || <span className="text-sm font-light">brak</span>}</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">GPU:</span>
          <span>{setup?.gpu?.title || <span className="text-sm font-light">brak</span>}</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">PSU:</span>
          <span>{setup?.psu?.title || <span className="text-sm font-light">brak</span>}</span>
        </div>
      </div>

      <div className="flex flex-col gap-[2px] px-2 pb-2 bg-white/[0.09]">
        <div className="text-gray-300 truncate">
          <span className="mr-2 font-semibold">Cena:</span>
          <span className="mr-1 text-lg font-semibold">{setupPrice}</span>
          <span className="font-light">zł</span>
        </div>

        <div className="text-gray-400 truncate">
          <span className="mr-2 text-sm font-semibold">Zakupiono:</span>
          <span className="mr-[3px] font-semibold">{setup?.bought}</span>
          <span className="text-sm font-light">razy</span>
        </div>

        {!props.setButton && (
          <div className="text-gray-400 truncate">
            <span className="mr-2 font-semibold">Autor:</span>
            <Link to={`/profile/${setup?.addedBy._id}`} className="underline">
              {setup?.addedBy.nick}
            </Link>
          </div>
        )}
        <div className="text-gray-400 truncate">
          <span className="mr-2 font-semibold">Dodano:</span>
          <span className="italic">{setupDate}</span>
        </div>
      </div>

      <div className="flex justify-between p-2 bg-white/[0.25]">
        {!props.setButton ? (
          <div className="flex items-center gap-2">
            <Link
              to={`/setup/${setup?._id}`}
              className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
            >
              Pokaż
            </Link>
            <Link
              to={`/placeorder/${setup?._id}`}
              className="px-[14px] py-2 bg-pclab-400 rounded-xl transition active:scale-95 hover:bg-pclab-400/70"
            >
              Zakup
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to={`/compose?id=${setup?._id}`}
              className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
            >
              Edytuj
            </Link>
            <button
              type="button"
              onClick={() => deleteHandler()}
              className="px-[14px] py-2 bg-pclab-400 rounded-xl transition active:scale-95 hover:bg-pclab-400/70"
            >
              Usuń
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-1 ml-2">
          <span className="text-lg">{setup?.likes}</span>
          {setupLiked ? (
            <button disabled={loading} type="button" onClick={() => unlikeHandler()}>
              <FaHeart className="text-2xl text-red-500" />
            </button>
          ) : (
            <button disabled={loading} type="button" onClick={() => likeHandler()}>
              <FaRegHeart className="text-2xl text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Setup
