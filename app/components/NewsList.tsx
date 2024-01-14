'use client'
import { Nunito } from "next/font/google";
import { Toaster } from "sonner";
import { useState } from "react";
import ArticleCard from "./ArticleCard";
import LoadMore from "./LoadMore";

const inter = Nunito({ subsets: ['latin'] });

type Props = {
  news: Root;
}

function NewsList({ news }: Props) {

  const [input, setInput] = useState('');
  const headlines = news.data.myQuery.articles;

  return (
    <main className={inter.className}>
      <div className="flex justify-center items-center m-5">
        <form className=" w-[700px] relative px-5">
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
      <div className=" flex flex-wrap justify-center items-center gap-10">
        {(<Toaster richColors position='top-center' />)}
        {
          headlines ? (
            headlines.filter((results) => {
              if (input == "") {
                return results;
              } else if (results.title.toLowerCase().includes(input.toLowerCase())) {
                // console.log(results);
                return results;
              }
            })
              .map((news) => (
                <ArticleCard news={news} key={news.title} />
              ))) : (
            <LoadMore />
          )
        }
      </div>
    </main>

  );
}

export default NewsList
