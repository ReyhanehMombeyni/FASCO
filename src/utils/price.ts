export const calculateDiscountedPrice = (price: number, discountAmount: number) => {
  return (price - discountAmount).toFixed(2);
};