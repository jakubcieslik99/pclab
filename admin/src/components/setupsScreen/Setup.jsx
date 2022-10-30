const Component = props => {
  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{'00'}.</div>
      </td>

      <td className="py-[7px] pr-2">
        <div className="flex flex-col gap-[5px] min-w-[360px] max-w-[360px] md:max-w-[389px] lg:max-w-[459px]">
          <div className="flex gap-1 text-[13px] md:text-[14px] text-gray-400">
            <p>Twórca:</p>
            <a
              href={'http://localhost:3000/profile/2137'}
              target="_blank"
              rel="noreferrer"
              className="-mt-[2px] text-base font-semibold text-gray-200 underline truncate"
            >
              {'johndoe99'}
            </a>
          </div>

          <div className="flex gap-[10px] text-[13px] md:text-[14px] text-gray-400">
            <div className="flex gap-1">
              <p>Zestaw:</p>
              <a
                href={'http://localhost:3000/setups/507f1f77bcf86cd799439011'}
                target="_blank"
                rel="noreferrer"
                className="-mt-[2px] text-base font-semibold text-gray-200 underline"
              >
                Zobacz zestaw
              </a>
            </div>

            <div className="flex gap-1">
              <p>Cena:</p>
              <p className="text-gray-200">
                <span>{'00000.00'}</span>
                <span className="text-sm">zł</span>
              </p>
            </div>
          </div>

          <div className="flex gap-[10px] text-[13px] md:text-[14px] text-gray-400">
            <div className="flex gap-1">
              <p>ID:</p>
              <p className="text-gray-200">{'507f1f77bcf86cd799439011'}</p>
            </div>

            <div className="flex gap-1">
              <p>Utworzono:</p>
              <p className="text-gray-200">{'00/00/0000'}</p>
            </div>
          </div>
        </div>
      </td>

      <td className="pr-3">
        <div className="flex flex-col justify-center mx-auto w-[186px]">
          {
            <div className="px-2 pt-1 pb-[3px] text-[13px] text-center font-semibold text-red-700 bg-red-200 border-2 border-red-600 rounded-xl leading-[1.12rem]">
              Niektóre komponenty zestawu są niedostępne!
            </div>
          }
          {/*
            <div className="px-2 pt-1 pb-[3px] text-[13px] text-center font-semibold text-green-700 bg-green-200 border-2 border-green-600 rounded-xl leading-[1.12rem]">
              Wszystkie komponenty zestawu są dostępne.
            </div>
          */}
        </div>
      </td>

      <td className="pr-3">
        <div className="flex items-center justify-center gap-[6px]">
          <button
            onClick={() => props.deleteHandler({ id: '507f1f77bcf86cd799439011', name: 'johndoe99' })}
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
