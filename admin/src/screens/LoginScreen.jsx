import { useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../features/store'
import { successReset, errorReset, login } from '../features/authSlices/manageAccount'
import { loginErrors } from '../validations/authValidation'
import Loading from '../components/alerts/Loading'
import Success from '../components/alerts/Success'
import Error from '../components/alerts/Error'

const LoginScreen = () => {
  // variables
  const loginAbort = useRef()

  const { loading, success, successMessage, error, errorMessage, userInfo } = useAppSelector(state => state.manageAccount)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({ defaultValues: { loginEmail: '', loginPassword: '' } })

  const navigate = useNavigate()
  const { state } = useLocation()
  const locationFrom = state?.from || '/'

  // handlers
  const submitHandler = data => {
    const loginPromise = dispatch(login({ email: data.loginEmail, password: data.loginPassword }))
    loginAbort.current = loginPromise.abort
  }

  // useEffects
  useEffect(() => {
    if (!success && userInfo) navigate(locationFrom, { replace: true })
    else if (success && userInfo) setTimeout(() => dispatch(successReset()), 3000)
  }, [success, userInfo, locationFrom, navigate, dispatch])

  useEffect(() => {
    return () => {
      if (loginAbort.current) {
        loginAbort.current()
        dispatch(successReset())
        dispatch(errorReset())
      }
    }
  }, [dispatch])

  return (
    <main className="flex-1">
      <div className="flex flex-col items-center justify-center h-full content">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col w-full max-w-md gap-[10px] px-5 pt-4 pb-6 rounded-xl bg-gray-800"
        >
          <div className="flex justify-center mb-2">
            <h1 className="relative text-3xl font-semibold">
              Logowanie
              <Loading
                isOpen={loading}
                customStyle="top-[3px] -right-[20px]"
                customLoadingStyle="w-[30px] h-[30px] border-white/20 border-t-white"
              />
            </h1>
          </div>

          <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />
          <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />

          <div>
            <label htmlFor="loginEmail" className="text-sm">
              Podaj adres email:
            </label>
            <input
              {...register('loginEmail', loginErrors.loginEmail)}
              type="text"
              id="loginEmail"
              placeholder="Email"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className={`relative ${errors.loginEmail && 'h-[29px] mt-[5px]'}`}>
              <Error
                isOpen={errors.loginEmail?.type === 'required' ? true : false}
                message={loginErrors.loginEmail.required.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.loginEmail?.type === 'maxLength' ? true : false}
                message={loginErrors.loginEmail.maxLength.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.loginEmail?.type === 'pattern' ? true : false}
                message={loginErrors.loginEmail.pattern.message}
                customStyle="absolute w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="loginPassword" className="text-sm">
              Podaj hasło:
            </label>
            <input
              {...register('loginPassword', loginErrors.loginPassword)}
              type="password"
              id="loginPassword"
              placeholder="Hasło"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className={`relative ${errors.loginPassword && 'h-[29px] mt-[5px]'}`}>
              <Error
                isOpen={errors.loginPassword?.type === 'required' ? true : false}
                message={loginErrors.loginPassword.required.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.loginPassword?.type === 'minLength' ? true : false}
                message={loginErrors.loginPassword.minLength.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.loginPassword?.type === 'maxLength' ? true : false}
                message={loginErrors.loginPassword.maxLength.message}
                customStyle="absolute w-full"
              />
            </div>
          </div>

          <div className="flex justify-center mt-3">
            <button
              disabled={loading}
              type="submit"
              className="px-3 py-[6px] text-lg font-semibold border-2 rounded-xl transition active:scale-95 hover:bg-white/10"
            >
              ZALOGUJ SIĘ
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default LoginScreen
