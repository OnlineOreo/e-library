import PrintCollectionContent from './PrintCollectionContent';
import axios from 'axios';

const combineFacetData = (facetData) => {
    const combined = [];

    for (let i = 0; i < facetData.length; i += 2) {
        const name = facetData[i];
        const count = facetData[i + 1] || 0;
        combined.push({ name, count: parseInt(count, 10) });
    }

    return combined;
};

async function getSolrData(urlParams, startIndex = 0, rows = 15) {
    const baseUrl = process.env.NEXT_PUBLIC_SOLR_BASE_URL;
    const solrUrl = `${baseUrl}/solr/Print-collection/select?indent=true&q.op=OR&q=${urlParams}&rows=${rows}&start=${startIndex}`;
    const sideFilterUrl = `${baseUrl}/solr/Print-collection/select?indent=true&q=*:*&fq=${urlParams}&facet=true&facet.field=dc_publishers_string&facet.field=datacite_rights_string&facet.field=resource_types&facet.field=dc_date&facet.field=datacite_creators_string&facet.limit=1000&facet.sort=count`;

    try {
        const [mainRes, facetRes] = await Promise.all([
            axios.get(solrUrl),
            axios.get(sideFilterUrl)
        ]);

        const docs = mainRes.data.response.docs || [];
        const numFound = mainRes.data.response.numFound || 0;

        const data = facetRes.data;
        const facets = ["dc_publishers_string", "datacite_rights_string", "resource_types", "datacite_creators_string", "dc_date"];

        const sideFilterResults = {};
        facets.forEach(facet => {
            sideFilterResults[facet] = combineFacetData(data.facet_counts?.facet_fields?.[facet] || []);
        });

        return { docs, numFound, sideFilterResults };
    } catch (err) {
        console.error("Server Fetch Error:", err);
        return { docs: [], numFound: 0, sideFilterResults: {} };
    }
}

export default async function PrintCollectionPage({ searchParams }) {
    const urlParams = searchParams.q || "*:*";

    const { docs, numFound, sideFilterResults } = await getSolrData(urlParams);

    return (
        <PrintCollectionContent
            initialResults={docs}
            initialCount={numFound}
            initialSideFilter={sideFilterResults}
            initialQuery={urlParams}
        />
    );
}
