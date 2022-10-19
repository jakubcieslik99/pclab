import { useState, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { useDropzone } from 'react-dropzone'
import { FaTimes } from 'react-icons/fa'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const maxFilesAmount = 1

const EditComponentModal = props => {
  //variables
  const [fetchedFiles, setFetchedFiles] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: maxFilesAmount - fetchedFiles.length - selectedFiles.length,
    maxSize: 5 * 1024 * 1024,
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
  const closeHandler = () => {
    props.setIsOpen(false)
    setTimeout(() => {
      props.setEditElement(null)
    }, 250)
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
                src={`${process.env.REACT_APP_API_URL}/static/${fetchedFiles[i]}`}
                alt="..."
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
                <form className="flex flex-col w-full col-start-1 row-start-1 px-5 py-4 overflow-hidden bg-gray-200 rounded-lg shadow-md">
                  {/*modal header*/}
                  <div className="flex items-center justify-between w-full gap-4 text-xl font-semibold text-gray-800">
                    <h2 className="flex flex-col">
                      <span>{props.editElement ? 'Edytuj komponent' : 'Dodaj komponent'}</span>
                      {props.editElement && (
                        <span className="text-sm italic font-normal text-gray-700">{'507f1f77bcf86cd799439011'}</span>
                      )}
                    </h2>

                    <button
                      type="button"
                      onClick={closeHandler}
                      className="text-2xl transition active:scale-95 hover:text-gray-800/70"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/*modal body*/}
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-gray-800">
                    <Error isOpen={true} message={'Test error'} />
                    <Success isOpen={true} message={'Test success'} />

                    <div>
                      <label htmlFor="componentTitle" className="text-sm">
                        Podaj tytuł komponentu*:
                      </label>
                      <input
                        type="text"
                        id="componentTitle"
                        name="title"
                        placeholder="Tytuł komponentu*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={false} message={'Test error'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="componentURL" className="text-sm">
                        Podaj URL komponentu*:
                      </label>
                      <input
                        type="text"
                        id="componentURL"
                        name="url"
                        placeholder="URL komponentu*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={true} message={'Test error'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="componentPrice" className="text-sm">
                        Podaj cenę komponentu*:
                      </label>
                      <input
                        type="text"
                        id="componentPrice"
                        name="price"
                        placeholder="0000,00 zł*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={false} message={'Test error'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="componentAmount" className="text-sm">
                        Podaj dostępną ilość sztuk komponentu*:
                      </label>
                      <input
                        type="text"
                        id="componentAmount"
                        name="amount"
                        placeholder="0 szt.*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={false} message={'Test error'} />
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

                      <p className="text-[11px] text-gray-600">Maksymalna wielkość zdjęcia (.png/.jpg/.jpeg) to 5 MB.</p>
                    </div>
                  </div>

                  {/*modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    <button
                      type="submit"
                      className="px-[14px] py-2 bg-green-800 rounded-xl transition active:scale-95 hover:bg-green-800/80"
                    >
                      Zapisz
                    </button>
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="px-[14px] py-2 bg-gray-700 rounded-xl transition active:scale-95 hover:bg-gray-700/90"
                    >
                      Anuluj
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