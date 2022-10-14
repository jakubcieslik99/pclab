import { useEffect, Fragment } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Transition, Menu } from '@headlessui/react'
import { FaHome, FaBoxes, FaLaptopMedical, FaUserCircle, FaDoorOpen, FaBars, FaCaretDown } from 'react-icons/fa'
import { BsCpuFill } from 'react-icons/bs'

const Header = () => {
  //variables
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const locationLoginRequired = state?.loginRequired || false

  //handlers
  const logoutHandler = () => {
    console.log('logout')
  }

  //useEffects
  useEffect(() => {
    if (locationLoginRequired) {
      navigate(pathname, { replace: true })
    }
  }, [pathname, locationLoginRequired, navigate])

  return (
    <header className="sticky top-0 z-20 h-16 md:h-20">
      <Menu as="nav" className="relative z-10 w-full h-16 shadow-lg md:h-20 gradient-navbar">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between h-full content">
              <div className="flex items-center">
                <Link to="/" className="flex items-center text-2xl font-bold drop-shadow-lg">
                  <BsCpuFill className="ml-1 mt-[3px]" />
                  <span className="mt-1 ml-1">PC</span>
                  <span className="mt-1 ml-[2px]">Lab</span>
                </Link>
              </div>

              <ul className="hidden gap-1 md:flex">
                <Link to="/" className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
                  <FaHome className="text-2xl" />
                  <li>Strona główna</li>
                </Link>

                <Link to="/store" className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
                  <FaBoxes className="text-2xl" />
                  <li>Zestawy</li>
                </Link>

                <Link
                  to="/compose"
                  className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95"
                >
                  <FaLaptopMedical className="text-2xl" />
                  <li>Stwórz</li>
                </Link>

                {false ? (
                  <Link
                    to="/login"
                    className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95"
                  >
                    <FaDoorOpen className="text-2xl" />
                    <li>Logowanie i rejestracja</li>
                  </Link>
                ) : (
                  <>
                    <Link
                      to={`/profile/${'507f1f77bcf86cd799439011'}`}
                      className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95"
                    >
                      <FaUserCircle className="text-2xl" />
                      <li>Konto</li>
                    </Link>

                    <div
                      onClick={logoutHandler}
                      className="flex flex-col items-center justify-center px-2 py-1 transition cursor-pointer active:scale-95"
                    >
                      <FaDoorOpen className="text-2xl" />
                      <li>Wyloguj się</li>
                    </div>
                  </>
                )}
              </ul>

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
            </div>

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
                className="absolute mt-2 overflow-hidden -translate-x-1/2 rounded-lg left-1/2 gradient-mobile-menu mobile-menu focus:outline-none"
              >
                <Menu.Item as={Link} to="/" className="flex items-center p-3 transition-colors hover:bg-black/30">
                  <FaHome className="mr-2 text-xl" />
                  <li>Strona główna</li>
                </Menu.Item>

                <Menu.Item as={Link} to="/store" className="flex items-center p-3 transition-colors hover:bg-black/30">
                  <FaBoxes className="mr-2 text-xl" />
                  <li>Zestawy</li>
                </Menu.Item>

                <Menu.Item as={Link} to="/compose" className="flex items-center p-3 transition-colors hover:bg-black/30">
                  <FaLaptopMedical className="mr-2 text-xl" />
                  <li>Stwórz</li>
                </Menu.Item>

                {false ? (
                  <Menu.Item as={Link} to="/login" className="flex items-center p-3 transition-colors hover:bg-black/30">
                    <FaDoorOpen className="mr-2 text-xl" />
                    <li>Logowanie i rejestracja</li>
                  </Menu.Item>
                ) : (
                  <>
                    <Menu.Item
                      as={Link}
                      to={`/profile/${'507f1f77bcf86cd799439011'}`}
                      className="flex items-center p-3 transition-colors hover:bg-black/30"
                    >
                      <FaUserCircle className="mr-2 text-xl" />
                      <li>Konto</li>
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
                  </>
                )}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </header>
  )
}

export default Header
