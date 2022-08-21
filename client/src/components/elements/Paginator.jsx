import { useNavigate } from 'react-router-dom'
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'

const Paginator = () => {
  const parameters = { page: 1, count: 500 }

  const navigate = useNavigate()

  const listPagesHandler = () => {
    const limit = 9
    const pages = Math.ceil(parameters.count / limit)

    let elements = []
    if (pages > 5) {
      parameters.page > 3 &&
        elements.push(
          <button
            key={-2}
            onClick={() => navigate(`/store`)}
            type="button"
            className="flex items-center justify-center w-6 h-full transition active:scale-90"
          >
            <FaAngleDoubleLeft />
          </button>
        )
      parameters.page > 1 &&
        elements.push(
          <button
            key={-1}
            onClick={() => navigate(`/store`)}
            type="button"
            className="flex items-center justify-center w-6 h-full transition active:scale-90"
          >
            <FaAngleLeft />
          </button>
        )
      if (parameters.page < 3) {
        for (let i = 1; i <= 5; i++) {
          elements.push(
            <button
              disabled={i === parameters.page ? true : false}
              key={i}
              onClick={() => navigate(`/store`)}
              type="button"
              className={i === parameters.page ? 'w-6 underline' : 'w-6 transition active:scale-90'}
            >
              {i}
            </button>
          )
        }
      } else if (parameters.page >= 3 && parameters.page <= pages - 2) {
        for (let i = parameters.page - 2; i <= parameters.page + 2; i++) {
          elements.push(
            <button
              disabled={i === parameters.page ? true : false}
              key={i}
              onClick={() => navigate(`/store`)}
              type="button"
              className={i === parameters.page ? 'w-6 underline' : 'w-6 transition active:scale-90'}
            >
              {i}
            </button>
          )
        }
      } else {
        for (let i = pages - 4; i <= pages; i++) {
          elements.push(
            <button
              disabled={i === parameters.page ? true : false}
              key={i}
              onClick={() => navigate(`/store`)}
              type="button"
              className={i === parameters.page ? 'w-6 underline' : 'w-6 transition active:scale-90'}
            >
              {i}
            </button>
          )
        }
      }
      parameters.page < pages &&
        elements.push(
          <button
            key={-3}
            onClick={() => navigate(`/store`)}
            type="button"
            className="flex items-center justify-center w-6 h-full transition active:scale-90"
          >
            <FaAngleRight />
          </button>
        )
      parameters.page < pages - 2 &&
        elements.push(
          <button
            key={-4}
            onClick={() => navigate(`/store`)}
            type="button"
            className="flex items-center justify-center w-6 h-full transition active:scale-90"
          >
            <FaAngleDoubleRight />
          </button>
        )
    } else {
      for (let i = 1; i <= pages; i++) {
        elements.push(
          <button
            disabled={i === parameters.page ? true : false}
            key={i}
            onClick={() => navigate(`/store`)}
            type="button"
            className={i === parameters.page ? 'w-6 underline' : 'w-6 transition active:scale-90'}
          >
            {i}
          </button>
        )
      }
    }

    return elements
  }

  return <div className="flex items-center justify-center px-2 text-lg border-2 rounded-xl">{listPagesHandler()}</div>
}

export default Paginator
