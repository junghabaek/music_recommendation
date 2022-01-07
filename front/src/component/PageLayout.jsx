import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import navLogo from "./icon/nav-logo.png";

export default function PageLayout({ title, sub, children }) {
    const history = useHistory();

    document.title = "음화당";
    return (
        <Navbar>
            <div>
                <Navimg
                    src={navLogo}
                    alt="로고"
                    onClick={() => {
                        history.push("/");
                    }}
                ></Navimg>
            </div>
            <Whole>{children}</Whole>
        </Navbar>
    );
}

const Navimg = styled.img`
    display: block;
    margin: 0 auto;
    padding: 10px;
    width: 150px;
    height: 50%;
    cursor: pointer;
`;

const Navbar = styled.div`
    background-color: #304543;
`;

const Whole = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 92vh;
    color: white;
    background-color: #f3e7d6;
    background-size: cover;
`;
