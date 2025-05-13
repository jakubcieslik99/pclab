import { useAppSelector } from '../../features/store'
import Moment from 'moment'

const User = props => {
  // variables
  const { userInfo } = useAppSelector(state => state.manageAccount)

  const user = props.user

  const userDate = Moment(props.user?.createdAt).format('DD.MM.YYYY')

  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{props.index + 1}.</div>
      </td>

      <td className="py-[7px] pr-3">
        <div className="flex flex-col gap-[5px] min-w-[384px] max-w-[384px] md:max-w-[410px] lg:max-w-[459px]">
          <div className="flex gap-1 text-[13px] md:text-[14px] text-gray-400">
            <p>
              {!user?.isAdmin ? <span>Użytkownik</span> : <span className="font-semibold text-red-400">Admin</span>}
              <span>:</span>
            </p>
            <a
              href={`${import.meta.env.VITE_APP_URL}/profile/${user?._id}`}
              target="_blank"
              rel="noreferrer"
              className="-mt-[2px] text-base font-semibold text-gray-200 underline truncate"
            >
              {user?.nick}
            </a>
          </div>

          <div className="flex gap-1 text-[13px] md:text-[14px] text-gray-400">
            <p>Email:</p>
            <p className="-mt-[2px] text-base font-semibold text-gray-200 truncate">{user?.email}</p>
          </div>

          <div className="flex gap-[10px] text-[13px] md:text-[14px] text-gray-400">
            <div className="flex gap-1">
              <p>ID:</p>
              <p className="text-gray-200">{user?._id}</p>
            </div>

            <div className="flex gap-1">
              <p>Zarejestrowano:</p>
              <p className="text-gray-200">{userDate}</p>
            </div>
          </div>
        </div>
      </td>

      <td className="pr-3">
        <div className="flex flex-col items-center mx-auto -mb-1 gap-[4px] min-w-[142px]">
          <div
            className={`flex gap-1 mb-1 text-[10px] md:text-[12px] ${user?.setupsCount ? 'text-white-400' : 'text-gray-400'}`}
          >
            <p className="text-sm">Zestawy:</p>
            <p className="-mt-[2px] text-[17px] font-semibold text-gray-200">{user?.setupsCount}</p>
          </div>

          <div className="flex gap-1 text-[10px] md:text-[12px] text-gray-400">
            <p>Komentarze:</p>
            <p className="-mt-[3px] text-base text-gray-200">{user?.commentsCount}</p>
          </div>

          <div className="flex gap-1 text-[10px] md:text-[12px] text-gray-400">
            <p>Polubione:</p>
            <p className="-mt-[3px] text-base text-gray-200">{user?.likedSetups?.length || 0}</p>
          </div>
        </div>
      </td>

      <td className="pr-3">
        <div className={`flex items-center justify-center gap-[6px] ${user?._id === userInfo.id && 'hidden'}`}>
          <button
            onClick={() => props.editHandler(user)}
            className="px-[6px] py-[3px] text-sm border-2 border-white rounded-xl bg-white/10 transition hover:bg-white/20 active:scale-90"
          >
            Edytuj
          </button>
          <button
            onClick={() => props.deleteHandler(user)}
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
