// WorkspaceHeader Component
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = ({ fileName }) => {
  return (
    <div className="p-4 flex justify-between shadow-md bg-white">
      <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      <p className="font-bold text-blue-950 text-2xl uppercase">{fileName}</p>
      <UserButton />
    </div>
  );
};

export default WorkspaceHeader;