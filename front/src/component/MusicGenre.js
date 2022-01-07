import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { genresState, filterMovieState } from "../state/atoms";
import axios from "axios";
import StyleContainer from "./styled/container";

const MusicGenres = ({ onPrev, onNext }) => {
    const [genres, setGenres] = useRecoilState(genresState);

    const [input, setInput] = useState(0);

    function valuetext(value) {
        return `${value}`;
    }

    console.log(input);

    const MusicSet1 = [
        {
            title: "오늘 기분이 어때요", //부정 긍정
            name: "valence",
            marks: [
                { value: 0, label: "슬퍼요" },
                {
                    value: 100,
                    label: "행복해요",
                },
            ],
        },
        {
            title: "신나는 음악 좋아하세요?",
            name: "energy",
            marks: [
                { value: 0, label: "아니요" },
                {
                    value: 100,
                    label: "좋아요",
                },
            ],
        },
        {
            title: "춤 추는건 어때요?",
            name: "danceability",
            marks: [
                { value: 0, label: "듣는게 좋아요" },
                {
                    value: 100,
                    label: "지금 당장",
                },
            ],
        },
        {
            title: "템포는 어떻게 할까요?",
            name: "tempo",
            marks: [
                { value: 0, label: "느리게 plz" },
                {
                    value: 100,
                    label: "빠르게 plz",
                },
            ],
        },
    ];

    const onChangeHandle = (e) => {
        const { value, name } = e.target;

        setInput((cur) => {
            let newInput = { ...cur };
            newInput[name] = value;
            return newInput;
        });
    };

    useEffect(() => {
        setGenres({
            ...genres,
            music_features: input,
        });
    }, [input]);

    return (
        <StyleContainer>
            <h1>당신의 기분을 알려주세요</h1>

            <Box sx={{ width: 300 }}>
                {MusicSet1.map((mg, index) => (
                    <div key={index}>
                        <label htmlFor="mg">{mg.title}</label>
                        <Slider
                            aria-label="equalizer"
                            defaultValue={50}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={10}
                            marks={mg.marks}
                            min={0}
                            max={100}
                            onChange={onChangeHandle}
                            name={mg.name}
                        />
                    </div>
                ))}
            </Box>
            <button onClick={onPrev}>뒤로가기 버튼</button>
            <button
                disabled={!input || Object.keys(input).length < 4}
                onClick={onNext}
            >
                좋아하는 영화 선택으로
            </button>
        </StyleContainer>
    );
};

export default MusicGenres;
