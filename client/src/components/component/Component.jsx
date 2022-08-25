import { FaLink, FaBoxOpen } from 'react-icons/fa'
import noPhoto from '../../assets/no-photo.png'

const Component = props => {
  return (
    <div className="rounded-xl border border-white/[0.25] overflow-hidden h-[229px] flex flex-col bg-white/[0.08]">
      <div className="flex gap-3">
        <div className="aspect-[4/3] flex justify-center items-center max-w-[156px] rounded-br-xl border-r border-b border-white/[0.25] bg-white/[0.25] overflow-hidden">
          <img src={noPhoto} alt="No photo" className="object-contain" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-1">
          <a
            href={'/'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[98px] px-0 pt-1 pb-[6px] text-sm border-2 border-white rounded-xl transition active:scale-95 hover:bg-white/10 text-center"
          >
            <FaLink className="inline-flex" /> Strona producenta
          </a>

          <div>
            <div className="text-xs">Cena</div>
            <div className="font-semibold">
              <span>{'00000.00'}</span>
              <span className="ml-1 text-sm font-light">zł</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[2px] flex-1 justify-center">
        <h3 className="mx-2 mt-[5px]  flex items-center gap-[5px]">
          <div>
            <FaBoxOpen />
          </div>
          <div className="text-lg font-semibold truncate">{props.name}</div>
        </h3>
        <h4 className="mx-2 mb-[5px] text-lg leading-[1.45rem] break-all">
          {'OOOOOOOOOO OOOOOOOOOO OOOOOOOOOO OOOOOOOOOO OOOOOOOOOO'}
        </h4>
      </div>
    </div>
  )
}

export default Component
