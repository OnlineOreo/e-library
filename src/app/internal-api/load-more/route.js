
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const start = searchParams.get("start") || 0;
  const rows = searchParams.get("rows") || 15;
  const catalogCore = searchParams.get("catalogCore") || "Print-collecti";

  const solrUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/${catalogCore}/select?indent=true&q.op=OR&q=${q}&rows=${rows}&start=${start}`;

  try {
    const response = await axios.get(solrUrl);
    const docs = response.data.response.docs || [];
    const numFound = response.data.response.numFound || 0;

    return new Response(
      JSON.stringify({ results: docs, resultsCount: numFound }),
      { status: 200 }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(
      JSON.stringify({ results: [], resultsCount: 0 }),
      { status: 500 }
    );
  }
}
