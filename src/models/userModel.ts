import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "../lib/firebaseConfig";

const usersRef = collection(db, "users");
// implement Data type
interface UserData {
  name: string;
  picture: string;
  campus: string;
  course: string;
  studentID: string;
  email: string;
}
// implement this later???
const setUser = async (studentID: string, data: UserData) => {
  await setDoc(doc(usersRef, studentID), {
    name: data.name,
    picture: data.picture,
    campus: data.campus,
    course: data.course,
    email: data.email,
  });
};

const getUser = async (studentID: string) => {
  const userData = await getDoc(doc(db, "users", studentID));
  return userData.data;
};
export { setUser, getUser };
