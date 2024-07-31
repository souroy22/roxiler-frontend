export const formatToIndianRupee = (price: number) => {
  const [integerPart, decimalPart] = price.toString().split(".");
  const lastThreeDigits = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);
  const formattedNumber = otherDigits
    ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThreeDigits
    : lastThreeDigits;

  return decimalPart ? formattedNumber + "." + decimalPart : formattedNumber;
};
