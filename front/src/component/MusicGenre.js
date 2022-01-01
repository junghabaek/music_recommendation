import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { genresState, filterMovieState } from "../state/atoms";
import axios from "axios";

const MusicGenres = ({ onPrev, onNext }) => {
    const [genres, setGenres] = useRecoilState(genresState);
    const [movieData, setMovieData] = useRecoilState(filterMovieState);
    const [input, setInput] = useState();

    function valuetext(value) {
        return `${value}`;
    }

    //음악 필터하는 속성으로는 danceability, energy, tempo, valence 했습니다.
    const MusicSet = ["energy", "danceability", "valence", "tempo"];

    const onChangeHandle = (e) => {
        const { value, name } = e.target;

        setInput((cur) => {
            let newInput = { ...cur };
            newInput[name] = value;
            return newInput;
        });
    };

    const onClickHandler = async (e) => {
        setGenres({
            ...genres,
            music_features: input,
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
        console.log(genres);
    }, [genres]);

    return (
        <div>
            <h1>🎧음악장르 선택입니다</h1>
            <Box sx={{ width: 300 }}>
                {MusicSet.map((mg, index) => (
                    <div key={index}>
                        <label htmlFor="mg">{mg}</label>
                        <Slider
                            aria-label="equalizer"
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

export default MusicGenres;
