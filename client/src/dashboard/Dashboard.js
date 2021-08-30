import { FormattedMessage } from "react-intl";
import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Context } from '../index.js'
import { Link } from "react-router-dom";
import routeNames from "../shared/constants/routeNames.js";
import { observer } from "mobx-react-lite";
import { getAll } from '../shared/http/collectionApi.js';

const Dashboard = observer(() => {
    const { user } = useContext(Context);
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                setData(await getAll());
            }
            fetchData();
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <main className="container content">
            <section className="">
                <h2 className="mr-auto p-2 bd-highlight d-inline">
                    <strong><FormattedMessage id="home-page-title" /></strong>
                </h2>
                {
                    user.isAuth && <h5 className="d-inline p-2" style={{ float: "right" }}><a className="menu-links" href={routeNames.PROFILE.replace(':id', user.user.id)}><FormattedMessage id="dashboard.profile.link" /></a></h5>
                }
                {
                    user.isAuth && user.user.role === 'ADMIN' && <h5 className='d-inline p-2' style={{ float: "right" }}><Link className="menu-links" to={routeNames.ADMIN}><FormattedMessage id="dashboard.admin.link" /></Link></h5>
                }
            </section>
            <hr />
            <Container>
                <Row className="d-flex mt-2 mb-2">
                    {
                        () => {
                            if (data)
                                return (<><p><strong><FormattedMessage id="home-page-message" /></strong></p></>)
                        }
                    }
                    {
                        data.map(data => {
                            return (
                                <Col key={data.id} className="mt-4">
                                    <Card className="card-profile">
                                        <Card.Body className="shadow-lg auth-bg">
                                            <Card.Title>{data.name}</Card.Title>
                                            <Card.Text>
                                                {data.description}
                                            </Card.Text>
                                            <Button href={routeNames.COLLECTION.replace(':id', data.id)} className="float-top" variant="primary" onClick={() => { }}>
                                                <FormattedMessage id="profile-page.details.but" />
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </main>
    );
});

export default Dashboard;