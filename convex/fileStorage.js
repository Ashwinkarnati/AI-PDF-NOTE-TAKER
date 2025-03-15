import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to generate an upload URL
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Mutation to add a file entry to the database
export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      fileName: args.fileName,
      storageId: args.storageId,
      createdBy: args.createdBy,
      fileUrl: args.fileUrl,
    });
    return result; // Return the ID of the inserted document
  },
});

// Mutation to get the URL of a file from Convex storage
export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

// Query to get a file record by its fileId
export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    return result[0]; // Return the first matching record
  },
});

// Query to get all files uploaded by a specific user
export const GetUserFiles = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .collect();
    return result; // Return all files uploaded by the user
  },
});

// Mutation to increment the upload count for a user
export const incrementUploadCount = mutation({
  args: {
    userEmail: v.string(), // Email of the user
  },
  handler: async (ctx, args) => {
    // Find the user's upload count record
    const uploadCountRecord = await ctx.db
      .query("uploadCounts")
      .withIndex("byUserEmail", (q) => q.eq("userEmail", args.userEmail))
      .unique();

    if (uploadCountRecord) {
      // If the record exists, increment the count
      await ctx.db.patch(uploadCountRecord._id, {
        count: uploadCountRecord.count + 1,
      });
    } else {
      // If the record doesn't exist, create a new one with count = 1
      await ctx.db.insert("uploadCounts", {
        userEmail: args.userEmail,
        count: 1,
      });
    }
  },
});

// Mutation to decrement the upload count for a user
export const decrementUploadCount = mutation({
  args: {
    userEmail: v.string(), // Email of the user
  },
  handler: async (ctx, args) => {
    // Find the user's upload count record
    const uploadCountRecord = await ctx.db
      .query("uploadCounts")
      .withIndex("byUserEmail", (q) => q.eq("userEmail", args.userEmail))
      .unique();

    if (uploadCountRecord && uploadCountRecord.count > 0) {
      // If the record exists and count > 0, decrement the count
      await ctx.db.patch(uploadCountRecord._id, {
        count: uploadCountRecord.count - 1,
      });
    }
  },
});

// Query to get the upload count for a user
export const getUploadCount = query({
  args: {
    userEmail: v.string(), // Email of the user
  },
  handler: async (ctx, args) => {
    // Find the user's upload count record
    const uploadCountRecord = await ctx.db
      .query("uploadCounts")
      .withIndex("byUserEmail", (q) => q.eq("userEmail", args.userEmail))
      .unique();

    return uploadCountRecord ? uploadCountRecord.count : 0; // Return the count or 0 if no record exists
  },
});

export const deleteFile = mutation({
  args: {
    fileId: v.string(), // Unique ID for the file
    storageId: v.string(), // ID of the file in Convex storage
  },
  handler: async (ctx, args) => {
    // Delete the file from the database
    const fileRecord = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .unique();

    if (fileRecord) {
      await ctx.db.delete(fileRecord._id);
    }

    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("metadata.fileId"), args.fileId))
      .collect();

    for (const doc of documents) {
      await ctx.db.delete(doc._id);
    }
    // Delete the file from storage
    await ctx.storage.delete(args.storageId);
  },
});