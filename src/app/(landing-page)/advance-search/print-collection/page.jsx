import { Suspense } from 'react';
import PrintCollectionContent from './PrintCollectionContent';
import axios from "axios";


async function fetachSolrData(searchQuery, startIndex = 0) {
  if (!searchQuery) return { results: [], resultsCount: 0, sideFilterResults: {} };

  try {
    const solrUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/Print-collection/select?indent=true&q.op=OR&q=${searchQuery}&rows=20&start=${startIndex}`;
    const response = await axios.get(solrUrl);

    const docs = response.data.response.docs || [];
    const numFound = response.data.response.numFound || 0;


    return {
      results: docs,
      resultsCount: numFound,
      path:solrUrl,
      status_code:response.status,
      response_body:JSON.stringify(docs),
      error_trace:response.error ? JSON.stringify(response.error) : "",
    };

  } catch (error) {
    console.error("API Error:", error);
    return { results: [], resultsCount: 0, sideFilterResults: {} };
  }
}


export default async function EResourcesData({ searchParams }) {
  const searchParamsObj = await searchParams || {};
  const searchQuery = searchParamsObj.q || "";

  const data = await fetachSolrData(searchQuery, 0);

  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <PrintCollectionContent
        initialResults={data.results}
        initialResultsCount={data.resultsCount}
        searchQuery={searchQuery}
        path={data.path}
        status_code={data.status_code}
        error_trace={data.error_trace}
      />
    </Suspense>
  );
}
