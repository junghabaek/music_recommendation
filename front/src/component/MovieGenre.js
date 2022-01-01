import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { genresState, previewTrackState } from "../state/atoms";
import Audios from "./MusicPlay";
import Loading from "./Spninner";
import Always from "../routers/Always.mp3";
import styled from "styled-components";
import axios from "axios";

const MovieGenres = ({ onPrev, onNext, step }) => {
    const [loading, setLoading] = useState(true);
    const [previewTrack, setPreviewTrack] = useRecoilState(previewTrackState);
    const [genres, setGenres] = useRecoilState(genresState);
    // 미리듣기 음악 불러오기 API
    // genre / track_url / cover_img / track_title
    useEffect(() => {
        async function loadTrack() {
            try {
                let api = "";
                const response = await axios.get(api);
                setPreviewTrack(response.data);
                console.log("get track api");
                setLoading(false);
            } catch (e) {
                console.log("axios get Error");
                setLoading(false); //TODO API 실제로 받아오면 지워야함
            }
        }
        loadTrack();
    }, []);

    console.log(previewTrack);

    //TODO Sci-Fi : 12, Comedy : 2, Thriller : 3, Romance : 4, Action : 5 이 들어갈것같아요
    const Colors = [
        { name: "Sci-Fi", id: 12, hex: "#ffb598" },
        { name: "Comedy", id: 2, hex: "#ffdcaa" },
        { name: "Thriller", id: 3, hex: "#d7beff" },
        { name: "Romance", id: 4, hex: "#c7f5ed" },
        { name: "Action", id: 5, hex: "#c2dbff" },
    ];

    const onChangeHandle = (e) => {
        setGenres({
            ...genres,
            genre: Number(e.target.value),
        });
    };

    console.log(genres);

    return (
        <div>
            <div>
                <h1>🎞영화장르 선택입니다.</h1>
                {loading ? (
                    <Loading />
                ) : (
                    <Stations>
                        {Colors.map((mgenre) => (
                            <Station key={mgenre.name}>
                                <div>
                                    <div>
                                        <Audios />
                                    </div>
                                    <input
                                        id={mgenre.name}
                                        type="radio"
                                        name="color-selector"
                                        value={mgenre.id}
                                        checked={
                                            genres.genre === mgenre.id
                                                ? true
                                                : false
                                        }
                                        onChange={onChangeHandle}
                                    />
                                    <label htmlFor={mgenre.name}>
                                        {mgenre.name}
                                        <img
                                            src="https://placeimg.com/200/100/animals/sepia"
                                            alt=""
                                        />
                                    </label>
                                </div>
                            </Station>
                        ))}
                    </Stations>
                )}

                <button onClick={onNext}>다음</button>
            </div>
        </div>
    );
};

const Stations = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 50%);
    width: 100%;
    display: block;
    justify-content: center;
    align-items: center;
`;

const Station = styled.div`

font-size: 1.2em;
    border: 1px solid rgb(76, 62, 95);
    margin: 0.25em;
    border-radius: 10px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
    border-color: #e36bae;
`;

export default MovieGenres;
