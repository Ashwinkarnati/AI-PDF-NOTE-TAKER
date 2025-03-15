"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react"; // Import trash icon
import { toast } from "sonner"; // For toast notifications

const Dashboard = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Fetch the list of files uploaded by the user
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail,
  });

  // Fetch the upload count for the current user
  const uploadCount = useQuery(api.fileStorage.getUploadCount, {
    userEmail,
  });

  // Use the `useMutation` hook to call the `createUser` mutation
  const createUserMutation = useMutation(api.user.createUser);

  // Use the `useMutation` hook to call the `deleteFile` mutation
  const deleteFileMutation = useMutation(api.fileStorage.deleteFile);

  // Use the `useMutation` hook to call the `decrementUploadCount` mutation
  const decrementUploadCount = useMutation(api.fileStorage.decrementUploadCount);

  // Effect to create the user when the component mounts
  useEffect(() => {
    if (user) {
      createUserMutation({
        userName: user.fullName || "Unknown User",
        email: userEmail || "",
        imageUrl: user.imageUrl || "",
      }).then((result) => {
        console.log(result); // Log the result of the mutation
      });
    }
  }, [user, createUserMutation, userEmail]);

  // Function to handle file deletion
  const handleDelete = async (fileId, storageId) => {
    try {
      // Delete the file and associated records
      await deleteFileMutation({ fileId, storageId });

      // Decrement the upload count
      await decrementUploadCount({ userEmail });

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
                    onClick={() => handleDelete(file.fileId, file.storageId)}
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
            : (
                // Improved UI for no files
                <div className="col-span-full flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <Image
                    src="/empty-folder.png" // Add an image for visual appeal
                    alt="No files"
                    width={100}
                    height={100}
                    className="mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    No PDFs Uploaded Yet
                  </h2>
                  <p className="text-gray-500 text-center mb-4">
                    Get started by uploading your first PDF to organize and manage your documents.
                  </p>
                </div>
              )
          : (
              // Loading state
              [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-200 rounded-md h-[100px] animate-pulse"
                ></div>
              ))
            )}
      </div>
    </div>
  );
};

export default Dashboard;