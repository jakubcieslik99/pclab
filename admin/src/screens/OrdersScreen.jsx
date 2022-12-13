import { useState, Fragment } from 'react'
import { Listbox, Combobox, Transition } from '@headlessui/react'
import { FaSearch, FaAngleDown } from 'react-icons/fa'
import Order from '../components/ordersScreen/Order'
import EditOrderModal from '../components/ordersScreen/EditOrderModal'
import Paginator from '../components/universal/Paginator'

const sortingOptions = [
  { id: 1, name: 'Najnowsze', value: 'newest' },
  { id: 2, name: 'Najstarsze', value: 'oldest' },
  { id: 3, name: 'Suma (od najniższej)', value: 'total_price_lowest' },
  { id: 4, name: 'Suma (od najwyższej)', value: 'total_price_highest' },
]

const filteringOptions = [
  { id: 1, name: 'Wszystkie', value: 'all' },
  { id: 2, name: 'Oczekujące', value: 'awaiting' },
  { id: 3, name: 'Wysłane', value: 'sent' },
  { id: 4, name: 'Nieopłacone', value: 'unpaid' },
  { id: 5, name: 'W trakcie płatności', value: 'paying' },
  { id: 6, name: 'Anulowane', value: 'canceled' },
  { id: 7, name: 'Zwrócone', value: 'returned' },
]

const OrdersScreen = () => {
  //variables
  const [searching, setSearching] = useState('')
  const [sorting, setSorting] = useState(sortingOptions[0])
  const [filtering, setFiltering] = useState([filteringOptions[0]])

  const [editOrder, setEditOrder] = useState(null)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  //handlers
  const searchingHandler = e => {
    e.preventDefault()
    console.log('searching')
    console.log(searching)
  }
  const editOrderHandler = order => {
    setEditOrder(order)
    setEditModalIsOpen(true)
  }

  return (
    <main className="flex-1">
      <div className="content">
        <div className="px-3 pt-2 pb-3 mt-3 mb-3 bg-gray-800 rounded-xl">
          <h2 className="mb-2 text-xl font-bold">Zamówienia</h2>

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

              <Combobox value={filtering} onChange={setFiltering} multiple>
                <div name="filtering" className="relative h-9 md:w-full md:max-w-[234px]">
                  <div className="absolute flex items-center w-full py-1 pl-3 border-2 pr-9 rounded-xl">
                    <Combobox.Input
                      readOnly
                      displayValue={filteringOptions => filteringOptions.map(option => option.name).join(', ')}
                      className="truncate bg-transparent cursor-default focus:outline-none"
                    />
                    <Combobox.Button className="absolute top-0 right-0 flex items-center justify-end flex-none w-full h-8 pr-[7px]">
                      <FaAngleDown className="text-xl ml-[1px] mt-[1px] transition active:scale-90" />
                    </Combobox.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Combobox.Options className="absolute z-10 w-full overflow-hidden text-gray-800 bg-gray-200 cursor-pointer top-10 rounded-xl">
                      {filteringOptions.map(option => (
                        <Combobox.Option
                          key={option.id}
                          value={option}
                          className={({ selected }) =>
                            `px-3 py-[6px] truncate hover:bg-black/20 ${selected && 'bg-black/20 font-semibold'}`
                          }
                        >
                          {option.name}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>

            <EditOrderModal
              editElement={editOrder}
              setEditElement={setEditOrder}
              isOpen={editModalIsOpen}
              setIsOpen={setEditModalIsOpen}
            />
          </div>
        </div>

        <div className="pb-[2px] mb-6 overflow-x-auto bg-gray-800 rounded-xl">
          <table className="w-full border-b border-gray-600">
            <thead>
              <tr className="text-gray-300 bg-gray-600">
                <th className="py-2 pl-3 pr-3 text-center">Nr</th>
                <th className="py-2 pr-3 text-left">Dane</th>
                <th className="py-2 pr-3 text-center">Status</th>
                <th className="py-2 pr-3 text-center">Zarządzaj</th>
              </tr>
            </thead>

            {
              <tbody>
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
                <Order editHandler={editOrderHandler} />
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

export default OrdersScreen
