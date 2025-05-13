import { Fragment } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Transition, Menu } from '@headlessui/react'
import { FaBars, FaCaretDown, FaDolly, FaTruckLoading, FaMemory, FaCog, FaUsers, FaDoorOpen } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { userInfoReset, logout } from '../../features/authSlices/manageAccount'
import { BsCpuFill } from 'react-icons/bs'

const Header = () => {
  // variables
  const { userInfo } = useAppSelector(state => state.manageAccount)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  // handlers
  const logoutHandler = () => {
    dispatch(logout())
    dispatch(userInfoReset())

    navigate(pathname || '/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 h-16 md:h-20">
      <Menu as="nav" className="relative z-10 w-full h-16 bg-gray-800 shadow-lg md:h-20">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between h-full content">
              <div className="flex items-center">
                <Link to={userInfo ? '/orders' : '/login'} className="flex items-center text-2xl font-bold drop-shadow-lg">
                  <BsCpuFill className="ml-1 mt-[3px]" />
                  <span className="mt-1 ml-1">PC</span>
                  <span className="mt-1 ml-[2px]">Lab</span>

                  <div className="flex flex-col mt-[2px] ml-3 text-xs font-light leading-tight">
                    <div>Panel</div>
                    <div>administratorski</div>
                  </div>
                </Link>
              </div>

              <ul className="hidden md:flex">
                {userInfo && (
                  <>
                    <Link
                      to="/orders"
                      className="flex flex-col items-center justify-center px-[6px] py-1 transition active:scale-95"
                    >
                      <FaDolly className="text-2xl" />
                      <li className="text-[11px] mt-[2px]">Zamówienia</li>
                    </Link>

                    <Link
                      to="/carriers"
                      className="flex flex-col items-center justify-center px-[6px] py-1 transition active:scale-95"
                    >
                      <FaTruckLoading className="text-2xl" />
                      <li className="text-[11px] mt-[2px]">Przewoźnicy</li>
                    </Link>

                    <Link
                      to="/components"
                      className="flex flex-col items-center justify-center px-[6px] py-1 transition active:scale-95"
                    >
                      <FaMemory className="text-2xl" />
                      <li className="text-[11px] mt-[2px]">Komponenty</li>
                    </Link>

                    <Link
                      to="/setups"
                      className="flex flex-col items-center justify-center px-[6px] py-1 transition active:scale-95"
                    >
                      <FaCog className="text-2xl" />
                      <li className="text-[11px] mt-[2px]">Zestawy</li>
                    </Link>

                    <Link
                      to="/users"
                      className="flex flex-col items-center justify-center px-[6px] py-1 transition active:scale-95"
                    >
                      <FaUsers className="text-2xl" />
                      <li className="text-[11px] mt-[2px]">Użytkownicy</li>
                    </Link>

                    <div
                      onClick={logoutHandler}
                      className="flex flex-col items-center justify-center px-[6px] py-1 transition cursor-pointer active:scale-95"
                    >
                      <FaDoorOpen className="text-2xl" />
                      <li className="text-[11px] mt-[2px]">Wyloguj się</li>
                    </div>
                  </>
                )}
              </ul>

              {userInfo && (
                <Menu.Button className="relative w-9 h-9 md:hidden focus:outline-none">
                  <FaBars
                    className={`w-9 h-9 p-[6px] absolute inset-0 transition-nav ${
                      !open ? 'opacity-1 rotate-180' : 'opacity-0 -rotate-180'
                    }`}
                  />
                  <FaCaretDown
                    className={`w-9 h-9 absolute inset-0 transition-nav ${
                      !open ? 'opacity-0 rotate-90' : 'opacity-1 rotate-0'
                    }`}
                  />
                </Menu.Button>
              )}
            </div>

            {userInfo && (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  as="ul"
                  className="absolute mt-2 overflow-hidden -translate-x-1/2 bg-gray-700 rounded-lg left-1/2 mobile-menu focus:outline-none"
                >
                  <Menu.Item as={Link} to="/orders" className="flex items-center p-3 transition-colors hover:bg-black/30">
                    <FaDolly className="mr-2 text-xl" />
                    <li>Zamówienia</li>
                  </Menu.Item>

                  <Menu.Item as={Link} to="/carriers" className="flex items-center p-3 transition-colors hover:bg-black/30">
                    <FaTruckLoading className="mr-2 text-xl" />
                    <li>Przewoźnicy</li>
                  </Menu.Item>

                  <Menu.Item
                    as={Link}
                    to="/components"
                    className="flex items-center p-3 transition-colors hover:bg-black/30"
                  >
                    <FaMemory className="mr-2 text-xl" />
                    <li>Komponenty</li>
                  </Menu.Item>

                  <Menu.Item as={Link} to="/setups" className="flex items-center p-3 transition-colors hover:bg-black/30">
                    <FaCog className="mr-2 text-xl" />
                    <li>Zestawy</li>
                  </Menu.Item>

                  <Menu.Item as={Link} to="/users" className="flex items-center p-3 transition-colors hover:bg-black/30">
                    <FaUsers className="mr-2 text-xl" />
                    <li>Użytkownicy</li>
                  </Menu.Item>

                  <Menu.Item
                    as="button"
                    type="button"
                    onClick={logoutHandler}
                    className="flex items-center w-full p-3 transition-colors hover:bg-black/30"
                  >
                    <FaDoorOpen className="mr-2 text-xl" />
                    <li>Wyloguj się</li>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            )}
          </>
        )}
      </Menu>
    </header>
  )
}

export default Header
