"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react"; // Import trash icon
import { toast } from "sonner"; // For toast notifications
import { useState } from "react";
const Dashboard = () => {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  // Use the `useMutation` hook to call the `createUser` mutation
  const createUserMutation = useMutation(api.user.createUser);


  // Effect to create the user when the component mounts
  useEffect(() => {
    if (user) {
      createUserMutation({
        userName: user.fullName || "Unknown User",
        email: user.primaryEmailAddress?.emailAddress || "",
        imageUrl: user.imageUrl || "",
      }).then((result) => {
        console.log(result); // Log the result of the mutation
      });
    }
  }, [user, createUserMutation]);

  const [count, setCount] = useState(0); // Track the number of uploaded files

  // Load the count from local storage on component mount
  useEffect(() => {
    const savedCount = localStorage.getItem("uploadCount");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  // Save the count to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("uploadCount", count.toString());
  }, [count]);

  // Use the `useMutation` hook to call the `deleteFile` mutation
  const deleteFileMutation = useMutation(api.fileStorage.deleteFile);

  // Function to handle file deletion
  const handleDelete = async (fileId) => {
    try {
      await deleteFileMutation({ fileId });
      setCount((prevCount) => prevCount - 1); // Decrement the upload count
      toast.success("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file.");
    }
  };
  return (
    <div>
      <h1 className="font-bold text-3xl m-5">Workspace</h1>
      <div className="m-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 cursor-pointer">
        {fileList
          ? fileList.length > 0
            ? fileList.map((file, index) => (
                <div
                  key={index}
                  className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border transition-all hover:scale-105 relative"
                >
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(file.fileId)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* File details */}
                  <Link href={'/workspace/' + file.fileId}>
                    <div className="flex flex-col items-center">
                      <Image src={"/pdf.png"} alt="file" height={40} width={40} />
                      <h2 className="mt-3 font-md text-xxl">{file?.fileName}</h2>
                    </div>
                  </Link>
                </div>
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