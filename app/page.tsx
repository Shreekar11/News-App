import fetchNews from './lib/fetchNews';
import { Nunito } from 'next/font/google';
import NewsList from './components/NewsList';
import Content from './components/Content';

const inter = Nunito({ subsets: ['latin'] });

async function Home() {

  const news: Root = await fetchNews()

  // console.log(news);

  return (
    <div className={inter.className}>
      <Content />
      <NewsList news={news} />
    </div>
  )
}

export default Home
