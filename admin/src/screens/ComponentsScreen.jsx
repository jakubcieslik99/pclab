import { useRef, useState, useEffect, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Listbox, Combobox, Transition } from '@headlessui/react'
import { FaSearch, FaAngleDown } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../features/store'
import { errorReset, getComponents } from '../features/componentsSlices/getComponents'
import Component from '../components/componentsScreen/Component'
import EditComponentModal from '../components/componentsScreen/EditComponentModal'
import DeleteComponentModal from '../components/componentsScreen/DeleteComponentModal'
import Paginator from '../components/universal/Paginator'
import Loading from '../components/alerts/Loading'
import Error from '../components/alerts/Error'

let URL = {}

const sortingOptions = [
  { id: 1, name: 'Ostatnio dodane', value: 'newest' },
  { id: 2, name: 'Najwcześniej dodane', value: 'oldest' },
  { id: 3, name: 'Ilość (od najmniejszej)', value: 'amount_lowest' },
  { id: 4, name: 'Ilość (od największej)', value: 'amount_highest' },
  { id: 5, name: 'Cena (od najniższej)', value: 'price_lowest' },
  { id: 6, name: 'Cena (od najwyższej)', value: 'price_highest' },
]

const filteringOptions = [
  { id: 1, name: 'Wszystkie', value: 'all' },
  { id: 2, name: 'Obudowy', value: 'case' },
  { id: 3, name: 'Procesory', value: 'cpu' },
  { id: 4, name: 'Płyty główne', value: 'mbo' },
  { id: 5, name: 'Pamięci RAM', value: 'ram' },
  { id: 6, name: 'Karty graficzne', value: 'gpu' },
  { id: 7, name: 'Zasilacze', value: 'psu' },
  { id: 8, name: 'Dyski', value: 'drive' },
]

const ComponentsScreen = () => {
  // variables
  const getComponentsAbort = useRef()

  const { loading, count, components, error, errorMessage } = useAppSelector(state => state.getComponents)
  const { success } = useAppSelector(state => state.saveComponent)
  const { success: success2 } = useAppSelector(state => state.deleteComponent)
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const [searching, setSearching] = useState(searchParams.get('searching') || '')
  const [sorting, setSorting] = useState(searchParams.get('sorting') || sortingOptions[0].value)
  const [sortingOption, setSortingOption] = useState(sortingOptions[0])
  const [filtering, setFiltering] = useState(searchParams.get('filtering') || filteringOptions[0].value)
  const [filteringOption, setFilteringOption] = useState([filteringOptions[0]])
  const [page, setPage] = useState(searchParams.get('page') || 1)

  const [editComponent, setEditComponent] = useState(null)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteComponent, setDeleteComponent] = useState(null)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  // handlers
  const filterURL = (searchingFilter, sortingFilter, filteringFilter, pageFilter) => {
    if (searchingFilter !== '') URL.searching = searchingFilter
    else if (URL.searching) delete URL.searching

    if (sortingFilter !== 'newest') URL.sorting = sortingFilter
    else if (URL.sorting) delete URL.sorting

    if (filteringFilter !== 'all') URL.filtering = filteringFilter
    else if (URL.filtering) delete URL.filtering

    if (pageFilter !== 1) URL.page = pageFilter
    else if (URL.page) delete URL.page

    setSearchParams({ ...URL })
  }

  const searchingHandler = e => {
    e.preventDefault()
    setPage(1)
    filterURL(searching, sorting, filtering, 1)
  }
  const sortingHandler = option => {
    setSorting(option.value)
    setSortingOption(option)
    filterURL(searching, option.value, filtering, page)
  }
  const filteringHandler = option => {
    if (option.length > 1) {
      let filteringValue = option[0].value
      for (let i = 1; i < option.length; i++) filteringValue = filteringValue + ',' + option[i].value
      setFilteringOption(option)
      filterURL(searching, sorting, filteringValue, page)
    } else if (option.length === 1) {
      setFiltering(option[0].value)
      setFilteringOption(option)
      filterURL(searching, sorting, option[0].value, page)
    } else {
      setFiltering('all')
      setFilteringOption([filteringOptions[0]])
      filterURL(searching, sorting, 'all', page)
    }
  }
  const pageHandler = page => {
    setPage(page)
    filterURL(searching, sorting, filtering, page)
  }

  const editComponentHandler = component => {
    setEditComponent(component)
    setEditModalIsOpen(true)
  }
  const deleteComponentHandler = component => {
    setDeleteComponent(component)
    setDeleteModalIsOpen(true)
  }

  // useEffects
  useEffect(() => {
    const getComponentsPromise = dispatch(
      getComponents({
        searching: searchParams.get('searching') || '',
        sorting: searchParams.get('sorting') || 'newest',
        filtering: searchParams.get('filtering') || 'all',
        page: searchParams.get('page') || '',
      }),
    )
    return () => {
      getComponentsPromise.abort()
      getComponentsAbort.current && getComponentsAbort.current()
      dispatch(errorReset())
    }
  }, [searchParams, dispatch])

  useEffect(() => {
    if (success || success2) {
      const getComponentsPromise = dispatch(
        getComponents({
          searching: searchParams.get('searching') || '',
          sorting: searchParams.get('sorting') || 'newest',
          filtering: searchParams.get('filtering') || 'all',
          page: searchParams.get('page') || '',
        }),
      )
      getComponentsAbort.current = getComponentsPromise.abort
    }
  }, [success, success2, searchParams, dispatch])

  return (
    <main className="flex-1">
      <div className="content">
        <div className="px-3 pt-2 pb-3 mt-3 mb-3 bg-gray-800 rounded-xl">
          <h2 className="relative mb-2 text-xl font-bold">
            Komponenty
            <Loading
              isOpen={loading}
              customStyle="top-[3px] left-[135px]"
              customLoadingStyle="w-[22px] h-[22px] border-white/20 border-t-white"
            />
          </h2>

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

              <Listbox value={sortingOption} onChange={option => sortingHandler(option)}>
                <div name="sorting" className="relative h-9 md:w-full md:max-w-[234px]">
                  <Listbox.Button className="absolute flex items-center justify-between w-full py-1 pl-3 border-2 rounded-xl">
                    <div className="truncate">{sortingOption.name}</div>
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

              <Combobox value={filteringOption} onChange={option => filteringHandler(option)} multiple>
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

            <div>
              <button
                type="button"
                onClick={() => editComponentHandler(null)}
                className="px-2 py-1 transition border-2 border-white md:ml-6 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90"
              >
                Dodaj
              </button>

              <EditComponentModal
                editElement={editComponent}
                setEditElement={setEditComponent}
                isOpen={editModalIsOpen}
                setIsOpen={setEditModalIsOpen}
              />
              <DeleteComponentModal
                deleteElement={deleteComponent}
                setDeleteElement={setDeleteComponent}
                isOpen={deleteModalIsOpen}
                setIsOpen={setDeleteModalIsOpen}
              />
            </div>
          </div>
        </div>

        <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} customStyle="w-full mb-3" />

        <div className="pb-[2px] mb-6 overflow-x-auto bg-gray-800 rounded-xl">
          {components.length ? (
            <>
              <table className="w-full border-b border-gray-600">
                <thead>
                  <tr className="text-gray-300 bg-gray-600">
                    <th className="py-2 pl-3 pr-3 text-center">Nr</th>
                    <th className="py-2 pr-3 text-center">Zdjęcie</th>
                    <th className="py-2 pr-2 text-left">Dane</th>
                    <th className="py-2 pr-2 text-left">Cena</th>
                    <th className="py-2 pr-2 text-center">Ilość</th>
                    <th className="py-2 pr-3 text-center">Zarządzaj</th>
                  </tr>
                </thead>

                <tbody>
                  {components.map((component, index) => (
                    <Component
                      key={component._id}
                      index={index}
                      component={component}
                      editHandler={editComponentHandler}
                      deleteHandler={deleteComponentHandler}
                    />
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center pt-[11px] pb-2">
                <Paginator count={count} page={page} pageHandler={pageHandler} />
              </div>
            </>
          ) : (
            <div className="flex justify-center w-full pt-5 pb-[18px]">Brak komponentów</div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ComponentsScreen
