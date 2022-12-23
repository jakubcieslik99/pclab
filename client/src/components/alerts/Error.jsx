import { Transition } from '@headlessui/react'

const Error = props => {
  return (
    <Transition
      className={`px-3 pt-1 pb-[3px] text-sm font-semibold text-red-700 bg-red-300 border-2 border-red-600 rounded-xl break-words leading-[1.12rem] ${
        props.customStyle ? props.customStyle : ''
      }`}
      show={props.isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {props.message}
    </Transition>
  )
}

export default Error
