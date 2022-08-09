import { toBlob, toPng } from "html-to-image";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState(
    data.avatarUrl ?? data.session.user?.image!.replace(/=s96-c/g, "")
  );
  const [blobImage, setBlobImage] = useState<Blob | File>();
  const [name, setName] = useState(
    data.user?.student_info.name ?? (data.session.user?.name as string)
  );
  const [course, setCourse] = useState(
    data.user?.student_info.course ??
      (data.campusMap[data.campusArray[0] as string]?.courses[0] as string)
  );
  const [campus, setCampus] = useState(
    data.user?.student_info.campus ?? (data.campusArray[0] as string)
  );
  const [studentID, setStudentID] = useState(data.user?.student_id ?? "");
  const [qrCode, setQRCode] = useState(
    data.user?.student_id
      ? `https://iscpid.vercel.app/s/${data.user.student_id}`
      : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (studentID.length === 0) {
      const randomID = generateRandomID();
      setStudentID(randomID);
      setQRCode(`https://iscpid.vercel.app/s/${randomID}`);
    }
  }, []);
  const generateImage = () => {
    setIsLoading(true);
    setPreviewImage("");
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
        // uploadImage()
      })
      .catch((e) => console.log(e));

    toBlob(document.getElementById("idCard") as HTMLElement, {
      quality: 1,
      width: 400,
      height: 679,
      canvasWidth: 400,
      canvasHeight: 679,
    })
      .then((file) => {
        if (typeof data.session.user?.email !== "string") return;
        setUser(data.session.user?.email, {
          defaultAvatar: data.session.user?.image!.replace(/=s96-c/g, ""),
          student_id: studentID,
          student_info: { campus, course, name },
        });
        if (file === null) return;
        uploadIDImage(file, studentID);
        setIsLoading(false);
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "ISCP-ID.png";
        link.click();
        if (blobImage === undefined) return;
        uploadAvatarImage(blobImage, studentID);
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
    setBlobImage(e.target.files[0] as File);
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
            defaultName={data.user?.student_info.name}
            picture={selectedImage!}
            campus={campus}
            course={course}
            qrValue={qrCode}
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
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                maxLength={40}
                value={name ?? "Name goes here"}
                onChange={(e) => setName(e.target.value)}
              />
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
              <label htmlFor="campus">Campus</label>
              <select
                id="campus"
                onChange={(e) => setCampus(e.target.value)}
                value={campus}
              >
                <option value={undefined}>select campus</option>
                {data.campusArray.map((campus, i) => (
                  <option key={i} value={campus}>
                    {campus.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col p-1">
              <label htmlFor="avatarUpload">
                Upload your image here: (optional)
              </label>
              <input type="file" onChange={handleImageChange} />
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
  console.log("campusMap", campusMap);
  console.log("campusArray", campusArray);

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const user = await getUserWithEmail(session.user?.email as string);
  const avatarUrl = await getAvatarImage(user?.student_id as string);
  console.log(user, avatarUrl);
  return {
    props: {
      data: {
        session: session,
        user: user ?? null,
        avatarUrl: avatarUrl?.split("&token")[0] ?? null,
        campusArray,
        campusMap,
      },
    }, // will be passed to the page component as props
  };
};
export default GeneratePage;
