import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { genreState, filterMovieState } from "../state/atoms";
import axios from "axios";

const MusicGenre = ({ onPrev, onNext }) => {
    const [genre, setGenre] = useRecoilState(genreState);
    const [movieData, setMovieData] = useRecoilState(filterMovieState);
    const [input, setInput] = useState();

    function valuetext(value) {
        return `${value}도`;
    }

    const MusicSet = [
        "acousticness",
        "danceability",
        "energy",
        "tempo",
        "valence",
    ];

    const onChangeHandle = (e) => {
        const { value, name } = e.target;

        setInput((cur) => {
            let newInput = { ...cur };
            newInput[name] = value;
            return newInput;
        });
    };

    const onClickHandler = async (e) => {
        setGenre({
            ...genre,
            music_genre: input,
        });

        //axios post
        const res = await axios
            .post(null)
            .then((res) => setMovieData(res.data))
            .catch((e) => console.log(e))
            .then(() => onNext());
    };
    console.log(input);
    useEffect(() => {
        console.log(genre);
    }, [genre]);

    return (
        <div>
            <h1>🎧음악장르 선택입니다</h1>
            <Box sx={{ width: 300 }}>
                {MusicSet.map((mg, index) => (
                    <div key={index}>
                        <label htmlFor="mg">{mg}</label>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={0}
                            max={100}
                            onChange={onChangeHandle}
                            name={mg}
                        />
                    </div>
                ))}
            </Box>
            <button onClick={onPrev}>뒤로가기 버튼</button>
            <button disabled={!input} onClick={onClickHandler}>
                좋아하는 영화 선택으로
            </button>
        </div>
    );
};

export default MusicGenre;
