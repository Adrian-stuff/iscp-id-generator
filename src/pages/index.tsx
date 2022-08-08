import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          <button onClick={() => signIn("g")}>Login With Google</button>
        </h1>
      </main>
    );
  }
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta
          name="description"
          content="International State College of the Philippines"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          <Link href="/generate">Generate ID</Link>
        </h1>
      </main>
    </>
  );
};

export default Home;
