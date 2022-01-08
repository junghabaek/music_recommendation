/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import RadarChart from "../component/chart/RadarChart";
import PageLayout from "../component/PageLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { resultMovieState } from "../state/atoms";
import { Row } from "antd";
import GridCards from "../component/GridCards";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import useResizeObserver from "../component/useResizeObserver";

import HeartButton from "../component/HeartButton";
// import D3plot from "../component/chart/D3plot";
// import Audios from "../component/MusicPlay";
import StyleContainer from "../component/styled/container";
import HoverImg from "../component/hover";

import Button from "../component/styled/btn";

const ResultPage = () => {
    const movieData = useRecoilValue(resultMovieState);
    const [like, setLike] = useState(false);

    console.log("금방받아온", movieData);

    const final = movieData[0];
    console.log("1개 슬라이싱 data", final);
    console.log("like", final.like_count);

    const selected_features = movieData[4].selected_features;
    console.log(selected_features);

    const secondMovies = movieData.slice(1, 4);
    console.log("3개 슬라이싱 data", secondMovies);

    const ott_list = Object.entries(final.ott).reduce((acc, cur) => {
        if (cur[1]) acc.push(cur[0]);
        return acc;
    }, []);

    console.log(ott_list);

    const resultmovieid = final.movie_id;

    const toggleLike = async (e) => {
        if (like === false) {
            let body = {
                movie_id: resultmovieid,
                liked: 1,
            };
            const res = await axios.post("/result/mypage", body);
            setLike((cur) => !cur); // [POST] 사용자가 좋아요를 누름 -> DB 갱신
        } else {
            let body = {
                movie_id: resultmovieid,
                liked: 0,
            };
            const res = await axios.post("/result/mypage", body);
            setLike((cur) => !cur);
        }
    };
    let codes = final.movie_plot;

    const contentRef = useRef(null);
    const [isShowReadMore, setIsShowReadMore] = useState(false);
    const observeCallback = (entries) => {
        for (let entry of entries) {
            if (entry.target.scrollHeight > entry.contentRect.height) {
                setIsShowReadMore(true);
            } else {
                setIsShowReadMore(false);
            }
        }
    };
    useResizeObserver({ callback: observeCallback, element: contentRef });
    const onClick = (e) => {
        contentRef.current.classList.add("show");
        setIsShowReadMore(false);
    };
    console.log(isShowReadMore);

    return (
        <PageLayout long="true">
            <Container>
                <h1>음악을 좋아하는 당신께, 이 영화를 드려요.</h1>
                <h1> &#60;{final.movie_title}&#62;</h1>
                <div style={{ display: "flex", marginBottom: "40px" }}>
                    <div style={{ display: "flex" }}>
                        <HoverImg
                            image={final.poster_url}
                            movieName={final.movie_title}
                            url={final.url}
                            id={final.movie_id}
                            track={final.preview_url}
                        />
                    </div>
                    <Divider />
                    <div>
                        <RadarChart
                            feat={final.features}
                            name={final.movie_title}
                            beforefeat={selected_features}
                        />
                    </div>
                </div>
                <ContentBox>
                    <div style={{ width: "450px", flexBasis: "50%" }}>
                        <div
                            style={{
                                display: "flex",
                                textAlign: "center",
                                justifyContent: "center",
                            }}
                        >
                            <HeartButton
                                like={like}
                                id={resultmovieid}
                                onClick={toggleLike}
                            />{" "}
                            {final.like_count}
                        </div>
                        <p>OTT 정보 :: {ott_list}</p>
                        <h3>영화감독 :: {final.movie_director}</h3>
                        <h3>음악감독 :: {final.sound_director}</h3>
                        <h3>메인테마곡 :: {final.track_name}</h3>
                    </div>

                    {codes !== "0" ? (
                        <div
                            style={{
                                width: "450px",
                                textAlign: "center",
                                margin: "auto",
                            }}
                        >
                            <h3>&#60;줄거리&#62;</h3>
                            {/* <div
                                dangerouslySetInnerHTML={{ __html: codes }}
                            ></div> */}
                            <Wrap>
                                <Ellipsis ref={contentRef}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: codes,
                                        }}
                                    ></div>
                                </Ellipsis>
                                {isShowReadMore && (
                                    <Button1 onClick={onClick}>
                                        ...더보기
                                    </Button1>
                                )}
                            </Wrap>
                        </div>
                    ) : null}
                </ContentBox>

                <div>
                    <h2>혹시 몰라 비슷한 영화도 추천해드려요</h2>
                    <br />
                    <div>
                        <Row gutter={[16, 16]}>
                            {movieData &&
                                secondMovies.map((movie, index) => (
                                    <React.Fragment key={index}>
                                        <GridCards
                                            image={movie.poster_url}
                                            movieName={movie.movie_title}
                                            url={movie.url}
                                            id={movie.movie_id}
                                            track={movie.preview_url}
                                            xs={8}
                                        />
                                        {/* <HeartButton
                                            like={like}
                                            setLike={setLike}
                                            id={movie.movie_id}
                                        /> */}
                                    </React.Fragment>
                                ))}
                        </Row>
                    </div>
                </div>
                <div>
                    <Button>
                        <a href="/">집으로</a>
                    </Button>
                    <Button>
                        <Link to="/main">더보기</Link>
                    </Button>
                </div>
            </Container>
        </PageLayout>
    );
};

const Wrap = styled.div``;

const Ellipsis = styled.div`
    position: relative;
    display: -webkit-box;
    max-height: 6rem;
    line-height: 2rem;
    overflow: hidden;
    -webkit-line-clamp: 3;
    &.show {
        display: block;
        max-height: none;
        overflow: auto;
        -webkit-line-clamp: unset;
    }
`;

const Button1 = styled.button`
    max-height: 2rem;
    line-height: 2rem;
    &.hide {
        display: none;
    }
`;

const Divider = styled.div`
    border: 1px solid #89b0ae;
    width: 0.1px;
    margin: 0 150px;
    height: 340px;
`;

const ContentBox = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
`;

const Container = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 80vw;
    padding: 1.8vh 0;
    top: 15%;

    background-color: rgb(255, 255, 255, 0.7);

    color: #663f46;
    h1 {
        font-family: "sub2";
        font-size: 2.1rem;
    }
    h2 {
        font-family: "sub1";
        font-size: 1.5rem;
    }
`;

export default ResultPage;
