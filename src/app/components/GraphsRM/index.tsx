import React, { useEffect, useState } from 'react';

type GraphicsRMProps = {
  exercise: string | null;
  result: string | null;
};
const pct = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

export function GraphicsRM({ exercise, result }: GraphicsRMProps) {
  const [percentages, setPercentages] = useState<Array<string>>([]);

  useEffect(() => {
    if (!result) return;

    setPercentages(
      pct.map((p) => `${((p / 100) * Number(result)).toFixed(1)}Kg`)
    );
  }, [result]);

  console.log(percentages);

  return (
    result && (
      <>
        <div className='mt-4 text-yellow-400'>
          A predição de 1RM para o exercício: {exercise} é de {result}Kg
        </div>
      </>
    )
  );
}
