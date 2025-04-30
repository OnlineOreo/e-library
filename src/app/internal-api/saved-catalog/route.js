import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const catalogIds = searchParams.get("catalogIds") || "";
  const catalogCore = searchParams.get("catalogCore") || "Print-collection";

  // Solr-compatible comma-separated quoted IDs: "4395","5084","6367"
  const formattedCatalogIds = catalogIds
    .split(",")
    .map(id => `"${id.trim()}"`)
    .join(",");

  // id:("4395","5084","6367")
  const solrQuery = `id:(${formattedCatalogIds})`;

  const solrUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/${catalogCore}/select?indent=true&q.op=OR&q=${encodeURIComponent(solrQuery)}`;

  console.log("solr url : ",solrUrl);
  

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
      JSON.stringify({ results: [], resultsCount: 0, error: error.message }),
      { status: 500 }
    );
  }
}
