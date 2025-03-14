import { useAction } from "convex/react";
import { useParams } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";

// TipTap Extensions
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";

const EditorExtension = ({ editor }) => {
  const { fileId } = useParams();
  const searchAI = useAction(api.myAction.search);

  const onAiClick = async () => {
    toast("AI is getting your answer...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    const result = await searchAI({
      query: selectedText,
      fileId: fileId,
    });

    const UnformattedAns = JSON.parse(result);
    let unFormattedAnswer = "";
    UnformattedAns &&
      UnformattedAns.forEach((item) => {
        unFormattedAnswer = unFormattedAnswer + item.pageContent;
      });

    const PROMPT = `For the question: "${selectedText}", provide an appropriate answer in HTML format using the given content: "${unFormattedAnswer}". Ensure the answer is well-structured and formatted correctly in HTML. If the answer is not available in the provided PDF, search for the answer externally and return it in HTML format. Additionally, clearly mention that the answer was not available in the PDF. Do not include the question itself and Don't add Any heading`;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    const FinalAns = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");

    const AllText = editor.getHTML();
    editor.commands.setContent(
      AllText + '<p><strong> Answer: </strong>' + FinalAns + "</p>"
    );
  };

  return (
    editor && (
      <div className="editor-extension-container h-full flex">
        {/* Toolbar */}
        <div className="toolbar-container fixed top-[h-auto] left-4 z-10 flex flex-col gap-3 w-20 p-4 shadow-md bg-blue-100">
          {/* Text Formatting Buttons */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-900" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-blue-900" : ""}
          >
            <Italic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "text-blue-900" : ""}
          >
            <UnderlineIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "text-blue-900" : ""}
          >
            <Strikethrough />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "text-blue-900" : ""}
          >
            <Highlighter />
          </button>

          {/* Text Alignment Buttons */}
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editor.isActive({ textAlign: "left" }) ? "text-blue-900" : ""}
          >
            <AlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={editor.isActive({ textAlign: "center" }) ? "text-blue-900" : ""}
          >
            <AlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={editor.isActive({ textAlign: "right" }) ? "text-blue-900" : ""}
          >
            <AlignRight />
          </button>

          {/* List Buttons */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-900" : ""}
          >
            <List />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "text-blue-900" : ""}
          >
            <ListOrdered />
          </button>

          {/* Undo/Redo Buttons */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo />
          </button>

          {/* AI Button */}
          <button
            onClick={() => onAiClick()}
            className="ai-button hover:text-blue-900"
          >
            <Sparkles />
          </button>
        </div>

        {/* Editor Content */}
        <div className="editor-content-container flex-grow overflow-auto p-4 ml-20">
          <EditorContent editor={editor} />
        </div>
      </div>
    )
  );
};

export default EditorExtension;
