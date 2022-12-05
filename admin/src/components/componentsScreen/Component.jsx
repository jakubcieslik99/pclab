import noPhoto from '../../assets/no-photo.png'

const Component = props => {
  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{'00'}.</div>
      </td>

      <td className="pr-3">
        <div className="aspect-[4/3] flex justify-center items-center mx-auto w-[70px] bg-white/[0.25] overflow-hidden rounded-lg">
          <img src={noPhoto} alt="Not found" className="object-contain" />
        </div>
      </td>

      <td className="py-1 pr-2">
        <div className="flex flex-col min-w-[384px] max-w-[384px] md:max-w-[459px] lg:max-w-[598px]">
          <p className="-mb-[2px] truncate">{'Obudowa Cooler Master NR200P'}</p>
          <div className="flex items-baseline gap-2 mb-[2px]">
            <p className="mr-1 text-sm font-semibold">{'Case'}</p>

            {
              <div className="flex items-baseline gap-[3px]">
                <p className="text-[10px] font-light">Rozmiar {true ? 'case' : 'MOBO'}:</p>
                <p className="text-[11px] font-semibold">{'mATX'} </p>
              </div>
            }
            {
              <div className="flex items-baseline gap-[3px]">
                <p className="text-[10px] font-light">{'Socket CPU:'}</p>
                <p className="text-[11px] font-semibold">{'LGA1152'} </p>
              </div>
            }
            {
              <div className="flex items-baseline gap-[3px]">
                <p className="text-[10px] font-light">{'Typ RAM:'}</p>
                <p className="text-[11px] font-semibold">{'DDR4'} </p>
              </div>
            }
          </div>
          <div className="flex gap-1 text-[11px] text-gray-500">
            <p>ID:</p>
            <p>{'507f1f77bcf86cd799439011'}</p>
          </div>
        </div>
      </td>

      <td className="pr-2">
        <div className="">
          <span>{'00000.00'}</span>
          <span className="text-sm">zł</span>
        </div>
      </td>

      <td className="pr-2">
        <div className="text-center">{'69'}</div>
      </td>

      <td className="pr-3">
        <div className="flex items-center justify-center gap-[6px]">
          <button
            onClick={() => props.editHandler({ id: '507f1f77bcf86cd799439011', name: 'Obudowa Cooler Master NR200P' })}
            className="px-[6px] py-[3px] text-sm border-2 border-white rounded-xl bg-white/10 transition hover:bg-white/20 active:scale-90"
          >
            Edytuj
          </button>
          <button
            onClick={() => props.deleteHandler({ id: '507f1f77bcf86cd799439011', name: 'Obudowa Cooler Master NR200P' })}
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
