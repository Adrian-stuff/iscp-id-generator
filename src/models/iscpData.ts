import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../lib/firebaseConfig";
// campuses = [
//              {
//                campus: "ISCP - Main Campus",
//                courses: ["BSIT - imissyou"]
//               },
//               {
//                 campus: "ISCP - Sun and Moon Campus"
//                 courses: ["BSSM - Sun and Moon"]
//               }
//            ]
//
//

// campus = {
//   iscp-main: ['bsit','']
// }

export interface Campus {
  courses: string[];
}
export interface CampusMap {
  [campus: string]: Campus;
}
const getCampuses = async () => {
  const data = await getDoc(doc(db, "iscpDATA", "campuses"));
  const res = data.data();
  const campus: string[] = [];
  if (res !== undefined) {
    Object.entries(res).forEach(([key, value], i) => {
      campus.push(key);
    });
  }
  return [campus, res];
};
export { getCampuses };
