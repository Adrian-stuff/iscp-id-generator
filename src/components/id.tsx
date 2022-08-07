import React from "react";
import { Name, Picture, RandomUser } from "../types/mockData";

type IdCardTypes = {
  name?: Name;
  // picture?: Picture;
  picture: string;
};

const IdCard: React.FC<IdCardTypes> = ({ name, picture }) => {
  return (
    <div id="idCard">
      <div className="grid grid-flow-col grid-cols-2 gap-12 font-poppins p-6">
        <div className="flex flex-col ">
          <div className="mb-4">
            <p className="leading-normal font-extrabold text-lg">LOGO</p>
            <p className="font-normal text-xs">
              International State College of the Philippines
            </p>
          </div>
          <div className="grid grid-flow-col grid-cols-2">
            <img
              className="rounded-xl border-[3px] border-blue-600 "
              // src={picture?.large}
              src={picture}
              alt={name ? `${name.first} ${name.last}` : "upload image"}
            />
          </div>
          <div className="font-normal text-sm mt-4">
            <p>School Address,Street,State,1234</p>
            <p>Telephone</p>
          </div>
        </div>
        <div className="flex flex-col py-2 col-span-3 ">
          <div className="text-center ">
            <h1 className="font-bold text-xl leading-tight">
              International State College of the Philippines
            </h1>
            <h2 className="font-semi text-lg leading-none">blabla Campus</h2>
          </div>
          <div className="text-justify mt-4">
            <p className="font-medium">Student ID: 1234</p>
            <p className="font-medium ">
              Name: {`${name?.first} ${name?.last}`}
            </p>
            <p className="font-medium ">{`${name?.first} ${name?.last}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCard;
