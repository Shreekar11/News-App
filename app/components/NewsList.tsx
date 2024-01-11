import { Nunito } from "next/font/google";
import ArticleCard from "./ArticleCard";
import LoadMore from "./LoadMore";
import SearchBox from "./SearchBox";
import Content from './Content'
import { Toaster } from "sonner";

const inter = Nunito({ subsets: ['latin'] });

type Props = {
    news: Root;
}

function NewsList({ news }: Props) {

    const headlines = news.data.myQuery.articles;
    console.log(headlines);

    return (
        <main className={inter.className}>

            <Content />

            <SearchBox />
            <div className=" flex flex-wrap justify-center items-center gap-10">
                {(<Toaster richColors position='top-center' />)}

                {headlines ? (
                    headlines.map((news) => (
                        <ArticleCard news={news} key={news.title} />
                    ))
                ) : (
                    <LoadMore />
                )}
            </div>
        </main>
    )
}

export default NewsList
