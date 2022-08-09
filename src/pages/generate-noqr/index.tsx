import { toBlob, toPng } from "html-to-image";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import IdCard from "../../components/id";
import { RandomUser } from "../../types/mockData";
import { DefaultSession, Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { generateRandomID } from "../../lib/randomID";
import {
  deleteAvatarImage,
  getAvatarImage,
  uploadAvatarImage,
  uploadIDImage,
} from "../../lib/storage";
import { getUserWithEmail, setUser, UserData } from "../../models/userModel";
import { CampusMap, getCampuses } from "../../models/iscpData";
const GeneratePage: NextPage<{
  data: {
    session: Session;
    user?: UserData;
    avatarUrl: string;
    campusArray: string[];
    campusMap: CampusMap;
  };
}> = ({ data }) => {
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState(
    data.campusMap[data.campusArray[0] as string]?.courses[0] as string
  );
  const [campus, setCampus] = useState(data.campusArray[0] as string);
  const [studentID, setStudentID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useDefaultImage, setUseDefaultImage] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const randomID = generateRandomID();
    setStudentID(randomID);
  }, []);
  const generateImage = () => {
    if (
      name.trim().length === 0 ||
      (!useDefaultImage && selectedImage.trim().length === 0) ||
      campus.trim().length === 0
    ) {
      alert("baliw k tlga hwahahwa \nSAGUTAN MO LAHAT WOY");
      return;
    }

    setIsLoading(true);
    setPreviewImage("");
    toBlob(document.getElementById("idCard") as HTMLElement, {
      quality: 1,
      width: 400,
      height: 679,
      canvasWidth: 400,
      canvasHeight: 679,
    })
      .then((file) => {
        if (file === null) return;
        setIsLoading(false);
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "ISCP-ID.png";
        link.click();
      })

      .catch((e) => console.log("toBlob", e));
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
        <title>
          Generate ID | International State College of the Philippines
          Identification System
        </title>
        <meta
          name="description"
          content="International State College of the Philippines Identification System"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-10 mt-5 items-center justify-center font-montserrat">
        <div className="flex items-center justify-center ">
          <IdCard
            name={name}
            defaultName={"Meow Meow Batumbakal"}
            picture={
              selectedImage.trim().length === 0 || useDefaultImage
                ? "/Cute-Cat.jpg"
                : selectedImage
            }
            spacing={45}
            campus={campus}
            course={course}
            withQr={false}
            studentID={studentID}
          />
        </div>
        <div className=" px-10 mt-5 flex flex-col justify-center items-center">
          {isLoading && (
            <h1 className="text-lg font-bold text-center">
              Loading please wait...
            </h1>
          )}
          <div className="flex flex-col max-w-sm ">
            <div className="flex flex-col p-1">
              <h1 className="font-bold">Required lahat</h1>
              <label htmlFor="name">Name </label>
              <input
                required
                id="name"
                type="text"
                maxLength={40}
                defaultValue="Meow Meow Batumbakal"
                value={name.trim().length !== 0 ? name : undefined}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col p-1">
              <label htmlFor="campus">Campus</label>
              <select
                id="campus"
                onChange={(e) => setCampus(e.target.value)}
                value={campus}
              >
                <option value="">select campus</option>
                {data.campusArray.map((campus, i) => (
                  <option key={i} value={campus}>
                    {campus.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col p-1">
              <label htmlFor="campus">Course</label>

              <select
                onChange={(e) => setCourse(e.target.value)}
                value={course}
              >
                <option value="">select course</option>
                {data.campusMap[campus]?.courses.map((campus, i) => (
                  <option key={i} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col p-1">
              <label htmlFor="avatarUpload">Upload your image here:</label>
              <input ref={fileRef} type="file" onChange={handleImageChange} />
              {selectedImage.trim().length !== 0 && (
                <button
                  onClick={() => {
                    fileRef.current!.value = "";
                    setSelectedImage("");
                  }}
                >
                  Remove Uploaded Image
                </button>
              )}
              <div className="flex flex-row items-center justify-around">
                <label htmlFor="useDefaultImage">
                  Use default image? (cat meow meow)
                </label>
                <input
                  id="useDefaultImage"
                  type="checkbox"
                  checked={useDefaultImage}
                  onChange={() => {
                    // setSelectedImage("");
                    setUseDefaultImage(!useDefaultImage);
                  }}
                />
              </div>
            </div>
            {/* {data.avatarUrl !== null && (
            <button onClick={() => console.log(studentID)}>
              Delete Avatar
            </button>
          )} */}
            {/* <img src={previewImage} /> */}
            <div className="flex flex-col p-1">
              <button
                className="border-2 rounded-lg p-2 bg-blue-400"
                onClick={generateImage}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [campusArray, campusMap] = await getCampuses();
  return {
    props: {
      data: {
        campusArray,
        campusMap,
      },
    }, // will be passed to the page component as props
  };
};
export default GeneratePage;
