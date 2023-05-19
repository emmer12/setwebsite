export interface IBackdrop {
  id?: string;
  title: string;
  slug: string;
  price: number;
  discount: number;
  imageUrl?: string;
  description: string;
  categoryId: string;
}

export interface ICartItem {
  id: string;
  title: string;
  qty: number;
  price: number;
  discount: number;
  displayUrl?: string;
}
