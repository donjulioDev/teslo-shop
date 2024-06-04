import { titleFont } from '@/src/app/config/fonts';
import Link from 'next/link'
import { TbCopyrightOff } from "react-icons/tb";



export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link className='flex' href='/'>
        <span className={`${ titleFont.className } antialiased font-bold mx-1`}>Teslo</span>
        <span className='mx-2'> | shop</span>
        <span className='flex'><TbCopyrightOff className='mx-1' size={20}  />  {new Date().getFullYear() }  </span> 
      </Link>
      <Link
      className='mx-4'
        href='https://donjulio.dev/'
      >
        Made by: Don Julio
      </Link>
      <Link 
        href='/'
        className='mx-4'
      >
       Privacidad & Legal
      </Link>
      <Link 
        href='/'
        className='mx-4'
      >
       Ubicaciónes
      </Link>
    </div>
  )
}
