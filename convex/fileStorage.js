import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { useEffect } from "react";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
    fileUrl:v.string()
  },
  handler:async(ctx,args)=>{
    const result = await ctx.db.insert('pdfFiles',{
      fileId:args.fileId,
      fileName:args.fileName,
      storageId:args.storageId,
      createdBy:args.createdBy,
      fileUrl:args.fileUrl
    });
    return "Inserted"
  }
});


export const getFileUrl = mutation({
  args:{
    storageId:v.string()
  },
  handler:async(ctx,args)=>{
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  }
})

export const GetFileRecord= query(
  {
    args:{
      fileId:v.string()
    },
    handler: async(ctx,args)=>{
      const result = await ctx.db.query('pdfFiles').filter((q)=>q.eq(args.fileId,q.field('fileId'))).collect();
      return result[0];
    }
  }
);

export const GetUserFiles = query({
  args:{
    userEmail:v.string()
  },
  handler:async(ctx,args)=>{
    const result = await ctx.db.query('pdfFiles').filter((q)=>q.eq(q.field('createdBy'),args.userEmail)).collect();

    return result;
  }
})

export const deleteFile = mutation({
  args: {
    fileId: v.string(), // The ID of the file to delete
  },
  handler: async (ctx, args) => {
    // Find the file record in the database
    const fileRecord = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    if (fileRecord.length === 0) {
      throw new Error("File not found.");
    }

    // Delete the file record from the database
    await ctx.db.delete(fileRecord[0]._id);

    // Delete associated notes
    const noteRecords = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    for (const note of noteRecords) {
      await ctx.db.delete(note._id);
    }

    // Delete associated documents
    const documentRecords = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("metadata.fileId"), args.fileId)) // Corrected filter
      .collect();
    for (const doc of documentRecords) {
      await ctx.db.delete(doc._id);
    }

    // Optionally, delete the file from storage (if needed)
    await ctx.storage.delete(fileRecord[0].storageId);

    return "File and associated records deleted successfully";
  },
});