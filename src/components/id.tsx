import React from "react";
import { QRCode } from "react-qrcode-logo";
import { Name, Picture, RandomUser } from "../types/mockData";

type IdCardTypes = {
  // name?: Name;
  // picture?: Picture;
  name: string;
  withQr: boolean;
  defaultName?: string;
  qrValue?: string;
  picture?: string;
  spacing?: number;
  campus: string;
  course: string;
  studentID: string;
};

const IdCard: React.FC<IdCardTypes> = ({
  name,
  defaultName = name,
  withQr,
  qrValue,
  picture,
  spacing,
  campus,
  course,
  studentID,
}) => {
  return (
    //     <div id="idCard" className="relative  bg-local w-[650px] h-[412px] ">
    //       <img
    //         className="w-full absolute"
    //         src="/id card.png"
    //         alt="id card background"
    //       />

    //       <div className="flex flex-col items-center absolute w-[184px] h-[184px] top-[94px] left-[78px]">
    //         <QRCode
    //           ecLevel="H"
    //           logoHeight={100}
    //           logoWidth={100}
    //           logoOpacity={0.5}
    //           eyeRadius={[
    //             10, // top/left eye
    //             10, // top/right eye
    //             10, // bottom/left eye
    //           ]}
    //           qrStyle="dots"
    //           logoImage="/ISCP-LOGO.png"
    //           value={qrValue}
    //         ></QRCode>
    //         <h1 className="text-lg font-base py-5 text-justify leading-none">
    //           {studentID}
    //         </h1>
    //       </div>
    //       <img
    //         className=" absolute max-w-[200px] max-h-[200px]  left-[400px] top-[100px] "
    //         src={picture ? picture : "/image-placeholder.png"}
    //         alt="2x2"
    //       />

    //       {/* <h1 className="absolute w-[267px] h-[54px] left-[70px] top-[330px] text-xl font-semibold text-center text-white">
    //         {campus}
    //       </h1> */}
    //       <div className="flex flex-row h-full w-full pb-2">
    //         <div className="z-10 flex flex-col-reverse">
    //           <h1 className="break-words pb-[70px] pl-[60px] w-[300px] h-[75px] text-xl font-semibold text-center text-white">
    //             {campus}
    //           </h1>
    //         </div>
    //         {/* info */}
    //         <div className="z-10 flex flex-1 flex-col-reverse ">
    //           <div className="flex flex-row-reverse ">
    //             <div className="flex flex-col pt-4 mb-16 w-[250px] h-[50px]">
    //               <h1 className="text-lg font-semibold break-words pr-4 text-left leading-none ">
    //                 {name}
    //               </h1>
    //               <h1 className="text-lg font-bold break-words pr-4 text-left leading-none ">
    //                 {course}
    //               </h1>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* #tZUYUBATUM {
    //   position: absolute;
    //   left: 467px;
    //   top: 247.8px;
    //   width: 162px;
    //   height: 48px;
    //   font-family: Poppins;
    //   font-size: 16px;
    //   font-weight: 600;
    // }
    //  */}
    //     </div>
    <div id="idCard" className="relative min-w-[400.28px] min-h-[680.39px]">
      <img
        className="w-full absolute"
        src="/id card portrait.png"
        alt="id card"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="z-10 absolute top-[161px] ml-[3.359px] w-[182px] h-[180px]  aspect-w-square">
          <img
            className="absolute rounded-full object-cover left-[-0.68px] top-[1px]"
            src={picture ? picture : "/image-placeholder.png"}
            alt="id picture"
          />
        </div>
        <div className="z-20 max-w-[310px] mt-[355px]">
          <h1 className="text-center leading-none text-white text-lg font-semibold">
            {name.trim().length === 0
              ? defaultName.toUpperCase()
              : name.toUpperCase()}
          </h1>
          <h1 className="text-center text-white text-sm font-light">
            {studentID}
          </h1>
          <h1
            style={{ marginTop: spacing ?? undefined }}
            className="text-center leading-tight mt-2 text-white text-md font-semibold"
          >
            {course}
          </h1>
          <h1 className="text-center text-white text-xs font-light -mt-[0.5px]">
            COURSE
          </h1>
          <h1 className="text-center leading-none text-white text-md font-semibold mt-1">
            {campus.toUpperCase()}
          </h1>
          <h1 className="text-center text-white text-xs font-light -mt-[0.5px]">
            CAMPUS
          </h1>
        </div>
        {withQr && (
          <div className="z-10 mt-[-4px] ml-1 justify-center">
            <QRCode
              size={114}
              logoHeight={100}
              logoWidth={100}
              logoOpacity={0.5}
              bgColor="#050a30"
              fgColor="#3a9bdc"
              qrStyle="dots"
              // logoImage="/ISCP-LOGO.png"
              value={qrValue}
            ></QRCode>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdCard;
