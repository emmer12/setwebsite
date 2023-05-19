export function serialize(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export const getDiscount = (price: number, discount: number) => {
  return Math.round((price * discount) / 100) + price;
};
