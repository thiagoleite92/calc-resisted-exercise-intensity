import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <>
      <h1 className='flex items-center justify-between text-yellow-400'>
        Predição de Cargas de Treinamento{' '}
        <Link href='/planilha' className='btn-hover'>
          {' '}
          Ver planilha
        </Link>
      </h1>
      <hr className='border-1 h-[1px] border-t-0 bg-yellow-400' />
      <h3 className=' text-yellow-400'>Exercícios</h3>
    </>
  );
}
