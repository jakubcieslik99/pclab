import { Transition } from '@headlessui/react'

const Loading = props => {
  return (
    <Transition
      className={`absolute ${props.customStyle ? props.customStyle : ''}`}
      show={props.isOpen}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`loading ${
          props.customLoadingStyle ? props.customLoadingStyle : 'w-[30px] h-[30px] border-white/20 border-t-white'
        }`}
      />
    </Transition>
  )
}

export default Loading
