import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaCashRegister } from 'react-icons/fa'
import Component from '../components/component/Component'
import Comment from '../components/setupScreen/Comment'

const SetupScreen = () => {
  //handlers
  const submitHandler = e => {
    e.preventDefault()
    console.log('submitHandler')
  }

  return (
    <main className="flex-1">
      <div className="content">
        <div className="flex flex-col mx-2 mt-4 mb-2 sm:flex-row sm:items-center sm:justify-center">
          <h2 className="text-xl font-bold sm:mr-2">ZESTAW O NUMERZE</h2>
          <h2 className="sm:mt-[1px]">
            <span>#</span>
            <span className="italic">{'507f1f77bcf86cd799439011'}</span>
          </h2>
        </div>

        <div className="flex flex-col mx-2 mb-2 sm:flex-row sm:items-center sm:justify-center">
          <div className="text-gray-400 truncate">
            <span className="mr-2 font-semibold">Autor:</span>
            <Link to={`/user/${'2137'}`} className="underline">
              {'John Doe'}
            </Link>
          </div>

          <div className="hidden mx-2 text-gray-400 sm:block">|</div>

          <div className="text-gray-400 truncate">
            <span className="mr-[6px] font-semibold">Dodano:</span>
            <span className="italic mx-[2px]">{'18.08.2022, 21:37'}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mx-2 mb-4 sm:justify-center">
          <span className="text-lg">{'0000'}</span>
          {true ? (
            <button type="button" onClick={null}>
              <FaHeart className="text-2xl text-red-500" />
            </button>
          ) : (
            <button type="button" onClick={null}>
              <FaRegHeart className="text-2xl text-red-500" />
            </button>
          )}
        </div>

        {/*<div className="flex flex-col items-center gap-4 mx-2 mb-4 md:mb-6">*/}
        <div className="grid gap-4 mx-2 mb-4 sm:grid-cols-2 lg:grid-cols-3">
          {true && <Component name="Obudowa" />}
          {true && <Component name="Procesor" />}
          {true && <Component name="Płyta główna" />}
          {true && <Component name="Pamięć RAM" />}
          {true && <Component name="Karta graficzna" />}
          {true && <Component name="Zasilacz" />}
          {true && <Component name="Dysk #1" />}
          {false && <Component name="Dysk #2" />}
          {false && <Component name="Dysk #3" />}
        </div>

        <div className="mx-2 mb-6">
          <h2 className="mb-[2px] text-xl font-bold">Opis:</h2>

          <div className="font-light">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
          </div>
        </div>

        <div className="mx-2 mb-6">
          <h2 className="mb-[2px] text-xl font-bold">Podsumowanie:</h2>

          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs">Cena</div>
              <div className="font-semibold">
                <span className="mr-1 text-lg">{'00000.00'}</span>
                <span className="font-light">zł</span>
              </div>
            </div>
            <div>
              <Link
                to={`/placeorder/${'21372137'}`}
                className="px-3 pt-[5px] pb-1 font-semibold text-pclab-600 bg-white rounded-xl transition active:scale-95 hover:bg-white/70"
              >
                Kup teraz <FaCashRegister className="inline-flex ml-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-2 mb-20 md:mb-6">
          <h2 className="mb-[5px] text-xl font-bold">Komentarze:</h2>

          <div className="flex flex-col gap-[10px] mb-4">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>

          <form
            onSubmit={submitHandler}
            className="relative border rounded-xl border-white/[0.25] bg-white/[0.05] py-1 px-2 max-w-xl"
          >
            <textarea
              rows="3"
              name="comment"
              placeholder="Dodaj komentarz..."
              className="w-full bg-transparent resize-none outline-0 mt-[2px]"
            />

            <div className="flex items-center justify-between mb-[3px] gap-2">
              <div className={`text-xs text-white/70 ${'visible'}`}>
                Musisz się{' '}
                <Link to="/login" className="underline">
                  zalogować
                </Link>
                , aby dodać komentarz.
              </div>

              <button
                type="submit"
                disabled={true}
                onClick={() => console.log('dupa')}
                className="px-[12px] py-[6px] bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80 disabled:scale-100 disabled:bg-pclab-500/70 disabled:text-white/70"
              >
                Dodaj
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default SetupScreen
