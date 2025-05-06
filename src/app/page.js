import { Suspense } from "react";
import { getLandingPageData } from "@/hooks/getLandingPageData";
import HomeWrapper from "./Component/landing-page/HomeWrapper";

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
    <Suspense fallback={<div>Loading landing page...</div>}>
      <HomeWrapper
        landingPageData={landingPageData}
        configData={configData}
        sectionOrder={sectionOrder}
      />
    </Suspense>
  );
}
