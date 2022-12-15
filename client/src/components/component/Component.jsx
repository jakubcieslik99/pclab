import { FaLink, FaBoxOpen } from 'react-icons/fa'
import noPhoto from '../../assets/no-photo.png'

const Component = props => {
  return (
    <div
      className={`rounded-xl border border-white/[0.25] overflow-hidden flex flex-col bg-white/[0.08] ${
        props.order && !props.composeButton ? 'h-[256px]' : !props.composeButton ? 'h-[277px]' : 'h-auto'
      }`}
    >
      <div className="flex gap-3">
        <div
          className={`aspect-[4/3] flex justify-center items-center ${
            props.order ? 'max-w-[134px]' : 'max-w-[156px]'
          } rounded-br-xl border-r border-b border-white/[0.25] bg-white/[0.25] overflow-hidden`}
        >
          <img src={noPhoto} alt="" className="object-contain" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-1">
          <a
            href={'/'}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-[98px] px-0 ${
              props.order ? 'pt-[3px] pb-1 text-xs' : 'pt-1 pb-[6px] text-sm'
            } border-2 border-white rounded-xl transition active:scale-95 hover:bg-white/10 text-center`}
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
        <h3 className={`px-2 ${props.order ? 'pt-[2px]' : 'pt-1'} flex items-center gap-[5px]`}>
          <div>
            <FaBoxOpen />
          </div>
          <div className="text-lg font-semibold truncate">{props.name}</div>

          {true && (
            <div className="flex gap-[3px] ml-3 items-baseline">
              <span className="text-xs font-light">rozmiar:</span>
              <span className="text-sm font-semibold">{'mATX'}</span>
            </div>
          )}
        </h3>

        <h4
          className={`px-2 pb-[1px] ${props.order ? 'text-base leading-[1.34rem]' : 'text-lg leading-[1.39rem]'} break-all`}
        >
          {'OOOOOOOOOO OOOOOOOOOO OOOOOOOOOO OOOOOOOOOO OOOOOOOOOO'}
        </h4>

        <div className="h-[54px] pb-[6px] px-2 flex flex-col justify-center">
          {
            /*type==='case' ? 1 : 2*/ true ? (
              <div className="text-xs font-light">
                Zgodn. z {'rozm. płyty gł.'}: <span className="font-semibold">{'mATX i mniejsze'}</span>
              </div>
            ) : (
              <div className="text-xs font-light">
                Zgodn. z {'rozm. obudowy'}: <span className="font-semibold">{'mATX i większe'}</span>
              </div>
            )
          }
          {
            <div className="text-xs font-light">
              Zgodn. z {'socketem procesora'}: <span className="font-semibold">{'AM4'}</span>
            </div>
          }
          {
            <div className="text-xs font-light">
              Zgodn. z {'typem pamięci RAM'}: <span className="font-semibold">{'DDR4'}</span>
            </div>
          }
        </div>
      </div>

      {props.composeButton && props.buttonClickHandler && (
        <div className="mx-2 mb-2">
          <button
            type="button"
            className={`px-3 rounded-xl transition active:scale-95 ${
              props.composeButton === 'select'
                ? 'py-[2px] border-2 hover:bg-white/10'
                : 'py-1 bg-pclab-400 hover:bg-pclab-400/70'
            }`}
            onClick={() => props.buttonClickHandler()}
          >
            {props.composeButton === 'select' ? 'Dodaj' : 'Usuń'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Component
