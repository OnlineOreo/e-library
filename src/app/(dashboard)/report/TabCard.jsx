  // "use client";
  // import { useState } from "react";
  // import { Card, Row, Col } from "react-bootstrap";
  // import { FaCalendarAlt, FaUsers, FaChartLine, FaCog } from "react-icons/fa";

  // // Dummy components for tabs
  // const TabCard1 = () => (
  //   <div className="p-3 bg-light border">Component 1 Content</div>
  // );
  // const TabCard2 = () => (
  //   <div className="p-3 bg-light border">Component 2 Content</div>
  // );
  // const TabCard3 = () => (
  //   <div className="p-3 bg-light border">Component 3 Content</div>
  // );
  // const TabCard4 = () => (
  //   <div className="p-3 bg-light border">Component 4 Content</div>
  // );

  // const Report = () => {
  //   const [activeTab, setActiveTab] = useState(1);

  //   const cardData = [
  //     {
  //       id: 1,
  //       title: "Active Users",
  //       subtitle: "Monthly Active",
  //       icon: <FaCalendarAlt />,
  //       value: "150",
  //       component: <TabCard1 />,
  //     },
  //     {
  //       id: 2,
  //       title: "Tab 2",
  //       subtitle: "Monthly Overview",
  //       icon: <FaUsers />,
  //       value: "200",
  //       component: <TabCard2 />,
  //     },
  //     {
  //       id: 3,
  //       title: "Tab 3",
  //       subtitle: "Revenue Growth",
  //       icon: <FaChartLine />,
  //       value: "250",
  //       component: <TabCard3 />,
  //     },
  //     {
  //       id: 4,
  //       title: "Tab 4",
  //       subtitle: "Settings",
  //       icon: <FaCog />,
  //       value: "100",
  //       component: <TabCard4 />,
  //     },
  //   ];

  //   const renderActiveComponent = () => {
  //     const activeCard = cardData.find((card) => card.id === activeTab);
  //     return activeCard ? activeCard.component : null;
  //   };

  //   return (
  //     <div className="container mt-5">
  //       <Row className="mb-4">
  //         {cardData.map(({ id, title, subtitle, icon, value }) => (
  //           <Col key={id} xs={6} md={3}>
  //             <Card
  //               className={`h-100 shadow-sm ${
  //                 activeTab === id ? "bg-primary text-white border-primary" : ""
  //               }`}
  //               onClick={() => setActiveTab(id)}
  //               style={{ cursor: "pointer" }}
  //             >
  //               <Card.Body>
  //                 <div className="d-flex justify-content-between align-items-center mb-3">
  //                   <div>
  //                     <h5
  //                       className={`mb-1 ${activeTab == id ? "text-white" : ""}`}
  //                     >
  //                       {title}
  //                     </h5>
  //                     <small
  //                       className={` ${
  //                         activeTab == id ? "text-white" : "text-muted"
  //                       }`}
  //                     >
  //                       {subtitle}
  //                     </small>{" "}
  //                   </div>
  //                   <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
  //                     {icon}
  //                   </div>
  //                 </div>
  //                 <div>
  //                   <h3
  //                     className={`fw-bold ${activeTab == id ? "text-white" : ""}`}
  //                   >
  //                     {value}
  //                   </h3>
  //                 </div>
  //               </Card.Body>
  //             </Card>
  //           </Col>
  //         ))}
  //       </Row>
  //       {renderActiveComponent()}
  //     </div>
  //   );
  // };

  // export default Report;
