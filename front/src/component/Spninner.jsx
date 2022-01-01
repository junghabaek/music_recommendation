import React from "react";
import RingLoader from "react-spinners/RingLoader";
import styled from "styled-components";

const Loading = () => {
    const Spinner = () => {
        return (
            <Flex>
                <RingLoader color="#CC455C" size="120" />
            </Flex>
        );
    };

    return (
        <Container>
            <Title> Loading </Title>
            <Spinner></Spinner>
        </Container>
    );
};

const Title = styled.h1`
    font-size: 64px;
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
