import { Suspense } from 'react';
import PrintCollectionContent from './PrintCollectionContent';
import axios from "axios";
import { headers } from 'next/headers';

function combineFacetData(facetData) {
  const combined = [];

  for (let i = 0; i < facetData.length; i += 2) {
    const name = facetData[i];
    const count = facetData[i + 1] || 0;
    combined.push({ name, count: parseInt(count, 10) });
  }

  return combined;
}

async function fetachSolrData(searchQuery, startIndex = 0, pubPkg) {
  if (!searchQuery) return { results: [], resultsCount: 0, sideFilterResults: {} };

  try {
    const solrUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/Print-collection/select?fq=pkg_id%3A(${pubPkg})&indent=true&q.op=OR&q=${searchQuery}&rows=15&start=${startIndex}`;
    console.log("solr url : ", solrUrl);
    
    const response = await axios.get(solrUrl);

    const docs = response.data.response.docs || [];
    const numFound = response.data.response.numFound || 0;

    // Side filter
    const sideFilterUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/Print-collection/select?fq=pkg_id%3A(${pubPkg})&indent=true&q=*:*&fq=${searchQuery}&facet=true&facet.field=dc_publishers_string&facet.field=datacite_rights_string&facet.field=resource_types_string&facet.field=dc_date&facet.field=datacite_creators_string&facet.limit=500&facet.sort=count`;

    const sideFilterResponse = await axios.get(sideFilterUrl);
    const sideData = sideFilterResponse.data;

    const facets = ["dc_publishers_string", "datacite_rights_string", "resource_types_string", "datacite_creators_string", "dc_date"];

    const sideFilterResults = {};
    facets.forEach(facet => {
      sideFilterResults[facet] = combineFacetData(sideData.facet_counts?.facet_fields?.[facet] || []);
    });

    return {
      results: docs,
      resultsCount: numFound,
      path:solrUrl,
      status_code:response.status,
      response_body:JSON.stringify(docs),
      error_trace:response.error ? JSON.stringify(response.error) : "",
      sideFilterResults
    };

  } catch (error) {
    console.error("API Error:", error);
    return { results: [], resultsCount: 0, sideFilterResults: {} };
  }
}

export default async function PrintCollectionPage({ searchParams }) {
  const searchParamsObj = await searchParams || {};
  const searchQuery = searchParamsObj.q || "";
  const headersList = headers();
  const fullHostname = headersList.get('host') || ""; 
  const hostname = fullHostname.split('.')[0];
  // console.log("host name:", hostname);

  const pkgIdMapping = {
    "mriirs" : "11%2043",
    "fri" : "45%2048",
    "lhlb" : "11%2046",
    "dev" : "44%2047",
    "demo" : "44%2047",
  }

  const pubPkg = pkgIdMapping[hostname];


  const data = await fetachSolrData(searchQuery, 0, pubPkg);

  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <PrintCollectionContent
        initialResults={data.results}
        initialResultsCount={data.resultsCount}
        initialSideFilterResults={data.sideFilterResults}
        searchQuery={searchQuery}
        path={data.path}
        status_code={data.status_code}
        error_trace={data.error_trace}
      />
    </Suspense>
  );
}
