"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react"; // Corrected import
import { v4 as uuidv4 } from "uuid"; // Corrected import
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const UploadPdfDialog = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const incrementUploadCount = useMutation(api.fileStorage.incrementUploadCount);
  const getUploadCount = useQuery(api.fileStorage.getUploadCount, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const OnUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (!fileName) {
      toast.error("Please provide a file name.");
      return;
    }

    if (getUploadCount >= 5) {
      toast.error("You have reached the maximum upload limit of 5 files.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Generate an upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: Upload the file to Convex storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });
      const { storageId } = await result.json();

      // Step 3: Get the file URL
      const fileUrl = await getFileUrl({ storageId });

      // Step 4: Store file metadata in the database
      const fileId = uuidv4();
      await AddFileEntry({
        fileId,
        storageId,
        fileName: fileName ?? "Untitled File",
        fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      // Step 5: Embed the document (optional)
      const apiresp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
      await embeddDocument({
        splitText: apiresp.data.result,
        fileId,
      });

      // Step 6: Increment the upload count
      await incrementUploadCount({
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      toast.success("File uploaded successfully!");
      router.push(`/workspace/${fileId}`)
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`cursor-pointer ${getUploadCount >= 5 ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={getUploadCount >= 5} // Disable the button if count >= 5
          onClick={() => setOpen(true)}
        >
          + Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Upload PDF File
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            Select a PDF file to upload and provide a file name.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <h2 className="text-[16px] font-medium text-blue-600">
              Select a file to Upload
            </h2>
            <input
              type="file"
              className="border-2 border-blue-500 rounded-lg p-2 w-[60%] text-center cursor-pointer"
              accept="application/pdf"
              onChange={OnFileSelect}
            />
          </div>

          <div className="mt-6 flex items-center gap-4 p-4 bg-gray-100 border border-gray-200 rounded-lg">
            <label className="text-[16px] font-medium text-blue-600">
              File Name *
            </label>
            <Input
              placeholder="File Name"
              className="border border-gray-300 rounded-lg p-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="secondary"
            className="bg-red-600 text-white hover:text-black cursor-pointer w-[25%]"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button
            onClick={OnUpload}
            disabled={loading || getUploadCount >= 5} // Disable the button if loading or count >= 5
            className="bg-green-600 text-white hover:text-black cursor-pointer hover:bg-white w-[25%]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdfDialog;