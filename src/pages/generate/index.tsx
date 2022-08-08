import { toPng } from "html-to-image";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import IdCard from "../../components/id";
import { RandomUser } from "../../types/mockData";

const GeneratePage: NextPage<{
  data: { user: RandomUser; campuses: string[]; courses: string[] };
}> = ({ data }) => {
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("Name here");
  const [course, setCourse] = useState(data.courses[0] ?? "");
  const [campus, setCampus] = useState("ISCP-Main");
  const [qrCode, setQRCode] = useState("Tite");
  const generateImage = () => {
    toPng(document.getElementById("idCard") as HTMLElement, {
      quality: 1,
      // canvasWidth: 650,
      // canvasHeight: 412,\400.28px] h-[680.39px
      width: 400,
      height: 679,
      canvasWidth: 400,
      canvasHeight: 679,
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

      <main className="container mx-auto px-10 mt-10 items-center justify-center font-montserrat">
        <div className="flex items-center justify-center ">
          <IdCard
            name={name}
            picture={selectedImage}
            campus={campus}
            course={course}
            qrValue={qrCode}
            studentID="12090129378"
          />
        </div>
        <div className="mt-10 flex flex-col justify-center">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="qrValue">QR Value</label>
          <input
            id="qrValue"
            type="text"
            onChange={(e) => setQRCode(e.target.value)}
          />
          <select onChange={(e) => setCampus(e.target.value)}>
            {data.campuses.map((campus, i) => (
              <option key={i} value={campus}>
                {campus}
              </option>
            ))}
          </select>
          <select onChange={(e) => setCourse(e.target.value)}>
            {data.courses.map((course, i) => (
              <option key={i} value={course}>
                {course}
              </option>
            ))}
          </select>
          <input type="file" onChange={handleImageChange} />
          <img src={previewImage} />
          <button onClick={generateImage}>Generate</button>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://randomuser.me/api/");
  const userData: RandomUser = await res.json();
  const campuses = ["ISCP - Moon Campus", "ISCP - Meow Meow", "ISCP - ARFA RF"];
  const courses = ["BS - Moon Campus", "BS - Meow Meow", "BS - ARFA RF"];

  return {
    props: {
      data: {
        user: userData,
        campuses: campuses,
        courses: courses,
      },
    }, // will be passed to the page component as props
  };
};
export default GeneratePage;
