import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../features/store'
import { successReset, errorReset, registerAccount } from '../features/authSlices/manageAccount'
import { registerErrors } from '../validations/authValidation'
import Loading from '../components/alerts/Loading'
import Success from '../components/alerts/Success'
import Error from '../components/alerts/Error'

const RegisterScreen = () => {
  //variables
  const registerAccountAbort = useRef()

  const { loading, success, successMessage, error, errorMessage, userInfo } = useAppSelector(state => state.manageAccount)
  const dispatch = useAppDispatch()

  const {
    register,
    watch,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registerEmail: '',
      registerNick: '',
      registerPassword: '',
      registerRepassword: '',
      registerTerms: false,
    },
  })

  const navigate = useNavigate()

  //handlers
  const submitHandler = data => {
    const registerAccountPromise = dispatch(
      registerAccount({
        email: data.registerEmail,
        nick: data.registerNick,
        password: data.registerPassword,
        repassword: data.registerRepassword,
        terms: data.registerTerms,
      })
    )
    registerAccountAbort.current = registerAccountPromise.abort
  }

  //useEffects
  useEffect(() => {
    userInfo && navigate('/')
  }, [userInfo, navigate])

  useEffect(() => {
    return () => {
      if (registerAccountAbort.current) {
        registerAccountAbort.current()
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
          className="flex flex-col w-full max-w-md gap-[10px] px-2 md:px-0 pt-4 pb-10"
        >
          <div className="flex justify-center mb-2">
            <h1 className="relative text-3xl font-semibold">
              Rejestracja
              <Loading isOpen={loading} customStyle="top-[3px] -right-[38px]" />
            </h1>
          </div>

          <Success isOpen={success && successMessage !== '' ? true : false} message={successMessage} />
          <Error isOpen={error && errorMessage !== '' ? true : false} message={errorMessage} />

          <div>
            <label htmlFor="registerEmail" className="text-sm">
              Podaj adres email:
            </label>
            <input
              {...register('registerEmail', registerErrors.registerEmail)}
              type="text"
              id="registerEmail"
              placeholder="Email"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className={`relative ${errors.registerEmail && 'h-[29px] mt-[5px]'}`}>
              <Error
                isOpen={errors.registerEmail?.type === 'required' ? true : false}
                message={registerErrors.registerEmail.required.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.registerEmail?.type === 'maxLength' ? true : false}
                message={registerErrors.registerEmail.maxLength.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.registerEmail?.type === 'pattern' ? true : false}
                message={registerErrors.registerEmail.pattern.message}
                customStyle="absolute w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="registerNick" className="text-sm">
              Podaj nick:
            </label>
            <input
              {...register('registerNick', registerErrors.registerNick)}
              type="text"
              id="registerNick"
              placeholder="Nick"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className={`relative ${errors.registerNick && 'h-[29px] mt-[5px]'}`}>
              <Error
                isOpen={errors.registerNick?.type === 'required' ? true : false}
                message={registerErrors.registerNick.required.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.registerNick?.type === 'maxLength' ? true : false}
                message={registerErrors.registerNick.maxLength.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.registerNick?.type === 'pattern' ? true : false}
                message={registerErrors.registerNick.pattern.message}
                customStyle="absolute w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="registerPassword" className="text-sm">
              Podaj hasło:
            </label>
            <input
              {...register('registerPassword', registerErrors.registerPassword)}
              type="password"
              id="registerPassword"
              placeholder="Hasło"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className={`relative ${errors.registerPassword && 'h-[29px] mt-[5px]'}`}>
              <Error
                isOpen={errors.registerPassword?.type === 'required' ? true : false}
                message={registerErrors.registerPassword.required.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.registerPassword?.type === 'minLength' ? true : false}
                message={registerErrors.registerPassword.minLength.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.registerPassword?.type === 'maxLength' ? true : false}
                message={registerErrors.registerPassword.maxLength.message}
                customStyle="absolute w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="registerRepassword" className="text-sm">
              Powtórz hasło:
            </label>
            <input
              {...register('registerRepassword', {
                ...registerErrors.registerRepassword,
                validate: value => value === watch('registerPassword'),
              })}
              type="password"
              id="registerRepassword"
              placeholder="Powtórz hasło"
              className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
            />

            <div className={`relative ${errors.registerRepassword && 'h-[29px] mt-[5px]'}`}>
              <Error
                isOpen={errors.registerRepassword?.type === 'required' ? true : false}
                message={registerErrors.registerRepassword.required.message}
                customStyle="absolute w-full"
              />
              <Error
                isOpen={errors.registerRepassword?.type === 'validate' ? true : false}
                message={'Hasła nie są takie same.'}
                customStyle="absolute w-full"
              />
            </div>
          </div>

          <div className="mt-1">
            <div className="flex items-center gap-[10px]">
              <input {...register('registerTerms', registerErrors.registerTerms)} type="checkbox" id="registerTerms" />
              <label htmlFor="registerTerms" className="leading-tight text-gray-200 cursor-pointer">
                Potwierdź zapoznanie się z regulaminem
              </label>
            </div>

            <div className={`relative ${errors.registerTerms && 'h-[29px] mt-[5px]'}`}>
              <Error
                isOpen={errors.registerTerms?.type === 'required' ? true : false}
                message={registerErrors.registerTerms.required.message}
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
