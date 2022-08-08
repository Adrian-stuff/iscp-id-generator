import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";

const uploadImage = (image: Blob, studentID: string) => {
  const storageRef = ref(storage, `id_cards/${studentID}/id_card.png`);
  uploadBytes(storageRef, image).then((snapshot) => {
    console.log("uploaded successfully");
  });
};

export { uploadImage };
