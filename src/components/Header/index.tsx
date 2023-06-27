'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <h1 className='flex items-center justify-between text-yellow-400'>
        Predição de Cargas de Treinamento{' '}
        <Link
          href={pathname === '/planilha' ? '/' : '/planilha'}
          className='btn-hover'
        >
          {' '}
          {pathname === '/planilha' ? 'Voltar' : 'Ver Planilha'}
        </Link>
      </h1>
      <hr className='border-1 h-[1px] border-t-0 bg-yellow-400' />
      <h3 className=' text-yellow-400'>
        {pathname === '/' ? 'Calculadora' : 'Planilha'}
      </h3>
    </>
  );
}
