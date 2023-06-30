export const percentages = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
export default function calcLoads(rm: string): Array<number> {
  return percentages.map((percentage) =>
    Number(((percentage / 100) * Number(rm)).toFixed(1))
  );
}

export const repsZone = ['18', '16', '14', '12', '10', '8', '6', '4', '2', '1'];
