import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Card = (props) => {
    return (
        <li>
            <ImgBox
                id={props.id}
                src={props.img}
                alt="imgbox"
                onClick={props.onClick}
                onMouseEnter={props.onMouseEnter}
            />
        </li>
    );
};

export default Card;

const ImgBox = styled.img`
    width: 200px;
    height: 280px;
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: transform 0.35s;
    }
`;
