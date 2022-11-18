import { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaSearch, FaAngleDown } from 'react-icons/fa'
import Setup from '../components/setupsScreen/Setup'
import DeleteModal from '../components/universal/DeleteModal'
import Paginator from '../components/universal/Paginator'

const sortingOptions = [
  { id: 1, name: 'Ostatnio dodane', value: 'newest' },
  { id: 2, name: 'Najwcześniej dodane', value: 'oldest' },
  { id: 3, name: 'Najlepiej oceniane', value: 'best_rating' },
  { id: 4, name: 'Najgorzej oceniane', value: 'worst_rating' },
  { id: 5, name: 'Najchętniej kupowane', value: 'most_popular' },
  { id: 6, name: 'Najrzadziej kupowane', value: 'least_popular' },
  { id: 7, name: 'Cena (od najniższej)', value: 'price_lowest' },
  { id: 8, name: 'Cena (od najwyższej)', value: 'price_highest' },
]

const SetupsScreen = () => {
  //variables
  const [searching, setSearching] = useState('')
  const [sorting, setSorting] = useState(sortingOptions[0])

  const [deleteSetup, setDeleteSetup] = useState(null)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  //handlers
  const searchingHandler = e => {
    e.preventDefault()
    console.log('searching')
    console.log(searching)
  }
  const deleteSetupHandler = setup => {
    setDeleteSetup(setup)
    setDeleteModalIsOpen(true)
  }

  return (
    <main className="flex-1">
      <div className="content">
        <div className="px-3 pt-2 pb-3 mt-3 mb-3 bg-gray-800 rounded-xl">
          <h2 className="mb-2 text-xl font-bold">Zestawy</h2>

          <div className="flex flex-col gap-4 md:items-center md:flex-row md:justify-between md:gap-0">
            <div className="flex flex-col gap-2 md:grow md:items-center md:flex-row md:gap-4">
              <form onSubmit={searchingHandler} className="relative md:w-full md:max-w-[254px]">
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
              </form>

              <Listbox value={sorting} onChange={setSorting}>
                <div name="sorting" className="relative h-9 md:w-full md:max-w-[234px]">
                  <Listbox.Button className="absolute flex items-center justify-between w-full py-1 pl-3 border-2 rounded-xl">
                    <div className="truncate">{sorting.name}</div>
                    <div className="flex items-center justify-center flex-none transition w-9 active:scale-90">
                      <FaAngleDown className="text-xl ml-[1px] mt-[1px]" />
                    </div>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 w-full overflow-hidden text-gray-800 bg-gray-200 cursor-pointer top-10 rounded-xl">
                      {sortingOptions.map(option => (
                        <Listbox.Option key={option.id} value={option} className="px-3 py-[6px] truncate hover:bg-black/20">
                          {option.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <DeleteModal
              deleteElement={deleteSetup}
              setDeleteElement={setDeleteSetup}
              isOpen={deleteModalIsOpen}
              setIsOpen={setDeleteModalIsOpen}
            />
          </div>
        </div>

        <div className="pb-[2px] mb-6 overflow-x-auto bg-gray-800 rounded-xl">
          <table className="w-full border-b border-gray-600">
            <thead>
              <tr className="text-gray-300 bg-gray-600">
                <th className="py-2 pl-3 pr-3 text-center">Nr</th>
                <th className="py-2 pr-3 text-left">Dane</th>
                <th className="py-2 pr-3 text-center">Dostępność</th>
                <th className="py-2 pr-3 text-center">Zarządzaj</th>
              </tr>
            </thead>

            {
              <tbody>
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
                <Setup deleteHandler={deleteSetupHandler} />
              </tbody>
            }
          </table>

          {/*<div className="flex justify-center w-full pt-5 pb-[9px]">Ładowanie...</div>*/}

          <div className="flex justify-center pt-[11px] pb-2">
            <Paginator />
          </div>
        </div>
      </div>
    </main>
  )
}

export default SetupsScreen