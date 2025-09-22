import Api from "./Api";

interface NewsAPIArticle {
  title: string;
  description: string;
  publishedAt: string;
  urlToImage?: string;
  url: string;
  author?: string;
  source: { name: string };
}

interface NewsApiResponse {
  articles: NewsAPIArticle[];
  totalResults: number;
  status: string;
}

class NewsApi extends Api {
  constructor({
    baseUrl,
    headers,
  }: {
    baseUrl: string;
    headers: Record<string, string>;
  }) {
    super({ baseUrl, headers });
  }

  searchNews(query: string): Promise<NewsApiResponse> {
    return super._makeRequest<NewsApiResponse>(`q=${encodeURIComponent(query)}`);
  }
}

// Obtener fechas de búsqueda de noticias (desde - hasta)
const currentDate = new Date();
const toDate = currentDate.toISOString();
currentDate.setDate(currentDate.getDate() - 7);
const fromDate = currentDate.toISOString();

export const newsApi = new NewsApi({
  baseUrl: '/api/news?',
  headers: {
    'Content-Type': 'application/json',
  },
});
