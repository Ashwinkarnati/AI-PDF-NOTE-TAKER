import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";
require('dotenv').config();

// Use `apiKey` in your application wherever needed.

export const ingest = action({
  args: {
    splitText: v.array(v.string()), // Ensure splitText is an array of strings
    fileId: v.string(),            // fileId as a string
  },
  handler: async (ctx, args) => {
    // Prepare metadata for each chunk of text
    const metadata = args.splitText.map((text, index) => ({
      fileId: args.fileId,
      chunkIndex: index, // Optional: Track chunk order
    }));

    // Create embeddings and store in Convex vector store
    await ConvexVectorStore.fromTexts(
      args.splitText, // Text data
      metadata,       // Metadata
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY, // Replace with a secure method to handle API keys
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    return "Completed";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId:v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY, // Replace with a secure method to handle API keys
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    }), { ctx });

    const resultOne = (await vectorStore.similaritySearch(args.query, 4)).filter(q=>q.metadata.fileId==args.fileId);
    console.log(resultOne);
    return JSON.stringify(resultOne);
  },
});