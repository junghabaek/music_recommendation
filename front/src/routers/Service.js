import React, { useState } from "react";
import MusicPlay from "../component/MusicPlay";
import { AudioPlayerProvider } from "react-use-audio-player";
import Always from "./Always.mp3";
import MovieGenre from "../component/MovieGenre";
import MusicGenre from "../component/MusicGenre";

const Service = ({ history }) => {
    const [changeGenre, setChangeGenre] = useState(true);
    return (
        <div>
            <h1>Sound of movie</h1>

            {changeGenre ? (
                <div>
                    <AudioPlayerProvider>
                        <MusicPlay file={Always} api={null} />
                    </AudioPlayerProvider>
                    <MovieGenre />
                    <button
                        onClick={(e) => {
                            setChangeGenre((cur) => !cur);
                        }}
                    >
                        음악장르로
                    </button>
                </div>
            ) : (
                <div>
                    <MusicGenre />
                    <button
                        onClick={(e) => {
                            setChangeGenre((cur) => !cur);
                        }}
                    >
                        뒤로가기 버튼
                    </button>
                </div>
            )}
        </div>
    );
};

export default Service;
