# AI-PDF-Note-Taker

**AI-PDF-Note-Taker** is a web application that enables users to upload PDF files, extract text, and generate AI-powered notes and summaries. The application leverages Google's Generative AI for text embeddings and Convex for backend storage and vector search.

---

## Features

- **Upload PDF Files**: Users can upload PDF files and provide a custom file name.
- **AI-Powered Text Extraction**: Extract text from PDFs and generate embeddings using Google's Generative AI.
- **Note Generation**: Users can write notes manually or leverage AI to generate notes, which can be saved for future reference.
- **Search Functionality**: Search through uploaded PDFs using natural language queries.
- **User-Friendly Interface**: A simple and intuitive UI for managing and interacting with uploaded files.
- **Responsive Design**: Fully responsive for all screen sizes.
- **PDF Upload Limit**: Users can upload and manage up to 5 PDFs at a time, with the ability to delete and add new files as needed.

---

## Technologies Used

- **Frontend**:
  - React.js
  - Next.js
  - Tailwind CSS
- **Backend**:
  - Convex (for database and serverless functions)
- **AI/ML**:
  - Google Generative AI (for text embeddings and note generation)
- **Other Tools**:
  - LangChain (for vector stores and embeddings)
  - Axios (for API requests)
  - Sonner (for toast notifications)

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Convex account (for backend)
- Google Generative AI API key

---

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AshwinKarnati/AI-PDF-NOTE-TAKER.git
   cd AI-PDF-NOTE-TAKER
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env.local` file in the root directory:
     ```plaintext
     NEXT_PUBLIC_CONVEX_URL=your_convex_url
     NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
     ```
   - Replace `your_convex_url` with your Convex project URL.
   - Replace `your_google_gemini_api_key` with your Google Generative AI API key.

4. **Set Up Convex**:
   - Go to the [Convex Dashboard](https://dashboard.convex.dev/).
   - Create a new project and get your `Convex URL`.
   - Set the `GEMINI_API_KEY` environment variable in the Convex Dashboard under **Settings** > **Environment Variables**.

5. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   - The application will be available at `http://localhost:3000`.

---

## Usage

1. **Upload a PDF**:
   - Click the **Upload PDF File** button.
   - Select a PDF file from your device and provide a file name.
   - The application will process the file and generate notes.

2. **View Uploaded Files**:
   - All uploaded files are displayed in the **Workspace**.
   - Click on a file to view its details and generated notes.

3. **Create and Save Notes**:
   - Manually write notes or generate AI-powered notes based on the extracted text.
   - Save notes for future reference.

4. **Search Through Files**:
   - Use the search functionality to query your uploaded PDFs using natural language.

5. **Manage Files**:
   - Upload up to 5 PDFs at a time.
   - Delete existing PDFs to make space for new uploads.


---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Convex](https://convex.dev/) for providing the backend infrastructure.
- [Google Generative AI](https://ai.google/) for text embeddings and note generation.
- [LangChain](https://langchain.com/) for vector stores and embeddings.

---

## Contact

For questions or feedback, please reach out to:

- **Karnati Ashwin**  
- **Email**: ashwinkarnati2k5@gmail.com  
- **GitHub**: [Karnati Ashwin](https://github.com/AshwinKarnati)

---

Enjoy using **AI-PDF-Note-Taker**! 🚀

