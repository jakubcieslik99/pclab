import { useState } from 'react'
import { FaCubes, FaHandPointer, FaSearch, FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { BsCpuFill } from 'react-icons/bs'
import Component from '../components/component/Component'
import Paginator from '../components/elements/Paginator'

const ComposeScreen = () => {
  const [searching, setSearching] = useState('')

  const searchingHandler = e => {
    e.preventDefault()
    console.log('searching')
    console.log(searching)
  }

  return (
    <main className="flex-1">
      <div className="content">
        <div className="mx-2 my-4">
          <h2 className="text-xl font-bold">{true ? 'STWÓRZ' : 'EDYTUJ'} ZESTAW</h2>
        </div>

        <div className="flex flex-col items-center justify-center pb-[14px] mx-2 mb-[14px] border-b md:flex-row md:gap-5 gap-3">
          <div className="text-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <FaCubes />
              <div className="ms-2">Krok {'1'}/8</div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <FaHandPointer />
              <div className="ms-2">Wybierz {'obudowę:'}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              disabled={true}
              onClick={null}
              className="flex items-center gap-1 pl-[11px] pr-4 py-[6px] transition bg-pclab-400 border-pclab-400 rounded-xl active:scale-95 hover:bg-pclab-400/70 disabled:scale-100 disabled:bg-pclab-400/60 disabled:text-white/70"
            >
              <FaCaretLeft />
              Wstecz
            </button>
            <button
              disabled={false}
              onClick={null}
              className="flex items-center gap-1 py-1 pl-4 pr-[11px] transition border-2 rounded-xl active:scale-95 hover:bg-white/10 disabled:scale-100 disabled:bg-transparent disabled:border-white/60 disabled:text-white/70"
            >
              Dalej
              <FaCaretRight />
            </button>
          </div>
        </div>

        <div className="grid mx-2 mb-14 md:mb-6 md:grid-cols-5 xl:grid-cols-4 md:gap-6">
          <div className="col-span-1 pb-5 mb-4 border-b md:col-span-2 xl:col-span-1 md:pb-0 md:mb-0 md:border-none">
            <form onSubmit={searchingHandler} className="mb-4">
              <label htmlFor="searching" className="text-xs text-gray-400">
                Wyszukiwanie
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="searching"
                  placeholder="Szukaj"
                  className="w-full py-1 pl-3 truncate bg-transparent border-2 pr-9 rounded-xl"
                  value={searching}
                  onChange={e => setSearching(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 flex items-center justify-center flex-none transition w-9 h-9 active:scale-90"
                >
                  <FaSearch />
                </button>
              </div>
            </form>

            <div className="">
              <label className="text-xs text-gray-400">
                Wybran{'a'} {'obudowa'}
              </label>

              {/*<div className="flex items-center justify-center gap-[6px] mt-5 mb-2">
                <span>Brak</span>
                <FaCube />
              </div>/**/}
              {<Component name="Obudowa" composeButton="delete" buttonClickHandler={() => console.log('delete')} /> /**/}
            </div>
          </div>

          <div className="flex flex-col md:col-span-3 xl:col-span-3">
            <h3 className="flex items-center gap-[5px] mb-2 text-lg font-semibold">
              <BsCpuFill />
              <span>Dostępne {'obudowy'}:</span>
            </h3>

            <div className="grid gap-4 mb-4 lg:grid-cols-2">
              <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
              <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
              <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
              <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
              <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
            </div>

            <div className="flex justify-center">
              <Paginator />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ComposeScreen
