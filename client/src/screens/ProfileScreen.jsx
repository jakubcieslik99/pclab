import { useState } from 'react'
import { FaUserCircle, FaCubes, FaMoneyCheckAlt, FaHeart, FaBoxes } from 'react-icons/fa'
import CredentialsModal from '../components/profileScreen/CredentialsModal'
import DeleteModal from '../components/profileScreen/DeleteModal'
import OrderedSetup from '../components/setup/OrderedSetup'
import Setup from '../components/setup/Setup'

const ProfileScreen = () => {
  //variables
  const [logged] = useState(true)

  const [credentialsModalIsOpen, setCredentialsModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

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
                <button
                  type="button"
                  onClick={() => setCredentialsModalIsOpen(true)}
                  className="flex items-center justify-center px-2 py-1 text-sm transition border-2 rounded-xl active:scale-95 hover:bg-white/10"
                >
                  <span>Zmień email/hasło</span>
                </button>
                <CredentialsModal isOpen={credentialsModalIsOpen} setIsOpen={setCredentialsModalIsOpen} />

                <button
                  type="button"
                  onClick={() => setDeleteModalIsOpen(true)}
                  className="flex items-center justify-center px-2 py-1 text-sm transition border-2 rounded-xl active:scale-95 hover:bg-white/10"
                >
                  <span>Usuń konto</span>
                </button>
                <DeleteModal isOpen={deleteModalIsOpen} setIsOpen={setDeleteModalIsOpen} />
              </div>
            </>
          }
        </div>

        <div className="grid mx-2 mb-20 md:gap-9 md:mb-6 md:grid-cols-2 lg:grid-cols-3">
          {logged && (
            <>
              <div className="pb-[14px] mb-[14px] border-b md:pb-0 md:mb-0 md:border-none">
                <h3 className="flex items-center gap-[6px] text-lg font-semibold mb-2">
                  <FaMoneyCheckAlt />
                  <span>Moje zamówienia:</span>
                </h3>

                {
                  <div className="grid grid-cols-1 gap-5 max-w-[479.5px] max-h-[650px] rounded-xl internal-scroll">
                    <OrderedSetup />
                    <OrderedSetup />
                  </div> /**/
                }
                {/*<div className="flex items-center justify-center gap-[6px] mt-6 mb-3 max-w-[479.5px]">
                    <span>Brak</span>
                    <FaCubes />
                  </div> /**/}
              </div>

              <div className="pb-[14px] mb-[14px] border-b md:pb-0 md:mb-0 md:border-none">
                <h3 className="flex items-center gap-[6px] text-lg font-semibold mb-2">
                  <FaHeart />
                  <span>Moje ulubione:</span>
                </h3>

                {
                  <div className="grid grid-cols-1 gap-5 max-w-[479.5px] max-h-[650px] rounded-xl internal-scroll">
                    <Setup />
                    <Setup />
                  </div> /**/
                }
                {/*<div className="flex items-center justify-center gap-[6px] mt-6 mb-3 max-w-[479.5px]">
                  <span>Brak</span>
                  <FaCubes />
                </div> /**/}
              </div>
            </>
          )}

          <div className={`md:col-span-2 ${logged ? 'lg:col-span-1' : 'lg:col-span-full'}`}>
            <h3 className="flex items-center gap-[6px] text-lg font-semibold mb-2">
              <FaBoxes />
              <span>{logged ? 'Moje zestawy:' : 'Zestawy użytkownika:'}</span>
            </h3>

            {
              <div
                className={`grid md:grid-cols-2 ${
                  logged ? 'lg:grid-cols-1 max-w-[479.5px] max-h-[650px] internal-scroll' : 'lg:grid-cols-3'
                } gap-5 rounded-xl`}
              >
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
                <Setup setButton="edit" buttonClickHandler={() => console.log('edit')} />
              </div> /**/
            }
            {/*<div className="flex items-center justify-center gap-[6px] mt-6 mb-3 max-w-[479.5px]">
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
