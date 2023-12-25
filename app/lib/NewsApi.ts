export interface News{
    source: {
        id: string;
        name: string;
    },
    news: Document;
    [key: string]: any;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

class NewsApi{

    static getNews(url : string){
        return fetch(url, {
            next:{
                revalidate: 60 * 60 * 2,
            },
        })
        .then((res) => res.json())
        .then((data) => data.articles as News[]);
    }

    static getHeadLines() : Promise<News[]>{
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
        console.log(url);
        return this.getNews(url);
    }
}

export default NewsApi