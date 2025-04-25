
import { Suspense } from 'react';
import axios from "axios";
import ECollectionContent from './ECollectionContent';
import LanguageSelector from '@/app/Component/landing-page/languageselector';
// import { useTranslation } from 'react-i18next';

function combineFacetData(facetData) {
   const { t, i18n } = useTranslation();
  const combined = [];
  
  for (let i = 0; i < facetData.length; i += 2) {
    const name = facetData[i];
    const count = facetData[i + 1] || 0;
    combined.push({ name, count: parseInt(count, 10) });
  }
  
  return combined;
}

async function fetachSolrData(searchQuery, startIndex = 0) {
  if (!searchQuery) return { results: [], resultsCount: 0, sideFilterResults: {} };
  
  try {
    // Main search results
    const solrUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/e-collection/select?indent=true&q.op=OR&q=${searchQuery}&rows=15&start=${startIndex}`;
    const response = await axios.get(solrUrl);

    // console.log("solr url : ",solrUrl);
    
    
    const docs = response.data.response.docs || [];
    const numFound = response.data.response.numFound || 0;
    
    // Side filter data
    const sideFilterUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/e-collection/select?indent=true&q=*:*&fq=${searchQuery}&facet=true&facet.field=dc_publishers_string&facet.field=datacite_rights_string&facet.field=resource_types_string&facet.field=dc_date&facet.field=datacite_creators_string&facet.limit=500&facet.sort=count`;

    console.log("solr side filter url : ",sideFilterUrl);
    
    const sideFilterResponse = await axios.get(sideFilterUrl);
    const sideData = sideFilterResponse.data;
    
    const facets = ["dc_publishers_string", "datacite_rights_string", "resource_types_string", "datacite_creators_string","dc_date"];
    
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

// Server action for loading more results
// 'use server'
// export async function loadMoreResults(searchQuery, startIndex) {
//   if (!searchQuery) return { results: [], resultsCount: 0 };
  
//   try {
//     const solrUrl = `${process.env.NEXT_PUBLIC_SOLR_BASE_URL}/solr/Print-collection/select?indent=true&q.op=OR&q=${searchQuery}&rows=15&start=${startIndex}`;
//     const response = await axios.get(solrUrl);

//     // console.log("side solr url : ",solrUrl);
    
    
//     const docs = response.data.response.docs || [];
//     const numFound = response.data.response.numFound || 0;
    
//     return {
//       results: docs,
//       resultsCount: numFound
//     };
//   } catch (error) {
//     console.error("Load More Error:", error);
//     return { results: [], resultsCount: 0 };
//   }
// }

export default async function PrintCollectionPage({ searchParams }) {
  const searchParamsObj = await searchParams || {};
  const searchQuery = searchParamsObj.q || "";
    
  const data = await fetachSolrData(searchQuery);

  // console.log("side filter results : ",data.sideFilterResults);
  
  
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <ECollectionContent
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