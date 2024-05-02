'use client';

import { useSession } from 'next-auth/react'
import { useUIStore } from '@/src/store';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'
import clsx from 'clsx';
import {  logout } from '@/src/actions';


export const Sidebar = () => {

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeMenu = useUIStore(state => state.closeSideMenu);

  const { data: session } = useSession();


  const isAuthenticated = !!session?.user;

  const role = session?.user.role;



  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div
          className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
        />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 
      backdrop-filter backdrop-blur-sm'
        />
      )}
      {/* sidemenu */}
      <nav
        className={
          clsx(
            'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        } >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={() => closeMenu()}
        />
        {/* Input de la busqueda */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type="text"
            name="" id=""
            className="w-full bg-gray-50 pl-10 py-1 rounded pr-10 border-b-2 text-xl
             border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* menu */}

        {
          isAuthenticated && (

            <>
              <Link
                href="/profile"
                onClick={() => closeMenu()}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPersonOutline size={30} />
                <span className="ml-3 text-xl">Perfil</span>
              </Link>
              <Link
                href="/"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

              <button
                onClick={() => (  logout(), closeMenu() )}
                // onClick={ () => console.log('picaste salir')    }
                className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoLogOutOutline size={30} />
                <span className="ml-3 text-xl">
                  Salir
                </span>
              </button>
            </>
          )
        }


        {
          !isAuthenticated && (
            <Link
              href="/auth/login"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoLogInOutline size={30} />
              <span className="ml-3 text-xl">Ingresar</span>
            </Link>
          )
        }

        {
          role === 'admin' &&
          <>
          {/* Separador */}
          <div className="w-full  h-px bg-gray-200 my-10" />
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>

        }


      </nav>
    </div>
  )
}
