'use server';

import prisma from "@/src/lib/prisma";

//Todas las interacciones con la base de datos estan en folder de actions

  export const getCountries = async() => {
    try {
     const countries = await prisma.country.findMany({
        orderBy: {
          name: 'asc'
        }
      });

        return countries;

    } catch (error) {
      console.log(error);
      return [];
    }
 }