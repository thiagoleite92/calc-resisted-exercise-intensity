'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BarLoader } from 'react-spinners';

import { ExerciseSchemaType } from '../../components/Form/ExerciseForm';
import { StorageService } from '../../services/StorageService';
import Rows from './components/Rows';

export default function Grid() {
  const service = useMemo(() => new StorageService(), []);

  const [sheet, setSheet] = useState<Array<ExerciseSchemaType> | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSheet = useCallback(() => {
    const savedSheet = service.getSheet();
    setSheet(savedSheet);
    setIsLoading(false);
  }, [service]);

  useEffect(() => {
    loadSheet();
  }, [loadSheet]);

  return isLoading ? (
    <div className='flex h-60 flex-col items-center justify-center gap-2'>
      <span className='text-yellow-400'>Carregando Planilha</span>
      <BarLoader color='#fac261' />
    </div>
  ) : !sheet?.length ? (
    <span className='text-yellow-400'>
      Você não tem exercícios salvos em sua planilha. Clique{' '}
      <Link className=' underline hover:text-yellow-600' href='/'>
        aqui
      </Link>{' '}
      para voltar e adicionar alguns exercícios.
    </span>
  ) : (
    <Rows rows={sheet} />
  );
}
