import Moment from 'moment'

const Order = props => {
  const order = props.order

  const orderPrice = (props.order?.totalPrice / 100).toFixed(2)

  const orderDate = Moment(props.order?.createdAt).format('DD.MM.YYYY')

  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{props.index + 1}.</div>
      </td>

      <td className="py-1 pr-2">
        <div className="flex flex-col gap-1 min-w-[348px] max-w-[348px] md:max-w-[411px] lg:max-w-[598px]">
          <p className="mb-[2px] truncate text-[14px] md:text-[15px] font-light">
            {order?.buyer?.email || 'Konto usunięte'}
          </p>

          <div className="flex gap-[10px] text-[12px] md:text-[13px] text-gray-400">
            <div className="flex gap-1">
              <p>Zestaw:</p>
              <a
                href={`${import.meta.env.VITE_APP_WEBAPP_URL}/setups/${order?.orderedSetup}`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-200 underline"
              >
                {order?.orderedSetup}
              </a>
            </div>

            <div className="flex gap-1">
              <p>Suma:</p>
              <p className="text-gray-200 -mt-[1px]">
                <span>{orderPrice}</span>
                <span className="text-sm">zł</span>
              </p>
            </div>
          </div>

          <div className="flex gap-[10px] text-[12px] md:text-[13px] text-gray-400">
            <div className="flex gap-1">
              <p>ID:</p>
              <p className="text-gray-200">{order?._id}</p>
            </div>

            <div className="flex gap-1">
              <p>Zamówiono:</p>
              <p className="text-gray-200">{orderDate}</p>
            </div>
          </div>
        </div>
      </td>

      <td className="pr-3">
        <div className="flex flex-col justify-center mx-auto w-[168px]">
          {order?.status === 'unpaid' ? (
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-red-700 text-center bg-red-300 border-2 border-red-600 rounded-xl leading-[1.12rem]">
              Nieopłacono
            </div>
          ) : order?.status === 'paying' ? (
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-orange-700 text-center bg-orange-300 border-2 border-orange-600 rounded-xl leading-[1.12rem]">
              W trakcie płatności
            </div>
          ) : order?.status === 'canceled' ? (
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-red-700 text-center bg-red-300 border-2 border-red-600 rounded-xl leading-[1.12rem]">
              Anulowano
            </div>
          ) : order?.status === 'awaiting' ? (
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-yellow-700 text-center bg-yellow-200 border-2 border-yellow-700 rounded-xl leading-[1.12rem]">
              Oczekuje na wysyłkę
            </div>
          ) : order?.status === 'sent' ? (
            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-green-700 text-center bg-green-300 border-2 border-green-600 rounded-xl leading-[1.12rem]">
              Wysłano
            </div>
          ) : (
            order?.status === 'returned' && (
              <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-blue-700 text-center bg-blue-300 border-2 border-blue-600 rounded-xl leading-[1.12rem]">
                Zwrócono
              </div>
            )
          )}
        </div>
      </td>

      <td className="pr-3">
        <div className="flex items-center justify-center gap-[6px]">
          <button
            onClick={() => props.editHandler(order?._id)}
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
