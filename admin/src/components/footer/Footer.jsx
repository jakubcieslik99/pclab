import { BsCpuFill } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="relative h-[116px] p-4 -mb-[116px] bg-gray-800 -z-10 md:h-[56px] md:-mb-[56px]">
      <div className="flex flex-col items-center justify-center text-sm md:flex-row">
        <p>Copyright © {new Date().getFullYear()}</p>
        <p className="hidden mx-3 font-extralight md:block">|</p>
        <p className="flex items-center my-[7px] text-xl font-bold md:text-base md:-my-[1px]">
          <BsCpuFill className="ml-1 mt-[1px]" />
          <span className="mt-[2px] ml-1">PC</span>
          <span className="mt-[2px] ml-[2px]">Lab</span>

          <span className="mt-[6px] md:mt-[1px] ml-[9px] text-xs font-light">Panel administratorski</span>
        </p>
        <p className="hidden mx-3 font-extralight md:block">|</p>
        <p>Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  )
}

export default Footer
