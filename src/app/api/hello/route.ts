import { scrapMultiEvents, EVENT_DATA_TYPE } from "../../../../lib/scraper"
// import {  } from "../../../../lib/scraper";
const baseURL = "http://localhost:3000";
export async function GET(request: Request) {
  const res = await scrapMultiEvents();
  // return new Response('Hello, Next.js!')
  if (!res) {
    return new Response("No data available", { status: 404 });
  }
  // const response = await fetch(`${baseURL}/api/events`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(res[0]),
  // });
  // const data = await response.json();

  //call the api to insert the data
  res.forEach(async (event: EVENT_DATA_TYPE) => {
    const response = await fetch(`${baseURL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    // console.log(data);
  });
  // Serialize the response data as JSON
  return new Response(JSON.stringify(res), {
    headers: { "Content-Type": "application/json" },
  });
}
