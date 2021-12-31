/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Col } from "antd";

const GridCards = (props) => {
    return (
        <Col lg={6} md={8} xs={24}>
            {/*브라우저의 크기가 가장클때는 24중에 6만쓰겠다는의미 중간은 8 가장작을때는 24를 다쓰겠다는의미*/}

            <div style={{ position: "relative" }}>
                <img
                    style={{ width: "100%", height: "320px" }}
                    src={props.image}
                />
            </div>
        </Col>
    );
};

// <img
// style={{ width: "100%", height: "320px" }}
// src="https://placeimg.com/200/100/animals/sepia"
// />

export default GridCards;
