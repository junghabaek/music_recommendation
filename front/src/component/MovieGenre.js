import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { genreState } from "../state/atoms";
import Audios from "./MusicPlay";
import Always from "../routers/Always.mp3";
import styled from "styled-components";

const MovieGenre = ({ onPrev, onNext, step }) => {
    const resetGenre = useResetRecoilState(genreState);
    const Colors = [
        { name: "RED", hex: "#ffb598" },
        { name: "ORANGE", hex: "#ffdcaa" },
        { name: "PURPLE", hex: "#d7beff" },
        { name: "CYAN", hex: "#c7f5ed" },
        { name: "BLUE", hex: "#c2dbff" },
    ];
    const [genre, setGenre] = useRecoilState(genreState);

    const onChangeHandle = (e) => {
        setGenre({
            ...genre,
            genre: e.target.value,
        });
    };

    console.log(genre);

    return (
        <div>
            {genre === {} ? (
                <div>추천을 시작합니다.</div>
            ) : (
                <div>
                    <h1>🎞영화장르 선택입니다.</h1>

                    <Stations>
                        {Colors.map((color) => (
                            <Station key={color.name}>
                                <div>
                                    <input
                                        id={color.name}
                                        type="radio"
                                        name="color-selector"
                                        value={color.name}
                                        checked={
                                            genre.genre === color.name
                                                ? true
                                                : false
                                        }
                                        onChange={onChangeHandle}
                                    />
                                    <label htmlFor={color.name}>
                                        {color.name}
                                        <img
                                            src="https://placeimg.com/200/100/animals/sepia"
                                            alt=""
                                        />
                                    </label>
                                </div>
                                <div>
                                    <Audios />
                                </div>
                            </Station>
                        ))}
                    </Stations>
                    <button onClick={onNext}>다음</button>
                </div>
            )}
        </div>
    );
};

const Stations = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 50%);
    width: 100%;
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

export default MovieGenre;
