import React, { Fragment, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { genresState, previewTrackState } from "../state/atoms";
import Audios from "./MusicPlay";
import Loading from "./Spninner";
import styled from "styled-components";
import axios from "axios";
import Image from "./Image";
import Music from "./Music";
import Player from "./Player";

const MovieGenres = ({ onPrev, onNext, step }) => {
    const [loading, setLoading] = useState(true);
    const [previewTrack, setPreviewTrack] = useRecoilState(previewTrackState);
    const [genres, setGenres] = useRecoilState(genresState);
    // 미리듣기 음악 불러오기 API
    // genre / track_url / cover_img / track_title
    useEffect(() => {
        async function loadTrack() {
            try {
                let api = "/back/filter/genre";
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

    useEffect(() => {
        console.log(previewTrack);
    }, []);

    //TODO Sci-Fi : 12, Comedy : 2, Thriller : 3, Romance : 4, Action : 5 이 들어갈것같아요

    const onChangeHandle = (e) => {
        setGenres({
            ...genres,
            genre: Number(e.target.value),
        });
        // const label = document.querySelectorAll("label");
        // const radio = document.querySelectorAll("input");

        // radio.forEach((el, index) => {
        //     if (el.checked) {
        //         label.forEach(
        //             (el) => (
        //                 (el.style.opacity = "0.5"),
        //                 (el.style.fontSize = "15px"),
        //                 (el.style.fontWeight = "normal")
        //             )
        //         );
        //         label[index].style.opacity = "1";
        //         label[index].style.fontSize = "20px";
        //         label[index].style.fontWeight = "bold";
        //     }
        // });
    };

    useEffect(() => {
        console.log(genres);
    }, [genres]);

    return (
        <>
            {loading ? (
                <Loading color="#CC455C" title="음화당" />
            ) : (
                <Whole>
                    <Container>
                        <h1>음악을 듣고 원하는 분위기를 선택해주세요.</h1>
                        <Stations>
                            {previewTrack &&
                                previewTrack.map((mgenre) => (
                                    <Box
                                        key={mgenre.genre}
                                        img={mgenre.cover_img}
                                    >
                                        <div>
                                            {/* <Audios track={mgenre.track_url} /> */}
                                            {/* <Music track={mgenre.track_url} /> */}
                                            <Player url={mgenre.track_url} />
                                        </div>
                                        <Radio>
                                            <input
                                                id={mgenre.genre}
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
                                            <label htmlFor={mgenre.genre}>
                                                <br />
                                                {mgenre.track_title}
                                            </label>
                                        </Radio>
                                    </Box>
                                ))}
                        </Stations>
                        <button
                            onClick={onNext}
                            disabled={Object.keys(genres).length === 0}
                        >
                            다음
                        </button>
                    </Container>
                </Whole>
            )}
        </>
    );
};

const Whole = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 92vh;
    color: white;
    background: #e9cbc3;
    background-size: cover;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    width: 80vw;
    height: 70vh;
    padding: 70px;
    background-color: rgb(255, 255, 255, 0.7);

    color: #663f46;
    h1 {
        font-family: "sub2";
        font-size: 40px;
    }
`;

const Stations = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
`;

const Radio = styled.div`
    opacity: 0.5;
    color: black;
    > input + label {
    }
    > input:checked + label {
        font-size: 20px;
        font-weight: bold;
        color: red;
        opacity: 1;
        align-items: flex-start;
    }
`;

const Box = styled.div`
    width: 20%;
    height: 30vh;
    margin: 5px;
    margin-top: 50px;
    text-align: center;
`;

const Station = styled.div`
    width: 80%;
    font-size: 1.2em;
    border: 1px solid rgb(76, 62, 95);
    
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Source Sans Pro', sans-serif;
    

    &:hover {
    border-color: #e36bae;
`;
// //background: linear-gradient(
//     to right,
//     rgba(20, 20, 20, 0.1) 10%,
//     rgba(20, 20, 20, 0.7) 70%,
//     rgba(20, 20, 20, 1)
// ),
// url(${(props) => props.img});
// background-size: cover;

export default MovieGenres;
