import React, { useEffect, useState } from "react";
import axios from "axios";
import GridCards from "./GridCards";
import Loading from "./Spninner";
import { Row } from "antd";
//영화,음악 장르를 보내주고 그 기반으로 된 영화를 가져오는 페이지
import { useRecoilState, useRecoilValue } from "recoil";
import { genresState, filterMovieState } from "../state/atoms";

const FilterMovie = ({ onPrev, onNext }) => {
    const genres = useRecoilValue(genresState);
    const [movieData, setMovieData] = useRecoilState(filterMovieState);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("selected");
    const [selectedMovieTitle, setSelectedMovieTitle] = useState();

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    } // api 로 받아온 영화 섞은 함수

    let testapi = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`;
    let api = `http://localhost:8000/filter/movies`;

    console.log("받아온", genres);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.post(api, genres);
                setMovies(response.data);
                console.log("API 가져온 data", movies);
                setLoading(false);
            } catch (e) {
                console.log("axios get Error");
            }
        }
        loadData();
    }, []);
    console.log("movies: ", movies)
    // mock api tes 버전
    // useEffect(() => {
    //     async function loadData() {
    //         try {
    //             const response = await axios.get(testapi);
    //             setMovies(response.data.data.movies);
    //             console.log("API 가져온 data", movies);
    //             setLoading(false);
    //         } catch (e) {
    //             console.log("axios get Error");
    //         }
    //     }
    //     loadData();
    // }, []);

    useEffect(() => {
        shuffle(movies);
    }, [movies]);

    const firstMovies = movies.slice(0, 6);
    console.log("6개 슬라이싱 data", firstMovies);

    useEffect(() => {
        console.log("선택된 영화id", selectedMovie);
    }, [selectedMovie]);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h1>사용자 영화선택 페이지</h1>
                    {selectedMovieTitle ? (
                        <h2>{selectedMovieTitle}을 선택 하셨어요.</h2>
                    ) : null}
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
                                            id={movie.id}
                                            setSelectedMovie={setSelectedMovie}
                                            setSelectedMovieTitle={
                                                setSelectedMovieTitle
                                            }
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
