"use client";
import Head from "next/head";
import Router from "next/router";
import { useRouter } from "next/router";

import { signOut, useSession } from "next-auth/react";

export default function Dashboard(): JSX.Element {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/");
  }

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
