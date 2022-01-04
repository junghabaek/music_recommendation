import React from "react";
import RadarChart from "../component/RadarChart";
import PageLayout from "../component/PageLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { resultMovieState } from "../state/atoms";
import { Row } from "antd";
import GridCards from "../component/GridCards";
import { Link } from "react-router-dom";

const ResultPage = () => {
    const movieData = useRecoilValue(resultMovieState);
    console.log(movieData);

    const final = movieData[0];
    console.log("1개 슬라이싱 data", final);

    const secondMovies = movieData.slice(1, 4);
    console.log("3개 슬라이싱 data", secondMovies);

    const ott_obj = final.ott; //TODO 객체의 value 값으로 key를 가져오기
    console.log(final.ott);
    let ott_list = [];
    if (ott_obj["Netflix"]) {
        ott_list.push("Netflix");
    }
    if (ott_obj["Hulu"]) {
        ott_list.push("Hulu");
    }
    if (ott_obj["Disney"]) {
        ott_list.push("Disney");
    }
    if (ott_obj["Prime"]) {
        ott_list.push("Prime");
    }

    console.log(ott_list);
    return (
        <PageLayout>
            <React.Fragment>
                <div>
                    <GridCards
                        image={final.poster_url}
                        movieName={final.movie_title}
                        url={final.url}
                        id={final.movie_id}
                        track={final.preview_url}
                    />
                    <button>즐겨찾기</button>
                    <h1>{final.movie_title}</h1>
                    <p>OTT 정보 :: {ott_list}</p>
                    <h3>영화감독 :: {final.movie_director}</h3>
                    <h3>음악감독 :: {final.sound_director}</h3>
                    <h4>메인테마곡 :: {final.track_name}</h4>

                    <p>{final.movie_plot}</p>
                </div>

                <RadarChart />
            </React.Fragment>
            <div>
                <h3>혹시 몰라 비슷한 영화도 추천해드려요</h3>
                <br />
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
                                    span={8}
                                />
                            </React.Fragment>
                        ))}
                </Row>
            </div>
            <button>
                <Link to="/">홈으로 가기</Link>
            </button>
            <button>
                <Link to="/main">메인페이지로 가기</Link>
            </button>
        </PageLayout>
    );
};

export default ResultPage;
