import { BsCpuFill } from 'react-icons/bs'
import { FaPlusCircle, FaGrinStars, FaComments, FaShoppingCart } from 'react-icons/fa'
import Hero from '../components/hero/Hero'

const HomeScreen = () => {
  return (
    <main className="flex flex-col flex-1">
      <Hero />

      <div className="content">
        <div className="grid max-w-6xl grid-cols-2 pt-6 pb-5 mx-auto md:pt-7 md:pb-6 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center mb-5 md:mb-0">
            <FaPlusCircle className="mb-1 text-5xl" />
            <h4 className="text-lg">Stwórz</h4>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 md:mb-0">
            <FaGrinStars className="mb-1 text-5xl" />
            <h4 className="text-lg">Oceniaj</h4>
          </div>
          <div className="flex flex-col items-center justify-center">
            <FaComments className="mb-1 text-5xl" />
            <h4 className="text-lg">Komentuj</h4>
          </div>
          <div className="flex flex-col items-center justify-center">
            <FaShoppingCart className="mb-1 text-5xl" />
            <h4 className="text-lg">Kupuj</h4>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center sm:gap-[6px] font-light sm:flex-row text-md pb-9">
          <div>Zobacz jakie to proste</div>
          <div className="flex">
            <span className="mt-[2px]">z aplikacją</span>
            <span className="flex items-center text-lg font-bold">
              <BsCpuFill className="ml-2" />
              <span className="ml-1">PC</span>
              <span className="ml-[2px] mr-1">Lab</span>
            </span>
            <span className="mt-[3px]">!</span>
          </div>
        </div>
      </div>

      <div className="content">
        <div>Najlepiej oceniane</div>

        <div>Najczęściej kupowane</div>

        <div>Zobacz wszystkie</div>
      </div>
    </main>
  )
}

export default HomeScreen
