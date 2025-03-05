export const formatCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(numericValue) / 100);

  return formattedValue;
};