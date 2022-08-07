import { toPng } from "html-to-image";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import IdCard from "../../components/id";
import { RandomUser } from "../../types/mockData";

const GeneratePage: NextPage<{ data: RandomUser }> = ({ data }) => {
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const generateImage = () => {
    toPng(document.getElementById("idCard") as HTMLElement, {
      // width: 768,
      // height: 750,
      // style: { width: "768px", height: "750px" },
      canvasWidth: 768,
      canvasHeight: 750,
    })
      .then((dataUrl) => {
        setPreviewImage(dataUrl);
      })
      .catch((e) => console.log(e));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedImage(undefined);
      return;
    }

    // setSelectedImage(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0] as File);
    setSelectedImage(objectUrl);
  };

  return (
    <>
      <Head>
        <title>Generate ID</title>
        <meta
          name="description"
          content="International State College of the Philippines"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto items-center justify-center min-h-screen p-4">
        <div className="">
          <IdCard
            name={data.results[0]?.name}
            // picture={data.results[0]?.picture}
            picture={selectedImage}
          />
        </div>
        <input type="file" onChange={handleImageChange} />
        <img src={previewImage} />
        <button onClick={generateImage}>Generate</button>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://randomuser.me/api/");
  const data: RandomUser = await res.json();

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
};
export default GeneratePage;
