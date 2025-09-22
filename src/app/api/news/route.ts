import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Obtener fechas de búsqueda de noticias (desde - hasta)
    const currentDate = new Date();
    const toDate = currentDate.toISOString();
    currentDate.setDate(currentDate.getDate() - 7);
    const fromDate = currentDate.toISOString();

    const url = `https://newsapi.org/v2/everything?from=${fromDate}&to=${toDate}&sortBy=publishedAt&language=es&q=${encodeURIComponent(query)}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' }, 
      { status: 500 }
    );
  }
}
