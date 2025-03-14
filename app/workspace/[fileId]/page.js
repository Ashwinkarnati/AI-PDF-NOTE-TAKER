"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import TextEditor from "../_components/TextEditor";

const Workspace = () => {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileId });

  useEffect(() => {
    if (fileInfo) {
      console.log("File Info:", fileInfo);
    }
  }, [fileInfo]);

  if (!fileInfo) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!fileInfo.fileUrl) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Error: File not found or invalid file URL.</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <WorkspaceHeader fileName={fileInfo?.fileName} />
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-5 p-4">
        <div className="overflow-auto border rounded-lg shadow-md">
          <TextEditor key={fileId} /> {/* Ensure TextEditor re-mounts when fileId changes */}
        </div>
        <div className="overflow-auto border rounded-lg shadow-md">
          <PdfViewer fileUrl={fileInfo.fileUrl} key={fileInfo.fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;