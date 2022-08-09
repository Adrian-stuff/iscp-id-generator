import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import IdCard from "../../components/id";
import { getIDImage } from "../../lib/storage";
import { getUserWithID, UserData } from "../../models/userModel";

const Id: NextPage<{ userData: UserData; image: string }> = ({
  userData,
  image,
}) => {
  // return <IdCard campus={userData.student_info.campus} name={userData.student_info.name} course={userData.student_info.course} qrValue={`https://iscpid.web.app/s/${userData.student_id}`} studentID={userData.student_id} picture/>;
  return (
    <>
      <Head>
        <title>
          {userData.student_info.name} | International State College of the
          Philippines Identification System
        </title>
        <meta property="og:image" content={image} />
        <meta
          name="description"
          content="International State College of the Philippines Identification System"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center py-3">
        <img src={image} alt={userData.student_info.name} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const userData = await getUserWithID(id);
  if (userData.empty) {
    return { redirect: { destination: "/", permanent: false } };
  }
  const imageUrl = await getIDImage(id);
  console.log(imageUrl);
  return {
    props: {
      userData: userData.docs[0]?.data(),
      image: imageUrl?.split("&token")[0] ?? null,
    },
  };
};
export default Id;
