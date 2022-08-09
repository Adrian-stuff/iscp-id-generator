import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <Head>
          <title>
            International State College of the Philippines Identification System
          </title>
          <meta
            name="description"
            content="International State College of the Philippines"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700 border-4 border-green-200 p-4 bg-green-400 rounded-[25px]">
            <button onClick={() => signIn("google")}>Login With Google</button>
          </h1>
        </main>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>
          International State College of the Philippines Identification System
        </title>
        <meta
          name="description"
          content="International State College of the Philippines"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700 border-4 border-green-200 p-4 bg-green-400 rounded-[25px]">
          <Link href="/generate">Generate ID</Link>
        </h1>
      </main>
    </>
  );
};

export default Home;
