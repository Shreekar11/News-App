import Link from "next/link";
import { Nunito } from "next/font/google";

const inter = Nunito({ subsets: ['latin'] });

type Props = {
    news: ArticlesEntry;
}

interface ArticlesEntry{
    [key: string]: any;
}

function ArticleCard({news}: Props){

    let convertObjectToUrl = () => {
        let newsUrl = ""
        for (let key in news) {
            newsUrl += key + "=" + news[key] + "&";
        }

        return newsUrl;
    }


    return (
        <main className={inter.className}>
            <div className='mx-auto w-80 sm:w-96 m-3 mt-4 p-3 relative rounded-sm flex-col justify-center ring ring-gray-200 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-60 hover:scale-105 hover:shadow-lg hover:bg-slate-100 transition-all ease-out cursor-pointer'>
                {news.urlToImage ? (
                    <Link href={`/articles/${news.title}?${convertObjectToUrl()}`}>
                        <img
                            className='h-56 w-full relative object-cover rounded-lg hover:opacity-85'
                            src={news.urlToImage}
                            alt='news image'
                        />
                    </Link>
                ) : (
                    <Link href={`/articles/${news.title}?${convertObjectToUrl()}`}>
                        <img
                            className='h-56 w-full relative object-cover rounded-lg'
                            src="./no-image-14596.svg"
                            alt="no image"
                        />
                    </Link>
                )
                }
                <Link href={`/articles/${news.title}?${convertObjectToUrl()}`}>
                    <h3 className='text-2xl sm:text-3xl font-bold m-4 '>{news.title.slice(0, 50)}...</h3>
                    <p className=' text-slate-500 m-4'>{news.description.slice(0, 70)}...</p>
                    <p className='text-slate-500 m-4'>Published At : {news.publishedAt}</p>
                </Link>

                {/* <Link href={`/articles/${news.title}?${convertObjectToUrl()}`} className='flex justify-center items-center'>
                    <button className='ring ring-gray-400 m-3 ring-offset-2 rounded-sm p-2 w-full text-xl font-semibold'>Read More</button>
                </Link> */}

            </div>
        </main>
    )
}

export default ArticleCard
