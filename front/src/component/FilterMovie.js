import React, { useEffect, useState } from "react";
import axios from "axios";
import GridCards from "./GridCards";
import Loading from "./Spninner";
import { Row } from "antd";
//영화,음악 장르를 보내주고 그 기반으로 된 영화를 가져오는 페이지
import { useRecoilState, useRecoilValue } from "recoil";
import { genresState, resultMovieState } from "../state/atoms";
import { useHistory } from "react-router-dom";

const FilterMovie = ({ onPrev }) => {
    const history = useHistory();
    const [genres, setGenres] = useRecoilState(genresState);
    const [movieData, setMovieData] = useRecoilState(resultMovieState);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("selected");
    const [selectedMovieTitle, setSelectedMovieTitle] = useState();

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    } // api 로 받아온 영화 섞은 함수

    let testapi = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`;
    let api = `http://localhost:8000/filter/movies`;

    useEffect(() => {
        async function loadData() {
            setGenres({ ...genres });
            console.log(genres);
            try {
                const response = await axios.post(api, genres);
                console.log(response);
                setMovies(response.data);
                console.log("API 가져온 data", movies);
                setLoading(false);
            } catch (e) {
                console.log("axios get Error");
            }
        }
        loadData();
    }, []);
    console.log("movies: ", movies);

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

    const onClickHandler = async () => {
        // 최종 결과 영화정보 받아오기
        const res = await axios
            .get(`http://localhost:8000/filter/recommend/${selectedMovie}`)
            .then((res) => setMovieData(res.data))
            .catch((e) => console.log(e))
            .then(() => history.push("/result"));
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h1>사용자 영화선택 페이지</h1>
                    <h2>관심있는 영화의 OST를 들어보고 제목을 클릭해주세요.</h2>
                    {selectedMovieTitle === null ? null : (
                        <h2>{selectedMovieTitle}을 선택 하셨어요.</h2>
                    )}
                    <div>
                        <Row gutter={[16, 16]}>
                            {/*gutter는 Col간의 위 아래여백을 줄때 사용 */}
                            {movies &&
                                firstMovies.map((movie, index) => (
                                    <React.Fragment key={index}>
                                        <GridCards
                                            image={movie.poster_url}
                                            movieName={movie.title}
                                            url={movie.url}
                                            id={movie.movie_id}
                                            setSelectedMovie={setSelectedMovie}
                                            setSelectedMovieTitle={
                                                setSelectedMovieTitle
                                            }
                                            track={movie.preview_url}
                                        />
                                    </React.Fragment>
                                ))}
                        </Row>
                    </div>
                    <button onClick={onPrev}>뒤로가기 버튼</button>
                    <button onClick={onClickHandler}>결과보러가기</button>
                </div>
            )}
        </div>
    );
};

export default FilterMovie;
