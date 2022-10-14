import Component from '../components/componentsScreen/Component'

const ComponentsScreen = () => {
  return (
    <main className="flex-1">
      <div className="content">
        <div className="mt-3 mb-2">
          <h2 className="text-xl font-bold">Komponenty</h2>
        </div>

        <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div>
              <input type="text" />
            </div>

            <div>
              <input type="text" />
            </div>
          </div>

          <div>
            <button type="button" className="px-2 py-1 border-2 bg-white/20 hover:bg-white/30 rounded-xl">
              Dodaj
            </button>
          </div>
        </div>

        <div className="pb-[2px] mb-6 overflow-x-auto bg-gray-800 rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="text-gray-300 bg-gray-600">
                <th className="py-2 pl-3 pr-3 text-center">Nr</th>
                <th className="py-2 pr-3 text-center">Zdjęcie</th>
                <th className="py-2 pr-2 text-left">Dane</th>
                <th className="py-2 pr-2 text-left">Cena</th>
                <th className="py-2 pr-2 text-center">Ilość</th>
                <th className="py-2 pr-3 text-center">Zarządzaj</th>
              </tr>
            </thead>

            <tbody>
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
              <Component />
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default ComponentsScreen
