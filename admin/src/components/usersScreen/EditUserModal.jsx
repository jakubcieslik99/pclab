import { useState, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import Error from '../alerts/Error'
import Success from '../alerts/Success'

const EditUserModal = props => {
  //variables
  const [isAdmin, setIsAdmin] = useState('no')

  //handlers
  const closeHandler = () => {
    props.setIsOpen(false)
    setTimeout(() => {
      props.setEditElement(null)

      setIsAdmin('no')
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
                      <span>Edytuj użytkownika</span>
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
                      <label htmlFor="carrierName" className="text-sm">
                        Wybierz rangę użytkownika*:
                      </label>
                      <select
                        id="userIsAdmin"
                        name="isAdmin"
                        value={isAdmin}
                        onChange={e => setIsAdmin(e.target.value)}
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      >
                        <option value="no" className="text-gray-800">
                          Użytkownik
                        </option>
                        <option value="yes" className="text-gray-800">
                          Administrator
                        </option>
                      </select>

                      <div className="flex flex-col gap-1 mt-[5px]">
                        <Error isOpen={true} message={'Test error'} />
                      </div>
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

export default EditUserModal
