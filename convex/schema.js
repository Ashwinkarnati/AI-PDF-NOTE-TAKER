import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Table for storing user information
  users: defineTable({
    userName: v.string(), // Name of the user
    email: v.string(), // Email of the user
    imageUrl: v.string(), // URL of the user's profile image
  }),

  // Table for storing PDF file metadata
  pdfFiles: defineTable({
    fileId: v.string(), // Unique ID for the file
    storageId: v.string(), // ID of the file in Convex storage
    fileName: v.string(), // Name of the file
    fileUrl: v.string(), // URL of the file in Convex storage
    createdBy: v.string(), // Email of the user who uploaded the file
  }),

  // Table for storing document embeddings and metadata
  documents: defineTable({
    embedding: v.array(v.number()), // Vector embedding of the document
    text: v.string(), // Text content of the document
    metadata: v.any(), // Metadata (e.g., fileId, page number, etc.)
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding", // Field to index
    dimensions: 768, // Dimensions of the embedding vector
  }),

  // Table for storing notes associated with files
  notes: defineTable({
    fileId: v.string(), // ID of the associated file
    notes: v.any(), // Notes content (can be any type, e.g., HTML or JSON)
    createdBy: v.string(), // Email of the user who created the notes
  }),

  // Table for storing the upload count for each user
  uploadCounts: defineTable({
    userEmail: v.string(), // Email of the user
    count: v.number(), // Number of files uploaded by the user
  }).index("byUserEmail", ["userEmail"]), // Index for fast lookups by userEmail
});