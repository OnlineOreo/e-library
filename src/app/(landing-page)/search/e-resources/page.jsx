import { Container, Row, Col } from 'react-bootstrap';
import { Suspense } from 'react';
import SearchSideFilter from '../components/SearchSideFilter';
import axios from 'axios';
// import { headers } from 'next/headers';
import LogUpdateClient from '../components/LogUpdateClient';
import ShowResults from '../components/ShowResults';

function combineFacetData(facetData) {
  const combined = [];

  for (let i = 0; i < facetData.length; i += 2) {
    const name = facetData[i];
    const count = facetData[i + 1] || 0;
    combined.push({ name, count: parseInt(count, 10) });
  }

  return combined;
}

async function fetchSolrData(searchQuery, startIndex = 0) {
  if (!searchQuery) {
    return {
      results: [],
      resultsCount: 0,
      sideFilterResults: {},
      path: '',
      status_code: 200,
      response_body: '[]',
      error_trace: '',
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SOLR_BASE_URL;
    // const solrQuery = `fq=pkg_id%3A(${pubPkg})&indent=true`;

    const mainUrl = `${baseUrl}/solr/e-resources/select?q.op=OR&q=${searchQuery}&rows=15&start=${startIndex}`;
    // console.log("mainurl : ",mainUrl);
    
    const sideUrl = `${baseUrl}/solr/e-resources/select?q=*:*&fq=${searchQuery}&facet=true&facet.field=dc_publishers_string&facet.field=datacite_rights_string&facet.field=resource_types_string&facet.field=dc_date&facet.field=datacite_creators_string&facet.limit=500&facet.sort=count`;
    // console.log("sideurl : ",sideUrl);

    const [mainRes, sideRes] = await Promise.all([
      axios.get(mainUrl),
      axios.get(sideUrl),
    ]);

    const results = mainRes.data.response.docs || [];
    const resultsCount = mainRes.data.response.numFound || 0;

    const facetFields = sideRes.data.facet_counts?.facet_fields || {};
    const facetKeys = [
      'dc_publishers_string',
      'datacite_rights_string',
      'resource_types_string',
      'datacite_creators_string',
      'dc_date',
    ];

    const sideFilterResults = {};
    facetKeys.forEach((key) => {
      sideFilterResults[key] = combineFacetData(facetFields[key] || []);
    });

    return {
      results,
      resultsCount,
      sideFilterResults,
      path: mainUrl,
      status_code: mainRes.status,
      response_body: JSON.stringify(results),
      error_trace: mainRes.error ? JSON.stringify(mainRes.error) : '',
    };
  } catch (error) {
    console.error('Solr fetch error:', error);
    return {
      results: [],
      resultsCount: 0,
      sideFilterResults: {},
      path: '',
      status_code: 500,
      response_body: '[]',
      error_trace: error?.toString() || 'Unknown error',
    };
  }
}

export default async function PrintCollectionPage({ searchParams }) {
  const searchParamsObj = await searchParams || {};
  const searchQuery = searchParamsObj.q || '';

  // const headersList = await headers();
  // const fullHostname = headersList.get('host') || '';
  // const hostname = fullHostname.split('.')[0];

  // const pkgIdMapping = {
  //   mriirs: '11%2043',
  //   fri: '45%2048',
  //   lhlb: '11%2046',
  //   dev: '44%2047',
  //   demo: '44%2047',
  // };

  // const pubPkg = pkgIdMapping[hostname] || '';
  const data = await fetchSolrData(searchQuery, 0);

  return (
    <Container className="px-4 text-secondary">
      <Row>
        <Col md={3} className="px-0 bg-white">
          <Suspense fallback={<div>Loading filters...</div>}>
            <SearchSideFilter
              {...data.sideFilterResults}
              catalogCore="e-resources"
            />
          </Suspense>
        </Col>
        <Col md={9} className="pe-0 ps-lg-4 ps-0">
          <Suspense fallback={<div>Loading Content...</div>}>
            <ShowResults
              initialResults={data.results}
              initialResultsCount={data.resultsCount}
              catalogCore="e-resources"
              // pubPkg={pubPkg}
            />
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
}
