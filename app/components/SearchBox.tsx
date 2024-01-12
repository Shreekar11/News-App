'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function SearchBox() {

  const [input, setInput] = useState('');

  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      return;
    }

    router.push(`/search?term=${input}`);
  }

  return (
    <div className="flex justify-center items-center m-5">
      <form className=" w-[700px] relative px-5"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search News..."
          className=" w-full h-10 rounded-full placeholder-gray-700 text-gray-700 outline-none flex-1 bg-slate-200 pl-5"
        />

        <button type="submit" disabled={!input} className="absolute bg-transparent right-1 top-1/2 -translate-y-1/2 pr-10 rounded-full hover:text-red-500">Search</button>
      </form>
    </div>

  );
}

export default SearchBox
