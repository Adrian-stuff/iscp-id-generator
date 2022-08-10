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

// TODO: IMPLEMENT A MUCH BETTER AND EFFICIENT SETUP
const getCampuses = async () => {
  // const data = await getDoc(doc(db, "iscpDATA", "campuses"));
  // const res = data.data();
  const res = {
    "ISCP - Main Campus": {
      courses: [
        "BS IN CRIMINOLOGY",
        "BS IN HOTEL AND RESTAURANT MANAGEMENT",
        "BS IN AGRICULTURE",
        "BS IN ARCHITECTURE",
        "BA IN CULTURE AND ARTS",
        "BA IN PUBLIC ADMINISTRATION",
        "BS IN VULCANIZING",
        "BS IN CUSTOMS ADMINISTRATION",
        "BS IN GENDER STUDIES",
        "BS IN AUTOMOTIVE ENGINEERING",
        "BS IN BANKING ANG FINANCE",
        "BS IN IMMUNOLOGY",
        "BS IN BIOLOGY",
        "BA IN MASS COMMUNICATION",
        "BS IN PHYSICS",
        "BS IN COSMETOLOGY",
        "BSIT - imissyou whahahha",
        "BS IN imissyou whahahha",
        "BA IN PHILOSOPHY",
        "BS PSYCHOLOGY - MAJOR IN OVERTHINKING",
      ],
    },
    "ISCP - Pluto Campus": { courses: [""] },
    "ISCP - Amazon Extension": { courses: [""] },
    "ISCP - Main Campus Luzon Extension": { courses: [""] },
    "ISCP Med School - Main Campus": {
      courses: ["MAJOR IN DNA ENGINEERING", "BS IN NURSING"],
    },
    "ISCP - Low Earth Orbit Ext": {
      courses: ["BS IN METEOROLOGY", "BS IN AERO-NAUTICAL ENGINEERING"],
    },
    "ISCP - Sun Campus": { courses: [""] },
    "ISCP - Moon Campus": { courses: [""] },
    "ISCP - Harvard Extension": {
      courses: ["BS IN GAMBLING & COMMERCIAL GAMING"],
    },
    "ISCP - Main Campus Mindanao Extension": { courses: [""] },
    "ISCP - Jupiter Campus": { courses: [""] },
    "ISCP - Asteroid Belt Extension": { courses: [""] },
    "ISCP - Antarctica Extension": { courses: [""] },
    "ISCP - Main Campus Visayas Extension": { courses: [""] },
    "ISCP - Saturn Campus": { courses: [""] },
    "ISCP - Tondo Campus": { courses: ["BA IN MARTIAL ARTS STUDIES"] },
    "ISCP - Atlantis Extension": { courses: ["BS IN MARINE BIOLOGY"] },
    "ISCP - Biringan Campus": { courses: ["BS IN REVERSE PSYCHOLOGY"] },
    "ISCP - Las Vegas Extension": {
      courses: ["BA IN ENGLISH LANGUAGE STUDIES"],
    },
    "ISCP - South Korea Extension": { courses: [""] },
    "ISCP - Mars Campus": { courses: [""] },
    "ISCP - Chernobyl Extension": { courses: ["BS IN MEDICAL TECHNOLOGY"] },
    "ISCP - dj loonyo int'l airport ext": { courses: [""] },
    "ISCP - Encantadia Extension": { courses: ["BS IN CULINARY ARTS"] },
  };
  const campus: string[] = [];
  if (res !== undefined) {
    Object.entries(res).forEach(([key, value], i) => {
      campus.push(key);
    });
  }
  // console.log(res);

  return [campus, res];
};
export { getCampuses };
