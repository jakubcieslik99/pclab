import { Link } from 'react-router-dom'
import Error from '../components/alerts/Error'
import Success from '../components/alerts/Success'

const RegisterScreen = () => {
  const submitHandler = e => {
    e.preventDefault()
    console.log('submitHandler')
  }

  return (
    <main className="flex-1">
      <div className="flex flex-col items-center justify-center h-full content">
        <form onSubmit={submitHandler} className="flex flex-col w-full max-w-md gap-[10px] px-2 md:px-0 pt-4 pb-10">
          <div className="flex justify-center mb-2">
            <h1 className="text-3xl font-semibold">Rejestracja</h1>
          </div>

          <Error isOpen={true} message={'Test error'} />
          <Success isOpen={true} message={'Test success'} />

          <div>
            <label htmlFor="registerEmail" className="text-sm">
              Podaj adres email:
            </label>
            <input
              type="text"
              id="registerEmail"
              name="email"
              placeholder="Email"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className="flex flex-col gap-1 mt-[5px]">
              <Error isOpen={false} message={'Test error'} />
            </div>
          </div>

          <div>
            <label htmlFor="registerNick" className="text-sm">
              Podaj nick:
            </label>
            <input
              type="text"
              id="registerNick"
              name="nick"
              placeholder="Nick"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className="flex flex-col gap-1 mt-[5px]">
              <Error isOpen={false} message={'Test error'} />
            </div>
          </div>

          <div>
            <label htmlFor="registerPassword" className="text-sm">
              Podaj hasło:
            </label>
            <input
              type="password"
              id="registerPassword"
              name="password"
              placeholder="Hasło"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className="flex flex-col gap-1 mt-[5px]">
              <Error isOpen={true} message={'Test error'} />
            </div>
          </div>

          <div>
            <label htmlFor="registerRepassword" className="text-sm">
              Powtórz hasło:
            </label>
            <input
              type="password"
              id="registerRepassword"
              name="repassword"
              placeholder="Powtórz hasło"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className="flex flex-col gap-1 mt-[5px]">
              <Error isOpen={false} message={'Test error'} />
            </div>
          </div>

          <div className="mt-1">
            <div className="flex items-center gap-[10px]">
              <input type="checkbox" id="registerTerms" name="terms" />
              <label htmlFor="registerTerms" className="leading-tight text-gray-200 cursor-pointer">
                Potwierdź zapoznanie się z regulaminem
              </label>
            </div>

            <div className="flex flex-col gap-1 mt-[5px]">
              <Error isOpen={true} message={'Test error'} />
            </div>
          </div>

          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="px-3 py-[6px] text-lg font-semibold border-2 rounded-xl transition active:scale-95 hover:bg-white/10"
            >
              ZAREJESTRUJ SIĘ
            </button>
          </div>

          <div className="flex justify-center mt-2">
            <Link to="/login" className="text-sm font-light underline">
              Masz już konto? Zaloguj się!
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default RegisterScreen
