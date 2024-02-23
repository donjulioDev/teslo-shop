import Image from "next/image";
import { titleFont } from './config/fonts';

export default function Home() {
  return (
    <main className="">
     <h1>Hola Universo</h1>
     <h1 className={ `${titleFont.className} font-bold` } > Hola Space</h1>
    </main>
  );
}
