import React, { useEffect } from 'react';

import { BaseExercise } from '../types/BaseExercise.type';

export interface AppContextType {
  exercises: Array<BaseExercise> | [];
  setExercises:
    | React.Dispatch<React.SetStateAction<Array<BaseExercise>>>
    | undefined;
  resetForm: boolean;
  setResetForm: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const AppContext = React.createContext<AppContextType>({
  exercises: [],
  setExercises: undefined,
  resetForm: false,
  setResetForm: undefined
});

export default AppContext;
