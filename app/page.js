import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simplify PDF Note-Taking</title>
        <meta name="description" content="Simplify PDF Note-Taking with AI-powered tools." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex flex-col items-center justify-center">
        <header className="flex justify-between items-center w-full px-6 py-4">
          <Link href={'/'}><div className="text-xl font-bold"><Image src={'/logo.svg'} height={70} width={70} alt="logo" className="rounded-[90%]"/></div></Link>
        
          <Link href={'/dashboard'}><button className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">Get Started</button></Link>
        </header>
        <section className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Simplify <span className="text-red-500">PDF</span>{" "}
            <span className="text-blue-500">Note-Taking</span> with AI-Powered
          </h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Elevate your note-taking experience with our AI-powered PDF app. Seamlessly extract key insights, summaries, and annotations from any PDF with just a few clicks.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Link href={'/dashboard'}>
            <button className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer">Get started</button>
            </Link>
          </div>
        </section>
        <footer className="mt-16 text-center space-y-4">
          <div className="text-lg font-semibold">Made By Karnati Ashwin with ❤️</div>
        </footer>
      </main>
   </div>
  );
}
