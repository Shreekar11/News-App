'use client';
import { Nunito } from 'next/font/google';
import { useEffect, useState } from 'react';
import { getDocs, collection, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/firebaseApp';
import ArticleCard from '../components/ArticleCard';

const inter = Nunito({ subsets: ['latin'] });

export default function Page() {

  const [userData, setUserData] = useState([] as DocumentData); 

  useEffect(() => {
    ; (async () => {
      const colRef = collection(db, 'message');
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map(doc => {

        const data = doc.data()

        data.id = doc.id
        return data;
      })

      setUserData(docs);

      // console.log(docs);
    })()
  }, [])

  return (
    <main className={inter.className}>
      <div className='flex justify-center items-center p-16'>
        <h1 className='text-2xl sm:text-3xl font-semibold'>Saved <span className='text-red-500'>Articles</span></h1>
      </div>
      <div className="main-container flex flex-wrap justify-center items-center gap-10">
        {userData  && (userData.map((news: any) => (
          <ArticleCard news={news} key={news.title} />
        )))}
      </div>
    </main>
  )
}
