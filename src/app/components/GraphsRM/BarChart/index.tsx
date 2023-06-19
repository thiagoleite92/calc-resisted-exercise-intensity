import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type BarChartProps = {
  loads: number[] | null;
};

export default function BarChart({ loads }: BarChartProps) {
  const [labels, setLabels] = useState<Array<string>>([]);

  useEffect(() => {
    if (!loads) return;

    setLabels(loads.map((load) => `${load}Kg`));
  }, [loads]);

  const data = {
    labels,
    datasets: [
      {
        label: '55%-70%',
        borderRadius: 0,
        data: loads,
        backgroundColor: [
          '#7fda56',
          '#7fda56',
          '#7fda56',
          '#7fda56',
          '#ffdf58',
          '#ffdf58',
          '#ffdf58',
          '#ff924c',
          '#ff924c',
          '#ff5656'
        ],
        barThickness: 10
      },
      {
        data: null,
        label: '75%-85%',
        backgroundColor: '#ffdf58'
      },
      {
        data: null,
        label: '90%-95%',
        backgroundColor: '#ff9241'
      },
      {
        data: null,
        label: '100%',
        backgroundColor: '#ff5656'
      }
    ]
  };

  return loads && <Bar data={data} />;
}
