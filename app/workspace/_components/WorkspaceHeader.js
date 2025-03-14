import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = ({ fileName, onSave }) => {
  return (
    <div className="p-4 flex justify-between shadow-md bg-white">
      <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      <p className="font-bold text-blue-950 text-2xl uppercase">{fileName}</p>
      <div className="flex gap-2 items-center">
        <Button onClick={onSave}>Save</Button> {/* Call onSave when the button is clicked */}
        <UserButton />
      </div>
    </div>
  );
};

export default WorkspaceHeader;