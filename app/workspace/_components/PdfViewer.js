// PdfViewer Component
const PdfViewer = ({ fileUrl }) => {
  return (
    <div className="h-full w-full">
      <iframe
        src={`${fileUrl}#toolbar=0`}
        className="h-[calc(100%-16px)] w-full border-none"
      />
    </div>
  );
};

export default PdfViewer;