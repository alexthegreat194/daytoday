
import Head from "next/head"
import Link from "next/link"
import Dropdown from "../components/Dropdown"


export default function Home() {

  return (
    <div className="h-[94.25vh]">
      <Head>
        <title>DayToDay</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center h-full 
        bg-gradient-to-br from-blue-300 to-red-300">
        <div className="flex flex-col gap-5 items-start p-10 border shadow bg-white rounded-xl">
          <h1 className="text-5xl font-bold text-gray-800">Welcome</h1>
          <Link href={"/dashboard"} className="w-min">
            <a className="text-2xl p-3 px-4 shadow hover:shadow-xl font-bold text-white bg-gray-800 rounded-xl hover:bg-blue-400 transition-colors">Get Started</a>
          </Link>
          {/* <Dropdown /> */}
        </div>
      </main>
    </div>
  )
}
