"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import TextEditor from "../_components/TextEditor";
import { useUser } from "@clerk/nextjs";

const Workspace = () => {
  const {user} = useUser();
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileId });
  const addNotesMutation = useMutation(api.notes.AddNotes);

  const handleSave = async () => {
    const editorContent = document.querySelector(".ProseMirror")?.innerHTML; // Get the editor's content
    if (editorContent) {
      const createdBy = user?.fullName; // Replace this with the actual user id if available
      await addNotesMutation({ fileId, notes: editorContent, createdBy });
      alert("Notes saved successfully!");
    }
  };


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
      <WorkspaceHeader fileName={fileInfo?.fileName} onSave={handleSave} /> {/* Pass handleSave to WorkspaceHeader */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-5 p-4">
        <div className="overflow-auto border rounded-lg shadow-md">
          <TextEditor fileId={fileId} key={fileId} onSave={handleSave} /> {/* Pass handleSave to TextEditor */}
        </div>
        <div className="overflow-auto border rounded-lg shadow-md">
          <PdfViewer fileUrl={fileInfo.fileUrl} key={fileInfo.fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;