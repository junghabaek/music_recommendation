import React from "react";
import styled from "styled-components";

const StyleContainer = styled.div`
display: flex;
text-align: center;
flex-direction: column;
align-items: center
position: relative;
width: 80vw;
height: 70vh;
padding: 70px;
background-color: rgb(255, 255, 255, 0.7);

color: #663f46;
h1 {
    font-family: "sub2";
    font-size: 40px;
}
`;

function Container({ children, ...rest }) {
    return <StyleContainer {...rest}>{children}</StyleContainer>;
}

export default StyleContainer;
