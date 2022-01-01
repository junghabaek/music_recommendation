/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";

const HoverEff = () => {
    return (
        <div>
            <HHover href="#">
                <span className="text">
                    <h1>Thunder</h1>
                </span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Thunderstorm_in_sydney_2000x1500.png" />
            </HHover>
        </div>
    );
};

const HHover = styled.a`
     {
        position: relative;
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
    .text h1 {
        margin: 0;
        color: white;
    }
    :hover .text {
        opacity: 1;
    }
    :hover img {
        -webkit-filter: sepia(50%);
    }
`;

const Fg = styled.figure`
    .effect-sadie figcaption::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to bottom,
            rgba(72, 76, 97, 0) 0%,
            rgba(72, 76, 97, 0.8) 75%
        );
        content: "";
        opacity: 0;
        transform: translate3d(0, 50%, 0);
    }

    .effect-sadie h2 {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        color: #484c61;
        transition: transform 0.35s, color 0.35s;
        transform: translate3d(0, -50%, 0);
    }

    .effect-sadie figcaption::before,
    .effect-sadie p {
        transition: opacity 0.35s, transform 0.35s;
    }

    .effect-sadie p {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 2em;
        width: 100%;
        opacity: 0;
        transform: translate3d(0, 10px, 0);
    }

    .effect-sadie:hover h2 {
        color: #fff;
        transform: translate3d(0, -50%, 0) translate3d(0, -40px, 0);
    }

    .effect-sadie:hover figcaption::before,
    .effect-sadie:hover p {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`;
export default HoverEff;
