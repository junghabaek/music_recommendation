import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { genreState } from "../state/atoms";

const Sliderbar = () => {
    const [genre, setGenre] = useRecoilState(genreState);
    const [input, setInput] = useState({});

    function valuetext(value) {
        return `${value}도`;
    }

    const onChangeHandle = (e) => {
        const { value, name } = e.target;

        setInput((cur) => {
            let newInput = { ...cur };
            newInput[name] = value;
            return newInput;
        });
    };

    const onClickHandler = (e) => {
        setGenre({
            ...genre,
            music_genre: input,
        });
    };

    console.log(input);
    console.log("user 입력 데이터   ", genre);

    return (
        <div>
            <Box sx={{ width: 300 }}>
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
                    name="dance"
                />
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
                    name="고음"
                />
            </Box>
            <button onClick={onClickHandler}>recoil 전송</button>
        </div>
    );
};

export default Sliderbar;
