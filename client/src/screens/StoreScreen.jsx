import { useState, useEffect, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Listbox, Transition } from '@headlessui/react'
import { FaSearch, FaAngleDown, FaCaretRight, FaCubes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../features/store'
import { addLike, removeLike, getSetups } from '../features/setupsSlices/getSetups'
import Setup from '../components/setup/Setup'
import Paginator from '../components/universal/Paginator'
import Loading from '../components/alerts/Loading'
import Error from '../components/alerts/Error'

let URL = {}

const sortingOptions = [
  { id: 1, name: 'Od najnowszych', value: 'newest' },
  { id: 2, name: 'Od najstarszych', value: 'oldest' },
  { id: 3, name: 'Najlepiej oceniane', value: 'best_rating' },
  { id: 4, name: 'Najgorzej oceniane', value: 'worst_rating' },
  { id: 5, name: 'Najchętniej kupowane', value: 'most_popular' },
  { id: 6, name: 'Najrzadziej kupowane', value: 'least_popular' },
  { id: 7, name: 'Cena (od najniższej)', value: 'price_lowest' },
  { id: 8, name: 'Cena (od najwyższej)', value: 'price_highest' },
]

const StoreScreen = () => {
  //variables
  const { loading, count, setups, error, errorMessage } = useAppSelector(state => state.getSetups)
  const { like, unlike } = useAppSelector(state => state.manageLikedSetups)
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const [searching, setSearching] = useState(searchParams.get('searching') || '')
  const [sorting, setSorting] = useState(searchParams.get('sorting') || sortingOptions[0].value)
  const [sortingOption, setSortingOption] = useState(sortingOptions[0])
  const [priceFiltering, setPriceFiltering] = useState({
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  })
  const [page, setPage] = useState(searchParams.get('page') || 1)

  //handlers
  const filterURL = (searchingFilter, sortingFilter, priceFilteringFilter, pageFilter) => {
    if (searchingFilter !== '') URL.searching = searchingFilter
    else if (URL.searching) delete URL.searching

    if (sortingFilter !== 'newest') URL.sorting = sortingFilter
    else if (URL.sorting) delete URL.sorting

    if (priceFilteringFilter.minPrice !== '') URL.minPrice = priceFilteringFilter.minPrice
    else if (URL.minPrice) delete URL.minPrice

    if (priceFilteringFilter.maxPrice !== '') URL.maxPrice = priceFilteringFilter.maxPrice
    else if (URL.maxPrice) delete URL.maxPrice

    if (pageFilter !== 1) URL.page = pageFilter
    else if (URL.page) delete URL.page

    setSearchParams({ ...URL })
  }

  const searchingHandler = e => {
    e.preventDefault()
    setPage(1)
    filterURL(searching, sorting, priceFiltering, 1)
  }
  const sortingHandler = option => {
    setSorting(option.value)
    setSortingOption(option)
    filterURL(searching, option.value, priceFiltering, page)
  }
  const priceFilteringHandler = e => {
    e.preventDefault()
    setPage(1)
    filterURL(searching, sorting, priceFiltering, 1)
  }
  const pageHandler = page => {
    setPage(page)
    filterURL(searching, sorting, priceFiltering, page)
  }

  //useEffects
  useEffect(() => {
    const getSetupsPromise = dispatch(
      getSetups({
        searching: searchParams.get('searching') || '',
        sorting: searchParams.get('sorting') || 'newest',
        priceFrom: searchParams.get('minPrice') || '',
        priceTo: searchParams.get('maxPrice') || '',
        page: searchParams.get('page') || '',
      })
    )
    return () => getSetupsPromise.abort()
  }, [searchParams, dispatch])

  useEffect(() => {
    if (like) dispatch(addLike(like))
    else if (unlike) dispatch(removeLike(unlike))
  }, [like, unlike, dispatch])

  return (
    <main className="flex-1">
      <div className="content">
        <div className="flex mx-2 my-4">
          <h2 className="relative text-xl font-bold">
            ZNAJDŹ ZESTAW DLA SIEBIE
            <Loading
              isOpen={loading}
              customStyle="top-[2px] -right-[33px]"
              customLoadingStyle="w-[24px] h-[24px] border-white/20 border-t-white"
            />
          </h2>
        </div>

        <div className="grid gap-4 mx-2 mb-14 md:mb-6 md:grid-cols-6 lg:grid-cols-8">
          <div className="flex flex-col col-span-1 gap-2 mb-4 md:gap-5 md:col-span-2 md:mb-0 md:mr-3">
            <form onSubmit={searchingHandler}>
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

            <div>
              <label htmlFor="sorting" className="text-xs text-gray-400">
                Sortowanie
              </label>

              <Listbox value={sortingOption} onChange={option => sortingHandler(option)}>
                <div name="sorting" className="relative h-9">
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
                    <Listbox.Options className="absolute z-10 w-full overflow-hidden bg-gray-200 cursor-pointer text-pclab-600 top-10 rounded-xl">
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

            <form onSubmit={priceFilteringHandler}>
              <label htmlFor="minPrice" className="text-xs text-gray-400">
                Filtrowanie ceny
              </label>

              <div className="flex">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="0 zł"
                  className="w-full px-3 py-1 truncate bg-transparent border-2 rounded-xl focus:outline-none"
                  value={priceFiltering.minPrice}
                  onChange={e => setPriceFiltering({ ...priceFiltering, minPrice: e.target.value })}
                />
                <div className="flex items-center justify-center flex-none w-6">-</div>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="1000 zł"
                  className="w-full px-3 py-1 truncate bg-transparent border-2 rounded-xl focus:outline-none"
                  value={priceFiltering.maxPrice}
                  onChange={e => setPriceFiltering({ ...priceFiltering, maxPrice: e.target.value })}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center flex-none ml-3 transition border-2 w-9 rounded-xl hover:bg-white/10 active:scale-90"
                >
                  <FaCaretRight className="text-2xl ml-[1px]" />
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-col items-center md:col-span-4 lg:col-span-6">
            <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} customStyle="w-full mb-4" />

            {setups.length ? (
              <>
                <div className="grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4">
                  {setups.map(setup => (
                    <Setup key={setup._id} setup={setup} />
                  ))}
                </div>

                <Paginator count={count} page={page} pageHandler={pageHandler} />
              </>
            ) : (
              <div className="flex items-center justify-center gap-[6px] mt-6 mb-3">
                <span>Brak</span>
                <FaCubes />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default StoreScreen
