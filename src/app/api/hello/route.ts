import { scrapMultiEvents } from "../../../../lib/scraper"

export async function GET(request: Request) {
  const res = await scrapMultiEvents();
  // return new Response('Hello, Next.js!')
  if (!res) {
    return new Response("No data available", { status: 404 });
  }

  // Serialize the response data as JSON
  return new Response(JSON.stringify(res), {
    headers: { "Content-Type": "application/json" },
  });
}
