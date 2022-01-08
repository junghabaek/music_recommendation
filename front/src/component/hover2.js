/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Image from "./Image";
import playbtn from "./icon/sound-waves.png";
import pausebtn from "./icon/sound-waves_1.png";

const HoverImg1 = (props) => {
    const onClickhandler = (e) => {
        stop();
    };

    let audioTrack = new Audio(props.url);

    const audioPromiseRef = useRef(Promise.resolve());
    const start = () => {
        audioPromiseRef.current.then(() => audioTrack.play());
        audioTrack.volume = 0.5;
    };
    const stop = () => {
        audioPromiseRef.current.then(() => audioTrack.pause());
    };

    return (
        <React.Fragment>
            <HHover onMouseEnter={start} onMouseLeave={stop}>
                <span className="hoverimg">
                    <Box onClick={onClickhandler} value={props.id}>
                        <WaveImg
                            alt={props.title} //TODO 이미지 제목 넣어야함
                            src={pausebtn}
                        />
                    </Box>
                </span>
                <WaveImg
                    alt={props.title} //TODO 이미지 제목 넣어야함
                    src={playbtn}
                />
            </HHover>
        </React.Fragment>
    );
};

const WaveImg = styled.img`
    display: block;
    margin: 0 auto;
    width: 7em;
    height: 7em;
    text-align: center;
    align-items: center;
    cursor: pointer;
`;

export const HHover = styled.div`
    {
        position: relative;
        
        text-align: center;
        padding : 10px;
        box-sizing : border-box;


    }

    .hoverimg {
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
    :hover .hoverimg {
        opacity: 1;
        

    }
    :hover img {
        
        transform: scale(0.9);
        transition: transform 0.35s;
        
    }
    &:hover {
    
`;

const Box = styled.div`
    dislplay: block;
    margin: 0 auto;
`;

export default HoverImg1;
