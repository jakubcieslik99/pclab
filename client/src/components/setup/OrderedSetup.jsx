import { Link } from 'react-router-dom'
import noPhoto from '../../assets/no-photo.png'

const OrderedSetup = () => {
  return (
    <div className="overflow-hidden border border-white/[0.25] rounded-xl max-w-[479.5px]">
      <div className="grid grid-cols-3 bg-white/[0.25]">
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="" className="object-contain w-full h-full" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="" className="object-contain w-full h-full" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="" className="object-contain w-full h-full" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="" className="object-contain w-full h-full" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="" className="object-contain w-full h-full" />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img src={noPhoto} alt="" className="object-contain w-full h-full" />
        </div>
      </div>

      <div className="flex flex-col gap-[2px] p-2 bg-white/[0.09]">
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
          <span className="mr-2 text-lg font-semibold">Cena:</span>
          <span className="mr-1 text-xl font-semibold">{'00000.00'}</span>
          <span className="text-lg font-light">zł</span>
        </div>

        <div className="text-gray-400 truncate">
          <span className="mr-2 font-semibold">Zakupiono:</span>
          <span className="italic">{'18.08.2022, 21:37'}</span>
        </div>
      </div>

      <div className="flex p-2 bg-white/[0.25]">
        <Link
          to={`/order/${'21372137'}`}
          className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
        >
          Szczegóły zamówienia
        </Link>
      </div>
    </div>
  )
}

export default OrderedSetup
