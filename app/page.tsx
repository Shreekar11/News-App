"use client";
import './globals.css'
// components
import Content from './components/Content'
import ArticleCard from './components/ArticleCard'

import NewsApi from './lib/NewsApi'
import { News } from './lib/NewsApi';
import { useEffect, useState } from 'react';
import { Nunito } from 'next/font/google'

//firebase components
import { auth } from './firebase/firebaseApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadMore from './components/LoadMore';
import { Toaster, toast } from 'sonner';

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

  const [alert, setAlert] = useState(false);
  setTimeout (() => {
    setAlert(true);
    toast.error("NewsAPI not available for deployment");
  }, 10000);

  return (
    <div className={inter.className}>
      <Content />
      {alert && <Toaster richColors position='top-center' />}
      {/* <h1 className='text-3xl font-semibold mt-10 flex justify-center'>Headlines</h1> */}
      <div className=" flex flex-wrap justify-center items-center gap-10">
        {headlines ? (
          headlines.map((news) => (
            <ArticleCard news={news} key={news.title} />
          ))
        ) : (
          <LoadMore />
        )}
      </div>
    </div>
  )
}
