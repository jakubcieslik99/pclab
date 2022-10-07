import { useState } from 'react'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { FaCheckCircle } from 'react-icons/fa'
import Component from '../components/component/Component'
import Error from '../components/alerts/Error'
import appearance from '../components/placeOrderScreen/appearance'

const PlaceOrderScreen = props => {
  const [id, setId] = useState('507f1f77bcf86cd799439011')

  const stripeOptions = {
    clientSecret: 'pi_3LEYnSJtbJWEJlni0fCsj5Hr_secret_FJr5evFCIkDlPu2O9pvoI0oxQ',
    locale: 'pl',
    fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap' }],
    appearance,
  }

  const submitHandler = e => {
    e.preventDefault()
    console.log('submitHandler')
  }

  return (
    <Elements stripe={props.stripePromise} options={stripeOptions}>
      <main className="flex-1">
        <div className="content">
          <div className="mx-2 my-4">
            <h2 className="text-xl font-bold">ZAKUP ZESTAW</h2>
            {id && <h4 className="text-sm font-light">{id}</h4>}
          </div>

          <div className="mx-2 mb-6">
            <h2 className="mb-[6px] text-xl font-bold">Komponenty:</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {true && <Component name="Obudowa" order />}
              {true && <Component name="Procesor" order />}
              {true && <Component name="Płyta główna" order />}
              {true && <Component name="Pamięć RAM" order />}
              {true && <Component name="Karta graficzna" order />}
              {true && <Component name="Zasilacz" order />}
              {true && <Component name="Dysk #1" order />}
              {false && <Component name="Dysk #2" order />}
              {false && <Component name="Dysk #3" order />}
            </div>
          </div>

          <form onSubmit={submitHandler} className="grid mx-2 mb-20 md:gap-9 md:grid-cols-5 md:mb-6">
            <div className="mb-6 md:mb-0 md:col-span-3">
              <h2 className="mb-[5px] text-xl font-bold">Wysyłka:</h2>

              <div>
                <div className="grid mb-2 md:gap-3 md:grid-cols-7">
                  <div className="md:col-span-4">
                    <label htmlFor="placeOrderEmail" className="text-sm">
                      Podaj adres email*:
                    </label>
                    <input
                      type="text"
                      id="placeOrderEmail"
                      name="email"
                      placeholder="Email"
                      className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                    />

                    <div className="flex flex-col gap-1 mt-[5px]">
                      <Error isOpen={false} message={'Test error'} />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="placeOrderPhone" className="text-sm">
                      Podaj numer telefonu*:
                    </label>
                    <input
                      type="tel"
                      id="placeOrderPhone"
                      name="phone"
                      placeholder="+48"
                      className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                    />

                    <div className="flex flex-col gap-1 mt-[5px]">
                      <Error isOpen={false} message={'Test error'} />
                    </div>
                  </div>
                </div>

                <div className="grid md:gap-3 md:grid-cols-2">
                  <div>
                    <label htmlFor="placeOrderFirstname" className="text-sm">
                      Podaj imię odbiorcy*:
                    </label>
                    <input
                      type="text"
                      id="placeOrderFirstname"
                      name="firstname"
                      placeholder="Imię"
                      className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                    />

                    <div className="flex flex-col gap-1 mt-[5px]">
                      <Error isOpen={false} message={'Test error'} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="placeOrderLastname" className="text-sm">
                      Podaj nazwisko odbiorcy*:
                    </label>
                    <input
                      type="text"
                      id="placeOrderLastname"
                      name="lastname"
                      placeholder="Nazwisko"
                      className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                    />

                    <div className="flex flex-col gap-1 mt-[5px]">
                      <Error isOpen={false} message={'Test error'} />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="registerEmail" className="text-sm">
                    Podaj adres*:
                  </label>
                  <input
                    type="text"
                    id="placeOrderAddress"
                    name="address"
                    placeholder="Ulica, nr domu/mieszkania"
                    className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                  />

                  <div className="flex flex-col gap-1 mt-[5px]">
                    <Error isOpen={false} message={'Test error'} />
                  </div>
                </div>

                <div>
                  <label htmlFor="placeOrderAddressTwo" className="text-sm">
                    Podaj drugą część adresu:
                  </label>
                  <input
                    type="text"
                    id="placeOrderAddressTwo"
                    name="addressTwo"
                    placeholder="Nr lokalu (opcjonalne)"
                    className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                  />

                  <div className="flex flex-col gap-1 mt-[5px]">
                    <Error isOpen={false} message={'Test error'} />
                  </div>
                </div>

                <div className="grid mb-6 md:gap-3 md:grid-cols-5">
                  <div className="md:col-span-2">
                    <label htmlFor="placeOrderPostal" className="text-sm">
                      Podaj kod pocztowy*:
                    </label>
                    <input
                      type="text"
                      id="placeOrderPostal"
                      name="postal"
                      placeholder="00-000"
                      className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                    />

                    <div className="flex flex-col gap-1 mt-[5px]">
                      <Error isOpen={false} message={'Test error'} />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="placeOrderCity" className="text-sm">
                      Podaj miejscowość*:
                    </label>
                    <input
                      type="text"
                      id="placeOrderCity"
                      name="city"
                      placeholder="Miejscowość"
                      className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 w-full focus:outline-none"
                    />

                    <div className="flex flex-col gap-1 mt-[5px]">
                      <Error isOpen={false} message={'Test error'} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  <button type="button" className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative">
                    <p className="mb-1 text-sm truncate">Kurier DPD</p>
                    <p className="text-xs">0000.00 PLN</p>
                    {true && <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />}
                  </button>

                  <button type="button" className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative">
                    <p className="mb-1 text-sm">Kurier InPost</p>
                    <p className="text-xs">0000.00 PLN</p>
                    {true && <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />}
                  </button>

                  <button type="button" className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative">
                    <p className="mb-1 text-sm">Kurier DPD</p>
                    <p className="text-xs">0000.00 PLN</p>
                    {true && <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />}
                  </button>

                  <button type="button" className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative">
                    <p className="mb-1 text-sm">Kurier InPost</p>
                    <p className="text-xs">0000.00 PLN</p>
                    {true && <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="mb-6">
                <h2 className="mb-[3px] text-xl font-bold">Podsumowanie:</h2>

                <div>
                  <div className="text-xs text-white/80">Cena zestawu</div>
                  <div className="font-semibold text-white/80">
                    <span className="mr-1 text-lg">{'00000.00'}</span>
                    <span className="font-light">zł</span>
                  </div>

                  <div className="text-xs text-white/80">Cena dostawy</div>
                  <div className="font-semibold text-white/80">
                    <span className="mr-1 text-lg">{'0000.00'}</span>
                    <span className="font-light">zł</span>
                  </div>

                  <div className="text-sm">Suma</div>
                  <div className="font-semibold">
                    <span className="mr-1 text-xl">{'00000.00'}</span>
                    <span className="font-light">zł</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-[5px] text-xl font-bold">Płatność:</h2>

                <div>
                  <PaymentElement />
                  <button
                    type="submit"
                    className="px-3 py-[6px] text-lg font-semibold border-2 rounded-xl transition active:scale-95 hover:bg-white/10 mt-4"
                  >
                    Zapłać
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Elements>
  )
}

export default PlaceOrderScreen
