const Error = props => {
  return (
    <div
      className={`px-3 py-[3px] text-sm font-semibold text-red-600 bg-red-300 border-2 border-red-500 rounded-xl break-all leading-[1.12rem] ${
        props.customStyle ? props.customStyle : ''
      }`}
    >
      {props.message}
    </div>
  )
}

export default Error
