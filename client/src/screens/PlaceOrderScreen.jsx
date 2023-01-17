import { useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaTruck, FaCheckCircle, FaHandPointRight, FaInfo } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../features/store'
import { getSetup } from '../features/setupsSlices/getSetup'
import { getCarriers } from '../features/ordersSlices/getCarriers'
import { errorReset, placeOrderReset, placeOrder } from '../features/ordersSlices/placeOrder'
import { placeOrderErrors } from '../validations/ordersValidation'
import Component from '../components/component/Component'
import Loading from '../components/alerts/Loading'
import Error from '../components/alerts/Error'

const PlaceOrderScreen = () => {
  //variables
  const getSetupAbort = useRef()
  const getCarriersAbort = useRef()
  const placeOrderAbort = useRef()

  const { loading, setup, error, errorMessage } = useAppSelector(state => state.getSetup)
  const {
    loading: loading2,
    carriers,
    error: error2,
    errorMessage: errorMessage2,
  } = useAppSelector(state => state.getCarriers)
  const {
    loading: loading3,
    orderId,
    error: error3,
    errorMessage: errorMessage3,
  } = useAppSelector(state => state.placeOrder)
  const dispatch = useAppDispatch()

  const [selectedCarrierPrice, setSelectedCarrierPrice] = useState(0)

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      placeOrderEmail: '',
      placeOrderPhone: '',
      placeOrderFirstname: '',
      placeOrderLastname: '',
      placeOrderAddress: '',
      placeOrderAddressTwo: '',
      placeOrderPostal: '',
      placeOrderCity: '',
      placeOrderCarrier: '',
    },
  })

  const navigate = useNavigate()
  const params = useParams()

  //handlers
  const renderSetupPriceHandler = () => {
    let setupPrice = setup?.case.price
    setupPrice += setup?.cpu?.price || 0
    setupPrice += setup?.mobo?.price || 0
    setupPrice += setup?.ram?.price || 0
    setupPrice += setup?.gpu?.price || 0
    setupPrice += setup?.psu?.price || 0
    setupPrice += setup?.driveOne?.price || 0
    setupPrice += setup?.driveTwo?.price || 0
    setupPrice += setup?.driveThree?.price || 0
    return setupPrice
  }

  const submitHandler = data => {
    const placeOrderPromise = dispatch(
      placeOrder({
        setupId: setup._id,
        carrierId: data.placeOrderCarrier,
        shippingDetails: {
          email: data.placeOrderEmail,
          phone: data.placeOrderPhone,
          firstname: data.placeOrderFirstname,
          lastname: data.placeOrderLastname,
          address: data.placeOrderAddress,
          addressTwo: data.placeOrderAddressTwo,
          postal: data.placeOrderPostal,
          city: data.placeOrderCity,
        },
      })
    )
    placeOrderAbort.current = placeOrderPromise.abort
  }

  //useEffects
  useEffect(() => {
    if (!setup || setup._id !== params.id) {
      const getSetupPromise = dispatch(getSetup({ id: params.id }))
      getSetupAbort.current = getSetupPromise.abort
    }
    if (setup) {
      const getCarriersPromise = dispatch(getCarriers())
      getCarriersAbort.current = getCarriersPromise.abort
    }
    return () => {
      getSetupAbort.current && getSetupAbort.current()
      getCarriersAbort.current && getCarriersAbort.current()
    }
  }, [setup, params.id, dispatch])

  useEffect(() => {
    if (orderId) navigate(`/order/${orderId}`, { replace: true })
    return () => {
      if (placeOrderAbort.current) {
        placeOrderAbort.current()
        dispatch(errorReset())
        dispatch(placeOrderReset())
      }
    }
  }, [orderId, navigate, dispatch])

  return (
    <main className="flex-1">
      <div className="content">
        <div className="mx-2 my-4">
          <h2 className="relative text-xl font-bold">
            ZAKUP ZESTAW
            <Loading
              isOpen={loading}
              customStyle="top-[2px] left-[160px]"
              customLoadingStyle="w-[24px] h-[24px] border-white/20 border-t-white"
            />
          </h2>

          <h4 className="text-sm font-light">{params.id || '-'}</h4>

          <Error
            isOpen={error && errorMessage !== '' ? true : false}
            message={errorMessage}
            customStyle="w-full max-w-[455px] mt-2"
          />
        </div>

        {setup && (
          <>
            <div className="mx-2 mb-6">
              <h2 className="mb-[6px] text-xl font-bold">Komponenty:</h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {setup.case && <Component component={setup.case} />}
                {setup.cpu && <Component component={setup.cpu} />}
                {setup.mobo && <Component component={setup.mobo} />}
                {setup.ram && <Component component={setup.ram} />}
                {setup.gpu && <Component component={setup.gpu} />}
                {setup.psu && <Component component={setup.psu} />}
                {setup.driveOne && <Component component={setup.driveOne} />}
                {setup.driveTwo && <Component component={setup.driveTwo} />}
                {setup.driveThree && <Component component={setup.driveThree} />}
              </div>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="grid mx-2 mb-20 md:gap-9 md:grid-cols-5 md:mb-6">
              <div className="mb-6 md:mb-0 md:col-span-3">
                <h2 className="mb-[5px] text-xl font-bold">Dostawa:</h2>

                <div>
                  <div className="grid mb-2 sm:gap-3 sm:grid-cols-7">
                    <div className="mb-2 sm:col-span-4 sm:mb-0">
                      <label htmlFor="placeOrderEmail" className="text-sm">
                        Podaj adres email*:
                      </label>
                      <input
                        {...register('placeOrderEmail', placeOrderErrors.placeOrderEmail)}
                        type="text"
                        id="placeOrderEmail"
                        placeholder="Email"
                        className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                      />

                      <div className={`relative ${errors.placeOrderEmail && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.placeOrderEmail?.type === 'required' ? true : false}
                          message={placeOrderErrors.placeOrderEmail.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderEmail?.type === 'maxLength' ? true : false}
                          message={placeOrderErrors.placeOrderEmail.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderEmail?.type === 'pattern' ? true : false}
                          message={placeOrderErrors.placeOrderEmail.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="placeOrderPhone" className="text-sm">
                        Podaj numer telefonu*:
                      </label>
                      <input
                        {...register('placeOrderPhone', placeOrderErrors.placeOrderPhone)}
                        type="tel"
                        id="placeOrderPhone"
                        placeholder="+48"
                        className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                      />

                      <div className={`relative ${errors.placeOrderPhone && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.placeOrderPhone?.type === 'required' ? true : false}
                          message={placeOrderErrors.placeOrderPhone.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderPhone?.type === 'pattern' ? true : false}
                          message={placeOrderErrors.placeOrderPhone.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid mb-2 sm:gap-3 sm:grid-cols-2">
                    <div className="mb-2 sm:mb-0">
                      <label htmlFor="placeOrderFirstname" className="text-sm">
                        Podaj imię odbiorcy*:
                      </label>
                      <input
                        {...register('placeOrderFirstname', placeOrderErrors.placeOrderFirstname)}
                        type="text"
                        id="placeOrderFirstname"
                        placeholder="Imię"
                        className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                      />

                      <div className={`relative ${errors.placeOrderFirstname && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.placeOrderFirstname?.type === 'required' ? true : false}
                          message={placeOrderErrors.placeOrderFirstname.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderFirstname?.type === 'maxLength' ? true : false}
                          message={placeOrderErrors.placeOrderFirstname.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderFirstname?.type === 'pattern' ? true : false}
                          message={placeOrderErrors.placeOrderFirstname.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="placeOrderLastname" className="text-sm">
                        Podaj nazwisko odbiorcy*:
                      </label>
                      <input
                        {...register('placeOrderLastname', placeOrderErrors.placeOrderLastname)}
                        type="text"
                        id="placeOrderLastname"
                        placeholder="Nazwisko"
                        className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                      />

                      <div className={`relative ${errors.placeOrderLastname && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.placeOrderLastname?.type === 'required' ? true : false}
                          message={placeOrderErrors.placeOrderLastname.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderLastname?.type === 'maxLength' ? true : false}
                          message={placeOrderErrors.placeOrderLastname.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderLastname?.type === 'pattern' ? true : false}
                          message={placeOrderErrors.placeOrderLastname.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="placeOrderAddress" className="text-sm">
                      Podaj adres*:
                    </label>
                    <input
                      {...register('placeOrderAddress', placeOrderErrors.placeOrderAddress)}
                      type="text"
                      id="placeOrderAddress"
                      placeholder="Ulica, nr domu/mieszkania"
                      className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                    />

                    <div className={`relative ${errors.placeOrderAddress && 'h-[29px] mt-[5px]'}`}>
                      <Error
                        isOpen={errors.placeOrderAddress?.type === 'required' ? true : false}
                        message={placeOrderErrors.placeOrderAddress.required.message}
                        customStyle="absolute w-full"
                      />
                      <Error
                        isOpen={errors.placeOrderAddress?.type === 'maxLength' ? true : false}
                        message={placeOrderErrors.placeOrderAddress.maxLength.message}
                        customStyle="absolute w-full"
                      />
                      <Error
                        isOpen={errors.placeOrderAddress?.type === 'pattern' ? true : false}
                        message={placeOrderErrors.placeOrderAddress.pattern.message}
                        customStyle="absolute w-full"
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="placeOrderAddressTwo" className="text-sm">
                      Podaj drugą część adresu:
                    </label>
                    <input
                      {...register('placeOrderAddressTwo', placeOrderErrors.placeOrderAddressTwo)}
                      type="text"
                      id="placeOrderAddressTwo"
                      placeholder="Nr lokalu (opcjonalne)"
                      className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                    />

                    <div className={`relative ${errors.placeOrderAddressTwo && 'h-[29px] mt-[5px]'}`}>
                      <Error
                        isOpen={errors.placeOrderAddressTwo?.type === 'maxLength' ? true : false}
                        message={placeOrderErrors.placeOrderAddressTwo.maxLength.message}
                        customStyle="absolute w-full"
                      />
                      <Error
                        isOpen={errors.placeOrderAddressTwo?.type === 'pattern' ? true : false}
                        message={placeOrderErrors.placeOrderAddressTwo.pattern.message}
                        customStyle="absolute w-full"
                      />
                    </div>
                  </div>

                  <div className="grid mb-6 sm:gap-3 sm:grid-cols-5">
                    <div className="mb-2 sm:col-span-2 sm:mb-0">
                      <label htmlFor="placeOrderPostal" className="text-sm">
                        Podaj kod pocztowy*:
                      </label>
                      <input
                        {...register('placeOrderPostal', placeOrderErrors.placeOrderPostal)}
                        type="text"
                        id="placeOrderPostal"
                        placeholder="00-000"
                        className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                      />

                      <div className={`relative ${errors.placeOrderPostal && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.placeOrderPostal?.type === 'required' ? true : false}
                          message={placeOrderErrors.placeOrderPostal.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderPostal?.type === 'pattern' ? true : false}
                          message={placeOrderErrors.placeOrderPostal.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="placeOrderCity" className="text-sm">
                        Podaj miejscowość*:
                      </label>
                      <input
                        {...register('placeOrderCity', placeOrderErrors.placeOrderCity)}
                        type="text"
                        id="placeOrderCity"
                        placeholder="Miejscowość"
                        className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                      />

                      <div className={`relative ${errors.placeOrderCity && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          isOpen={errors.placeOrderCity?.type === 'required' ? true : false}
                          message={placeOrderErrors.placeOrderCity.required.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderCity?.type === 'maxLength' ? true : false}
                          message={placeOrderErrors.placeOrderCity.maxLength.message}
                          customStyle="absolute w-full"
                        />
                        <Error
                          isOpen={errors.placeOrderCity?.type === 'pattern' ? true : false}
                          message={placeOrderErrors.placeOrderCity.pattern.message}
                          customStyle="absolute w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <div className="flex items-center col-span-2 -mb-1 text-sm sm:col-span-3">
                      <label>Wybierz metodę dostawy*:</label>
                      <Loading
                        isOpen={loading2}
                        customStyle="ml-[192px]"
                        customLoadingStyle="w-[20px] h-[20px] border-white/20 border-t-white"
                      />
                    </div>
                    <input
                      {...register('placeOrderCarrier', placeOrderErrors.placeOrderCarrier)}
                      type="text"
                      id="placeOrderCarrier"
                      className="absolute left-0 h-0"
                    />
                    <Error
                      isOpen={error2 && errorMessage2 !== '' ? true : false}
                      message={errorMessage2}
                      customStyle="col-span-2 sm:col-span-3 w-full max-w-[455px]"
                    />

                    {carriers &&
                      carriers.map(carrier => (
                        <button
                          key={carrier._id}
                          type="button"
                          onClick={() => {
                            setValue('placeOrderCarrier', carrier._id, { shouldValidate: true })
                            setSelectedCarrierPrice(carrier.price)
                          }}
                          className={`border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative flex flex-col justify-center items-center ${
                            getValues('placeOrderCarrier') === carrier._id ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          <FaTruck />
                          <p className="mt-[3px] mb-1 text-sm truncate">{carrier.name}</p>
                          <p className="text-xs">{(carrier.price / 100).toFixed(2)} zł</p>
                          {getValues('placeOrderCarrier') === carrier._id && (
                            <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />
                          )}
                        </button>
                      ))}

                    <div className={`relative col-span-2 sm:col-span-3 ${errors.placeOrderCarrier && 'h-[29px] -mt-[3px]'}`}>
                      <Error
                        isOpen={errors.placeOrderCarrier?.type === 'required' ? true : false}
                        message={placeOrderErrors.placeOrderCarrier.required.message}
                        customStyle="absolute w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="mb-[6px] text-xl font-bold">Podsumowanie:</h2>

                <div>
                  <div className="text-xs text-white/80">Cena zestawu</div>
                  <div className="font-semibold text-white/80">
                    <span className="mr-1 text-lg">{(renderSetupPriceHandler() / 100).toFixed(2)}</span>
                    <span className="font-light">zł</span>
                  </div>

                  <div className="text-xs text-white/80">Cena dostawy</div>
                  <div className="font-semibold text-white/80">
                    <span className="mr-1 text-lg">{(selectedCarrierPrice / 100).toFixed(2)}</span>
                    <span className="font-light">zł</span>
                  </div>

                  <div className="text-sm">Suma</div>
                  <div className="font-semibold">
                    <span className="mr-1 text-xl">
                      {((renderSetupPriceHandler() + selectedCarrierPrice) / 100).toFixed(2)}
                    </span>
                    <span className="font-light">zł</span>
                  </div>
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    disabled={loading || loading2 || loading3}
                    className="flex justify-center items-center gap-2 px-3 mt-3 mb-4 py-[6px] text-lg font-semibold border-2 rounded-xl transition active:scale-95 hover:bg-white/10"
                  >
                    <FaHandPointRight />
                    Złóż zamówienie
                  </button>

                  <Loading
                    isOpen={loading3}
                    customStyle="bottom-[7px] left-[212px]"
                    customLoadingStyle="w-[30px] h-[30px] border-white/20 border-t-white"
                  />
                </div>

                <Error
                  isOpen={error3 && errorMessage3 !== '' ? true : false}
                  message={errorMessage3}
                  customStyle="w-full max-w-[280px] -mt-2 mb-4"
                />

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="text-3xl">
                    <FaInfo />
                  </div>
                  <p className="w-[180px]">
                    Po złożeniu zamówienia masz <b>15 minut</b> na jego opłacenie. W przeciwnym przypadku zostanie ono
                    anulowane.
                  </p>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  )
}

export default PlaceOrderScreen
