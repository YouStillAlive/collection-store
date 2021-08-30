import React, { useEffect, useState } from 'react';
import { Button, Row, Card, Container, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import CollectionModal from '../shared/modals/CollectionModal';
import { add, userCollection, update, deleteCollection } from '../shared/http/collectionApi.js';
import { useParams } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import routeNames from '../shared/constants/routeNames';

const Profile = observer(() => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const params = useParams();
    const handleShow = () => { setShow(true); }
    const [show, setShow] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);
    const [idCollection, setIdCollection] = useState(0);

    useEffect(() => {
        try {
            fetchData();
        } catch (e) {
            console.log(e);
        }
    }, [params.id]);

    const record = async () => {
        if (!isUpdate) {
            await add(name, description, params.id);
            await fetchData();

        }
        else {
            await updateCollection();
            await fetchData();

        }
    }

    const updateCollection = async () => {
        try {
            await update(idCollection, name, description);
            await fetchData();
        } catch (e) {
            console.log(e);
        }
    }

    const fetchData = async () => {
        try {
            setData(await userCollection(params.id));
        } catch (e) {
            console.log(e);
        }
    }

    const removeCollection = async () => {
        try {
            await deleteCollection(idCollection);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Container className="content">
                <section>
                    <h2>
                        <strong><FormattedMessage id="profile-page.title" /></strong>
                    </h2>
                    <hr />
                </section>
                <section className="d-flex flex-wrap">
                    <Card className="card-profile">
                        <Card.Img variant="top" />
                        <Card.Body className="shadow-lg auth-bg">
                            <Card.Title><FormattedMessage id="profile-page.add.title" /></Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <Button variant="primary" onClick={() => {
                                setIsUpdate(false);
                                handleShow();
                            }}>
                                <FormattedMessage id="profile-page.add.but" />
                            </Button>
                            <CollectionModal
                                name={name}
                                setName={setName}
                                description={description}
                                setDescription={setDescription}
                                show={show}
                                setShow={setShow}
                                onSuccess={record}
                            />
                        </Card.Body>
                    </Card>
                </section>
                <Row className="d-flex mt-4">
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
                                            <Button className="float-top m-1" variant="primary" href={routeNames.COLLECTION.replace(':id', data.id)}>
                                                <FormattedMessage id="profile-page.details.but" />
                                            </Button>
                                            <Button className="m-1" variant="success" onClick={() => {
                                                setIdCollection(data.id);
                                                setIsUpdate(true);
                                                handleShow();
                                            }}><FormattedMessage id="collection.page.change.but" /></Button>
                                            <Button variant="danger" onClick={
                                                () => {
                                                    setIdCollection(data.id);
                                                    removeCollection(idCollection);
                                                }}><FormattedMessage id="collection.page.delete.but" /></Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        }
                        )
                    }
                </Row>
            </Container>
        </>
    );
});

export default Profile;