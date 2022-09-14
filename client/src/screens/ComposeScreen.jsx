import { useState } from 'react'
import { FaCubes, FaHandPointer, FaCaretLeft, FaCaretRight, FaSearch, FaCube } from 'react-icons/fa'
import { BsCpuFill } from 'react-icons/bs'
import Component from '../components/component/Component'
import Paginator from '../components/elements/Paginator'

const ComposeScreen = () => {
  const [step, setStep] = useState(1)

  const [id, setId] = useState('507f1f77bcf86cd799439011')
  const [caseComponent, setCaseComponent] = useState(null)
  const [cpuComponent, setCpuComponent] = useState(null)
  const [moboComponent, setMoboComponent] = useState(null)
  const [ramComponent, setRamComponent] = useState(null)
  const [gpuComponent, setGpuComponent] = useState(null)
  const [psuComponent, setPsuComponent] = useState(null)
  const [driveOneComponent, setDriveOneComponent] = useState(null)
  const [driveTwoComponent, setDriveTwoComponent] = useState(null)
  const [driveThreeComponent, setDriveThreeComponent] = useState(null)
  const [driveFourComponent, setDriveFourComponent] = useState(null)
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
          <h2 className="text-xl font-bold">{id ? 'EDYTUJ' : 'STWÓRZ'} ZESTAW</h2>
          {id && <h4 className="text-sm font-light">{id}</h4>}
        </div>

        <div className="flex flex-col items-center justify-center pb-[14px] mx-2 mb-[14px] border-b md:flex-row md:gap-5 gap-3">
          <div className="text-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <FaCubes />
              <div className="ms-2">Krok {step}/8</div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <FaHandPointer />
              <div className="ms-2">
                {step == '1'
                  ? 'Wybierz obudowę*:'
                  : step == '2'
                  ? 'Wybierz procesor'
                  : step == '3'
                  ? 'Wybierz płytę główną'
                  : step == '4'
                  ? 'Wybierz pamięć RAM'
                  : step == '5'
                  ? 'Wybierz kartę graficzną'
                  : step == '6'
                  ? 'Wybierz zasilacz'
                  : step == '7'
                  ? 'Wybierz dyski'
                  : step == '8'
                  ? 'Podsumowanie'
                  : ''}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              disabled={step === 1}
              onClick={() => (step > 1 ? setStep(step - 1) : null)}
              className="flex items-center gap-1 pl-[11px] pr-4 py-[6px] transition bg-pclab-400 border-pclab-400 rounded-xl active:scale-95 hover:bg-pclab-400/70 disabled:scale-100 disabled:bg-pclab-400/60 disabled:text-white/70"
            >
              <FaCaretLeft />
              Wstecz
            </button>
            <button
              disabled={false}
              onClick={() => (step < 8 ? setStep(step + 1) : console.log('Add/Save'))}
              className="flex items-center gap-1 py-1 pl-4 pr-[11px] transition border-2 rounded-xl active:scale-95 hover:bg-white/10 disabled:scale-100 disabled:bg-transparent disabled:border-white/60 disabled:text-white/70"
            >
              {true && step === 8 ? 'Dodaj' : false ? 'Zapisz' : 'Dalej'}
              <FaCaretRight />
            </button>
          </div>
        </div>

        <div className="grid mx-2 mb-14 md:mb-6 md:grid-cols-5 xl:grid-cols-4 md:gap-6">
          {step !== 8 && (
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
                  {step == '1'
                    ? 'Wybrana obudowa:'
                    : step == '2'
                    ? 'Wybrany procesor:'
                    : step == '3'
                    ? 'Wybrana płyta główna:'
                    : step == '4'
                    ? 'Wybrana pamięć RAM:'
                    : step == '5'
                    ? 'Wybrana karta graficzna:'
                    : step == '6'
                    ? 'Wybrany zasilacz:'
                    : step == '7'
                    ? 'Wybrane dyski:'
                    : ''}
                </label>

                {<Component name="Obudowa" composeButton="delete" buttonClickHandler={() => console.log('delete')} /> /**/}
                {/*<div className="flex items-center justify-center gap-[6px] mt-5 mb-2">
                    <span>Brak</span>
                    <FaCube />
                  </div>/**/}
              </div>
            </div>
          )}

          <div className={`flex flex-col ${step !== 8 ? 'md:col-span-3' : 'md:col-span-5 xl:col-span-4'}`}>
            <div className="flex flex-col gap-1 mb-2 md:items-center md:flex-row md:justify-between">
              <h3 className="flex items-center gap-[5px] text-lg font-semibold md:mb-0">
                <BsCpuFill />
                <span>
                  {step == '1'
                    ? 'Dostępne obudowy:'
                    : step == '2'
                    ? 'Dostępne procesory'
                    : step == '3'
                    ? 'Dostępne płyty główne'
                    : step == '4'
                    ? 'Dostępne pamięci RAM'
                    : step == '5'
                    ? 'Dostępne karty graficzne'
                    : step == '6'
                    ? 'Dostępne zasilacze'
                    : step == '7'
                    ? 'Dostępne dyski'
                    : step == '8'
                    ? 'Wybrane komponenty'
                    : ''}
                </span>
              </h3>

              <div className="flex items-baseline gap-[6px]">
                <div className="text-sm">Wartość zestawu:</div>
                <div className="text-lg font-semibold">
                  <span>{'00000.00'}</span>
                  <span className="ml-1 text-base font-light">zł</span>
                </div>
              </div>
            </div>

            {step !== 8 ? (
              <div className="grid gap-4 mb-4 lg:grid-cols-2">
                <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
                <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
                <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
                <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
                <Component name="Obudowa" composeButton="select" buttonClickHandler={() => console.log('select')} />
              </div>
            ) : (
              <div className="grid gap-4 mb-6 md:mb-0 md:grid-cols-2 lg:grid-cols-3">
                <Component name="Obudowa" />
                <Component name="Procesor" />
                <Component name="Płyta główna" />
                <Component name="Pamięć RAM" />
                <Component name="Karta graficzna" />
                <Component name="Zasilacz" />
                <Component name="Dysk #1" />
                <Component name="Dysk #2" />
                <Component name="Dysk #3" />
              </div>
            )}
            {/*<div className="flex items-center justify-center gap-[6px] mt-5 mb-2">
                <span>Brak</span>
                <FaCube />
              </div>/**/}

            {step !== 8 && (
              <div className="flex justify-center">
                <Paginator />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ComposeScreen
