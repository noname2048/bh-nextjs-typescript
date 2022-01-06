import React from "react";
import Head from "next/head";
import Header from "../components/header";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="서지정보검색" />
        <meta property="og:image" content="/vercel.svg" />
        <meta name="og:title" content="website" />
      </Head>
      <Header></Header>
      <main className="m-5">{children}</main>
      <footer></footer>
    </div>
  );
}
