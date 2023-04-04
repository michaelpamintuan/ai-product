import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Dashboard from "@/components/Dashboard";

const inter = Inter({ subsets: ['latin'] })

// Adding simple heading and subtitle
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="AI Product Description Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"bg-white min-h-screen "}>
        <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="text-4xl md:text-6xl font-bold">
            AI Product Description Generator
            <span className="text-4xl md:text-6xl font-bold text-blue-600">
              .
            </span>
          </h1>
          <p className="mt-3 text-2xl">
            Create Beautiful
            <span className="text-2xl font-bold text-blue-600">
              {" "}
              Product Descriptions{" "}
            </span>
            in Seconds
          </p>
        </div>
        <Dashboard />
      </main>
    </>
  );
}
