import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const Comment = props => {
  return (
    <div className="flex flex-col border rounded-xl border-white/[0.25] bg-white/[0.05] py-1 px-2 gap-[2px] max-w-lg">
      <Link to={'/'} className="flex items-center gap-1">
        <div className="text-xl">
          <FaUserCircle />
        </div>
        <div className="text-lg underline truncate">{'johndoe2137'}</div>
      </Link>

      <div className="ml-6 break-words font-extralight font-">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </div>
    </div>
  )
}

export default Comment
