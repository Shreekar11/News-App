type ArticlesEntry = {
    author: string;
    content: string;
    description: string;
    publishedAt: DateTime;
    source: Source;
    title: string;
    url: string;
    urlToImage: string | null;
};

type Root = {
    data: 
    {
        myQuery:
        {
            articles: ArticlesEntry[];
            status: string;
            totalResults: int;
        }
    }
};

type Source = {
    id: string;
    name: string;
  }

type Category = 
| "general"
| "business"
| "entertainment"
| "health"
| "science"
| "sports"
| "technology";