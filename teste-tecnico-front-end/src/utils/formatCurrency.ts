export function formatCurrency(number: number) {
  const formattedNumber = `R$ ${Number(number).toFixed(2)}`;
  return formattedNumber;
}