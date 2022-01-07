import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { genresState, filterMovieState } from "../state/atoms";
import axios from "axios";

const MusicGenres = ({ onPrev, onNext }) => {
    const [genres, setGenres] = useRecoilState(genresState);

    const [input, setInput] = useState(0);

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

    useEffect(() => {
        setGenres({
            ...genres,
            music_features: input,
        });
    }, [input]);

    return (
        <div>
            <h1>🎧음악장르 선택입니다</h1>
            <p>
                **energy** 에너지는 0.0에서 1.0 사이의 측정치이며 강도와 활동의
                지각적 측정을 나타낸다. 전형적으로, 에너지 넘치는 트랙들은
                빠르고, 시끄럽고, 시끄럽게 느껴집니다. 예를 들어, 데스 메탈은
                높은 에너지를 가지고 있는 반면, 바흐 서곡은 저울에서 낮은 점수를
                받는다. 이 속성에 기여하는 지각적 특징에는 동적 범위, 인식된
                소리, 음색, 시작 속도 및 일반적인 엔트로피가 포함된다.
            </p>
            <p>
                **danceability** 댄서빌리티는 템포, 리듬 안정성, 박자 강도,
                전반적인 규칙성을 포함한 음악적 요소들의 조합을 바탕으로 트랙이
                춤에 얼마나 적합한지 설명한다. 0.0 값은 가장 춤출 수 없고 1.0은
                가장 춤출 수 있습니다.
            </p>
            <p>
                **valence** 트랙이 전달하는 음악적 긍정을 설명하는 0.0에서
                1.0까지의 척도입니다. 원자가가 높은 트랙은 더 긍정적으로 들리는
                반면, 원자가가 낮은 트랙은 더 부정적으로 들린다(예: 슬프고,
                우울하고, 분노함).
            </p>
            <p>
                tempo 트랙의 전체 예상 템포(분당 비트 수)입니다. 음악 용어에서
                템포(tempo)는 주어진 곡의 속도 또는 속도이며, 평균 비트
                지속시간에서 직접 파생된다.
            </p>

            <Box sx={{ width: 300 }}>
                {MusicSet.map((mg, index) => (
                    <div key={index}>
                        <label htmlFor="mg">{mg}</label>
                        <Slider
                            aria-label="equalizer"
                            defaultValue={50}
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
            <button
                disabled={!input || Object.keys(input).length < 4}
                onClick={onNext}
            >
                좋아하는 영화 선택으로
            </button>
        </div>
    );
};

export default MusicGenres;
