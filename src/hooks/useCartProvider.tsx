"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext<{
  cart?: any;
  addToCart: (product: any) => void;
  removeCart: (product: any) => void;
  updateCart: (product: any) => void;
}>({
  cart: [],
  addToCart: () => {
    //
  },
  removeCart: () => {
    //
  },
  updateCart: () => {
    //
  },
});

export const CartProvider = ({
  children,
}: {
  cart?: any;
  children: ReactNode;
}) => {
  const [cart, setCart] = useState<any>(() => {
    if (typeof window !== "undefined") {
      try {
        const localStorageTokens = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        return localStorageTokens;
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const addToCart = (product: any) => {
    const newProduct = [
      ...cart.filter((p: any) => p.id !== product.id),
      product,
    ];
    setCart(newProduct);
    if (typeof window !== "undefined")
      localStorage.setItem("cart", JSON.stringify(newProduct));
  };

  const removeCart = (product: any) => {
    const newProduct = cart.filter((p: any) => p.id !== product.id);

    setCart(newProduct);
    if (typeof window !== "undefined")
      localStorage.setItem("cart", JSON.stringify(newProduct));
  };

  const updateCart = (product: any) => {
    const newProduct = [
      ...cart.filter((p: any) => p.id !== product.id),
      product,
    ];

    setCart(newProduct);
    if (typeof window !== "undefined")
      localStorage.setItem("cart", JSON.stringify(newProduct));
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addToCart,
        removeCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const { addToCart, removeCart, updateCart, cart } = useContext(CartContext);

  const subTotal = () =>
    cart.reduce((acc: any, cur: any) => cur.price * cur.qty + acc, 0);

  return {
    addToCart,
    removeCart,
    updateCart,
    subTotal,
    cart,
  };
};
