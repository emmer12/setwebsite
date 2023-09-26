"use client";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import { ContentWrapper } from "./providerContent";

type Props = {
  children?: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <div>
      <SessionProvider>
        <ContentWrapper>{children}</ContentWrapper>
      </SessionProvider>
    </div>
  );
};

export default Provider;
