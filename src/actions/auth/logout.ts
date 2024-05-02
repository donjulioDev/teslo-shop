"use server";

import { signOut } from "@/src/auth.config";
import { useUIStore } from "@/src/store";

export const logout = async() => {

  console.log( '<-- desde: logout -->' )
  
  try {
    await signOut({redirect: false });
  } catch (error) {
    console.log(error);
    
  }
  await signOut({redirectTo: '/auth/login' });
  console.log( '<-- desde: fin de logout -->' )


 //window.location.replace('/');

 // await signOut({ redirect: true });

}
