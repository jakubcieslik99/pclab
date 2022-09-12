import { forwardRef } from 'react'
import { BsCpuFill } from 'react-icons/bs'

const Footer = forwardRef((_props, ref) => {
  return (
    <footer ref={ref} className="relative h-[147.8px] p-4 -mb-[147.8px] gradient-footer -z-10 md:h-[87.8px] md:-mb-[87.8px]">
      <div className="flex flex-col items-center justify-center text-sm md:flex-row">
        <p>Copyright © {new Date().getFullYear()}</p>
        <p className="hidden mx-3 font-extralight md:block">|</p>
        <p className="flex items-center my-[7px] text-xl font-bold md:text-base md:-my-[1px]">
          <BsCpuFill className="ml-1 mt-[1px]" />
          <span className="mt-[2px] ml-1">PC</span>
          <span className="mt-[2px] ml-[2px]">Lab</span>
        </p>
        <p className="hidden mx-3 font-extralight md:block">|</p>
        <p>Wszelkie prawa zastrzeżone.</p>
      </div>
      <div className="mt-[15px] text-[.7rem] text-center text-gray-400 tracking-wide">
        <a href="http://www.freepik.com" target="_blank" rel="noreferrer">
          Hero graphics designed by Freepik
        </a>
      </div>
    </footer>
  )
})

export default Footer
