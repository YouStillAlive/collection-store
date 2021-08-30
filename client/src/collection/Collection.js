import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useParams } from "react-router-dom";
import { read } from '../shared/http/collectionApi.js';

const Collection = () => {
    const [data, setData] = useState({});
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setData(await read(params.id));
        }
        fetchData();
    }, []);

    return (
        <>
            <Container className="content">
                <Row>
                    <Col><h1 className="text-center"><strong>{data.name}</strong></h1></Col>
                </Row>
                <h5><FormattedMessage id="collection.page-description"/></h5>

                <hr />
                <Row>
                    <Col><p>{data.description}</p></Col>
                </Row>
                <Row>
                </Row>
            </Container>
        </>
    );
}

export default Collection;