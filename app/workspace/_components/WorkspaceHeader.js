import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WorkspaceHeader = ({ fileName, onSave, onDownload }) => {
  return (
    <div className="p-4 flex justify-between shadow-md bg-white">
      <Link href={'/dashboard'}>
        <Image src={"/logo.svg"} alt="logo" width={42} height={42} className="rounded-[90%]" />
      </Link>
      <p className="font-bold text-blue-950 text-2xl uppercase">{fileName}</p>
      <div className="flex gap-2 items-center">
        <Button className={'cursor-pointer bg-green-600'} onClick={onSave}>Save</Button> {/* Call onSave when the button is clicked */}
        <UserButton />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
