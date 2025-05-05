import { headers } from "next/headers";

export async function getLandingPageData() {
  const headersList = await headers();
  const fullHost = headersList.get("host") || "localhost";
  const host = fullHost.split(":")[0];
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institute?sub_domain=${host}`, {
    cache: "no-store",
  });

  const jsonData = await res.json();

  return jsonData;
}

