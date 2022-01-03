/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Col } from "antd";
import Always from "../routers/Always.mp3";
import styled from "styled-components";

const GridCards = (props) => {
    const onClickhandler = (e) => {
        props.setSelectedMovie(props.id);
        props.setSelectedMovieTitle(props.movieName);
    };

    const start = () => {
        audioTrack.play();
    };
    const stop = () => {
        audioTrack.pause();
    };
    // let url =
    //     "https://p.scdn.co/mp3-preview/eb463247243646de10aa4d9b3f2c0c8b836c1dc8?cid=0e18970867524f1fba6634279dd9e5b2";
    let audioTrack = new Audio(Always);

    return (
        <Col span={8} lg={8} md={8} xs={12}>
            {/*브라우저의 크기가 가장클때는 24중에 6만쓰겠다는의미 중간은 8 가장작을때는 24를 다쓰겠다는의미*/}
            <div style={{ position: "relative" }}>
                <HHover>
                    <span className="text">
                        <div onClick={onClickhandler} value={props.id}>
                            <h2>
                                🎶
                                <br /> {props.movieName}
                            </h2>
                        </div>
                    </span>
                    <img
                        style={{ width: "100%", height: "320px" }}
                        src={props.image}
                        onMouseEnter={start}
                        onMouseLeave={stop}
                        //영화의 id
                    />
                </HHover>
            </div>
        </Col>
    );
};

const HHover = styled.div`
     {
        position: relative;
        border: 1px solid rgb(76, 62, 95);
    }
    .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        opacity: 0;
        transition: all 0.8s ease;
    }
    .text h2 {
        margin: 0;
        color: white;
    }
    :hover .text {
        opacity: 1;
        cursor:pointer;
    }
    :hover img {
        -webkit-filter: blur(5px);
        
    }
    &:hover {
        border-color: #e36bae;
`;

export default GridCards;
