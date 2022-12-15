import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PasswordResetModal from '../components/loginScreen/PasswordResetModal'
import PasswordSetModal from '../components/loginScreen/PasswordSetModal'
import Error from '../components/alerts/Error'
import Success from '../components/alerts/Success'

const LoginScreen = () => {
  //variables
  const [setParam] = useState(false)

  const [passwordResetModalIsOpen, setPasswordResetModalIsOpen] = useState(false)
  const [passwordSetModalIsOpen, setPasswordSetModalIsOpen] = useState(false)

  //handlers
  const submitHandler = e => {
    e.preventDefault()
    console.log('submitHandler')
  }

  //useEffects
  useEffect(() => {
    setParam && setPasswordSetModalIsOpen(true)
  }, [setParam])

  return (
    <main className="flex-1">
      <div className="flex flex-col items-center justify-center h-full content">
        <form onSubmit={submitHandler} className="flex flex-col w-full max-w-md gap-[10px] px-2 md:px-0 pt-4 pb-10">
          <div className="flex justify-center mb-2">
            <h1 className="text-3xl font-semibold">Logowanie</h1>
          </div>

          <Error isOpen={true} message={'Test error'} />
          <Success isOpen={true} message={'Test success'} />
          <Success isOpen={true} message={'Potwierdzenie konta przebiegło pomyślnie! Możesz się zalogować.'} />

          <div>
            <label htmlFor="loginEmail" className="text-sm">
              Podaj adres email:
            </label>
            <input
              type="text"
              id="loginEmail"
              name="email"
              placeholder="Email"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className="flex flex-col gap-1 mt-[5px]">
              <Error isOpen={false} message={'Test error'} />
            </div>
          </div>

          <div>
            <label htmlFor="loginPassword" className="text-sm">
              Podaj hasło:
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              placeholder="Hasło"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className="flex flex-col gap-1 mt-[5px]">
              <Error isOpen={true} message={'Test error'} />
            </div>
          </div>

          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="px-3 py-[6px] text-lg font-semibold border-2 rounded-xl transition active:scale-95 hover:bg-white/10"
            >
              ZALOGUJ SIĘ
            </button>
          </div>

          <div className="flex justify-center mt-2">
            <Link to="/register" className="text-sm font-light underline">
              Nie masz konta? Zarejestruj się!
            </Link>
          </div>

          <div className="flex justify-center mt-1">
            <button type="button" onClick={() => setPasswordResetModalIsOpen(true)} className="text-sm font-light underline">
              Nie pamiętasz hasła?
            </button>
          </div>
        </form>

        <PasswordResetModal isOpen={passwordResetModalIsOpen} setIsOpen={setPasswordResetModalIsOpen} />
        <PasswordSetModal isOpen={passwordSetModalIsOpen} setIsOpen={setPasswordSetModalIsOpen} />
      </div>
    </main>
  )
}

export default LoginScreen
