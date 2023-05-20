export function serialize(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export const getDiscount = (price: number, discount: number) => {
  return Math.round((price * discount) / 100) + price;
};

export const formattedMoney = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};
