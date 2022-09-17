import { FaLaptopMedical } from 'react-icons/fa'

const HeaderButton = ({ position }) => {
  return (
    <button
      type="button"
      className={`z-10 flex items-center justify-center w-12 h-12 p-1 drop-shadow-lg border border-white text-white rounded-full bottom-4 right-4 md:hidden transition active:scale-95 ${position}`}
    >
      <div className="flex items-center justify-center w-full h-full text-xl rounded-full bg-pclab-500">
        <FaLaptopMedical />
      </div>
    </button>
  )
}

export default HeaderButton
