import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaLaptopMedical, FaUserCircle, FaDoorOpen, FaBars, FaCaretDown } from 'react-icons/fa'

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <header className="sticky top-0 h-16 md:h-20">
      <nav className="w-full h-full bg-blue-500">
        <div className="flex items-center justify-between h-full content">
          <div className="flex items-center">
            <Link to={'/'}>Logo</Link>
          </div>

          <ul className="hidden gap-1 md:flex">
            <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1">
              <FaHome />
              <li>Wszystkie zestawy</li>
            </Link>

            <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1">
              <FaLaptopMedical />
              <li>Stwórz zestaw</li>
            </Link>

            {false ? (
              <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1">
                <FaDoorOpen />
                <li>Logowanie i rejestracja</li>
              </Link>
            ) : (
              <>
                <Link to={'/'} className="flex flex-col items-center justify-center px-2 py-1">
                  <FaUserCircle />
                  <li>Konto</li>
                </Link>

                <div className="flex flex-col items-center justify-center px-2 py-1 cursor-pointer">
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

      <nav
        className={`absolute w-full transition-transform bg-blue-500 top-16 -z-10 md:hidden ${
          !menuIsOpen ? '-translate-y-full' : ' translate-y-0'
        }`}
      >
        <ul>
          <Link to={'/'} className="flex items-center p-3">
            <FaHome className="mr-2 text-xl" />
            <li>Wszystkie zestawy</li>
          </Link>

          <Link to={'/'} className="flex items-center p-3">
            <FaLaptopMedical className="mr-2 text-xl" />
            <li>Stwórz zestaw</li>
          </Link>

          {false ? (
            <Link to={'/'} className="flex items-center p-3">
              <FaDoorOpen className="mr-2 text-xl" />
              <li>Logowanie i rejestracja</li>
            </Link>
          ) : (
            <>
              <Link to={'/'} className="flex items-center p-3">
                <FaUserCircle className="mr-2 text-xl" />
                <li>Konto</li>
              </Link>

              <div className="flex items-center p-3 cursor-pointer">
                <FaDoorOpen className="mr-2 text-xl" />
                <li>Wyloguj się</li>
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
