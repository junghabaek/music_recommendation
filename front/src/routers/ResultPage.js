/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import RadarChart from "../component/chart/RadarChart";
import PageLayout from "../component/PageLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { resultMovieState } from "../state/atoms";
import { Row } from "antd";
import GridCards from "../component/GridCards";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import HeartButton from "../component/HeartButton";
// import D3plot from "../component/chart/D3plot";
import Audios from "../component/MusicPlay";

const ResultPage = () => {
    const movieData = useRecoilValue(resultMovieState);
    const [like, setLike] = useState(false);

    const final = movieData[0];
    console.log("1개 슬라이싱 data", final);

    const secondMovies = movieData.slice(1, 4);
    console.log("3개 슬라이싱 data", secondMovies);

    const ott_list = Object.entries(final.ott).reduce((acc, cur) => {
        if (cur[1]) acc.push(cur[0]);
        return acc;
    }, []);

    console.log(ott_list);

    const resultmovieid = final.movie_id;

    const toggleLike = async (e) => {
        let body = {
            movie_id: resultmovieid,
            liked: 1,
        };
        console.log(body);
        const res = await axios.post("/result/mypage", body); // [POST] 사용자가 좋아요를 누름 -> DB 갱신
        setLike((cur) => !cur);
    };
    let codes = final.movie_plot;
    console.log(codes);
    return (
        <PageLayout>
            <React.Fragment>
                <div>
                    <div style={{ width: "10%" }}>
                        <Audios track={final.preview_url} autoplay={true} />
                    </div>
                    <GridCards
                        image={final.poster_url}
                        movieName={final.movie_title}
                        url={final.url}
                        id={final.movie_id}
                        track={final.preview_url}
                        xs={24}
                    />
                    <HeartButton like={like} id={resultmovieid} />
                    <h1>{final.movie_title}</h1>
                    <p>OTT 정보 :: {ott_list}</p>
                    <h3>영화감독 :: {final.movie_director}</h3>
                    <h3>음악감독 :: {final.sound_director}</h3>
                    <h3>메인테마곡 :: {final.track_name}</h3>

                    {codes !== "0" ? (
                        <div dangerouslySetInnerHTML={{ __html: codes }}></div>
                    ) : null}
                </div>

                <RadarChart />
            </React.Fragment>
            <div>
                <h3>혹시 몰라 비슷한 영화도 추천해드려요</h3>
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
            <button>
                <Link to="/">홈으로 가기</Link>
            </button>
            <button>
                <Link to="/main">더보기</Link>
            </button>
        </PageLayout>
    );
};

export default ResultPage;
