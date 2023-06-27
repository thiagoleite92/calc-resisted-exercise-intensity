'use client';

import React, { useEffect, useState } from 'react';

import { BaseExercise } from '../types/BaseExercise.type';
import AppContext, { AppContextType } from './AppContext';

type AppProviderType = {
  children: React.ReactNode;
};

const baseExercises = [
  {
    label: 'Supino Reto',
    value: 'supino_reto'
  },
  {
    label: 'Agachamento',
    value: 'agachamento'
  },
  {
    label: 'Levantamento Terra',
    value: 'levantamento_terra'
  }
];

export default function AppProvider({ children }: AppProviderType) {
  const [resetForm, setResetForm] = useState<boolean>(false);

  const [exercises, setExercises] = useState<Array<BaseExercise>>([
    ...baseExercises
  ]);

  useEffect(() => {
    const sheet = localStorage.getItem('sheet');

    if (sheet !== null) {
      return;
    } else {
      localStorage.setItem('sheet', JSON.stringify([]));
    }
  }, []);

  const context: AppContextType = {
    exercises,
    setExercises,
    resetForm,
    setResetForm
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
