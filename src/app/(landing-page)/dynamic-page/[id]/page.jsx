"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Container } from "react-bootstrap"



const DynamicPage = () => {
  const { id } = useParams()
  const [pageData, setPageData] = useState("")

  const getToken = () => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="));
    return cookieString ? decodeURIComponent(cookieString.split("=")[1]) : null;
  };

  const loadDynamicPage = async () => {
    const token = getToken();
    if (!token) {
      router.push("/authentication/sign-in");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-page?page_id=${id}`,
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        setPageData(response.data.page_content);
      }
    } catch (error) {
      console.error("Failed to load item types.");
    }
  }

  useEffect(() => {
    loadDynamicPage()
  }, [id])

  // console.log(id);

  return (
    <div>
      <Container>
        {pageData}
      </Container>
    </div>
  )
}

export default DynamicPage