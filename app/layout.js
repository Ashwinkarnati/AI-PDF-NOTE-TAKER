import { Dancing_Script, Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";


const outfit = Outfit({ subsets: ["latin"] });
const dancingscript = Dancing_Script({ subsets: ["latin"] });

export const metadata = {
  title: "AI PDF NOTES TAKER",
  description: "Take the notes using AI and Learn More!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
