import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const Comment = props => {
  return (
    <div className="flex flex-col border rounded-xl border-white/[0.25] bg-white/[0.05] py-1 px-2 gap-[2px] max-w-lg">
      <Link to={props.comment.addedBy ? `/profile/${props.comment.addedBy._id}` : '#'} className="flex items-center gap-1">
        <div className="text-xl">
          <FaUserCircle />
        </div>
        <div className="text-lg underline truncate">{props.comment.addedBy?.nick || 'Konto usunięte'}</div>
      </Link>

      <div className="ml-6 break-words font-extralight font-">{props.comment.comment}</div>
    </div>
  )
}

export default Comment
