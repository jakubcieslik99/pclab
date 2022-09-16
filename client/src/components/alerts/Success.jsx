import { Transition } from '@headlessui/react'

const Success = props => {
  return (
    <Transition
      className={`px-3 py-[3px] text-sm font-semibold text-green-600 bg-green-300 border-2 border-green-500 rounded-xl break-all leading-[1.12rem] ${
        props.customStyle ? props.customStyle : ''
      }`}
      show={props.isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {props.message}
    </Transition>
  )
}

export default Success
