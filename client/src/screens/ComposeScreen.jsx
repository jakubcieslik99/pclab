import { useRef, useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FaCube, FaCubes, FaHandPointer, FaCaretLeft, FaCaretRight, FaSearch } from 'react-icons/fa'
import { BsCpuFill } from 'react-icons/bs'
import { useAppSelector, useAppDispatch } from '../features/store'
import { errorReset, getSetupReset, getSetup } from '../features/setupsSlices/getSetup'
import { errorReset as errorReset2, getComponentsReset, getComponents } from '../features/setupsSlices/getComponents'
import { errorReset as errorReset3, idSavedReset, createSetup, updateSetup } from '../features/setupsSlices/saveSetup'
import Component from '../components/component/Component'
import Paginator from '../components/universal/Paginator'
import Loading from '../components/alerts/Loading'
import Error from '../components/alerts/Error'

let URL = {}

const ComposeScreen = () => {
  //variables
  const getSetupAbort = useRef()
  const getComponentsAbort = useRef()

  const { loading, setup, error, errorMessage } = useAppSelector(state => state.getSetup)
  const {
    loading: loading2,
    count,
    components,
    error: error2,
    errorMessage: errorMessage2,
  } = useAppSelector(state => state.getComponents)
  const { loading: loading3, idSaved, error: error3, errorMessage: errorMessage3 } = useAppSelector(state => state.saveSetup)
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const id = useRef(searchParams.get('id') || '')
  const [searching, setSearching] = useState(searchParams.get('searching') || '')
  const [page, setPage] = useState(searchParams.get('page') || 1)

  const [step, setStep] = useState(1)
  const [submitLock, setSubmitLock] = useState(true)

  const [caseComponent, setCaseComponent] = useState(null)
  const [cpuComponent, setCpuComponent] = useState(null)
  const [moboComponent, setMoboComponent] = useState(null)
  const [ramComponent, setRamComponent] = useState(null)
  const [gpuComponent, setGpuComponent] = useState(null)
  const [psuComponent, setPsuComponent] = useState(null)
  const [driveOneComponent, setDriveOneComponent] = useState(null)
  const [driveTwoComponent, setDriveTwoComponent] = useState(null)
  const [driveThreeComponent, setDriveThreeComponent] = useState(null)
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  //handlers
  const filterURL = (searchingFilter, pageFilter) => {
    if (id.current) URL.id = id.current
    else if (URL.id) delete URL.id

    if (searchingFilter !== '') URL.searching = searchingFilter
    else if (URL.searching) delete URL.searching

    if (pageFilter !== 1) URL.page = pageFilter
    else if (URL.page) delete URL.page

    setSearchParams({ ...URL })
  }

  const searchingHandler = e => {
    e.preventDefault()
    setPage(1)
    filterURL(searching, 1)
  }
  const pageHandler = page => {
    setPage(page)
    filterURL(searching, page)
  }

  const setStepHandler = nextStep => {
    setSearching('')
    setPage(1)
    filterURL('', 1)

    setStep(step + nextStep)
    if (step + nextStep === 8) {
      setTimeout(() => {
        setSubmitLock(false)
      }, 200)
    } else if (step + nextStep === 7 || submitLock) setSubmitLock(true)
  }

  const setComponentHandler = component => {
    switch (step) {
      case 1:
        component.type === 'case' && setCaseComponent(component)
        break
      case 2:
        component.type === 'cpu' && setCpuComponent(component)
        break
      case 3:
        component.type === 'mobo' && setMoboComponent(component)
        break
      case 4:
        component.type === 'ram' && setRamComponent(component)
        break
      case 5:
        component.type === 'gpu' && setGpuComponent(component)
        break
      case 6:
        component.type === 'psu' && setPsuComponent(component)
        break
      case 7:
        if (component.type === 'drive') {
          if (!driveOneComponent) setDriveOneComponent(component)
          else if (!driveTwoComponent) setDriveTwoComponent(component)
          else if (!driveThreeComponent) setDriveThreeComponent(component)
        }
        break
      default:
    }
  }

  const calculatePriceHandler = () => {
    let price = 0
    if (caseComponent) price += caseComponent.price
    if (cpuComponent) price += cpuComponent.price
    if (moboComponent) price += moboComponent.price
    if (ramComponent) price += ramComponent.price
    if (gpuComponent) price += gpuComponent.price
    if (psuComponent) price += psuComponent.price
    if (driveOneComponent) price += driveOneComponent.price
    if (driveTwoComponent) price += driveTwoComponent.price
    if (driveThreeComponent) price += driveThreeComponent.price
    return (price / 100).toFixed(2)
  }

  const submitHandler = e => {
    e.preventDefault()

    if (id.current) {
      dispatch(
        updateSetup({
          id: id.current,
          case: caseComponent?._id || null,
          cpu: cpuComponent?._id || null,
          mobo: moboComponent?._id || null,
          ram: ramComponent?._id || null,
          gpu: gpuComponent?._id || null,
          psu: psuComponent?._id || null,
          driveOne: driveOneComponent?._id || null,
          driveTwo: driveTwoComponent?._id || null,
          driveThree: driveThreeComponent?._id || null,
          description,
        })
      )
    } else {
      dispatch(
        createSetup({
          case: caseComponent?._id || null,
          cpu: cpuComponent?._id || null,
          mobo: moboComponent?._id || null,
          ram: ramComponent?._id || null,
          gpu: gpuComponent?._id || null,
          psu: psuComponent?._id || null,
          driveOne: driveOneComponent?._id || null,
          driveTwo: driveTwoComponent?._id || null,
          driveThree: driveThreeComponent?._id || null,
          description,
        })
      )
    }
  }

  //useEffects
  useEffect(() => {
    if (id.current) {
      const getSetupPromise = dispatch(getSetup({ id: id.current }))
      getSetupAbort.current = getSetupPromise.abort
    }

    return () => {
      if (getSetupAbort.current) {
        getSetupAbort.current()
        dispatch(errorReset())
        dispatch(getSetupReset())
      }
    }
  }, [dispatch])

  useEffect(() => {
    if (setup) {
      setup.case && setCaseComponent(setup.case)
      setup.cpu && setCpuComponent(setup.cpu)
      setup.mobo && setMoboComponent(setup.mobo)
      setup.ram && setRamComponent(setup.ram)
      setup.gpu && setGpuComponent(setup.gpu)
      setup.psu && setPsuComponent(setup.psu)
      setup.driveOne && setDriveOneComponent(setup.driveOne)
      setup.driveTwo && setDriveTwoComponent(setup.driveTwo)
      setup.driveThree && setDriveThreeComponent(setup.driveThree)
      setup.description && setDescription(setup.description)
    } else {
      setCaseComponent(null)
      setCpuComponent(null)
      setMoboComponent(null)
      setRamComponent(null)
      setGpuComponent(null)
      setPsuComponent(null)
      setDriveOneComponent(null)
      setDriveTwoComponent(null)
      setDriveThreeComponent(null)
      setDescription('')
    }
  }, [setup])

  useEffect(() => {
    let getComponentsPromise = null
    switch (step) {
      case 1:
        getComponentsPromise = dispatch(
          getComponents({
            searching: searchParams.get('searching') || '',
            type: 'case',
            page: searchParams.get('page') || '',
          })
        )
        break
      case 2:
        getComponentsPromise = dispatch(
          getComponents({
            searching: searchParams.get('searching') || '',
            type: 'cpu',
            page: searchParams.get('page') || '',
          })
        )
        break
      case 3:
        getComponentsPromise = dispatch(
          getComponents({
            searching: searchParams.get('searching') || '',
            type: 'mobo',
            page: searchParams.get('page') || '',
          })
        )
        break
      case 4:
        getComponentsPromise = dispatch(
          getComponents({
            searching: searchParams.get('searching') || '',
            type: 'ram',
            page: searchParams.get('page') || '',
          })
        )
        break
      case 5:
        getComponentsPromise = dispatch(
          getComponents({
            searching: searchParams.get('searching') || '',
            type: 'gpu',
            page: searchParams.get('page') || '',
          })
        )
        break
      case 6:
        getComponentsPromise = dispatch(
          getComponents({
            searching: searchParams.get('searching') || '',
            type: 'psu',
            page: searchParams.get('page') || '',
          })
        )
        break
      case 7:
        getComponentsPromise = dispatch(
          getComponents({
            searching: searchParams.get('searching') || '',
            type: 'drive',
            page: searchParams.get('page') || '',
          })
        )
        break
      default:
    }
    getComponentsAbort.current = getComponentsPromise?.abort

    return () => {
      if (getComponentsAbort.current) {
        getComponentsAbort.current()
        dispatch(errorReset2())
        dispatch(getComponentsReset())
      }
    }
  }, [step, searchParams, dispatch])

  useEffect(() => {
    idSaved && navigate(`/setup/${idSaved}`, { replace: true })
    return () => {
      error3 && dispatch(errorReset3())
      idSaved && dispatch(idSavedReset())
    }
  }, [error3, idSaved, navigate, dispatch])

  return (
    <main className="flex-1">
      <div className="content">
        <div className="mx-2 my-4">
          <h2 className="flex items-center text-xl font-bold">
            {id.current ? 'EDYTUJ' : 'STWÓRZ'} ZESTAW
            <div className="relative w-[24px] h-[24px] ml-2">
              <Loading
                isOpen={loading || loading3}
                customStyle="-top-[1px] left-0"
                customLoadingStyle="w-[24px] h-[24px] border-white/20 border-t-white"
              />
            </div>
          </h2>
          {id.current && <h4 className="text-sm font-light">{id.current}</h4>}
        </div>

        <div className="flex flex-col items-center w-full">
          <Error
            isOpen={error && errorMessage !== '' ? true : false}
            message={errorMessage}
            customStyle="w-full max-w-[430px] mb-4 mx-2"
          />
          <Error
            isOpen={error3 && errorMessage3 !== '' ? true : false}
            message={errorMessage3}
            customStyle="w-full max-w-[430px] mb-4 mx-2"
          />
        </div>

        <form onSubmit={submitHandler} className="flex flex-col pb-4 mx-2 mb-[14px] border-b gap-5">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-5">
            <div className="text-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FaCubes />
                <div className="ms-2">Krok {step}/8</div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <FaHandPointer />
                <div className="ms-2">
                  {step === 1
                    ? 'Wybierz obudowę*:'
                    : step === 2
                    ? 'Wybierz procesor'
                    : step === 3
                    ? 'Wybierz płytę główną'
                    : step === 4
                    ? 'Wybierz pamięć RAM'
                    : step === 5
                    ? 'Wybierz kartę graficzną'
                    : step === 6
                    ? 'Wybierz zasilacz'
                    : step === 7
                    ? 'Wybierz dyski'
                    : step === 8
                    ? 'Podsumowanie'
                    : ''}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                disabled={step === 1}
                type="button"
                onClick={() => (step > 1 ? setStepHandler(-1) : null)}
                className="flex items-center gap-1 pl-[11px] pr-4 py-[6px] transition bg-pclab-400 border-pclab-400 rounded-xl active:scale-95 hover:bg-pclab-400/70 disabled:scale-100 disabled:bg-pclab-400/60 disabled:text-white/70"
              >
                <FaCaretLeft />
                Wstecz
              </button>
              {step < 8 ? (
                <button
                  disabled={!caseComponent}
                  type="button"
                  onClick={() => (step < 8 && caseComponent ? setStepHandler(1) : null)}
                  className="flex items-center gap-1 py-1 pl-4 pr-[11px] transition border-2 rounded-xl active:scale-95 hover:bg-white/10 disabled:scale-100 disabled:bg-transparent disabled:border-white/60 disabled:text-white/70"
                >
                  Dalej
                  <FaCaretRight />
                </button>
              ) : (
                <button
                  disabled={submitLock}
                  type="submit"
                  className="flex items-center gap-1 py-1 pl-4 pr-[11px] transition border-2 rounded-xl active:scale-95 hover:bg-white/10 disabled:scale-100 disabled:bg-transparent disabled:border-white/60 disabled:text-white/70"
                >
                  {id.current ? 'Zapisz' : 'Dodaj'}
                  <FaCaretRight />
                </button>
              )}
            </div>
          </div>

          {step === 8 && (
            <div className="w-full max-w-xl self-center px-2 py-1 border rounded-xl border-white/[0.25] bg-white/[0.05]">
              <textarea
                rows="3"
                id="setupDescription"
                name="description"
                placeholder="Dodaj opis zestawu..."
                className="w-full bg-transparent resize-none outline-0 mt-[2px]"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          )}
        </form>

        <div className="grid mx-2 mb-14 md:mb-6 md:grid-cols-5 xl:grid-cols-4 md:gap-6">
          {step !== 8 && (
            <div className="flex flex-col-reverse justify-end col-span-1 pb-5 mb-4 border-b md:flex-col md:justify-start md:col-span-2 xl:col-span-1 md:pb-0 md:mb-0 md:border-none">
              <form onSubmit={searchingHandler} className="md:mb-4">
                <label htmlFor="searching" className="text-xs text-gray-400">
                  Wyszukiwanie
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="searching"
                    placeholder="Szukaj"
                    className="w-full py-1 pl-3 truncate bg-transparent border-2 pr-9 rounded-xl focus:outline-none"
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

              <div className="mb-4 md:mb-0">
                <label className="text-xs text-gray-400">
                  {step === 1
                    ? 'Wybrana obudowa:'
                    : step === 2
                    ? 'Wybrany procesor:'
                    : step === 3
                    ? 'Wybrana płyta główna:'
                    : step === 4
                    ? 'Wybrana pamięć RAM:'
                    : step === 5
                    ? 'Wybrana karta graficzna:'
                    : step === 6
                    ? 'Wybrany zasilacz:'
                    : step === 7
                    ? 'Wybrane dyski:'
                    : ''}
                </label>

                {step === 1 && caseComponent ? (
                  <Component
                    component={caseComponent}
                    composeButton="delete"
                    buttonClickHandler={() => setCaseComponent(null)}
                  />
                ) : step === 2 && cpuComponent ? (
                  <Component
                    component={cpuComponent}
                    composeButton="delete"
                    buttonClickHandler={() => setCpuComponent(null)}
                  />
                ) : step === 3 && moboComponent ? (
                  <Component
                    component={moboComponent}
                    composeButton="delete"
                    buttonClickHandler={() => setMoboComponent(null)}
                  />
                ) : step === 4 && ramComponent ? (
                  <Component
                    component={ramComponent}
                    composeButton="delete"
                    buttonClickHandler={() => setRamComponent(null)}
                  />
                ) : step === 5 && gpuComponent ? (
                  <Component
                    component={gpuComponent}
                    composeButton="delete"
                    buttonClickHandler={() => setGpuComponent(null)}
                  />
                ) : step === 6 && psuComponent ? (
                  <Component
                    component={psuComponent}
                    composeButton="delete"
                    buttonClickHandler={() => setPsuComponent(null)}
                  />
                ) : step === 7 && (driveOneComponent || driveTwoComponent || driveThreeComponent) ? (
                  <>
                    {driveOneComponent && (
                      <Component
                        component={driveOneComponent}
                        composeButton="delete"
                        buttonClickHandler={() => setDriveOneComponent(null)}
                      />
                    )}
                    {driveTwoComponent && (
                      <Component
                        component={driveTwoComponent}
                        composeButton="delete"
                        buttonClickHandler={() => setDriveTwoComponent(null)}
                      />
                    )}
                    {driveThreeComponent && (
                      <Component
                        component={driveThreeComponent}
                        composeButton="delete"
                        buttonClickHandler={() => setDriveThreeComponent(null)}
                      />
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-[6px] mt-5 mb-2">
                    <span>Brak</span>
                    <FaCube />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={`flex flex-col ${step !== 8 ? 'md:col-span-3' : 'md:col-span-5 xl:col-span-4'}`}>
            <div className="flex flex-col gap-1 mb-2 md:items-center md:flex-row md:justify-between">
              <h3 className="flex items-center gap-[5px] text-[17px] font-semibold md:mb-0">
                <BsCpuFill />
                <span className="mt-[1px]">
                  {step === 1
                    ? 'Obudowy:'
                    : step === 2
                    ? 'Procesory:'
                    : step === 3
                    ? 'Płyty główne:'
                    : step === 4
                    ? 'Pamięci RAM:'
                    : step === 5
                    ? 'Karty graficzne:'
                    : step === 6
                    ? 'Zasilacze:'
                    : step === 7
                    ? 'Dyski:'
                    : step === 8
                    ? 'Wybrane komponenty:'
                    : ''}
                </span>

                <div className="relative w-[24px] h-[24px] ml-1">
                  <Loading
                    isOpen={loading2}
                    customStyle="top-0 left-0"
                    customLoadingStyle="w-[24px] h-[24px] border-white/20 border-t-white"
                  />
                </div>
              </h3>

              <div className="flex items-baseline gap-[6px]">
                <div className="text-sm">Wartość zestawu:</div>
                <div className="text-lg font-semibold">
                  <span>{calculatePriceHandler()}</span>
                  <span className="ml-1 text-base font-light">zł</span>
                </div>
              </div>
            </div>

            <Error
              isOpen={error2 && errorMessage2 !== '' ? true : false}
              message={errorMessage2}
              customStyle={`mb-[14px] ${step !== 8 ? 'w-full max-w-[918px]' : 'w-full max-w-[430px] mx-auto'}`}
            />

            {step < 8 && components.length ? (
              <>
                <div className="grid gap-4 mb-4 lg:grid-cols-2">
                  {components.map(component => (
                    <Component
                      key={component._id}
                      component={component}
                      composeButton="select"
                      buttonClickHandler={() => setComponentHandler(component)}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Paginator count={count} limit={10} page={page} pageHandler={pageHandler} />
                </div>
              </>
            ) : step === 8 ? (
              <div className="grid gap-4 mb-6 md:mb-0 md:grid-cols-2 lg:grid-cols-3">
                {caseComponent && <Component component={caseComponent} />}
                {cpuComponent && <Component component={cpuComponent} />}
                {moboComponent && <Component component={moboComponent} />}
                {ramComponent && <Component component={ramComponent} />}
                {gpuComponent && <Component component={gpuComponent} />}
                {psuComponent && <Component component={psuComponent} />}
                {driveOneComponent && <Component component={driveOneComponent} />}
                {driveTwoComponent && <Component component={driveTwoComponent} />}
                {driveThreeComponent && <Component component={driveThreeComponent} />}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-[6px] mt-5 mb-2">
                <span>Brak</span>
                <FaCube />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ComposeScreen
