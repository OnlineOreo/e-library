"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Container, Row, Col, Card } from "react-bootstrap"
import { useSelector } from "react-redux"

const DynamicPage = () => {
  const { id } = useParams()
  const [pageData, setPageData] = useState("")

  const landingPageData = useSelector((state) => state.landingPageDataSlice);
  const dynamicPageData = landingPageData?.landingPageData?.dynamic_page || []

  useEffect(() => {
    if (id && dynamicPageData.length > 0) {
      const matchedPage = dynamicPageData.find(page => String(page.page_id) === String(id))
      if (matchedPage) {
        setPageData(matchedPage.page_content)
      } else {
        setPageData("No content found for this page.")
      }
    }
  }, [id, dynamicPageData])

  return (
    <div>
      <Container>
        <Row className="justify-content-center my-3 ">
          <Col lg={11}>
            <Card className="p-lg-2 p-2 p-lg-2 p-1" style={{ minHeight:'400px' }}>
              <div dangerouslySetInnerHTML={{ __html: pageData }} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DynamicPage
