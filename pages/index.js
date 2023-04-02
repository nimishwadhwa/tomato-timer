import Head from "next/head";
import { Inter } from "next/font/google";
import MainContainer from "@/components/MainContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tomoato Timer - Pomodoro</title>
        <meta name="description" content="Pomodoro App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer />
    </>
  );
}
