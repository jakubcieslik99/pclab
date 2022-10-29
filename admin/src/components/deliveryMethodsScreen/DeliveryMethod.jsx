const DeliveryMethod = props => {
  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{'00'}.</div>
      </td>

      <td className="py-[6px] pr-2">
        <div className="flex flex-col min-w-[384px] max-w-[384px] md:max-w-[459px] lg:max-w-[598px]">
          <p className="mb-[2px] truncate">{'Obudowa Cooler Master NR200P'}</p>
          <div className="flex gap-1 text-sm text-gray-500">
            <p>ID:</p>
            <p>{'507f1f77bcf86cd799439011'}</p>
          </div>
        </div>
      </td>

      <td className="pr-2">
        <div>
          <span>{'00.00'}</span>
          <span className="text-sm">zł</span>
        </div>
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

export default DeliveryMethod
