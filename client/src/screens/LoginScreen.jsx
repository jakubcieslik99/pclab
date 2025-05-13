import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../features/store'
import { successReset, errorReset, login } from '../features/authSlices/manageAccount'
import {
  successReset as successReset2,
  errorReset as errorReset2,
  confirmAccount,
} from '../features/authSlices/confirmAccount'
import { loginErrors } from '../validations/authValidation'
import PasswordResetModal from '../components/loginScreen/PasswordResetModal'
import PasswordSetModal from '../components/loginScreen/PasswordSetModal'
import Loading from '../components/alerts/Loading'
import Success from '../components/alerts/Success'
import Error from '../components/alerts/Error'

const LoginScreen = () => {
  // variables
  const loginAbort = useRef()
  const confirmAccountAbort = useRef()

  const { loading, success, successMessage, error, errorMessage, userInfo } = useAppSelector(state => state.manageAccount)
  const {
    loading: loading2,
    success: success2,
    successMessage: successMessage2,
    error: error2,
    errorMessage: errorMessage2,
  } = useAppSelector(state => state.confirmAccount)
  const dispatch = useAppDispatch()

  const [passwordResetModalIsOpen, setPasswordResetModalIsOpen] = useState(false)
  const [passwordSetModalIsOpen, setPasswordSetModalIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({ defaultValues: { loginEmail: '', loginPassword: '' } })

  const navigate = useNavigate()
  const { state } = useLocation()
  const locationFrom = state?.from || '/'
  const [searchParams] = useSearchParams()

  // handlers
  const submitHandler = data => {
    success2 && dispatch(successReset2())
    error2 && dispatch(errorReset2())

    const loginPromise = dispatch(login({ email: data.loginEmail, password: data.loginPassword }))
    loginAbort.current = loginPromise.abort
  }

  // useEffects
  useEffect(() => {
    if (!success && userInfo) navigate(locationFrom, { replace: true })
    else if (success && userInfo) setTimeout(() => dispatch(successReset()), 3000)
  }, [success, userInfo, locationFrom, navigate, dispatch])

  useEffect(() => {
    const confirmToken = searchParams.get('confirmToken')
    const resetToken = searchParams.get('resetToken')

    if (resetToken) setPasswordSetModalIsOpen(true)
    else if (confirmToken) {
      const confirmAccountPromise = dispatch(confirmAccount({ token: confirmToken }))
      confirmAccountAbort.current = confirmAccountPromise.abort
    }
  }, [searchParams, dispatch])

  useEffect(() => {
    return () => {
      if (loginAbort.current) {
        loginAbort.current()
        dispatch(successReset())
        dispatch(errorReset())
      }
      if (confirmAccountAbort.current) {
        confirmAccountAbort.current()
        dispatch(successReset2())
        dispatch(errorReset2())
      }
    }
  }, [dispatch])

  return (
    <main className="flex-1">
      <div className="flex flex-col items-center justify-center h-full content">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col w-full max-w-md gap-[10px] px-2 md:px-0 pt-4 pb-10"
        >
          <div className="flex justify-center mb-2">
            <h1 className="relative text-3xl font-semibold">
              Logowanie
              <Loading
                isOpen={loading || loading2}
                customStyle="top-[3px] -right-[40px]"
                customLoadingStyle="w-[30px] h-[30px] border-white/20 border-t-white"
              />
            </h1>
          </div>

          <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />
          <Success isOpen={success2 && successMessage2 !== '' ? true : false} message={successMessage2} />
          <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />
          <Error isOpen={error2 && errorMessage2 !== '' ? true : false} message={errorMessage2} />

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
              disabled={loading || loading2}
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
            <button
              disabled={loading || loading2}
              type="button"
              onClick={() => setPasswordResetModalIsOpen(true)}
              className="text-sm font-light underline"
            >
              Nie pamiętasz hasła?
            </button>
          </div>
        </form>

        <PasswordResetModal isOpen={passwordResetModalIsOpen} setIsOpen={setPasswordResetModalIsOpen} />
        <PasswordSetModal
          isOpen={passwordSetModalIsOpen}
          setIsOpen={setPasswordSetModalIsOpen}
          token={searchParams.get('resetToken')}
        />
      </div>
    </main>
  )
}

export default LoginScreen
