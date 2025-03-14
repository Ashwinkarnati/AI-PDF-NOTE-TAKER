"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div>
      <h1 className="font-bold text-3xl m-5">Workspace</h1>
      <div className="m-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 cursor-pointer">
        {fileList
          ? fileList.length > 0
            ? fileList.map((file, index) => (
              <Link href={'/workspace/'+file.fileId} key={index}>
                <div
                  className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border transition-all hover:scale-105"
                >
                  <Image src={"/pdf.png"} alt="file" height={40} width={40} />
                  <h2 className="mt-3 font-md text-xxl">{file?.fileName}</h2>
                </div>
                </Link>
              ))
            : [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-200 rounded-md h-[100px] animate-pulse"
                ></div>
              ))
          : [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-md h-[120px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
