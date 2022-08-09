import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();
  // if (!session) {
  //   return (
  //     <>
  //       <Head>
  //         <title>
  //           International State College of the Philippines Identification System
  //         </title>
  //         <meta
  //           name="description"
  //           content="International State College of the Philippines"
  //         />
  //         <link rel="icon" href="/favicon.ico" />
  //       </Head>
  //       <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
  //         <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700 border-4 border-green-200 p-4 bg-green-400 rounded-[25px]">
  //           <button onClick={() => signIn("google")}>Login With Google</button>
  //         </h1>
  //       </main>
  //     </>
  //   );
  // }
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

      <main className="container mx-auto flex flex-col items-center justify-center  p-4">
        <div className="flex  justify-start">
          <img
            className="lg:max-w-2xl md:scale-50 sm:scale-75 "
            src="/ISCP-BLACK.png"
            alt="International State College of the Philippines"
          />
        </div>
        <h1 className="text-5xl mt-2 md:text-[5rem] leading-normal font-extrabold text-gray-700 border-4 border-green-200 p-4 bg-green-400 rounded-[25px]">
          <Link href="/generate-noqr">Generate ID without qr code feature</Link>
        </h1>
        <h1 className="text-5xl mt-10 md:text-[5rem] leading-normal font-extrabold text-gray-700 border-4 border-green-200 p-4 bg-green-400 rounded-[25px]">
          {session ? (
            <Link href="/generate">Generate ID with qr code feature</Link>
          ) : (
            <button onClick={() => signIn("google")}>
              Generate ID with qr code feature
            </button>
          )}
        </h1>
      </main>
    </>
  );
};

export default Home;
