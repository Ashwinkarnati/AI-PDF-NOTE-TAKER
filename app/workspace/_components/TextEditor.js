import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import EditorExtension from "./EditorExtension"; // Import the EditorExtension component

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start Taking Your Notes..." }),
      Underline,
      Highlight,
      TextAlign.configure({
        types: ["paragraph", "heading"],
        alignments: ["left", "center", "right"],
      }),
      BulletList,
      OrderedList,
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none p-5",
      },
    },
  });

  if (!editor) {
    return null; // Return null or a loading spinner until the editor is ready
  }

  return (
    <div className="h-full flex flex-col">
      <EditorExtension editor={editor} /> {/* Pass the editor instance to EditorExtension */}
      <div className="flex-grow overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;