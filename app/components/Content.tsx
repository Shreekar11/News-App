'use client'

import { categories } from "@/constants"
import { usePathname } from "next/navigation"
import NavLink from "./NavLink"

const Content = () => {

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.split('/').pop()===path;
  };

  return (
    <main className="m-10">

      <nav className="grid grid-cols-4 md:grid-cols-7 text-xs md:text-sm gap-4 pb-5 max-w-6xl mx-auto border-b">
        {categories.map((category) => (
          <NavLink key={category} category={category} isActive={isActive(category)} />
        ))}
      </nav>
    </main>

  )
}

export default Content

      {/* <div className=" text-2xl m-10 flex justify-center items-center flex-col font-bold">
          <h1 className=" sm:text-5xl md:text-6xl">Catch up with</h1>
          <h2 className=" sm:text-4xl md:text-5xl m-2"><span className="text-red-500 sm:text-4xl md:text-5xl">Latest</span></h2>
          <h1 className=" sm:text-3xl md:text-4xl"><span className="text-red-500 sm:text-3xl md:text-4xl">News</span>,</h1>
        </div>
        <div className=" p-5 flex justify-center items-center flex-col text-2xl sm:text-3xl font-semiold md:flex-col">
          <h1>Keep track of the <span className="text-red-500">Latest</span> News</h1>
        </div> */}

