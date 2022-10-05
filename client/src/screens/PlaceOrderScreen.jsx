import { useState } from 'react'
import Component from '../components/component/Component'
import Error from '../components/alerts/Error'

const PlaceOrderScreen = () => {
  const [id, setId] = useState('507f1f77bcf86cd799439011')

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

        <div className="mx-2 mb-6">
          <h2 className="mb-[6px] text-xl font-bold">Wysyłka:</h2>

          <div>
            <form>
              <div>
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

              <div>
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

              <div>
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

              <div>
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
            </form>
          </div>
        </div>

        <div className="mx-2 mb-6">
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

        <div className="mx-2 mb-20 md:mb-6">
          <h2 className="mb-[2px] text-xl font-bold">Płatność:</h2>

          <div>Płatność</div>
        </div>
      </div>
    </main>
  )
}

export default PlaceOrderScreen
