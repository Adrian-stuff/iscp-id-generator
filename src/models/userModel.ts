import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { db } from "../lib/firebaseConfig";

// implement Data type
export interface StudentInfo {
  name: string;
  // picture: string;
  campus: string;
  course: string;
  // studentID: string;
  // email: string;
}
export interface UserData {
  // id_card: string;
  id_card?: string;
  avatar?: string;
  defaultAvatar?: string;
  student_id: string;
  student_info: StudentInfo;
}

const setUser = async (userEmail: string, data: UserData) => {
  await setDoc(doc(db, "users", userEmail), {
    id_card: `id_card/${data.student_id}/id_card.png`,
    avatar: `id_card/${data.student_id}/avatar.png`,
    defaultAvatar: data.defaultAvatar,
    student_id: data.student_id,
    student_info: {
      name: data.student_info.name,
      campus: data.student_info.campus,
      course: data.student_info.course,
    },
  });
};

const getUserWithEmail = async (email: string) => {
  const userData = await getDoc(doc(db, "users", email));
  return userData.data();
};

const getUserWithID = async (id: string) => {
  const userCollection = collection(db, "users");
  const q = query(userCollection, where("student_id", "==", id));
  const userData = await getDocs(q);
  return userData;
};
export { setUser, getUserWithEmail, getUserWithID };
