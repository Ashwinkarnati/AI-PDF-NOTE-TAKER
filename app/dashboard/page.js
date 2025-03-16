"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const fileList = useQuery(api.fileStorage.GetUserFiles, { userEmail });
  const uploadCount = useQuery(api.fileStorage.getUploadCount, { userEmail });
  const createUserMutation = useMutation(api.user.createUser);
  const deleteFileMutation = useMutation(api.fileStorage.deleteFile);
  const decrementUploadCount = useMutation(api.fileStorage.decrementUploadCount);

  useEffect(() => {
    if (user) {
      createUserMutation({
        userName: user.fullName || "Unknown User",
        email: userEmail || "",
        imageUrl: user.imageUrl || "",
      });
    }
  }, [user, createUserMutation, userEmail]);

  const handleDelete = async (fileId, storageId) => {
    try {
      await deleteFileMutation({ fileId, storageId });
      await decrementUploadCount({ userEmail });
      toast.success("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file.");
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl sm:text-3xl mb-6">Workspace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {fileList === undefined ? ( // Loading state
          [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div
              key={index}
              className="bg-slate-200 rounded-md h-[100px] animate-pulse"
            ></div>
          ))
        ) : fileList.length > 0 ? ( // If files exist
          fileList.map((file, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative bg-white"
            >
              <button
                onClick={() => handleDelete(file.fileId, file.storageId)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
              <Link href={`/workspace/${file.fileId}`}>
                <div className="flex flex-col items-center">
                  <Image src="/pdf.png" alt="file" height={40} width={40} />
                  <h2 className="mt-2 text-sm font-medium text-center">
                    {file?.fileName}
                  </h2>
                </div>
              </Link>
            </div>
          ))
        ) : ( // If no files exist
          <div className="col-span-full flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Image
              src="/empty-folder.png"
              alt="No files"
              width={100}
              height={100}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No PDFs Uploaded Yet
            </h2>
            <p className="text-gray-500 text-center">
              Get started by uploading your first PDF to organize and manage your
              documents.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;