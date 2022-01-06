import React from "react";
import styled from "styled-components";

export default function PageLayout({ title, sub, children }) {
    document.title = "음화당,";
    return (
        <Navbar>
            <div>
                <Title>{title}</Title>
                <p>{sub}</p>
            </div>

            {children}
        </Navbar>
    );
}

const Navbar = styled.div`
    background-color: #304543;
`;

const Title = styled.h1`
    color: #89b0ae;
    font-family: "titlefont";
`;
