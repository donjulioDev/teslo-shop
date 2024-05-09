import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {

  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  }
  // Metodos
    setAddress: (address: State['address']) => void;
}
// zuztand tiene el metodo persist para grabar en el local storage
export const useAdressStore = create<State>()( 
    persist( 
      (set, get) => ({
        address: {
          firstName: '',
          lastName: '',
          address: '',
          address2: '',
          postalCode: '',
          city: '',
          country: '',
          phone: '',
        },

        setAddress: (address) => {
          set({address})
        }

      }),
      {
        name: "address-storage"
      }
    )
);