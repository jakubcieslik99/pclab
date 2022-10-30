const Order = props => {
  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{'00'}.</div>
      </td>

      <td className="py-1 pr-2">
        <div className="flex flex-col gap-1 min-w-[348px] max-w-[348px] md:max-w-[411px] lg:max-w-[598px]">
          <p className="mb-[2px] truncate text-[14px] md:text-[15px] font-light">{'testuser123@gmail.com'}</p>

          <div className="flex gap-[10px] text-[12px] md:text-[13px] text-gray-400">
            <div className="flex gap-1">
              <p>Zestaw:</p>
              <a
                href={'http://localhost:3000/setups/507f1f77bcf86cd799439011'}
                target="_blank"
                rel="noreferrer"
                className="text-gray-200 underline"
              >
                {'507f1f77bcf86cd799439011'}
              </a>
            </div>

            <div className="flex gap-1">
              <p>Suma:</p>
              <p className="text-gray-200 -mt-[1px]">
                <span>{'00000.00'}</span>
                <span className="text-sm">zł</span>
              </p>
            </div>
          </div>

          <div className="flex gap-[10px] text-[12px] md:text-[13px] text-gray-400">
            <div className="flex gap-1">
              <p>ID:</p>
              <p className="text-gray-200">{'507f1f77bcf86cd799439011'}</p>
            </div>

            <div className="flex gap-1">
              <p>Zamówiono:</p>
              <p className="text-gray-200">{'00/00/0000'}</p>
            </div>
          </div>
        </div>
      </td>

      <td className="pr-3">
        <div className="flex flex-col justify-center mx-auto w-[168px]">
          {/*
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-red-700 bg-red-300 border-2 border-red-600 rounded-xl leading-[1.12rem]">
              Nieopłacono
            </div>
          */}
          {
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-yellow-700 bg-yellow-200 border-2 border-yellow-700 rounded-xl leading-[1.12rem]">
              Oczekuje na wysyłkę
            </div>
          }
          {/*
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-green-700 bg-green-300 border-2 border-green-600 rounded-xl leading-[1.12rem]">
              Wysłano
            </div>
          */}
          {/*
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-blue-700 bg-blue-300 border-2 border-blue-600 rounded-xl leading-[1.12rem]">
              Zwrócono
            </div>
          */}
        </div>
      </td>

      <td className="pr-3">
        <div className="flex items-center justify-center gap-[6px]">
          <button
            onClick={() => props.editHandler({ id: '507f1f77bcf86cd799439011', name: 'Obudowa Cooler Master NR200P' })}
            className="px-[6px] py-[3px] text-sm border-2 border-white rounded-xl bg-white/10 transition hover:bg-white/20 active:scale-90"
          >
            Zarządzaj
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Order
