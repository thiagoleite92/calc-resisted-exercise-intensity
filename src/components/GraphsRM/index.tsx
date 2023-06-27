import BarChart from './BarChart';

type GraphicsRMProps = {
  data: {
    exercise: string;
    loads: Array<number>;
  };
};

export function GraphicsRM({ data: { exercise, loads } }: GraphicsRMProps) {
  return (
    loads?.length > 0 && (
      <>
        <div className='mt-4 text-yellow-400'>
          A predição de 1RM para o exercício: {exercise} é de {loads[9]}
          Kg
        </div>
        <div className='flex h-64 w-full justify-center bg-white'>
          <BarChart loads={loads} />
        </div>
      </>
    )
  );
}
