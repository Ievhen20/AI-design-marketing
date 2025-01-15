import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
  return (
    <img src='/assets/img/logo.png' alt='logo' className='w-[180px]' />
  );
}
