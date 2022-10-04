import { useState } from 'react'
import Component from '../components/component/Component'

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
          <h2 className="mb-[2px] text-xl font-bold">Podsumowanie:</h2>

          <div>
            <div className="text-xs">Cena</div>
            <div className="font-semibold">
              <span className="mr-1 text-lg">{'00000.00'}</span>
              <span className="font-light">zł</span>
            </div>
          </div>
        </div>

        <div className="mx-2 mb-6">
          <h2 className="mb-[2px] text-xl font-bold">Wysyłka:</h2>

          <div>Wysyłka</div>
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
