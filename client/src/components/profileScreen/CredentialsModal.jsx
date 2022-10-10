import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const CredentialsModal = props => {
  //handlers
  const closeHandler = () => {
    props.setIsOpen(false)
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
                  <div className="flex items-center justify-between w-full gap-4 text-xl font-semibold text-pclab-600">
                    <h2>Zmiana adresu email lub hasła</h2>
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="text-2xl transition active:scale-95 hover:text-pclab-600/70"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/*modal body*/}
                  <div className="flex flex-col w-full gap-[10px] my-4 overflow-y-auto text-pclab-600">
                    <Error isOpen={true} message={'Test error'} />
                    <Success isOpen={true} message={'Test success'} />

                    <div>
                      <label htmlFor="profileEmail" className="text-sm">
                        Podaj aktualny adres email*:
                      </label>
                      <input
                        type="text"
                        id="profileEmail"
                        name="email"
                        placeholder="Aktualny email*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={false} message={'Test error'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profileNewEmail" className="text-sm">
                        Podaj nowy adres email:
                      </label>
                      <input
                        type="text"
                        id="profileNewEmail"
                        name="newEmail"
                        placeholder="Nowy email"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={false} message={'Test error'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profilePassword" className="text-sm">
                        Podaj aktualne hasło*:
                      </label>
                      <input
                        type="password"
                        id="profilePassword"
                        name="password"
                        placeholder="Aktualne hasło*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={true} message={'Test error'} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profileNewPassword" className="text-sm">
                        Podaj nowe hasło:
                      </label>
                      <input
                        type="password"
                        id="profileNewPassword"
                        name="newPassword"
                        placeholder="Nowe hasło"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-pclab-600 focus:ring-transparent"
                      />

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={false} message={'Test error'} />
                      </div>
                    </div>
                  </div>

                  {/*modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    <button
                      type="submit"
                      className="px-[14px] py-2 bg-pclab-500 rounded-xl transition active:scale-95 hover:bg-pclab-500/80"
                    >
                      Zapisz
                    </button>
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="px-[14px] py-2 bg-pclab-400 rounded-xl transition active:scale-95 hover:bg-pclab-400/70"
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

export default CredentialsModal
