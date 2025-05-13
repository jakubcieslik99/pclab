import noPhoto from '../../assets/no-photo.png'

const Component = props => {
  const component = props.component

  const componentImage = `${import.meta.env.VITE_API_URL}/static/components/${props.component?._id}`

  const componentPrice = (props.component?.price / 100).toFixed(2)

  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{props.index + 1}.</div>
      </td>

      <td className="pr-3">
        <div className="aspect-[4/3] flex justify-center items-center mx-auto w-[70px] bg-white/[0.25] overflow-hidden rounded-lg">
          <img
            crossOrigin="anonymous"
            src={
              props.component?.images && props.component.images[0]
                ? `${componentImage}/${props.component?.images[0]}`
                : noPhoto
            }
            alt="Not found"
            className="object-contain w-full h-full"
          />
        </div>
      </td>

      <td className="py-1 pr-2">
        <div className="flex flex-col min-w-[384px] max-w-[384px] md:max-w-[459px] lg:max-w-[598px]">
          <p className="-mb-[2px] truncate">{component?.title}</p>
          <div className="flex items-baseline gap-2 mb-[2px]">
            <p className="mr-1 text-sm font-semibold">
              {component?.type === 'case' ? (
                'Case'
              ) : component?.type === 'drive' ? (
                'Drive'
              ) : (
                <span className="uppercase">{component?.type}</span>
              )}
            </p>

            {component?.type === 'case' && (
              <div className="flex items-baseline gap-[3px]">
                <p className="text-[10px] font-light">Rozmiar case:</p>
                <p className="text-[11px] font-semibold">
                  {component?.moboCompat === 'matx' ? (
                    'mATX'
                  ) : (
                    <span className="uppercase">{component?.moboCompat}</span>
                  )}{' '}
                </p>
              </div>
            )}
            {component?.type === 'mobo' && (
              <div className="flex items-baseline gap-[3px]">
                <p className="text-[10px] font-light">Rozmiar MOBO:</p>
                <p className="text-[11px] font-semibold">
                  {component?.caseCompat === 'matx' ? (
                    'mATX'
                  ) : (
                    <span className="uppercase">{component?.caseCompat}</span>
                  )}{' '}
                </p>
              </div>
            )}
            {(component?.type === 'cpu' || component?.type === 'mobo') && (
              <div className="flex items-baseline gap-[3px]">
                <p className="text-[10px] font-light">Socket CPU:</p>
                <p className="text-[11px] font-semibold uppercase">{component?.cpuCompat} </p>
              </div>
            )}
            {(component?.type === 'cpu' || component?.type === 'mobo' || component?.type === 'ram') && (
              <div className="flex items-baseline gap-[3px]">
                <p className="text-[10px] font-light">Typ RAM:</p>
                <p className="text-[11px] font-semibold uppercase">{component?.ramCompat} </p>
              </div>
            )}
          </div>
          <div className="flex gap-1 text-[11px] text-gray-500">
            <p>ID:</p>
            <p>{component?._id}</p>
          </div>
        </div>
      </td>

      <td className="pr-2">
        <div className="">
          <span>{componentPrice}</span>
          <span className="text-sm">zł</span>
        </div>
      </td>

      <td className="pr-2">
        <div className="text-center">{component?.amount}</div>
      </td>

      <td className="pr-3">
        <div className="flex items-center justify-center gap-[6px]">
          <button
            onClick={() => props.editHandler(component)}
            className="px-[6px] py-[3px] text-sm border-2 border-white rounded-xl bg-white/10 transition hover:bg-white/20 active:scale-90"
          >
            Edytuj
          </button>
          <button
            onClick={() => props.deleteHandler(component)}
            className="px-[6px] py-[3px] text-sm text-red-500 border-2 border-red-500 rounded-xl bg-red-500/10 transition hover:bg-red-500/20 active:scale-90"
          >
            Usuń
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Component
