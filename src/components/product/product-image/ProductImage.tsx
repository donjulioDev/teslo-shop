import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLStyleElement>['style'] 
  width: number;
  height: number;
}

export const ProductImage = ( { src, alt, className, style, width, height }: Props ) => {
  
    console.log({src});
    

  const localSrc = ( src ) 
    ? src.startsWith('http') //https://yrlcompletodelaimagen.jpg 
      ? src
      : `/products/${ src }`
    : '/imgs/placeholder.jpg' 


  console.log({localSrc});
  
  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
    />
  )
}
