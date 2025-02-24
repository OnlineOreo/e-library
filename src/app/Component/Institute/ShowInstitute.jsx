import { ListGroup , ListGroupItem } from "react-bootstrap"
import {
	Col,
	Row,
	Card,
	Tab,
	Nav,
	Container
} from 'react-bootstrap';

import Link from "next/link";
export default function ShowInstitute(){
    return (
        <>
		<div className="bg-primary pt-10 pb-21"></div>
        <Container fluid className="mt-n22 px-6 ">
			<Row>
				<Col lg={12} md={12} xs={12}>
					<div className="d-flex justify-content-between align-items-center">
						<h3 className="mb-0 text-white">Show Institute</h3>
						<Link href="../view" className="btn btn-white">Back</Link>
					</div>
				</Col>
			</Row>
        <Row className="justify-content-center mt-4">
				<Col xl={8} lg={8} md={8} sm={12}>
					<Tab.Container id="tab-container-8" defaultActiveKey="design">
						<Card>
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