import React, { useEffect, useState } from "react";
import axios from "axios";
import GridCards from "./GridCards";
import Loading from "./Spninner";
import { Row } from "antd";
//영화,음악 장르를 보내주고 그 기반으로 된 영화를 가져오는 페이지

const FilterMovie = ({ onPrev, onNext }) => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    } // api 로 받아온 영화 섞은 함수

    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.get(
                    `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
                );
                setMovies(response.data.data.movies);
                console.log("get api");
                setLoading(false);
            } catch (e) {
                console.log("axios get Error");
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        shuffle(movies);
    }, [movies]);

    console.log(movies);

    const firstMovies = movies.slice(0, 6);
    console.log(firstMovies);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h1>사용자 영화선택 페이지</h1>
                    <div>
                        <Row gutter={[16, 16]}>
                            {/*gutter는 Col간의 위 아래여백을 줄때 사용 */}
                            {movies &&
                                firstMovies.map((movie, index) => (
                                    <React.Fragment key={index}>
                                        <GridCards
                                            image={movie.medium_cover_image}
                                            movieName={movie.title}
                                            url={movie.url}
                                        />
                                    </React.Fragment>
                                ))}
                        </Row>
                    </div>
                    <button onClick={onPrev}>뒤로가기 버튼</button>
                    <button onClick={onNext}>결과보러가기</button>
                </div>
            )}
        </div>
    );
};

export default FilterMovie;
