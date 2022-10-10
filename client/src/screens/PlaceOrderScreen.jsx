import { useState } from 'react'
import { FaTruck, FaCheckCircle, FaHandPointRight, FaInfo } from 'react-icons/fa'
import Component from '../components/component/Component'
import Error from '../components/alerts/Error'

const PlaceOrderScreen = () => {
  //variables
  const [id, setId] = useState('507f1f77bcf86cd799439011')

  //handlers
  const submitHandler = e => {
    e.preventDefault()
    console.log('submitHandler')
  }

  return (
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
            <h2 className="mb-[5px] text-xl font-bold">Dostawa:</h2>

            <div>
              <div className="grid mb-2 sm:gap-3 sm:grid-cols-7">
                <div className="sm:col-span-4">
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
                    <Error isOpen={true} message={'Test error'} />
                  </div>
                </div>

                <div className="sm:col-span-3">
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
                    <Error isOpen={true} message={'Test error'} />
                  </div>
                </div>
              </div>

              <div className="grid sm:gap-3 sm:grid-cols-2">
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
                    <Error isOpen={true} message={'Test error'} />
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
                    <Error isOpen={true} message={'Test error'} />
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

              <div className="grid mb-6 sm:gap-3 sm:grid-cols-5">
                <div className="sm:col-span-2">
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
                    <Error isOpen={true} message={'Test error'} />
                  </div>
                </div>

                <div className="sm:col-span-3">
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
                    <Error isOpen={true} message={'Test error'} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={null}
                  className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative flex flex-col justify-center items-center"
                >
                  <FaTruck />
                  <p className="mt-[3px] mb-1 text-sm truncate">Kurier DPD</p>
                  <p className="text-xs">0000.00 PLN</p>
                  {true && <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />}
                </button>

                <button
                  type="button"
                  onClick={null}
                  className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative flex flex-col justify-center items-center"
                >
                  <FaTruck />
                  <p className="mt-[3px] mb-1 text-sm">Kurier InPost</p>
                  <p className="text-xs">0000.00 PLN</p>
                  {true && <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />}
                </button>

                <button
                  type="button"
                  onClick={null}
                  className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative flex flex-col justify-center items-center"
                >
                  <FaTruck />
                  <p className="mt-[3px] mb-1 text-sm">Kurier DPD</p>
                  <p className="text-xs">0000.00 PLN</p>
                  {true && <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />}
                </button>

                <button
                  type="button"
                  onClick={null}
                  className="border-2 rounded-xl bg-white/[0.05] py-2 px-3 relative flex flex-col justify-center items-center"
                >
                  <FaTruck />
                  <p className="mt-[3px] mb-1 text-sm">Kurier InPost</p>
                  <p className="text-xs">0000.00 PLN</p>
                  {true && <FaCheckCircle className="absolute -top-[1px] -right-[1px]" />}
                </button>

                <div className="col-span-2 sm:col-span-3 flex flex-col gap-1 -mt-[3px]">
                  <Error isOpen={true} message={'Test error'} />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-[6px] text-xl font-bold">Podsumowanie:</h2>

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

            <button
              type="submit"
              className="flex justify-center items-center gap-2 px-3 mt-3 mb-4 py-[6px] text-lg font-semibold border-2 rounded-xl transition active:scale-95 hover:bg-white/10"
            >
              <FaHandPointRight />
              Złóż zamówienie
            </button>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="text-3xl">
                <FaInfo />
              </div>
              <p className="w-[180px]">
                Po złożeniu zamówienia masz <b>15 minut</b> na jego opłacenie. W przeciwnym przypadku zostanie ono anulowane.
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default PlaceOrderScreen
