import { useRef, useState, useEffect, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { successReset, errorReset, createComponent, updateComponent } from '../../features/componentsSlices/saveComponent'
import { saveComponentErrors } from '../../validations/componentsValidation'
import Loading from '../alerts/Loading'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const maxFilesAmount = 1

const EditComponentModal = props => {
  //variables
  const createComponentAbort = useRef()
  const updateComponentAbort = useRef()

  const { loading, success, successMessage, componentSaved, error, errorMessage } = useAppSelector(
    state => state.saveComponent
  )
  const dispatch = useAppDispatch()

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      componentTitle: '',
      componentURL: '',
      componentPrice: '',
      componentAmount: '',
    },
  })

  const [type, setType] = useState('')
  const [typeError, setTypeError] = useState(false)
  const [typeErrorMessage, setTypeErrorMessage] = useState('')
  const [moboCompat, setMoboCompat] = useState('')
  const [cpuCompat, setCpuCompat] = useState('')
  const [caseCompat, setCaseCompat] = useState('')
  const [ramCompat, setRamCompat] = useState('')
  const [fetchedFiles, setFetchedFiles] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: maxFilesAmount - fetchedFiles.length - selectedFiles.length,
    maxSize: 3 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      let preparedFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      setSelectedFiles(selectedFiles.concat(preparedFiles))
    },
  })

  //handlers
  const submitHandler = data => {
    if (!type) {
      setTypeErrorMessage('Pole wymagane.')
      setTypeError(true)
    } else if (type === 'case' && !moboCompat) {
      setTypeErrorMessage('Rozmiar obudowy wymagany.')
      setTypeError(true)
    } else if (type === 'cpu' && (!cpuCompat || !ramCompat)) {
      setTypeErrorMessage('Zgodność z socketem procesora i pamięcią RAM wymagana.')
      setTypeError(true)
    } else if (type === 'mobo' && (!cpuCompat || !caseCompat || !ramCompat)) {
      setTypeErrorMessage('Zgodność z socketem procesora, pamięcią RAM i rozmiar płyty gł. wymagany.')
      setTypeError(true)
    } else if (type === 'ram' && !ramCompat) {
      setTypeErrorMessage('Zgodność z pamięcią RAM wymagana.')
      setTypeError(true)
    } else {
      if (!props.editElement) {
        const createComponentPromise = dispatch(
          createComponent({
            title: data.componentTitle,
            type,
            moboCompat,
            cpuCompat,
            caseCompat,
            ramCompat,
            url: data.componentURL,
            price: parseInt(data.componentPrice * 100),
            amount: parseInt(data.componentAmount),
            selectedFiles,
          })
        )
        createComponentAbort.current = createComponentPromise.abort
      } else {
        const updateComponentPromise = dispatch(
          updateComponent({
            id: props.editElement._id,
            title: data.componentTitle,
            type,
            moboCompat,
            cpuCompat,
            caseCompat,
            ramCompat,
            url: data.componentURL,
            price: parseInt(data.componentPrice * 100),
            amount: parseInt(data.componentAmount),
            fetchedFiles,
            selectedFiles,
          })
        )
        updateComponentAbort.current = updateComponentPromise.abort
      }
    }
  }

  const closeHandler = () => {
    props.setIsOpen(false)
    setTimeout(() => {
      props.setEditElement(null)
      reset()
      setType('')
      setTypeError(false)
      setMoboCompat('')
      setCpuCompat('')
      setCaseCompat('')
      setRamCompat('')
      setFetchedFiles([])
      setSelectedFiles([])
      if (createComponentAbort.current || updateComponentAbort.current) {
        if (createComponentAbort.current) {
          createComponentAbort.current()
          createComponentAbort.current = undefined
        }
        if (updateComponentAbort.current) {
          updateComponentAbort.current()
          updateComponentAbort.current = undefined
        }
        dispatch(successReset())
        dispatch(errorReset())
      }
    }, 200)
  }

  const selectTypeHandler = value => {
    setType(value)
    setTypeError(false)
    setMoboCompat('')
    setCpuCompat('')
    setCaseCompat('')
    setRamCompat('')
  }
  const deleteImageHandler = number => {
    fetchedFiles.splice(number, 1)
    setFetchedFiles(() => [...fetchedFiles])
  }
  const deleteFileHandler = number => {
    selectedFiles.splice(number, 1)
    setSelectedFiles(() => [...selectedFiles])
  }
  const renderFilesHandler = () => {
    let thumbs = []
    for (let i = 0; i < maxFilesAmount; i++) {
      if (fetchedFiles[i]) {
        thumbs.push(
          <div className="mt-[1px] mb-[5px]" key={'image' + i} data-tip="Kliknij aby usunąć zdjęcie">
            <div className="aspect-[4/3] flex items-center justify-center w-[135px] p-0 border-2 border-gray-400/70 cursor-pointer rounded-xl overflow-hidden">
              <img
                crossOrigin="anonymous"
                src={`${import.meta.env.VITE_API_URL}/static/components/${props.editElement?._id}/${fetchedFiles[i]}`}
                alt=""
                onClick={() => deleteImageHandler(i)}
                className="w-auto h-auto max-w-full max-h-full"
              />
            </div>
          </div>
        )
      } else {
        for (let j = 0; j < maxFilesAmount - i; j++) {
          if (selectedFiles[j]) {
            thumbs.push(
              <div className="mt-[1px] mb-[5px]" key={'file' + j} data-tip="Kliknij aby usunąć zdjęcie">
                <div className="aspect-[4/3] flex items-center justify-center w-[135px] p-0 border-2 border-gray-400/70 cursor-pointer rounded-xl overflow-hidden">
                  <img
                    src={selectedFiles[j].preview}
                    alt="..."
                    onClick={() => deleteFileHandler(j)}
                    className="w-auto h-auto max-w-full max-h-full"
                  />
                </div>
              </div>
            )
          } else {
            thumbs.push(
              <div className="mt-[1px] mb-[5px]" key={'choose' + j}>
                <div
                  className="aspect-[4/3] flex items-center justify-center w-[135px] p-0 text-4xl text-gray-400/80 border-2 border-gray-400/80 border-dashed cursor-pointer rounded-xl overflow-hidden"
                  onClick={open}
                >
                  +
                </div>
              </div>
            )
          }
        }
        return <>{thumbs}</>
      }
    }
    return <>{thumbs}</>
  }

  //useEffects
  useEffect(() => {
    if (props.editElement && props.isOpen) {
      setValue('componentTitle', props.editElement.title)
      setType(props.editElement.type)
      setMoboCompat(props.editElement.moboCompat || '')
      setCpuCompat(props.editElement.cpuCompat || '')
      setCaseCompat(props.editElement.caseCompat || '')
      setRamCompat(props.editElement.ramCompat || '')
      setValue('componentURL', props.editElement.url)
      setValue('componentPrice', (props.editElement.price / 100).toFixed(2))
      setValue('componentAmount', props.editElement.amount)
      props.editElement.images?.length > 0 && setFetchedFiles(() => [...props.editElement.images])
      setSelectedFiles([])
    }
  }, [props, setValue])

  useEffect(() => {
    componentSaved && props.setEditElement(componentSaved)
  }, [componentSaved, props])

  useEffect(() => {
    return () => {
      if (createComponentAbort.current || updateComponentAbort.current) {
        if (createComponentAbort.current) {
          createComponentAbort.current()
          createComponentAbort.current = undefined
        }
        if (updateComponentAbort.current) {
          updateComponentAbort.current()
          updateComponentAbort.current = undefined
        }
        dispatch(successReset())
        dispatch(errorReset())
      }
    }
  }, [dispatch])

  return (
    <Transition as={Fragment} appear show={props.isOpen}>
      <Dialog as="div" onClose={closeHandler} className="relative z-20">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full px-4 py-6 md:pt-16 md:pb-32">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="grid items-center w-full max-w-md">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col w-full col-start-1 row-start-1 px-5 py-4 overflow-hidden bg-gray-200 rounded-lg shadow-md"
                >
                  {/*modal header*/}
                  <div className="text-xl font-semibold text-gray-800">
                    <div className="flex items-center justify-between w-full gap-4">
                      <h2 className="flex flex-col">
                        {props.editElement ? 'Edytuj komponent' : 'Dodaj komponent'}
                        <Loading
                          isOpen={loading}
                          customStyle="top-[3px] -right-[26px]"
                          customLoadingStyle="w-[22px] h-[22px] border-gray-800/20 border-t-gray-800"
                        />
                      </h2>

                      <button
                        type="button"
                        onClick={closeHandler}
                        className="text-2xl transition active:scale-95 hover:text-gray-800/70"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    {props.editElement && (
                      <span className="text-sm italic font-normal text-gray-700">{props.editElement._id}</span>
                    )}
                  </div>

                  {/*modal body*/}
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-gray-800">
                    <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />
                    <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />

                    <div>
                      <label htmlFor="componentTitle" className="text-sm">
                        Podaj tytuł komponentu*:
                      </label>
                      <input
                        {...register('componentTitle', saveComponentErrors.componentTitle)}
                        type="text"
                        id="componentTitle"
                        placeholder="Tytuł komponentu*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.componentTitle && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.componentTitle?.type === 'required' ? true : false}
                          message={saveComponentErrors.componentTitle.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.componentTitle?.type === 'maxLength' ? true : false}
                          message={saveComponentErrors.componentTitle.maxLength.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="componentType" className="text-sm mb-[2px]">
                        Wybierz typ komponentu*:
                      </label>
                      <select
                        id="componentType"
                        value={type}
                        onChange={e => selectTypeHandler(e.target.value)}
                        className={`border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent ${
                          type === '' && ' text-gray-400'
                        }`}
                      >
                        <option value="" disabled hidden>
                          Typ komponentu*
                        </option>
                        <option value="case" className="text-gray-800">
                          Obudowa
                        </option>
                        <option value="cpu" className="text-gray-800">
                          Procesor
                        </option>
                        <option value="mobo" className="text-gray-800">
                          Płyta główna
                        </option>
                        <option value="ram" className="text-gray-800">
                          Pamięć RAM
                        </option>
                        <option value="gpu" className="text-gray-800">
                          Karta graficzna
                        </option>
                        <option value="psu" className="text-gray-800">
                          Zasilacz
                        </option>
                        <option value="drive" className="text-gray-800">
                          Dysk
                        </option>
                      </select>

                      <div className={`relative ${typeError && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={typeError && typeErrorMessage !== '' ? true : false}
                          message={typeErrorMessage}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    {type === 'case' && (
                      <div className="flex flex-col">
                        <label htmlFor="componentMoboCompat" className="text-sm mb-[2px]">
                          Wybierz rozmiar obudowy*:
                        </label>
                        <select
                          id="componentMoboCompat"
                          value={moboCompat}
                          onChange={e => setMoboCompat(e.target.value)}
                          className={`border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent ${
                            moboCompat === '' && ' text-gray-400'
                          }`}
                        >
                          <option value="" disabled hidden>
                            Rozmiar obudowy*
                          </option>
                          <option value="atx" className="text-gray-800">
                            ATX
                          </option>
                          <option value="matx" className="text-gray-800">
                            mATX
                          </option>
                          <option value="itx" className="text-gray-800">
                            ITX
                          </option>
                        </select>
                      </div>
                    )}

                    {(type === 'cpu' || type === 'mobo') && (
                      <div className="flex flex-col">
                        <label htmlFor="componentCpuCompat" className="text-sm mb-[2px]">
                          Wybierz kompat. socketu*:
                        </label>
                        <select
                          id="componentCpuCompat"
                          value={cpuCompat}
                          onChange={e => setCpuCompat(e.target.value)}
                          className={`border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent ${
                            cpuCompat === '' && ' text-gray-400'
                          }`}
                        >
                          <option value="" disabled hidden>
                            Kompat. socketu*
                          </option>
                          <option value="am5" className="text-gray-800">
                            AM5
                          </option>
                          <option value="am4" className="text-gray-800">
                            AM4
                          </option>
                          <option value="am3+" className="text-gray-800">
                            AM3+
                          </option>
                          <option value="lga2066" className="text-gray-800">
                            LGA 2066
                          </option>
                          <option value="lga1700" className="text-gray-800">
                            LGA 1700
                          </option>
                          <option value="lga1200" className="text-gray-800">
                            LGA 1200
                          </option>
                          <option value="lga1156" className="text-gray-800">
                            LGA 1156
                          </option>
                          <option value="lga1155" className="text-gray-800">
                            LGA 1155
                          </option>
                          <option value="lga1151" className="text-gray-800">
                            LGA 1151
                          </option>
                          <option value="lga1150" className="text-gray-800">
                            LGA 1150
                          </option>
                        </select>
                      </div>
                    )}

                    {type === 'mobo' && (
                      <div className="flex flex-col">
                        <label htmlFor="componentCaseCompat" className="text-sm mb-[2px]">
                          Wybierz rozmiar płyty głównej*:
                        </label>
                        <select
                          id="componentCaseCompat"
                          value={caseCompat}
                          onChange={e => setCaseCompat(e.target.value)}
                          className={`border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent ${
                            caseCompat === '' && ' text-gray-400'
                          }`}
                        >
                          <option value="" disabled hidden>
                            Rozmiar płyty głównej*
                          </option>
                          <option value="itx" className="text-gray-800">
                            ITX
                          </option>
                          <option value="matx" className="text-gray-800">
                            mATX
                          </option>
                          <option value="atx" className="text-gray-800">
                            ATX
                          </option>
                        </select>
                      </div>
                    )}

                    {(type === 'cpu' || type === 'mobo' || type === 'ram') && (
                      <div className="flex flex-col">
                        <label htmlFor="componentRamCompat" className="text-sm mb-[2px]">
                          Wybierz kompat. pam. RAM*:
                        </label>
                        <select
                          id="componentRamCompat"
                          value={ramCompat}
                          onChange={e => setRamCompat(e.target.value)}
                          className={`border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent ${
                            ramCompat === '' && ' text-gray-400'
                          }`}
                        >
                          <option value="" disabled hidden>
                            Kompat. pam. RAM*
                          </option>
                          <option value="ddr5" className="text-gray-800">
                            DDR5
                          </option>
                          <option value="ddr4" className="text-gray-800">
                            DDR4
                          </option>
                          <option value="ddr3" className="text-gray-800">
                            DDR3
                          </option>
                          <option value="ddr2" className="text-gray-800">
                            DDR2
                          </option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label htmlFor="componentURL" className="text-sm">
                        Podaj URL komponentu*:
                      </label>
                      <input
                        {...register('componentURL', saveComponentErrors.componentURL)}
                        type="text"
                        id="componentURL"
                        placeholder="URL komponentu*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.componentURL && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.componentURL?.type === 'required' ? true : false}
                          message={saveComponentErrors.componentURL.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.componentURL?.type === 'maxLength' ? true : false}
                          message={saveComponentErrors.componentURL.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.componentURL?.type === 'pattern' ? true : false}
                          message={saveComponentErrors.componentURL.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="componentPrice" className="text-sm">
                        Podaj cenę komponentu*:
                      </label>
                      <input
                        {...register('componentPrice', saveComponentErrors.componentPrice)}
                        type="text"
                        id="componentPrice"
                        placeholder="0000.00 zł*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.componentPrice && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.componentPrice?.type === 'required' ? true : false}
                          message={saveComponentErrors.componentPrice.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.componentPrice?.type === 'maxLength' ? true : false}
                          message={saveComponentErrors.componentPrice.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.componentPrice?.type === 'pattern' ? true : false}
                          message={saveComponentErrors.componentPrice.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="componentAmount" className="text-sm">
                        Podaj dostępną ilość sztuk komponentu*:
                      </label>
                      <input
                        {...register('componentAmount', saveComponentErrors.componentAmount)}
                        type="text"
                        id="componentAmount"
                        placeholder="0 szt.*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.componentAmount && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.componentAmount?.type === 'required' ? true : false}
                          message={saveComponentErrors.componentAmount.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.componentAmount?.type === 'maxLength' ? true : false}
                          message={saveComponentErrors.componentAmount.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.componentAmount?.type === 'pattern' ? true : false}
                          message={saveComponentErrors.componentAmount.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="componentsImage" className="text-sm">
                        Wgraj zdjęcie poglądowe:
                      </label>
                      <div {...getRootProps()} className="flex flex-row flex-wrap">
                        <input id="componentsImage" name="image" {...getInputProps()} />
                        {renderFilesHandler()}
                      </div>

                      <p className="text-[11px] text-gray-600">Maksymalna wielkość zdjęcia (.png/.jpg/.jpeg) to 3 MB.</p>
                    </div>
                  </div>

                  {/*modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    {!success && (
                      <button
                        disabled={loading}
                        type="submit"
                        className="px-[14px] py-2 bg-green-800 rounded-xl transition active:scale-95 hover:bg-green-800/80"
                      >
                        Zapisz
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="px-[14px] py-2 bg-gray-700 rounded-xl transition active:scale-95 hover:bg-gray-700/90"
                    >
                      {!success ? 'Anuluj' : 'Zamknij'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditComponentModal
