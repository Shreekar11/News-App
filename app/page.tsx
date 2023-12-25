"use client";
import './globals.css'
// components
import Content from './components/Content'
import ArticleCard from './components/ArticleCard'
import NewsApi from './lib/NewsApi'
import { Nunito } from 'next/font/google'
import { auth } from './firebase/firebaseApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react';
import { News } from './lib/NewsApi';

const inter = Nunito({ subsets: ['latin'] });

export default function Home() {

  const [user] = useAuthState(auth);
  const [headlines, setHeadlines] = useState([] as News[]);

  const getData = async () => {
    const data = await NewsApi.getHeadLines();
    setHeadlines(data);
  }

  useEffect(() => {
    getData();
  }, [user])

  // console.log(user);

  return (
    <div className={inter.className}>
      <Content />
      {/* <h1 className='text-3xl font-semibold mt-10 flex justify-center'>Headlines</h1> */}
      <div className=" flex flex-wrap justify-center items-center gap-10">
        {headlines ? (
          headlines.map((news) => (
            <ArticleCard news={news} key={news.title} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}
