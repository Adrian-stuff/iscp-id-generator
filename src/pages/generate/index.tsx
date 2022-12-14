import { toBlob, toPng } from "html-to-image";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
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
import Credits from "../../components/credits";
import Select from "react-select";

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

  const campusOptions = useMemo(
    () =>
      data.campusArray.map((val) => {
        return { value: val, label: val };
      }),

    []
  );
  const courseOptions = useMemo(() => {
    const arrays: string[] = [];
    Object.values(data.campusMap).map((val) => arrays.push(...val.courses));

    return arrays
      .filter((val) => val.trim().length !== 0)
      .map((val) => {
        return { value: val, label: val };
      });
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

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
    // toPng(document.getElementById("idCard") as HTMLElement, {
    //   quality: 1,
    //   // canvasWidth: 650,
    //   // canvasHeight: 412,\400.28px] h-[680.39px
    //   width: 400,
    //   height: 679,
    //   canvasWidth: 400,
    //   canvasHeight: 679,
    // })
    //   .then((dataUrl) => {
    //     setPreviewImage(dataUrl);
    //     // uploadImage()
    //   })
    //   .catch((e) => console.log(e));
    if (!isLoading) {
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
    }
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

      <main className="container mx-auto min-w-[420px] px-10 mt-5 items-center justify-center font-montserrat">
        <div className="flex items-center justify-center ">
          <IdCard
            name={name}
            defaultName={data.user?.student_info.name}
            picture={selectedImage!}
            campus={campus}
            course={course}
            withQr={true}
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
          <div className="flex flex-col max-w-[300px] ">
            <div className="flex flex-col p-1">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                maxLength={50}
                className="rounded-[4px] border-[#cccccc] text-[#333333]"
                value={name ?? "Name goes here"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-1">
              <label htmlFor="campus">Campus</label>
              <Select
                id="campus"
                value={{ value: campus, label: campus }}
                onChange={(e) => setCampus(e?.value!)}
                options={campusOptions}
                isSearchable
              ></Select>
              {/* <select
                id="campus"
                onChange={(e) => setCampus(e.target.value)}
                value={campus}
              >
                {data.campusArray.map((campus, i) => (
                  <option key={i} value={campus}>
                    {campus.toUpperCase()}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="flex flex-col p-1">
              <label htmlFor="campus">Course</label>
              <Select
                id="campus"
                value={courseOptions.filter((val) => val.value === course)}
                onChange={(e) => setCourse(e?.value!)}
                options={courseOptions}
                isSearchable
              ></Select>
              {/* <select
                onChange={(e) => setCourse(e.target.value)}
                value={course}
              >
                {Object.entries(data.campusMap).map(([campusName, object], i) =>
                  Object.values(object.courses).map((course, i) => {
                    return course.trim().length !== 0 ? (
                      <option key={i} value={course}>
                        {course}
                      </option>
                    ) : null;
                  })
                )}
              </select> */}
            </div>

            <div className="flex flex-col p-1">
              <label htmlFor="avatarUpload">
                Upload your image here: (optional)
              </label>
              <input ref={fileRef} type="file" onChange={handleImageChange} />
              {blobImage && (
                <button
                  onClick={() => {
                    fileRef.current!.value = "";
                    setBlobImage(undefined);
                    setSelectedImage(
                      data.avatarUrl ??
                        data.session.user?.image!.replace(/=s96-c/g, "")
                    );
                  }}
                >
                  Remove Uploaded Image
                </button>
              )}
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
        <Credits></Credits>
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
