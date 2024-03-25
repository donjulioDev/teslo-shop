//import { titleFont } from '@/app/config/fonts'
//import { titleFont } from '@/src/app/config/fonts'
'use client';
import { titleFont } from '@/src/app/config/fonts'
import { useUIStore } from '@/src/store';
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'


export const TopMenu = () => {

 const openMenu = useUIStore( state => state.openSideMenu );

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* Todo: logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | shop</span>
        </Link>
      </div>
      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/men'>Hombres</Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/women'>Mujeres</Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/kid'>Niños</Link>
      </div>
      {/* Search, Cart, Menu */}
      <div className='flex items-center'>

        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link href='/cart' className='mx-2'>
          <div className='relative'>
            <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
              3
            </span>
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>
        <button
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          onClick={openMenu}
        >
          Menú
        </button>
      </div>
    </nav>
  )
}