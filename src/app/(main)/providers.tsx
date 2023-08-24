"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CartProvider } from "@/hooks/useCartProvider";
import { SessionProvider } from "next-auth/react";
import { NotificationContainer } from "react-notifications";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <CartProvider>
        <Header />
        {children}
        <Footer />
        <NotificationContainer />
      </CartProvider>
    </SessionProvider>
  );
};

export default Provider;
