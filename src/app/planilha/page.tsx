'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

import { ExerciseSchemaType } from '../components/Form/ExerciseForm';
import { StorageService } from '../services/StorageService';
import Rows from './components/Rows';

export default function Grid() {
  const service = useMemo(() => new StorageService(), []);

  const [sheet, setSheet] = useState<Array<ExerciseSchemaType> | []>([]);

  useEffect(() => {
    const savedSheet = service.getSheet();

    setSheet(savedSheet);
  }, [service]);

  return !sheet?.length ? (
    <span className='text-yellow-400'>
      Você não tem exercícios salvos em sua planilha. Clique{' '}
      <Link className=' underline hover:text-yellow-600' href='/'>
        aqui
      </Link>{' '}
      para voltar e salvar alguns exercícios.
    </span>
  ) : (
    <Rows rows={sheet} />
  );
}
