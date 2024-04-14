//folio telcel 3 dias: 40042 jesus

import { Inter, Comfortaa } from 'next/font/google'
import Image from 'next/image';
import Link from 'next/link';
import { IoBarbell, IoBarbellOutline, IoCafeOutline, IoMedicalOutline, IoRestaurantOutline, IoSchool, IoSearch, IoSearchCircleOutline } from 'react-icons/io5';
import { TbMedicalCrossFilled, TbMedicalCrossOff, TbShoppingCart } from 'react-icons/tb';



const comf = Comfortaa(
  {
    subsets:
      [
        'latin',
        //  'cyrillic',
        //  'vietnamese'

      ],
    // display: 'swap',
    // weight: ['400'] 
  }


);
const inter = Inter({ subsets: ['latin'] });

const page = () => {
  return (
    <>
      <nav className='absolute right-0 left-0 z-10 text-white'>
        <div className={` ${comf.className} w-9/12 mx-auto py-5 flex justify-between items-center`}>
          <div>
            <a className='text-lg'> Tail Listing </a>
          </div>
          <div>
            <button className='py-2 px-4 rounded-md border border-amber-500 bg-transparent text-amber-500 hover:bg-amber-500 hover:text-white transition-all'>
              Add Listing
            </button>
          </div>
          <div className='space-x-4'>
            <button className='text-lg'> Sign In </button>
            <button className='text-lg'> Sign Up </button>
          </div>
        </div>
      </nav>

      <div className='relative h-screen'>
        <Image
          className='h-full w-full object-cover'
          src={'/imgs/carnitatacos.jpg'}
          width={750}
          height={750}
          alt=''
        />
        <div className="absolute inset-0 bg-black/50 "></div>
        <div className="absolute inset-0 h-full w-full">
          <div className="flex min-h-full w-full items-center justify-center">

            <div className='space-y-8' >
              <div className='text-white text-center'>
                <p className={`text-4xl capitalize font-bold mb-4 ${comf.className}`}>Discover places that people love</p>
                <p className='text-lg'>We will help you to find the best places in the world.</p>
              </div>

              <div className='flex gap-5'>
                <div className='gap-x-3.5 space-x-4'>
                  <input
                    type="text"
                    placeholder='Location'
                    className="rounded-md w-80 bg-white text-gray-600 py-3 px-4 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="I'm Looking for..."
                    className="rounded-md w-80 bg-white text-gray-600 py-3 px-4 focus:outline-none"
                  />
                </div>
                <div className='space-x-4'>
                  <button className='flex rounded-md py-2.5 px-6 bg-amber-500 text-lg text-white hover:bg-amber-600 justify-center items-center text-center'>
                   <IoSearch className='text-lg' />
                    Search
                  </button>
                </div>
              </div>

              <div>
                <ul className='flex gap-5 justify-center text-sm text-white'>

                  <li className='capitalize space-x-4'>
                    <Link href={'/'} className='hover:text-amber-500 flex'>
                      <IoRestaurantOutline className='text-base'  />
                      Restaurants
                    </Link>
                  </li>
                  <li className='capitalize space-x-4'>
                    <Link href={'/'} className='hover:text-amber-500 flex'>
                      <IoCafeOutline className='text-base'  />
                      Cafe
                    </Link>
                  </li>
                  <li className='capitalize space-x-4'>
                    <Link href={'/'} className='hover:text-amber-500 flex'>
                      <IoBarbellOutline className='text-base'  />
                      Gym
                    </Link>
                  </li>
                  <li className='capitalize space-x-4'>
                    <Link href={'/'} className='hover:text-amber-500 flex'>
                      <IoSchool  className='text-base' />
                      School
                    </Link>
                  </li>
                  <li className='capitalize justify-center'>
                    <Link href={'/'} className='hover:text-amber-500 flex'>
                      <TbMedicalCrossFilled className='text-base'  />
                      Hospital
                    </Link>
                  </li>
                  <li className='capitalize justify-center'>
                    <Link href={'/'} className='hover:text-amber-500 flex'>
                      <TbShoppingCart className='text-base'  />
                      Shopping
                    </Link>
                  </li>



                </ul>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default page
