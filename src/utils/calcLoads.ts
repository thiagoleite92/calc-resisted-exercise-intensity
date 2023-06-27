export default function calcLoads(rm: string): Array<number> {
  const percentages = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

  return percentages.map((percentage) =>
    Number(((percentage / 100) * Number(rm)).toFixed(1))
  );
}
