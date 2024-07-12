import Moment from 'moment'

const Setup = props => {
  const setup = props.setup

  let setupPrice = props.setup?.case.price
  setupPrice += props.setup?.cpu?.price || 0
  setupPrice += props.setup?.mobo?.price || 0
  setupPrice += props.setup?.ram?.price || 0
  setupPrice += props.setup?.gpu?.price || 0
  setupPrice += props.setup?.psu?.price || 0
  setupPrice += props.setup?.driveOne?.price || 0
  setupPrice += props.setup?.driveTwo?.price || 0
  setupPrice += props.setup?.driveThree?.price || 0
  setupPrice = (setupPrice / 100).toFixed(2)

  let setupComponentsAvailable = true
  props.setup?.case.amount <= 0 && (setupComponentsAvailable = false)
  props.setup?.cpu?.amount <= 0 && (setupComponentsAvailable = false)
  props.setup?.mobo?.amount <= 0 && (setupComponentsAvailable = false)
  props.setup?.ram?.amount <= 0 && (setupComponentsAvailable = false)
  props.setup?.gpu?.amount <= 0 && (setupComponentsAvailable = false)
  props.setup?.psu?.amount <= 0 && (setupComponentsAvailable = false)
  props.setup?.driveOne?.amount <= 0 && (setupComponentsAvailable = false)
  props.setup?.driveTwo?.amount <= 0 && (setupComponentsAvailable = false)
  props.setup?.driveThree?.amount <= 0 && (setupComponentsAvailable = false)

  const setupDate = Moment(props.setup?.createdAt).format('DD.MM.YYYY')

  return (
    <tr className="border-t border-gray-600">
      <td className="pl-3 pr-3">
        <div className="text-center">{props.index + 1}.</div>
      </td>

      <td className="py-[7px] pr-2">
        <div className="flex flex-col gap-[5px] min-w-[360px] max-w-[360px] md:max-w-[389px] lg:max-w-[459px]">
          <div className="flex gap-1 text-[13px] md:text-[14px] text-gray-400">
            <p>Twórca:</p>
            <a
              href={setup?.addedBy?._id ? `${import.meta.env.VITE_APP_URL}/profile/${setup.addedBy._id}` : '#'}
              target="_blank"
              rel="noreferrer"
              className="-mt-[2px] text-base font-semibold text-gray-200 underline truncate"
            >
              {setup?.addedBy?.nick || 'Konto usunięte'}
            </a>
          </div>

          <div className="flex gap-[10px] text-[13px] md:text-[14px] text-gray-400">
            <div className="flex gap-1">
              <p>Zestaw:</p>
              <a
                href={`${import.meta.env.VITE_APP_URL}/setup/${setup?._id}`}
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
                <span>{setupPrice}</span>
                <span className="text-sm">zł</span>
              </p>
            </div>
          </div>

          <div className="flex gap-[10px] text-[13px] md:text-[14px] text-gray-400">
            <div className="flex gap-1">
              <p>ID:</p>
              <p className="text-gray-200">{setup?._id}</p>
            </div>

            <div className="flex gap-1">
              <p>Utworzono:</p>
              <p className="text-gray-200">{setupDate}</p>
            </div>
          </div>
        </div>
      </td>

      <td className="pr-3">
        <div className="flex flex-col justify-center mx-auto w-[186px]">
          {setupComponentsAvailable ? (
            <div className="px-2 pt-1 pb-[3px] text-[13px] text-center font-semibold text-green-700 bg-green-200 border-2 border-green-600 rounded-xl leading-[1.12rem]">
              Wszystkie komponenty zestawu są dostępne.
            </div>
          ) : (
            <div className="px-2 pt-1 pb-[3px] text-[13px] text-center font-semibold text-red-700 bg-red-200 border-2 border-red-600 rounded-xl leading-[1.12rem]">
              Niektóre komponenty zestawu są niedostępne!
            </div>
          )}
        </div>
      </td>

      <td className="pr-3">
        <div className="flex items-center justify-center gap-[6px]">
          <button
            onClick={() => props.deleteHandler(setup)}
            className="px-[6px] py-[3px] text-sm text-red-500 border-2 border-red-500 rounded-xl bg-red-500/10 transition hover:bg-red-500/20 active:scale-90"
          >
            Usuń
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Setup
