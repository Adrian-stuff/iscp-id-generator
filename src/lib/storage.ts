import {
  deleteObject,
  getBlob,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebaseConfig";

const uploadIDImage = (image: Blob, studentID: string) => {
  const storageRef = ref(storage, `id_cards/${studentID}/id_card.png`);
  uploadBytes(storageRef, image)
    .then((snapshot) => {
      console.log("uploaded successfully");
    })
    .catch((e) => console.log(e));
};

const uploadAvatarImage = (image: Blob, studentID: string) => {
  const storageRef = ref(storage, `id_cards/${studentID}/avatar.png`);
  uploadBytes(storageRef, image)
    .then((snapshot) => {
      console.log("uploaded successfully");
    })
    .catch((e) => console.log(e));
};

const getIDImage = async (studentID: string) => {
  const storageRef = ref(storage, `id_cards/${studentID}/id_card.png`);

  const url = getDownloadURL(storageRef)
    .then((url) => url)
    .catch((e) => {
      console.log(e);
      return undefined;
    });

  return url;
};

const getAvatarImage = async (studentID: string) => {
  const storageRef = ref(storage, `id_cards/${studentID}/avatar.png`);

  const url = getDownloadURL(storageRef)
    .then((url) => url)
    .catch((e) => {
      console.log(e);
      return undefined;
    });

  return url;
};
const deleteAvatarImage = async (studentID: string) => {
  const storageRef = ref(storage, `id_cards/${studentID}/avatar.png`);
  deleteObject(storageRef)
    .then(() => console.log("deleted"))
    .catch((e) => console.log(e));
};
export {
  uploadIDImage,
  uploadAvatarImage,
  getIDImage,
  getAvatarImage,
  deleteAvatarImage,
};
