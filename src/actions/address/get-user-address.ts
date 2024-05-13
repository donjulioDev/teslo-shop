'use server';

import prisma from "@/src/lib/prisma";

  export const getUserAddress = async ( userId: string ) => {
    try {
      const address = await prisma.userAddress.findUnique({
        where: { userId }
      });

        if ( !address ) return null;
      const { countryId, address2, city, ...rest } = address

      return {
        ...rest,
        country: countryId,
        address2: address2 ? address2 : '',
        city: city
      };
       
    } catch (error) {
      console.log(error);
      return null
    }
 }