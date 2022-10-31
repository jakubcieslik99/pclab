import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import noPhoto from '../../assets/no-photo.png'

const Setup = props => {
  return (
    <div className="overflow-hidden border border-white/[0.25] rounded-xl max-w-[479.5px]">
      <div className="grid grid-cols-3 bg-white/[0.25]">
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="No photo" className="object-contain" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="No photo" className="object-contain" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="No photo" className="object-contain" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="No photo" className="object-contain" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="No photo" className="object-contain" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="No photo" className="object-contain" />
        </div>
      </div>

      <div className="flex flex-col gap-[2px] p-2 text-lg bg-white/[0.09]">
        <div className="truncate">
          <span className="mr-2 font-semibold">CPU:</span>
          <span>
            {
              'Infooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            }
          </span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">MBO:</span>
          <span className="text-sm font-light ">brak</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">RAM:</span>
          <span>
            {
              'Infooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            }
          </span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">GPU:</span>
          <span>
            {
              'Infooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            }
          </span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">PSU:</span>
          <span>
            {
              'Infooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            }
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[2px] px-2 pb-2 bg-white/[0.09]">
        <div className="text-gray-300 truncate">
          <span className="mr-2 font-semibold">Cena:</span>
          <span className="mr-1 text-lg font-semibold">{'00000.00'}</span>
          <span className="font-light">zł</span>
        </div>

        <div className="text-gray-400 truncate">
          <span className="mr-2 text-sm font-semibold">Zakupiono:</span>
          <span className="mr-[3px] font-semibold">{'0000'}</span>
          <span className="text-sm font-light">razy</span>
        </div>

        {!props.setButton && (
          <div className="text-gray-400 truncate">
            <span className="mr-2 font-semibold">Autor:</span>
            <Link to={`/profile/${'2137'}`} className="underline">
              {'John Doe'}
            </Link>
          </div>
        )}
        <div className="text-gray-400 truncate">
          <span className="mr-2 font-semibold">Dodano:</span>
          <span className="italic">{'18.08.2022, 21:37'}</span>
        </div>
      </div>

      <div className="flex justify-between p-2 bg-white/[0.25]">
        {!props.setButton ? (
          <div className="flex items-center gap-2">
            <Link
              to={`/setup/${'21372137'}`}
              className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
            >
              Pokaż
            </Link>
            <Link
              to={`/placeorder/${'21372137'}`}
              className="px-[14px] py-2 bg-pclab-400 rounded-xl transition active:scale-95 hover:bg-pclab-400/70"
            >
              Zakup
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to={`/compose?id=${'21372137'}`}
              className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
            >
              Edytuj
            </Link>
            <button
              type="button"
              onClick={() => console.log('delete')}
              className="px-[14px] py-2 bg-pclab-400 rounded-xl transition active:scale-95 hover:bg-pclab-400/70"
            >
              Usuń
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-1 ml-2">
          <span className="text-lg">{'0000'}</span>
          {true ? (
            <button type="button" onClick={null}>
              <FaHeart className="text-2xl text-red-500" />
            </button>
          ) : (
            <button type="button" onClick={null}>
              <FaRegHeart className="text-2xl text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Setup
