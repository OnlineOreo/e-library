import { ListGroup , ListGroupItem } from "react-bootstrap"
import {
	Col,
	Row,
	Card,
	Tab,
	Nav,
	Container
} from 'react-bootstrap';
export default function ShowInstitute(){
    return (
        <>
        <Container fluid className="p-6 justify-content-center">
        <Row>
				<Col xl={8} lg={8} md={8} sm={12}>

					<Tab.Container id="tab-container-8" defaultActiveKey="design">
						<Card>
							<Card.Header className="border-bottom-0 p-0">
								<Nav className="nav-lb-tab">
									<Nav.Item>
										<Nav.Link className="mb-sm-3 mb-md-0">
											Show
										</Nav.Link>
									</Nav.Item>
									{/* <Nav.Item>
										<Nav.Link eventKey="react" className="mb-sm-3 mb-md-0">
											Code
										</Nav.Link>
									</Nav.Item> */}
								</Nav>
							</Card.Header>
							<Card.Body className="p-0">
								<Tab.Content>
									<Tab.Pane eventKey="design" className="pb-4 p-4">
										{/* code started */}
										<ListGroup horizontal>
											<ListGroup.Item className="flex-fill">
												Cras justo odio
											</ListGroup.Item>
											<ListGroup.Item className="flex-fill">
												Morbi leo risus
											</ListGroup.Item>
										</ListGroup>
										{/* end of code */}
									</Tab.Pane>
								</Tab.Content>
							</Card.Body>
						</Card>
					</Tab.Container>
				</Col>
			</Row>
        </Container>
        </>
    )
}