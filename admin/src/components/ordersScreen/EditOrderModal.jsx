import { useState, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const EditOrderModal = props => {
  //variables
  const [status, setStatus] = useState('unpaid')

  //handlers
  const closeHandler = () => {
    props.setIsOpen(false)
    setTimeout(() => {
      props.setEditElement(null)
    }, 250)
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
                      <span>Zarządzaj zamówieniem</span>
                      <span className="text-sm font-normal">{'507f1f77bcf86cd799439011'}</span>
                      <span className="text-sm font-normal text-gray-400">{'00/00/0000'}</span>
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

                    <div className="flex flex-col gap-[5px]">
                      <div>
                        <h3 className="text-lg font-semibold">Adres dostawy:</h3>
                        <div>
                          <div>{'johndoe@gmail.com'}</div>
                          <div className="mb-[2px]">{'+48000000000'}</div>

                          <div>{'Jan Kowalski'}</div>
                          <div>{'ul. Prosta 21/37'}</div>
                          <div>{'00-000 Warszawa'}</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">Metoda dostawy:</h3>
                        <div>{'Kurier InPost'}</div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">Metoda płatności:</h3>
                        <div>{'Przelew'}</div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">Status zamówienia:</h3>
                        <div className="flex flex-col max-w-[168px]">
                          {/*
                            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-red-700 bg-red-300 border-2 border-red-600 rounded-xl leading-[1.12rem]">
                              Nieopłacono
                            </div>
                          */}
                          {
                            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-yellow-700 bg-yellow-200 border-2 border-yellow-700 rounded-xl leading-[1.12rem]">
                              Oczekuje na wysyłkę
                            </div>
                          }
                          {/*
                            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-green-700 bg-green-300 border-2 border-green-600 rounded-xl leading-[1.12rem]">
                              Wysłano
                            </div>
                          */}
                          {/*
                            <div className="px-2 pt-1 pb-[3px] text-sm font-semibold text-blue-700 bg-blue-300 border-2 border-blue-600 rounded-xl leading-[1.12rem]">
                              Zwrócono
                            </div>
                          */}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="orderStatus" className="text-sm mb-[2px]">
                        Ustaw status zamówienia*:
                      </label>
                      <select
                        id="orderStatus"
                        name="status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      >
                        <option value="unpaid" disabled hidden>
                          Nieopłacono
                        </option>
                        <option value="waiting" className="text-gray-800">
                          Oczekuje na wysyłkę
                        </option>
                        <option value="sent" className="text-gray-800">
                          Wysłano
                        </option>
                        <option value="returned" className="text-gray-800">
                          Zwrócono
                        </option>
                      </select>

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={true} message={'Test error'} />
                      </div>
                    </div>

                    {(status === 'waiting' || status === 'sent' || status === 'returned') && (
                      <div>
                        <label htmlFor="orderTracking" className="text-sm">
                          Podaj numer śledzenia przesyłki*:
                        </label>
                        <input
                          type="text"
                          id="orderTracking"
                          name="tracking"
                          placeholder="Numer śledzenia przesyłki*"
                          className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                        />

                        <div className="flex flex-col gap-1 mt-[5px]">
                          <Error isOpen={true} message={'Test error'} />
                        </div>
                      </div>
                    )}
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

export default EditOrderModal
