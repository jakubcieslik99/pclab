import { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { BiCaretLeftCircle } from 'react-icons/bi'
import { FaEnvelope, FaPhoneAlt, FaTruck } from 'react-icons/fa'
import Component from '../components/component/Component'
import Timer from '../components/orderScreen/Timer'
import PaymentForm from '../components/orderScreen/PAymentForm'
import stripeOptions from '../components/orderScreen/stripeOptions'

const OrderScreen = props => {
  const stripeOptionsLocal = {
    clientSecret: 'pi_3LEYnSJtbJWEJlni0fCsj5Hr_secret_FJr5evFCIkDlPu2O9pvoI0oxQ',
    ...stripeOptions,
  }

  const [id, setId] = useState('507f1f77bcf86cd799439011')
  const [componentsIsOpen, setComponentsIsOpen] = useState(false)

  return (
    <main className="flex-1">
      <div className="content">
        <div className="mx-2 my-4">
          <h2 className="text-xl font-bold">ZAMÓWIONY ZESTAW</h2>
          {id && <h4 className="text-sm font-light">{id}</h4>}
        </div>

        <div className="mx-2 mb-6">
          <h2 className="mb-[6px] text-xl font-bold">Komponenty:</h2>

          <button
            onClick={() => setComponentsIsOpen(!componentsIsOpen)}
            className="px-3 py-2 bg-[#412851] rounded-xl border border-[#725e7d] flex items-center gap-1"
          >
            <span>Pokaż</span>
            <BiCaretLeftCircle className={`w-5 h-5 transition-transform ${!componentsIsOpen ? 'rotate-0' : '-rotate-90'}`} />
          </button>

          <div
            className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden transition-components ${
              !componentsIsOpen ? 'max-h-0 opacity-0' : 'max-h-[1904px] opacity-1'
            }`}
          >
            <div className="w-full h-0" />
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

        <div className="flex flex-col mx-2 mb-6 gap-7 sm:flex-row">
          <div>
            <h2 className="mb-[5px] text-xl font-bold">Dostawa:</h2>

            <div className="px-3 pb-[9px] pt-[10px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[320px] lg:w-[455px]">
              <div className="flex items-center gap-2">
                <FaEnvelope className="flex-none" />
                <p className="truncate">{'johndoe@gmail.com'}</p>
              </div>
              <p className="flex items-center gap-2 mb-2 truncate">
                <FaPhoneAlt /> {'+48 123 456 789'}
              </p>

              <p className="truncate">
                {'Imię'} {'Nazwisko'}
              </p>
              <p className="truncate">
                {'Adres'} {'Adres cd.'}
              </p>
              <p className="mb-[10px] truncate">
                {'00-000'} {'Miejscowość'}
              </p>

              <div className="flex items-center gap-2">
                <FaTruck className="flex-none" />
                <p className="text-lg font-bold truncate">{'Kurier InPost'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-[5px] text-xl font-bold">Podsumowanie:</h2>

            <div className="px-3 pb-[9px] pt-[10px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[200px] lg:w-[230px]">
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
        </div>

        <div className="flex flex-col gap-6 mx-2 mb-20 md:mb-6 sm:flex-row">
          <div>
            <h2 className="mb-[5px] text-xl font-bold">Status zamówienia:</h2>

            <div className="px-3 pb-[9px] pt-[10px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[284px] lg:w-[384px]">
              <div className="mb-2">
                <div className="mb-1 text-sm">Czas na opłacenie zamówienia:</div>
                <Timer orderId={'507f1f77bcf86cd799439011'} time={null} />
              </div>

              <div>
                <div className="mb-1 text-sm">Status zamówienia:</div>
                <div>Nieopłacono</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-[5px] text-xl font-bold">{true ? 'Płatność:' : 'Pomoc:'}</h2>

            {true ? (
              <Elements stripe={props.stripePromise} options={stripeOptionsLocal}>
                <PaymentForm />
              </Elements>
            ) : (
              <div className="px-3 pb-[9px] pt-[10px] bg-[#412851] rounded-xl border border-[#725e7d] sm:w-[284px] lg:w-[384px]">
                Pomoc
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default OrderScreen
