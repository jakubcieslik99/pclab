import { BsCpuFill } from 'react-icons/bs'
import heroImage from '../../assets/image-hero.jpg'

const Hero = () => {
  return (
    <div className="bg-center bg-[length:auto_100%] bg-heropattern hero">
      <div className="flex flex-col items-center h-full overflow-hidden md:flex-row-reverse content">
        <div className="flex items-center justify-center w-full h-[45%] pt-5 md:w-1/2 md:h-full md:justify-start md:m-0 md:pl-4 md:py-6 lg:pl-20">
          <div className="flex max-h-full aspect-square max-w-[350px] md:max-w-[430px] drop-shadow-lg">
            <img src={heroImage} alt="" className="object-cover max-w-full p-3 border-2 border-white rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-[55%] px-2 md:w-1/2 md:h-full md:justify-end md:pl-0 md:pr-4">
          <div className="md:max-w-[350px] drop-shadow-lg">
            <h2 className="mb-1 text-2xl font-bold">ZNAJDŹ COŚ DLA SIEBIE!</h2>
            <p className="mb-1 text-sm font-light">
              Skomponuj swój własny zestaw komputerowy, lub poszukaj wśród dodanych przez innych użytkowników.
            </p>
            <p className="mb-3 text-sm font-light">
              Po wybraniu możesz zakupić gotowy komputer, a wszystko to w{' '}
              <span className="font-normal">jednej aplikacji</span>!
            </p>
            <h3 className="flex items-center justify-end mb-2 text-xl font-bold">
              <BsCpuFill className="ml-1" />
              <span className="ml-1">PC</span>
              <span className="ml-[2px]">Lab</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
