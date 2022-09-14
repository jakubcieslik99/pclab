import { useState } from 'react'
import { FaUserCircle, FaCubes } from 'react-icons/fa'
import Setup from '../components/setup/Setup'

const ProfileScreen = () => {
  const [logged] = useState(true)

  return (
    <main className="flex-1">
      <div className="content">
        <div className="flex flex-col mx-2 mt-4 mb-[14px] pb-[14px] md:items-center border-b">
          <h2 className="flex gap-2 mb-[3px] text-xl font-bold truncate items-center">
            <FaUserCircle className="flex-none" />
            <span className="truncate">{'JohnDoe'}</span>
          </h2>

          {
            <>
              <div className="mb-2 font-light truncate">{'johndoe@gmail.com'}</div>

              <div className="flex gap-3">
                <button className="flex items-center justify-center px-2 py-1 text-sm border-2 rounded-xl">
                  <span>Zmień email/hasło</span>
                </button>
                <button className="flex items-center justify-center px-2 py-1 text-sm border-2 rounded-xl">
                  <span>Usuń konto</span>
                </button>
              </div>
            </>
          }
        </div>

        <div className="grid mx-2 mb-20 md:gap-6 md:mb-6 md:grid-cols-2 lg:grid-cols-3">
          {logged && (
            <div className="pb-[14px] mb-[14px] border-b md:pb-0 md:mb-0 md:border-none">
              <h3 className="flex items-center gap-[5px] text-lg font-semibold mb-2">
                <span>Moje zamówienia:</span>
              </h3>

              {
                <div className="grid grid-cols-1 gap-4">
                  <Setup />
                  <Setup />
                </div> /**/
              }
              {/*<div className="flex items-center justify-center gap-[6px] mt-6 mb-3">
                  <span>Brak</span>
                  <FaCubes />
                </div> /**/}
            </div>
          )}

          <div className={`${logged ? 'lg:col-span-2 md:ml-2' : 'md:col-span-full'}`}>
            <h3 className="flex items-center gap-[5px] text-lg font-semibold mb-2">
              <span>{logged ? 'Moje zestawy:' : 'Zestawy:'}</span>
            </h3>

            {
              <div className={`grid ${logged ? 'lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
              </div> /**/
            }
            {/*<div className="flex items-center justify-center gap-[6px] mt-6 mb-3">
                <span>Brak</span>
                <FaCubes />
              </div> /**/}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfileScreen
