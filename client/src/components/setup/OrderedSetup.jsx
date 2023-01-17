import { Link } from 'react-router-dom'
import Moment from 'moment'
import noPhoto from '../../assets/no-photo.png'

const OrderedSetup = props => {
  const orderedSetupComponentImage = `${import.meta.env.VITE_APP_API_URL}/static/components`

  const caseComponent = props.orderedSetup.orderedComponents.find(component => component.type === 'case')
  const cpuComponent = props.orderedSetup.orderedComponents.find(component => component.type === 'cpu')
  const moboComponent = props.orderedSetup.orderedComponents.find(component => component.type === 'mobo')
  const ramComponent = props.orderedSetup.orderedComponents.find(component => component.type === 'ram')
  const gpuComponent = props.orderedSetup.orderedComponents.find(component => component.type === 'gpu')
  const psuComponent = props.orderedSetup.orderedComponents.find(component => component.type === 'psu')

  const orderedSetupDate = Moment(props.orderedSetup?.createdAt).format('DD.MM.YYYY, HH:mm')

  return (
    <div className="overflow-hidden border border-white/[0.25] rounded-xl max-w-[479.5px]">
      <div className="grid grid-cols-3 bg-white/[0.25]">
        <div className="aspect-[4/3] flex justify-center items-center">
          <img
            crossOrigin="anonymous"
            src={
              caseComponent?.images && caseComponent.images[0]
                ? `${orderedSetupComponentImage}/${caseComponent.componentId}/${caseComponent.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img
            crossOrigin="anonymous"
            src={
              cpuComponent?.images && cpuComponent.images[0]
                ? `${orderedSetupComponentImage}/${cpuComponent.componentId}/${cpuComponent.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img
            crossOrigin="anonymous"
            src={
              moboComponent?.images && moboComponent.images[0]
                ? `${orderedSetupComponentImage}/${moboComponent.componentId}/${moboComponent.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img
            crossOrigin="anonymous"
            src={
              ramComponent?.images && ramComponent.images[0]
                ? `${orderedSetupComponentImage}/${ramComponent.componentId}/${ramComponent.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img
            crossOrigin="anonymous"
            src={
              gpuComponent?.images && gpuComponent.images[0]
                ? `${orderedSetupComponentImage}/${gpuComponent.componentId}/${gpuComponent.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] flex justify-center items-center">
          <img
            crossOrigin="anonymous"
            src={
              psuComponent?.images && psuComponent.images[0]
                ? `${orderedSetupComponentImage}/${psuComponent.componentId}/${psuComponent.images[0]}`
                : noPhoto
            }
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[2px] p-2 bg-white/[0.09]">
        <div className="truncate">
          <span className="mr-2 font-semibold">CPU:</span>
          <span>{cpuComponent?.title || <span className="text-sm font-light ">brak</span>}</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">MBO:</span>
          <span>{moboComponent?.title || <span className="text-sm font-light ">brak</span>}</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">RAM:</span>
          <span>{ramComponent?.title || <span className="text-sm font-light ">brak</span>}</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">GPU:</span>
          <span>{gpuComponent?.title || <span className="text-sm font-light ">brak</span>}</span>
        </div>
        <div className="truncate">
          <span className="mr-2 font-semibold">PSU:</span>
          <span>{psuComponent?.title || <span className="text-sm font-light ">brak</span>}</span>
        </div>
      </div>

      <div className="flex flex-col gap-[2px] px-2 pb-2 bg-white/[0.09]">
        <div className="text-gray-300 truncate">
          <span className="mr-2 text-lg font-semibold">Cena:</span>
          <span className="mr-1 text-xl font-semibold">{(props.orderedSetup?.totalPrice / 100).toFixed(2)}</span>
          <span className="text-lg font-light">zł</span>
        </div>

        <div className="text-gray-400 truncate">
          <span className="mr-2 font-semibold">Zakupiono:</span>
          <span className="italic">{orderedSetupDate}</span>
        </div>
      </div>

      <div className="flex p-2 bg-white/[0.25]">
        <Link
          to={`/order/${props.orderedSetup?._id}`}
          className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
        >
          Szczegóły zamówienia
        </Link>
      </div>
    </div>
  )
}

export default OrderedSetup
