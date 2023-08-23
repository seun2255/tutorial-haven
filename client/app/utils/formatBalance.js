function formatToTwoDecimalPlaces(numberString) {
  const parsedNumber = parseFloat(numberString);
  if (isNaN(parsedNumber)) {
    return "Invalid number";
  }

  const formattedNumber = parsedNumber.toFixed(2);
  return formattedNumber;
}

export { formatToTwoDecimalPlaces };
