import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";
import mainbk from "../component/icon/logo-bk.png";

const Loading = (props) => {
    const Spinner = ({ color }) => {
        return (
            <Flex>
                <ScaleLoader
                    height="100px"
                    width="15px"
                    color="#89B0AE"
                    radius="8"
                />
            </Flex>
        );
    };

    return (
        <Container>
            <Mainimg src={mainbk} alt="mainlogo" />
            <Spinner color={props.color}></Spinner>
        </Container>
    );
};

export const LastLoading = (props) => {
    const Spinner = ({ color }) => {
        return (
            <Flex>
                <RingLoader color={color} size="120px" />;
            </Flex>
        );
    };

    const [title, setTitle] = useState("결과 분석중");
    let history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            setTitle((title) => title + ".");
        }, 1000);
    }, [title]);

    useEffect(() => {
        setTimeout(() => history.push("/result"), 4000);
    }, [history]);

    return (
        <Whole>
            <Title>{title}</Title>
            <Spinner color={props.color}></Spinner>
        </Whole>
    );
};

const Mainimg = styled.img`
    display: block;
    width: 150px;
    height: 150px;
    text-align: center;
    align-items: center;
    position: relative;
    margin: 0 auto;
    margin-bottom: 20px;
`;

const Whole = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 92vh;
    color: white;
    background: #e9cbc3;
    background-size: cover;
`;

const Title = styled.h1`
    font-size: 50px;
    font-weight: bold;
    margin: 8px;
    margin-bottom: 25px;
    text-align: center;
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: center;
`;
const ContainerWrapper = styled.div`
    width: 400px;
    margin-top: 100px;
`;

const Container = (props) => (
    <Whole>
        <ContainerWrapper>{props.children}</ContainerWrapper>
    </Whole>
);

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: null;
`;

export default Loading;
