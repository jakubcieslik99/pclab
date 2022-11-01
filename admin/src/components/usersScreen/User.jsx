const User = props => {
  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{'00'}.</div>
      </td>

      <td className="py-[7px] pr-3">
        <div className="flex flex-col gap-[5px] min-w-[384px] max-w-[384px] md:max-w-[389px] lg:max-w-[459px]">
          <div className="flex gap-1 text-[13px] md:text-[14px] text-gray-400">
            <p>Użytkownik:</p>
            <a
              href={'http://localhost:3000/profile/2137'}
              target="_blank"
              rel="noreferrer"
              className="-mt-[2px] text-base font-semibold text-gray-200 underline truncate"
            >
              {'johndoe99'}
            </a>
          </div>

          <div className="flex gap-1 text-[13px] md:text-[14px] text-gray-400">
            <p>Email:</p>
            <p className="-mt-[2px] text-base font-semibold text-gray-200 truncate">{'johndoe@gmail.com'}</p>
          </div>

          <div className="flex gap-[10px] text-[13px] md:text-[14px] text-gray-400">
            <div className="flex gap-1">
              <p>ID:</p>
              <p className="text-gray-200">{'507f1f77bcf86cd799439011'}</p>
            </div>

            <div className="flex gap-1">
              <p>Zarejestrowano:</p>
              <p className="text-gray-200">{'00/00/0000'}</p>
            </div>
          </div>
        </div>
      </td>

      <td className="pr-3">
        <div className="flex flex-col items-center mx-auto -mb-1 gap-[4px] min-w-[142px]">
          <div className={`flex gap-1 mb-1 text-[10px] md:text-[12px] ${true ? 'text-white-400' : 'text-gray-400'}`}>
            <p className="text-sm">Aktywne zakupy:</p>
            <p className={`-mt-[2px] text-[17px] font-semibold ${true ? 'text-red-400' : 'text-gray-200'}`}>{'00'}</p>
          </div>

          <div className="flex gap-1 text-[10px] md:text-[12px] text-gray-400">
            <p>Zestawy:</p>
            <p className="-mt-[3px] text-base text-gray-200">{'0000'}</p>
          </div>

          <div className="flex gap-1 text-[10px] md:text-[12px] text-gray-400">
            <p>Komentarze:</p>
            <p className="-mt-[3px] text-base text-gray-200">{'0000'}</p>
          </div>
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

export default User
