/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { genresState } from "../state/atoms";
import { useResetRecoilState } from "recoil";
import PageLayout from "../component/PageLayout";
import styled from "styled-components";

const Home = ({ history }) => {
    const resetGenre = useResetRecoilState(genresState);

    const onClick = () => {
        resetGenre();

        history.push("/service");
    };

    return (
        <Whole>
            <LoginContainer>
                <PageLayout
                    title="음화당, "
                    sub="음악을 좋아하는 당신께, 이 영화를 드려요."
                >
                    <p>
                        문득 길을 걷다 OST를 듣고 영화가 떠오른 기억이
                        있으신가요?
                    </p>
                    <Btn onClick={onClick}>🎶음악추천받기🎶</Btn>
                </PageLayout>
            </LoginContainer>
        </Whole>
    );
};

const Whole = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            to right,
            rgba(20, 20, 20, 0.1) 10%,
            rgba(20, 20, 20, 0.7) 70%,
            rgba(20, 20, 20, 1)
        ),
        url(https://images.unsplash.com/photo-1513614328893-b443e064ba52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
    background-size: cover;
    color: white;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    width: 440px;
    padding: 70px;
`;

const Btn = styled.button`
    width: 300px;
    height: 50px;
    margin-top: 10px;
    margin-bottom: ${(props) => props.marginBottom};
    border-radius: 5px;
    color: ${(props) => props.textColor};
    background-color: ${(props) => props.backColor};
    font-size: large;
    padding: ${(props) => props.padding};
    :focus {
        cursor: pointer;
    }
`;

export default Home;
