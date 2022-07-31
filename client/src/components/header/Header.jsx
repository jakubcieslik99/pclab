import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { FaHome, FaBoxes, FaLaptopMedical, FaUserCircle, FaDoorOpen, FaBars, FaCaretDown } from 'react-icons/fa'
import { BsCpuFill } from 'react-icons/bs'

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 h-16 md:h-20">
      <nav className="relative z-10 w-full h-16 shadow-lg md:h-20 gradient-navbar">
        <div className="flex items-center justify-between h-full content top-">
          <div className="flex items-center">
            <Link to={'/'} className="flex items-center text-2xl font-bold drop-shadow-lg">
              <BsCpuFill className="ml-1 mt-[3px]" />
              <span className="mt-1 ml-1">PC</span>
              <span className="mt-1 ml-[2px]">Lab</span>
            </Link>
          </div>

          <ul className="hidden gap-1 md:flex">
            <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
              <FaHome />
              <li>Strona główna</li>
            </Link>

            <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
              <FaBoxes />
              <li>Zestawy</li>
            </Link>

            <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1 transition active:scale-95">
              <FaLaptopMedical />
              <li>Skomponuj</li>
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
        className="absolute transition-transform -translate-x-1/2 rounded-lg verflow-hidden drop-shadow-lg left-1/2 top-16 md:hidden gradient-mobile-menu mobile-menu"
        enterFrom="-translate-y-full"
        enterTo="translate-y-2"
        leaveFrom="translate-y-2"
        leaveTo="-translate-y-full"
      >
        <ul>
          <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-black/30">
            <FaHome className="mr-2 text-xl" />
            <li>Strona główna</li>
          </Link>

          <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-black/30">
            <FaBoxes className="mr-2 text-xl" />
            <li>Zestawy</li>
          </Link>

          <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-black/30">
            <FaLaptopMedical className="mr-2 text-xl" />
            <li>Skomponuj</li>
          </Link>

          {false ? (
            <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-black/30">
              <FaDoorOpen className="mr-2 text-xl" />
              <li>Logowanie i rejestracja</li>
            </Link>
          ) : (
            <>
              <Link to={'/'} className="flex items-center p-3 transition-colors hover:bg-black/30">
                <FaUserCircle className="mr-2 text-xl" />
                <li>Konto</li>
              </Link>

              <div className="flex items-center p-3 transition-colors cursor-pointer hover:bg-black/30">
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
