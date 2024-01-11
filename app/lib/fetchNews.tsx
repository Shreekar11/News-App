import { gql } from "graphql-request";

const fetchNews = async (
    isDynamic?: boolean
) => {
    // GraphQL Query
    const query = gql`
    query myQuery(
        $apiKey: String!
    ) {
        myQuery(
            apiKey:$apiKey
            ) {
          articles {
            author
            content
            description
            publishedAt
            title
            url
            urlToImage
            source {
              id
              name
            }
          }
          status
          totalResults
        }
      }
    `;

    // Fetch function using Next.js

    const res = await fetch("https://marvast.stepzen.net/api/truculent-orangutan/__graphql", {
        method: "POST",
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? { revalidate: 0 } : { revalidate: 60 },
        headers: {
            "Content-Type": "application/json",
            Authorization: `apiKey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query, 
            variables: {
                apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
            },
        }),
    });

    const newsResponse = await res.json();

    return newsResponse;
}

export default fetchNews;

// stepzen import curl "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=eadc6c12c16e46e9a93bb3fd62ea99ee"