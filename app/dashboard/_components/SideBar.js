"use client";
import { Button } from "@/components/ui/button";
import { CoffeeIcon, Layout } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadPdfDialog from "./UploadPdfDialog";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBar = () => {
  const path = usePathname();
  console.log(path);

  return (
    <div className="shadow-lg h-screen mt-3 p-5">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={90}
        height={90}
        className="rounded-[90%]"
      />
      <div className="mt-4">
        <UploadPdfDialog>
          <Button className="w-[85%] bg-blue-700 cursor-pointer">+ Upload PDF</Button>
        </UploadPdfDialog>
        <Link href={"/dashboard"}>
          <div
            className={`flex gap-2 items-center mt-5 cursor-pointer w-[75%] hover:text-red-500 ${
              path === "/dashboard" && "bg-red-300 p-2 rounded-2xl"
            }`}
          >
            <Layout />
            <h2>WorkSpace</h2>
          </div>
        </Link>
        <Link href={"/dashboard/buyme"}>
          <div
            className={`flex gap-2 items-center mt-5 cursor-pointer w-[75%] hover:text-red-500 ${
              path === "/dashboard/buyme" && "bg-red-300 p-2 rounded-2xl"
            }`}
          >
            <CoffeeIcon />
            <h2>Buy Me A Coffee!</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
