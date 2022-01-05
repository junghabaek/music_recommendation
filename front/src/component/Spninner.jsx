import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";

const Loading = (props) => {
    const Spinner = ({ color }) => {
        return (
            <Flex>
                <RingLoader color={color} size="120px" />
            </Flex>
        );
    };

    return (
        <Container>
            <Title> {props.title} </Title>
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
        <Container>
            <Title>{title}</Title>
            <Spinner color={props.color}></Spinner>
        </Container>
    );
};

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
    align-items: center;
`;
const ContainerWrapper = styled.div`
    width: 400px;
    margin-top: 72px;
`;

const Container = (props) => (
    <FlexBox>
        <ContainerWrapper>{props.children}</ContainerWrapper>
    </FlexBox>
);

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Loading;
