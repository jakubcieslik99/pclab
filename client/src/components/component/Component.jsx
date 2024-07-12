import { FaLink, FaBoxOpen } from 'react-icons/fa'
import noPhoto from '../../assets/no-photo.png'

const Component = props => {
  const componentImage = `${import.meta.env.VITE_API_URL}/static/components/${
    !props.order ? props.component?._id : props.component?.componentId
  }`
  const componentPrice = (props.component?.price / 100).toFixed(2) || (0 / 100).toFixed(2)

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
          } rounded-br-xl border-r border-b border-white/[0.25] bg-white/[0.25] overflow-hidden relative`}
        >
          <img
            crossOrigin="anonymous"
            src={
              props.component?.images && props.component.images[0]
                ? `${componentImage}/${props.component?.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />

          {!props.order && props.component?.amount && (
            <div className="absolute flex items-center justify-center px-[5px] text-xs text-pclab-600 bg-white rounded-lg pt-[2px] pb-[1px] left-[3px] bottom-1 gap-[2px]">
              <span className="font-bold">{props.component.amount}</span>
              <span className="font-semibold">szt.</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-1">
          <a
            href={props.component?.url}
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
              <span>{componentPrice}</span>
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
          <div className="text-lg font-semibold truncate">
            {props.component?.type === 'case'
              ? 'Obudowa'
              : props.component?.type === 'cpu'
                ? 'CPU'
                : props.component?.type === 'mobo'
                  ? 'MOBO'
                  : props.component?.type === 'ram'
                    ? 'RAM'
                    : props.component?.type === 'gpu'
                      ? 'GPU'
                      : props.component?.type === 'psu'
                        ? 'Zasilacz'
                        : props.component?.type === 'drive'
                          ? 'Dysk'
                          : 'Komponent'}
          </div>

          {props.component?.type === 'case' && (
            <div className="flex gap-[3px] ml-3 items-baseline">
              <span className="text-xs font-light">rozmiar:</span>
              <span className="text-sm font-semibold">
                {props.component.moboCompat === 'matx' ? (
                  'mATX'
                ) : (
                  <span className="uppercase">{props.component.moboCompat}</span>
                )}
              </span>
            </div>
          )}
          {props.component?.type === 'cpu' && (
            <div className="flex gap-[3px] ml-3 items-baseline">
              <span className="text-xs font-light">socket:</span>
              <span className="text-sm font-semibold uppercase">
                {props.component.cpuCompat === 'lga2066'
                  ? 'LGA 2066'
                  : props.component.cpuCompat === 'lga1700'
                    ? 'LGA 1700'
                    : props.component.cpuCompat === 'lga1200'
                      ? 'LGA 1200'
                      : props.component.cpuCompat === 'lga1156'
                        ? 'LGA 1156'
                        : props.component.cpuCompat === 'lga1155'
                          ? 'LGA 1155'
                          : props.component.cpuCompat === 'lga1151'
                            ? 'LGA 1151'
                            : props.component.cpuCompat === 'lga1150'
                              ? 'LGA 1150'
                              : props.component.cpuCompat}
              </span>
            </div>
          )}
          {props.component?.type === 'mobo' && (
            <div className="flex gap-[3px] ml-3 items-baseline">
              <span className="text-xs font-light">rozmiar:</span>
              <span className="text-sm font-semibold">
                {props.component.caseCompat === 'matx' ? (
                  'mATX'
                ) : (
                  <span className="uppercase">{props.component.caseCompat}</span>
                )}
              </span>
            </div>
          )}
          {props.component?.type === 'ram' && (
            <div className="flex gap-[3px] ml-3 items-baseline">
              <span className="text-xs font-light">typ:</span>
              <span className="text-sm font-semibold uppercase">{props.component.ramCompat}</span>
            </div>
          )}
        </h3>

        <h4
          className={`px-2 pb-[1px] ${
            props.order ? 'text-base leading-[1.34rem]' : 'text-lg leading-[1.39rem]'
          } break-words`}
        >
          {props.component?.title}
        </h4>

        <div className="h-[54px] pb-[6px] px-2 flex flex-col justify-center">
          {props.component?.type === 'case' && (
            <div className="text-xs font-light">
              Zgodn. z rozm. płyty gł.:{' '}
              <span className="font-semibold">
                {props.component.moboCompat === 'atx'
                  ? 'ATX i mniejsze'
                  : props.component.moboCompat === 'matx'
                    ? 'mATX i mniejsze'
                    : props.component.moboCompat === 'itx'
                      ? 'ITX'
                      : '-'}
              </span>
            </div>
          )}

          {props.component?.type === 'cpu' && (
            <>
              <div className="text-xs font-light">
                Zgodn. z płytą z socketem:{' '}
                <span className="font-semibold uppercase">
                  {props.component.cpuCompat === 'lga2066'
                    ? 'LGA 2066'
                    : props.component.cpuCompat === 'lga1700'
                      ? 'LGA 1700'
                      : props.component.cpuCompat === 'lga1200'
                        ? 'LGA 1200'
                        : props.component.cpuCompat === 'lga1156'
                          ? 'LGA 1156'
                          : props.component.cpuCompat === 'lga1155'
                            ? 'LGA 1155'
                            : props.component.cpuCompat === 'lga1151'
                              ? 'LGA 1151'
                              : props.component.cpuCompat === 'lga1150'
                                ? 'LGA 1150'
                                : props.component.cpuCompat}
                </span>
              </div>

              <div className="text-xs font-light">
                Zgodn. z typem pamięci RAM: <span className="font-semibold uppercase">{props.component.ramCompat}</span>
              </div>
            </>
          )}

          {props.component?.type === 'mobo' && (
            <>
              <div className="text-xs font-light">
                Zgodn. z socketem procesora:{' '}
                <span className="font-semibold uppercase">
                  {props.component.cpuCompat === 'lga2066'
                    ? 'LGA 2066'
                    : props.component.cpuCompat === 'lga1700'
                      ? 'LGA 1700'
                      : props.component.cpuCompat === 'lga1200'
                        ? 'LGA 1200'
                        : props.component.cpuCompat === 'lga1156'
                          ? 'LGA 1156'
                          : props.component.cpuCompat === 'lga1155'
                            ? 'LGA 1155'
                            : props.component.cpuCompat === 'lga1151'
                              ? 'LGA 1151'
                              : props.component.cpuCompat === 'lga1150'
                                ? 'LGA 1150'
                                : props.component.cpuCompat
                                  ? props.component.cpuCompat
                                  : '-'}
                </span>
              </div>

              <div className="text-xs font-light">
                Zgodn. z rozm. obudowy:{' '}
                <span className="font-semibold">
                  {props.component.caseCompat === 'itx'
                    ? 'ITX i większe'
                    : props.component.caseCompat === 'matx'
                      ? 'mATX i większe'
                      : props.component.caseCompat === 'atx'
                        ? 'ATX'
                        : '-'}
                </span>
              </div>

              <div className="text-xs font-light">
                Zgodn. z typem pamięci RAM: <span className="font-semibold uppercase">{props.component.ramCompat}</span>
              </div>
            </>
          )}

          {props.component?.type === 'ram' && (
            <div className="text-xs font-light">
              Zgodn. z type slotu RAM: <span className="font-semibold uppercase">{props.component.ramCompat}</span>
            </div>
          )}
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
