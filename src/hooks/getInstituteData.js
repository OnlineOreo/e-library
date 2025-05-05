import { headers } from "next/headers";

export async function getInstituteData() {
  const headersList = await headers();
    const fullHost = headersList.get("host") || "localhost";
    const host = fullHost.split(":")[0];
    const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institute?sub_domain=${host}`;
    const res = await fetch(API_URL, { cache: "no-store" });
    const data = await res.json();
    return data.institute;
  }
  