export interface IBackdrop {
  id?: string;
  title: string;
  slug: string;
  personal_price: number;
  commercial_price: number;
  discount: number;
  imageUrl: string;
  description: string;
  categoryId: string;
  addOn: string[];
  category?: IBackdropCategory;
}

export interface IBackdropDetails {
  backdrop: IBackdrop;
  relatedBackdrops: IBackdrop[];
}

export interface IBackdropCategory {
  title: string;
  slug: string;
  description: string;
  icon?: string;
}

export enum IBackdropFileType {
  personal_price = "Personal price",
  commercial_price = "Commercial Price",
  price = "Price",
}

export interface ICartItem {
  id: string;
  title: string;
  qty: number;
  price: number;
  price_type?: IBackdropFileType;
  discount: number;
  displayUrl?: string;
}

export interface IBackdropCat {
  id: string;
  title: string;
  slug: string;
  icon?: string;
}


export interface IConversation {
  id: string;
  messages: IMessage[];
  name: string;
  receiverId: string;
  senderId: string;
  subtitle: string;
  createdAt: string;
  Receiver: IUser;
  User: IUser;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
}


export interface IMessage {
  text: string;
  fileUrl: string;
  conversationId: string;
  userId: string;
  receiver: IUser;
  sender: IUser;
}
