"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const UploadPdfDialog = ({ children }) => {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const {user} = useUser();
  const [fileName,setFileName]= useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };
  const OnUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    const fileId = uuid4();
    const fileUrl = await getFileUrl({storageId:storageId})
    // Step 3: Save the newly allocated storage id to the database
    const resp = await AddFileEntry({
        fileId:fileId,
        storageId:storageId,
        fileName:fileName??'Untitled File',
        fileUrl:fileUrl,
        createdBy:user?.primaryEmailAddress?.emailAddress
    })
    //API Call to Fetch PDF Process Data
    const apiresp = await axios.get('/api/pdf-loader?pdfUrl='+fileUrl);
    await embeddDocument({
      splitText:apiresp.data.result,
      fileId:fileId
    });
    setLoading(false);
    setOpen(false);
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={()=>setOpen(true)}>+ Upload PDF File</Button>
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
              onChange={(event) => OnFileSelect(event)}
            />
          </div>

          <div className="mt-6 flex items-center gap-4 p-4 bg-gray-100 border border-gray-200 rounded-lg">
            <label className="text-[16px] font-medium text-blue-600">
              File Name *
            </label>
            <Input
              placeholder="File Name"
              className="border border-gray-300 rounded-lg p-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setFileName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className=" bg-red-600 text-white hover:text-black cursor-pointer w-[25%]"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={OnUpload}
            disabled = {loading}
            className="bg-green-600 text-white hover:text-black cursor-pointer hover:bg-white w-[25%]"
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdfDialog;
