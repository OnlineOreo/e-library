  import { Suspense } from "react";
  import Navbar from "./Component/landing-page/Navbar";
  import Banner from "./Component/landing-page/Banner";
  import Footer from "./Component/landing-page/Footer";
  import { getLandingPageData } from "@/hooks/getLandingPageData";
  import ClientWrapper from "./Component/landing-page/ClientWrapper";

  export default async function Home() {
    const landingPageData = await getLandingPageData();

    const configData = landingPageData?.configurations?.[0] || {};
    const sectionOrder = configData?.section_order || {};

    if (!landingPageData?.is_active) {
      return (
        <div className="flex justify-center items-center h-screen bg-red-100 text-center text-red-700">
          <h3 className="w-3/4 text-xl font-semibold">
            Your LibVirtuUA e-Library access is forbidden due to end of subscription period !!!
            <br />
            Please contact LibVirtuUA Support to extend or renew your subscription.
          </h3>
        </div>
      );
    }

    return (
      <div className="index_page">
        <Navbar landingPageData={landingPageData} />
        <Banner bannerData={configData} />

        <Suspense fallback={<div>Loading sections...</div>}>
          <ClientWrapper sectionOrder={sectionOrder} landingPageData={landingPageData} configData={configData} />
        </Suspense>

        <Footer landingPageData={landingPageData} bannerData={configData} />
      </div>
    );
  }
