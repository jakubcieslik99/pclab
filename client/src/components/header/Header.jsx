import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { FaHome, FaLaptopMedical, FaUserCircle, FaDoorOpen, FaBars, FaCaretDown } from 'react-icons/fa'

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <header className="sticky top-0 h-16 md:h-20">
      <nav className="relative z-10 w-full h-16 shadow-lg md:h-20 gradient-navbar">
        <div className="flex items-center justify-between h-full content top-">
          <div className="flex items-center">
            <Link to={'/'}>Logo</Link>
          </div>

          <ul className="hidden gap-1 md:flex">
            <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
              <FaHome />
              <li>Wszystkie zestawy</li>
            </Link>

            <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
              <FaLaptopMedical />
              <li>Stwórz zestaw</li>
            </Link>

            {false ? (
              <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
                <FaDoorOpen />
                <li>Logowanie i rejestracja</li>
              </Link>
            ) : (
              <>
                <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
                  <FaUserCircle />
                  <li>Konto</li>
                </Link>

                <div className="flex flex-col items-center justify-center px-2 py-1 transition cursor-pointer active:scale-95">
                  <FaDoorOpen />
                  <li>Wyloguj się</li>
                </div>
              </>
            )}
          </ul>

          <button className="relative w-9 h-9 md:hidden" onClick={() => setMenuIsOpen(!menuIsOpen)}>
            <FaBars
              className={`w-9 h-9 p-[6px] absolute inset-0 transition-nav ${
                !menuIsOpen ? 'opacity-1 rotate-180' : 'opacity-0 -rotate-180'
              }`}
            />
            <FaCaretDown
              className={`w-9 h-9 absolute inset-0 transition-nav ${
                !menuIsOpen ? 'opacity-0 rotate-90' : 'opacity-1 rotate-0'
              }`}
            />
          </button>
        </div>
      </nav>

      <Transition
        as="nav"
        show={menuIsOpen}
        className="absolute overflow-hidden transition-transform -translate-x-1/2 rounded-lg left-1/2 top-16 drop-shadow-lg md:hidden gradient-mobile-menu mobile-menu"
        enterFrom="-translate-y-full"
        enterTo="translate-y-2"
        leaveFrom="translate-y-2"
        leaveTo="-translate-y-full"
      >
        <ul>
          <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-blue-600">
            <FaHome className="mr-2 text-xl" />
            <li>Wszystkie zestawy</li>
          </Link>

          <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-blue-600">
            <FaLaptopMedical className="mr-2 text-xl" />
            <li>Stwórz zestaw</li>
          </Link>

          {false ? (
            <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-blue-600">
              <FaDoorOpen className="mr-2 text-xl" />
              <li>Logowanie i rejestracja</li>
            </Link>
          ) : (
            <>
              <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-blue-600">
                <FaUserCircle className="mr-2 text-xl" />
                <li>Konto</li>
              </Link>

              <div className="flex items-center p-3 transition-colors cursor-pointer hover:bg-blue-600">
                <FaDoorOpen className="mr-2 text-xl" />
                <li>Wyloguj się</li>
              </div>
            </>
          )}
        </ul>
      </Transition>
    </header>
  )
}

export default Header
